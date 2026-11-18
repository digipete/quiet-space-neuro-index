// Search Console automation, run from GitHub Actions.
//   node scripts/search-console-sync.mjs deploy   -> after each deploy: resubmit sitemap, ping IndexNow
//   node scripts/search-console-sync.mjs weekly   -> store last week's performance + index status, raise alerts
// Needs GSC_SERVICE_ACCOUNT_JSON. Weekly also needs SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
import crypto from 'node:crypto';
import fs from 'node:fs';

export const SITE_HOST = 'index.quietspace.club';
export const SITEMAP_URL = `https://${SITE_HOST}/sitemap.xml`;
export const KEY_PAGES = ['/', '/spaces/', '/blog/', '/neurodiversity-in-the-workplace/', '/neuroinclusion-for-employers/',
  '/tools/sensory-self-assessment/', '/find-my-space/', '/workspace-providers/', '/quiet-workspaces/london/', '/for/hr-teams/']
  .map((p) => `https://${SITE_HOST}${p}`);
const INDEXNOW_KEY = '83dbfd005d7df55d9762034ff907ea8b';

/** Rules for when to alert. Kept pure so they are tested. */
export function computeAlerts({ thisWeek, lastWeek, indexStatus = [], previousIndexStatus = [], sitemap = {} }) {
  const alerts = [];
  if (lastWeek && lastWeek.impressions >= 20 && thisWeek.impressions < lastWeek.impressions * 0.5) {
    alerts.push(`Google impressions fell from ${lastWeek.impressions} to ${thisWeek.impressions} week on week.`);
  }
  const wasIndexed = new Set(previousIndexStatus.filter((p) => p.indexed).map((p) => p.url));
  for (const p of indexStatus) if (!p.indexed && wasIndexed.has(p.url)) alerts.push(`${p.url} dropped out of Google (${p.coverage}).`);
  if (Number(sitemap.errors || 0) > 0) alerts.push(`Google reports ${sitemap.errors} error(s) in the sitemap.`);
  return alerts;
}

export function isIndexed(coverageState = '') { return /^Submitted and indexed|^Indexed/i.test(coverageState); }

/** Monday (UTC) of the week before `now`. */
export function previousWeek(now = new Date()) {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const monday = new Date(d); monday.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) - 7);
  const sunday = new Date(monday); sunday.setUTCDate(monday.getUTCDate() + 6);
  const f = (x) => x.toISOString().slice(0, 10);
  return { start: f(monday), end: f(sunday) };
}

async function token() {
  const sa = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/webmasters', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`;
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key).toString('base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }) });
  if (!r.ok) throw new Error(`Google sign-in failed [${r.status}]: ${await r.text()}`);
  return (await r.json()).access_token;
}

async function google(tok, method, url, body) {
  const r = await fetch(url, { method, headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  if (r.status === 403) throw new Error(`Search Console refused access [403] for ${url}. Add the service account as a user on the property.`);
  if (!r.ok) throw new Error(`Search Console [${r.status}] ${url}: ${await r.text()}`);
  return r.status === 204 ? null : r.json();
}

async function resolveProperty(tok) {
  const { siteEntry = [] } = await google(tok, 'GET', 'https://www.googleapis.com/webmasters/v3/sites');
  const m = siteEntry.filter((s) => s.permissionLevel !== 'siteUnverifiedUser' && (
    s.siteUrl.startsWith('sc-domain:') ? SITE_HOST === s.siteUrl.slice(10) || SITE_HOST.endsWith('.' + s.siteUrl.slice(10)) : `https://${SITE_HOST}/`.startsWith(s.siteUrl)));
  if (!m.length) throw new Error('No verified Search Console property covers the site for this service account.');
  return (m.find((s) => s.siteUrl.startsWith('sc-domain:')) ?? m[0]).siteUrl;
}

const enc = encodeURIComponent;
const API = 'https://www.googleapis.com/webmasters/v3/sites';

async function supa(method, path, body) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, { method, headers: {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' }, body: body && JSON.stringify(body) });
  if (!r.ok) throw new Error(`Database [${r.status}]: ${await r.text()}`);
  return r.status === 201 || r.status === 204 ? null : r.json();
}

async function deploy() {
  // Runs after GitHub Pages has published, so the live sitemap is the new one.
  const tok = await token(); const site = await resolveProperty(tok);
  const xml = await fetch(SITEMAP_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((r) => r.text());
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urls.length) throw new Error('Live sitemap has no pages.');
  await google(tok, 'PUT', `${API}/${enc(site)}/sitemaps/${enc(SITEMAP_URL)}`);
  console.log(`Sitemap resubmitted to Google (${urls.length} pages).`);
  const r = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ host: SITE_HOST, key: INDEXNOW_KEY, keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`, urlList: urls }) });
  console.log(`IndexNow: ${r.status} for ${urls.length} page(s).`);
}

async function weekly() {
  const tok = await token(); const site = await resolveProperty(tok);
  const { start, end } = previousWeek();
  const q = (dimensions, rowLimit) => google(tok, 'POST', `${API}/${enc(site)}/searchAnalytics/query`, { startDate: start, endDate: end, dimensions, rowLimit });
  const total = (await q([], 1)).rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const map = (rows = []) => rows.map((r) => ({ key: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: Math.round(r.position * 10) / 10 }));
  const top_queries = map((await q(['query'], 15)).rows);
  const top_pages = map((await q(['page'], 15)).rows);
  const index_status = [];
  for (const url of KEY_PAGES) {
    const res = await google(tok, 'POST', 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', { inspectionUrl: url, siteUrl: site });
    const s = res.inspectionResult?.indexStatusResult ?? {};
    index_status.push({ url, indexed: isIndexed(s.coverageState), coverage: s.coverageState ?? 'Unknown', lastCrawl: s.lastCrawlTime ?? null });
  }
  const sm = await google(tok, 'GET', `${API}/${enc(site)}/sitemaps/${enc(SITEMAP_URL)}`).catch(() => ({}));
  const sitemap_status = { lastSubmitted: sm.lastSubmitted, lastDownloaded: sm.lastDownloaded, isPending: sm.isPending, errors: sm.errors, warnings: sm.warnings };
  const [prev] = await supa('GET', `search_console_snapshots?week_start=lt.${start}&order=week_start.desc&limit=1`);
  const thisWeek = { clicks: total.clicks, impressions: total.impressions };
  const alerts = computeAlerts({ thisWeek, lastWeek: prev, indexStatus: index_status, previousIndexStatus: prev?.index_status, sitemap: sitemap_status });
  await supa('POST', 'search_console_snapshots?on_conflict=week_start', { week_start: start, clicks: total.clicks, impressions: total.impressions,
    ctr: total.ctr, position: total.position, top_queries, top_pages, index_status, sitemap_status, alerts });
  console.log(`Week ${start}: ${total.clicks} clicks, ${total.impressions} impressions, ${index_status.filter((p) => p.indexed).length}/${KEY_PAGES.length} key pages indexed.`);
  if (alerts.length) { fs.writeFileSync('search-alerts.md', alerts.map((a) => `- ${a}`).join('\n')); console.log(alerts.join('\n')); }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.GSC_SERVICE_ACCOUNT_JSON) { console.log('GSC_SERVICE_ACCOUNT_JSON not set; skipping Search Console step.'); process.exit(0); }
  (process.argv[2] === 'weekly' ? weekly() : deploy()).catch((e) => { console.error(e.message); process.exit(1); });
}

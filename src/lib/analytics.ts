import { supabase } from '@/integrations/supabase/client';

export type Section = 'guide' | 'assessment' | 'listing' | 'other';
export type EventType =
  | 'page_view'
  | 'assessment_completed'
  | 'assessment_shared'
  | 'space_submitted'
  | 'space_claimed'
  | 'contact_submitted'
  | 'listing_cta_clicked';

const GUIDE_PREFIXES = ['/blog/', '/neurodiversity-in-the-workplace', '/neuroinclusion-for-employers', '/for/', '/quiet-workspaces/'];

export function sectionFor(path: string): Section {
  if (path.startsWith('/tools/sensory-self-assessment')) return 'assessment';
  if (path.startsWith('/spaces') || path.startsWith('/space/') || path.startsWith('/submit-space') || path.startsWith('/workspace-providers')) return 'listing';
  if (GUIDE_PREFIXES.some((p) => path.startsWith(p)) && path !== '/blog/' && path !== '/blog') return 'guide';
  return 'other';
}

/** Turns a referrer URL into a readable source name. Own-site referrals count as "direct". */
export function referrerSource(referrer: string, ownHost: string): string {
  if (!referrer) return 'direct';
  let host: string;
  try { host = new URL(referrer).hostname.replace(/^www\./, ''); } catch { return 'direct'; }
  if (host === ownHost.replace(/^www\./, '') || host.endsWith('quietspace.club')) return 'direct';
  if (/google\./.test(host)) return 'Google';
  if (/bing\.com$/.test(host)) return 'Bing';
  if (/duckduckgo\.com$/.test(host)) return 'DuckDuckGo';
  if (/linkedin\.com$|lnkd\.in$/.test(host)) return 'LinkedIn';
  if (/(^|\.)t\.co$|twitter\.com$|x\.com$/.test(host)) return 'X / Twitter';
  if (/facebook\.com$|fb\.me$/.test(host)) return 'Facebook';
  if (/instagram\.com$/.test(host)) return 'Instagram';
  if (/chatgpt\.com$|openai\.com$/.test(host)) return 'ChatGPT';
  if (/perplexity\.ai$/.test(host)) return 'Perplexity';
  return host.slice(0, 100);
}

const isBot = () => typeof navigator === 'undefined' || navigator.webdriver || /bot|crawl|spider|headless/i.test(navigator.userAgent);

// First referrer of the visit, so conversions are credited to where the visitor came from.
let landing: { source: string; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null } | null = null;

function getLanding() {
  if (landing) return landing;
  const params = new URLSearchParams(window.location.search);
  const cut = (v: string | null) => (v ? v.slice(0, 100) : null);
  landing = {
    source: referrerSource(document.referrer, window.location.hostname),
    utm_source: cut(params.get('utm_source')),
    utm_medium: cut(params.get('utm_medium')),
    utm_campaign: cut(params.get('utm_campaign')),
  };
  if (landing.utm_source && landing.source === 'direct') landing.source = landing.utm_source;
  return landing;
}

export function track(event: EventType, path = window.location.pathname) {
  if (isBot() || path.startsWith('/admin')) return;
  const l = getLanding();
  void supabase.from('site_events').insert({
    event_type: event,
    path: path.slice(0, 300),
    section: sectionFor(path),
    referrer_source: l.source,
    utm_source: l.utm_source,
    utm_medium: l.utm_medium,
    utm_campaign: l.utm_campaign,
  }).then(({ error }) => { if (error) console.warn('analytics', error.message); });
}
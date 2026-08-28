// Single source of truth for every public, indexable route.
// Used by the pre-renderer, the sitemap generator, llms.txt and the build verifier.

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const SITE_URL = 'https://index.quietspace.club';

// Safety cap so a growing database can never blow up the published output.
const MAX_SPACE_PAGES = 2000;

const STATIC_ROUTES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/spaces', changefreq: 'daily', priority: '0.9' },
  { path: '/workspace-providers', changefreq: 'weekly', priority: '0.8' },
  { path: '/how-it-works', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/resources', changefreq: 'weekly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
  { path: '/submit-space', changefreq: 'monthly', priority: '0.5' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
];

function toIsoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().split('T')[0];
}

// Parse slugs + dates straight out of the TS data file (no compile step needed).
export function getBlogRoutes() {
  const source = readFileSync(join(__dirname, '../src/data/blogPosts.ts'), 'utf8');
  const entries = [];
  const slugRe = /slug:\s*'([^']+)'/g;
  let match;
  while ((match = slugRe.exec(source)) !== null) {
    const slug = match[1];
    // The `date: '...'` that follows this slug belongs to the same post object.
    const after = source.slice(match.index, match.index + 800);
    const dateMatch = after.match(/date:\s*'([^']+)'/);
    entries.push({
      path: `/blog/${slug}`,
      lastmod: toIsoDate(dateMatch?.[1]),
      changefreq: 'monthly',
      priority: '0.7',
    });
  }
  return entries;
}

// Every listing gets a real, crawlable detail page.
export async function getSpaceRoutes() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn('⚠️  Supabase env vars missing — skipping /space/:id routes.');
    return [];
  }

  try {
    const res = await fetch(
      `${url}/rest/v1/listings?select=id,updated_at&order=updated_at.desc&limit=${MAX_SPACE_PAGES}`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    );
    if (!res.ok) {
      console.warn(`⚠️  Could not fetch listings (${res.status}) — skipping /space/:id routes.`);
      return [];
    }
    const rows = await res.json();
    return rows.map((row) => ({
      path: `/space/${row.id}`,
      lastmod: toIsoDate(row.updated_at),
      changefreq: 'weekly',
      priority: '0.8',
    }));
  } catch (error) {
    console.warn(`⚠️  Could not fetch listings (${error.message}) — skipping /space/:id routes.`);
    return [];
  }
}

export async function getAllRoutes() {
  const spaces = await getSpaceRoutes();
  return [...STATIC_ROUTES, ...getBlogRoutes(), ...spaces];
}

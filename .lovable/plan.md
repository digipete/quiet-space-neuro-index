# Organic SEO: fix indexing, then build ranking content

## What I found (verified live, today)

The site isn't ranking mainly because most of it **cannot be crawled at all**, not because of on-page tweaks.

- 13 of your 15 blog posts return **HTTP 404** to Google. Only `/blog/create-sensory-friendly-meeting-room-process` and `/blog/defining-inclusive-workspaces-for-neurodiverse-professionals` are pre-rendered; the rest fall through to the GitHub Pages `404.html` redirect shim, which crawlers read as "page does not exist".
- Every workspace detail page (`/space/:id`) also returns **404** to crawlers. Your actual product pages are invisible.
- The **live sitemap has only 7 URLs**. The build script (`scripts/build-static.js`) overwrites `public/sitemap.xml` at deploy time with a hardcoded 7-URL list — so all your blog and `/submit-space` sitemap work never reaches production.
- **No verified Search Console property** covers the site, so nothing has been submitted and there's no performance data to work from.
- Two domains compete: apex `quietspace.club` serves a hand-written flat HTML site with its own sitemap, and the real app lives on `index.quietspace.club`. Duplicate content on two hosts splits authority.
- Semrush shows no tracked ranking data for `index.quietspace.club` in the UK database — consistent with "not indexed yet".

Keyword grounding (Semrush, UK): `neurodiverse` 14,800/mo, `neurodiversity in the workplace` 720/mo (KD 38), `neuroinclusion` 390/mo (CPC $4.42), `neurodiversity at work` 320/mo, `neurodiversity uk` 320/mo, `autism at work` 260/mo. Hyper-specific space queries ("quiet workspace london") have no measurable volume, so the directory should be positioned as a discovery layer under broader neurodiversity-at-work demand.

## Phase 1 — Make the site crawlable (highest impact)

1. Drive pre-rendering from real data instead of a hardcoded list: generate routes from `src/data/blogPosts.ts` (all 15 posts) plus every `listings` row from Supabase (`/space/:id`), plus all static routes.
2. Generate the sitemap from that same route list in `build-static.js` — one source of truth, no more 7-URL overwrite. Drop invented `lastmod` values; use post dates where a real date exists.
3. Emit each pre-rendered route as a real `index.html` so GitHub Pages serves HTTP 200 instead of the 404 shim. Keep `404.html` only for genuinely unknown URLs.
4. Add a build verification step that fails the deploy if any sitemap URL has no matching pre-rendered file — this is what silently broke before.
5. Fix `robots.txt` sitemap directive and confirm it matches the canonical host.

## Phase 2 — Consolidate domains and register with Google

6. Decide the canonical host (recommendation: keep the app on `index.quietspace.club`, and make apex `quietspace.club` a 301 redirect rather than a duplicate flat site; the flat-site content is thin and competes with your real pages). If you'd rather keep the apex as the brand site, the alternative is to move the app to the apex and retire the subdomain.
7. Verify the chosen property in Search Console (the verification meta tag is already in `index.html`), submit the sitemap, and request indexing for the homepage, `/spaces`, and `/blog`.

## Phase 3 — On-page depth for the pages that should rank

8. Space detail pages: unique title/description per space, `LocalBusiness` + `BreadcrumbList` JSON-LD, and enough unique copy (sensory profile, amenities, scoring rationale) to be a real page rather than a card expansion.
9. `/spaces`: make the directory crawlable without JS filters — render a full server-side list plus internal links to every space, `ItemList` JSON-LD, and an intro section targeting "neurodiverse workspace directory UK".
10. Blog: `Article` + `BreadcrumbList` JSON-LD on every post, author and date, related-post internal links, and links from posts into relevant spaces (this is what turns content traffic into product traffic).
11. Rebuild `llms.txt` from the same route source so AI crawlers see all 15 posts, not the current hand-written summary.

## Phase 4 — Content targeting the demand that exists

12. Two pillar hubs, each linking down to your existing posts:
    - **Neurodiversity in the workplace (UK)** — targets 720/mo head term plus the `neurodiversity at work` / `neurodiversity uk` cluster.
    - **Neuroinclusion for employers** — lower volume, highest commercial intent (CPC $4.42), aimed at the B2B buyer for workspace providers.
13. One manager-facing guide, `/blog/managing-neurodivergent-employees` (this is the outstanding SEO finding, and it fits the pillar structure).
14. Location landing pages are deliberately **out of scope for now** — with 6 listings across 6 locations they'd be thin. Revisit once there are ~5+ spaces per city.

## Technical notes

- Files touched in Phase 1: `scripts/build-static.js`, `scripts/prerender-with-puppeteer.js`, `.github/workflows/node.js.yml`, `public/robots.txt`, `public/sitemap.xml` (becomes generated output).
- Pre-render needs Supabase read access at build time; the workflow already passes `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
- Phases 3–4 touch `src/pages/SpaceDetail.tsx`, `src/pages/Index.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx`, `src/components/SEO.tsx`, `src/data/blogPosts.ts`, `public/llms.txt`.
- Phase 2 step 6 (apex redirect) is a DNS/host change you make outside the codebase; I'll give exact instructions.
- Realistic timeline: crawl fixes land on the next deploy; indexing of the ~25 newly reachable URLs typically takes 1–3 weeks; ranking movement on the pillar terms takes 2–3 months of consistent publishing.

Say the word and I'll start with Phase 1, since nothing else can help until Google can actually reach the pages.

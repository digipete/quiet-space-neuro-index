# Fix the SEO foundations so Google can crawl, index and rank NeuroIndex

## What I found (checked live today)

1. **Google has never crawled the site.** Search Console's own URL inspection says the homepage is "URL is unknown to Google". The sitemap submitted on 7 September is still marked "pending" — Google has not downloaded it once. Nothing is broken in Search Console itself; the site simply has no crawl history yet and no links pointing at it.

2. **Every page in the sitemap redirects.** The sitemap lists 33 addresses like `/blog`, but the site serves them at `/blog/`. So each address Google is given answers with a redirect. Search engines tolerate this, but it wastes crawl budget and muddies the signals — and it is trivially fixable.

3. **Every page carries two sets of tags, and the homepage's version comes first.** Each pre-rendered page contains the homepage description, the homepage "preferred address" (canonical) and the homepage share URL, followed by the page's own correct ones. Effectively every page tells Google "the real page here is the homepage". This is the single most damaging issue: even once Google crawls, inner pages would be collapsed into the homepage and ranked for nothing.

4. **Search Console property coverage.** `index.quietspace.club` is verified and owned. The old `quietspace.club` property no longer exists, so the apex domain that redirects here is unmonitored.

Items 2 and 3 are code fixes I can do now. Item 1 needs both the fixes and a few actions only you can take in the Search Console interface.

## The fix

### Phase 1 — Make each page describe itself correctly (highest impact)
- Strip the template's homepage-level description, canonical, `og:`/`twitter:` URL and robots tags out of each pre-rendered page so only that page's own tags remain.
- Verify after build that every route has exactly one title, one description and one canonical, and that the canonical matches the page's own address.
- Add a build check that fails if any page ends up with duplicate or homepage-pointing canonicals, so this cannot silently come back.

### Phase 2 — Remove the redirect on every indexable address
- Standardise on the trailing-slash form (that is what GitHub Pages actually serves).
- Update the sitemap generator, canonicals, `og:url` and internal links to use it, so every address Google is handed answers 200 directly.
- Add `lastmod` dates to all sitemap entries.

### Phase 3 — Get Google to actually come and look
- Re-submit the sitemap after deployment (I can do this).
- Ping Bing/IndexNow so at least one engine crawls immediately (I can do this).
- **You:** in Search Console, open URL Inspection for the homepage, `/blog/` and the two pillar pages and press "Request indexing". The API cannot do this; it is the fastest known way to get a first crawl.
- **You (optional but recommended):** add and verify `quietspace.club` as a second property so the redirecting apex is monitored too. I can run the verification once you say go.

### Phase 4 — Earn discovery signals
Google rarely crawls a site with zero inbound links. After Phase 1-3 is live I will draft a short list of realistic places to get NeuroIndex listed and linked (neurodiversity directories, coworking/flexible-space listings, relevant UK communities), with the wording to use. No link buying — just legitimate listings.

## Technical detail

- `scripts/prerender-with-puppeteer.js`: after Helmet renders, remove template-level `description`, `canonical`, `og:url`, `og:title`, `og:description`, `twitter:*` and `robots` tags that lack the `data-rh` marker, keeping the page-specific ones.
- `scripts/seo-routes.mjs`: route paths gain a trailing slash; `SITE_URL` join updated accordingly; `lastmod` added to static routes.
- `scripts/build-static.js`: sitemap emits trailing-slash URLs with `lastmod`; existing dist verification extended to assert one canonical per page matching its own URL, and to fail the build on a mismatch.
- `src/components/SEO.tsx` and the pillar/blog/space pages: canonical and `og:url` built with the trailing-slash form.
- No change to the homepage wording, no new metadata framework, no changes to `robots.txt` rules.

## What this does and does not promise

These fixes remove the technical reasons Google would ignore or mis-attribute your pages. They do not guarantee ranking by a fixed date — first indexing typically takes days to a few weeks after a first successful crawl, and rankings build from there. The content you already have (pillar pages, 15 blog posts, space listings) is the asset; this work makes it eligible.

# Fix the two page-indexing groups in Search Console

## What those two Search Console reports are showing

I can't open your Search Console screens, but I queried the same property (`index.quietspace.club`) directly and checked the live site. The picture is clear, and there is genuine progress:

1. **Google has now crawled the site.** The homepage was fetched successfully today at 13:39 UTC. Its status is "Crawled - currently not indexed" — Google has it, fetched it fine, chose the same preferred address you declared, but hasn't put it in the index yet. That is the first group.
2. **Addresses without a trailing slash produce a redirect error.** `…/blog` was crawled at the same moment and came back as "Redirect error". That is the second group, and it covers the whole set of addresses Google was originally handed from the old sitemap.

The sitemap (last submitted 18 September) is still marked pending, so Google has not re-read the corrected list yet.

## What is already fixed and live

The build published today at 13:52 UTC is correct: the sitemap now lists 33 addresses, all with a trailing slash, none of them redirecting; `/blog/` returns a single clean page with one title, one description and a preferred address pointing at itself. A slash-less address now answers with one tidy 301 to the slash version — no loops.

## What is still actively causing the redirect group

Two things I confirmed in the code:

1. **Every internal link on the site is written without a trailing slash** (`/blog`, `/about`, `/spaces`, `/how-it-works`, both guide pages, and so on, across the navigation, footer, home, guides and blog pages). So every page Google crawls hands it a fresh set of redirecting addresses. This keeps refilling the "redirect" group no matter how clean the sitemap is.
2. **The not-found page silently bounces every unknown address to the homepage** via a script (`/?redirect=…`). To Google this looks like a redirect to the homepage rather than an honest "page not found", which produces exactly the redirect errors and homepage-duplication noise being reported. It was needed before pages were pre-rendered; every real page is now a real file, so it is no longer needed for visitors.

## The fix

### Phase 1 — Stop generating redirecting addresses
- Add the trailing slash to every internal link across navigation, footer, home, how-it-works, resources, blog, blog posts, guide pages and space pages.
- Keep the navigation's "current page" highlighting working with the slash form.
- Keep the two in-app redirects (missing post, missing space) pointing at the slash form too.

### Phase 2 — Make the not-found page honest
- Replace the bounce-to-homepage script with a real not-found page that stays put, tells visitors what happened, links to the homepage, search and blog, and asks search engines not to index it.
- No change to any real route: all 33 are pre-rendered files served directly.

### Phase 3 — Re-submit and nudge discovery
- Re-submit the sitemap once the above is live, so Google re-reads the corrected list.
- Ping Bing/IndexNow for an immediate second-engine crawl.
- **You:** in Search Console, use URL Inspection → "Request indexing" for the homepage, `/blog/`, and the two guide pages. The API cannot do this, and it is the fastest route out of "Crawled - currently not indexed".

### Phase 4 — Earn the signals that turn crawling into indexing
"Crawled - currently not indexed" is usually about the site being unknown rather than broken: no inbound links and no search history. I'll prepare listing copy for the free neurodiversity and flexible-workspace directories I identified earlier, so there are legitimate links pointing in. No link buying.

## Technical detail

- `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/pages/Home.tsx`, `HowItWorks.tsx`, `Resources.tsx`, `Blog.tsx`, `BlogPost.tsx`, `PillarPage.tsx`, `SpaceDetail.tsx`: `to="/x"` becomes `to="/x/"`; `isActive` compares against the normalised slash form.
- `public/404.html`: drop the `window.location.replace('/?redirect=…')` block; render a static not-found page with `<meta name="robots" content="noindex">`.
- Check whether anything still reads the `?redirect=` parameter before removing it, and remove that handling too if it exists.
- No change to `robots.txt`, the sitemap generator, canonical logic or the pre-render step — those are already correct.

## What this promises

It removes the remaining technical reasons for both reported groups. Indexing itself stays Google's call: after a corrected crawl, the first pages typically appear within days to a few weeks, and Phase 4 is what makes that happen sooner rather than later.

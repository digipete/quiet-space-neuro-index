# Fix the two page-indexing problems Google is reporting

I couldn't open your Search Console screens, so I pulled the same data from Google's API and tested the live site. Both problem groups are now identified, with evidence.

## What Google is actually reporting

**1. Pages that redirect instead of answering**

Every link inside your published pages points at the version without a trailing slash (`/blog`, `/about`, `/spaces`, `/neurodiversity-in-the-workplace`). The site answers those with a redirect to the slash version. Google's check on `https://index.quietspace.club/blog` comes back as **"Redirect error"**, while `https://index.quietspace.club/blog/` answers normally. So Google keeps finding the address that bounces, not the page.

The same slash-less addresses are also written into the machine-readable data blocks on the homepage, the blog list and each workspace page (workspace links, `/spaces`, blog post links) — another supply of bouncing addresses.

**2. Crawled but not yet indexed**

Google visited the homepage today, fetched it successfully, accepted our chosen web address, and still lists it as **"Crawled – currently not indexed"**. That is not a technical fault: crawling and metadata are working. It means Google has seen the pages and hasn't judged them worth adding yet — typical for a brand-new site with almost no links pointing to it and pages that look similar to each other.

Also worth knowing: the sitemap submitted on 18 September still shows as "pending" — Google hasn't processed it, even though it is crawling the site.

## The fix

**Phase 1 — stop handing Google bouncing addresses**

- Change every internal link to the trailing-slash form so the pages Google follows answer straight away.
- Update the machine-readable data blocks so workspace, blog and search addresses use the same trailing-slash form as the page's own address.
- Keep the menu highlighting working with either form.
- Add an automatic build check that fails if any published page links to an address that redirects, so this can't come back.

**Phase 2 — give Google a reason to index**

- Add the missing "last updated" dates to the eleven sitemap entries that lack them, and resubmit the sitemap.
- Tell Bing and Yandex directly (the ownership key for that is already in place).
- Reduce near-duplicate pages: the six workspace pages are thin and share most of their wording. Give each a genuinely distinct description and score commentary so they don't read as copies.
- Strengthen internal linking: link the two pillar guides and the strongest blog posts from the homepage and from each other, so Google sees which pages matter.
- Your side: in Search Console, open the homepage, `/blog/`, and the two pillar guides in URL Inspection and press **Request indexing**. Google's API cannot do this; only you can, and it is the fastest single lever.

**Phase 3 — the part that actually moves "not indexed" to "indexed"**

A new site with no inbound links is what Google is hesitating over. The three free UK directory listings I found earlier (The Neurodiversity Directory, NeuroDirect, Inclusion Support Hub) each give a real link. I can write the listing copy for all three.

## Technical notes

- `scripts/seo-routes.mjs` already exports `canonicalFor()`; internal links and the structured-data URLs will use the same helper via a small shared path helper so there is one source of truth.
- Affected files: `src/components/Navigation.tsx`, `src/components/Footer.tsx`, `src/pages/Index.tsx`, `src/pages/Blog.tsx`, `src/pages/SpaceDetail.tsx`, `src/components/StructuredData.tsx`, `index.html`, plus a new link check in `scripts/build-static.js`.
- `Navigation.tsx` compares `location.pathname` exactly; that comparison will be made slash-insensitive.
- Dead files `src/components/SEOHead.tsx` and `src/components/StaticPageHead.tsx` will be deleted so they stop appearing in searches like this one.
- Sitemap `lastmod` will only be added where an authoritative date exists (blog dates, listing update dates); static pages keep none rather than a fake build date.

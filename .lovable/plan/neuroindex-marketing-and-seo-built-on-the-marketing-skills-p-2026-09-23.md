# NeuroIndex: marketing and SEO built on the marketing-skills playbooks

The repo you shared is a library of 50 marketing playbooks. Six apply directly here: SEO audit, AI search (being cited by ChatGPT/Perplexity/AI Overviews), site architecture, schema/structured data, content strategy, and directory submissions. The plan below follows their order of operations, which is the opposite of what most sites do: make the money pages exist first, then earn links into them.

Audience decision: employers, HR teams and neurodivergent professionals are who we attract; workspace providers are who we charge. So every visitor page must end in one of two actions — find a space, or list your space.

## Phase 1 — Foundations audit and the missing conversion layer

The site is now crawlable and technically clean, so the gap is different: there is nowhere for a provider to convert, and nothing for a search engine to cite beyond two guides.

1. Full audit pass against the playbook checklist: single H1 per page and clean heading order (the playbooks measure a 2.8x higher AI citation rate for this), image alt text, internal link depth, page speed on mobile.
2. Build the provider-facing conversion path: a real "List your space" offer page with what a listing includes, what the NeuroFlow assessment is, what it costs (even "free while we grow"), and a single clear form. Today `/workspace-providers/` explains the idea but does not close.
3. Add the pages that the playbooks call destinations — pages worth linking to and worth citing:
   - `/for/hr-teams/`, `/for/managers/`, `/for/neurodivergent-professionals/` — one page per audience, each answering that reader's actual question and ending in a relevant action.
   - `/quiet-workspaces/london/` as a single location template, proven on London only. No other cities until there are enough spaces to justify them.
4. Add privacy and terms pages. Most directories will not accept a listing without them.

## Phase 2 — Structured data and AI-search readiness

5. Complete the schema set: `Organization` and `WebSite` sitewide, `LocalBusiness` per space (already partly there), `ItemList` on the directory, `Article` and `BreadcrumbList` on posts and guides, `Offer` on the provider page.
6. Rewrite `llms.txt` from the real route list and add `llms-full.txt` so AI assistants can read the whole site in one fetch.
7. Restructure the two guide pages into the answer-first format AI engines extract from: a direct one-paragraph answer under each heading, statistics with named sources and dates, and a short definitions block. This is the single highest-leverage change for getting quoted, because AI-referred visitors convert far better than search visitors.
8. Baseline check: ask ChatGPT, Perplexity and Google AI Overviews the queries that matter ("neurodivergent friendly office space UK", "quiet workspace for autistic employees") and record who gets cited today, so we can measure movement.

## Phase 3 — Content that earns the rankings

9. Topic cluster under the two existing guide hubs, prioritised by search demand already measured: neurodiversity in the workplace (720/mo), neuroinclusion (390/mo, highest commercial intent), neurodiversity UK, autism at work.
10. Six posts, each searchable and each linking into a space or the provider offer:
    - Sensory audit checklist for offices (a tool, not an essay — links are earned by tools)
    - Reasonable adjustments for neurodivergent staff: the UK legal position
    - What makes an office ADHD-friendly
    - Quiet working spaces in London: what to look for
    - The cost of getting neuroinclusion wrong (tribunal and turnover figures)
    - How to run a neuroinclusive interview
11. One free tool as the link magnet: a scored self-assessment an employer or provider completes about their own space, ending in a result they want to share. The playbooks rate free tools as the most reliable source of unpaid links.

## Phase 4 — Distribution and links

12. Directory submissions, in the playbook's order, with different positioning per directory rather than the same blurb: the neurodiversity and disability-inclusion directories already identified, plus flexible-workspace and UK business directories, plus AI/MCP registries (the site has an MCP server, which qualifies it for those).
13. Google Business Profile and UK local listings if there is a registered business address.
14. Outreach I draft and you send: neurodiversity employee networks, occupational health consultants, and the six listed spaces themselves — each has an incentive to link to their own listing.
15. Search Console follow-through: request indexing for each new page as it ships, then track impressions per cluster monthly.

## What I need from you

- Whether listings are free right now or priced, so the provider page can state it plainly.
- A registered business address, if you have one, for local listings.
- Privacy/terms: I can draft both, but you should read them before they go live.

## Technical notes

New routes go in `src/App.tsx` and `scripts/seo-routes.mjs` (the single route source that drives pre-rendering, the sitemap, the build verifier and `llms.txt`), so every new page is pre-rendered and verified automatically. Audience and location pages follow the existing `PillarPage.tsx` data-driven pattern with content in `src/data/`. Schema goes through the existing Helmet JSON-LD approach, not a new library. The free tool is client-side only — no new tables unless you want to capture emails, which we can decide later.

Suggested order: Phase 1 first, since directories and outreach in Phase 4 are wasted effort until there is a page worth landing on.

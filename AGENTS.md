# Project rules

- Visitor analytics are first-party: the browser writes anonymous rows to the `site_events` table via `src/lib/analytics.ts`, read only by admins at `/admin/analytics`. Why: GitHub Pages hosting, no cookie banner needed, data stays in our own database.
- Analytics must never store personal data (no IPs, emails, user IDs, or assessment answers) and skip headless/bot browsers so pre-rendering doesn't log fake visits.
- GitHub Pages uses Node 22 and npm ci; keep package-lock.json synchronized whenever package.json dependencies change because CI requires the npm lockfile and Puppeteer requires Node >=22.12.0.
- Generate physical noindex pages for every private route from the original Vite shell and verify local listing photos in the Pages artifact; fail on listing-fetch errors so deployments cannot silently remove direct links or photos.
- Keep listing photos visible without a JavaScript load callback; cached images or missed events must not leave successfully downloaded photos transparent.- Search Console automation runs in GitHub Actions (`scripts/search-console-sync.mjs`) with a Google service account: sitemap resubmit + IndexNow after each deploy, weekly snapshot into `search_console_snapshots` (admin-read only) with GitHub-issue alerts. Why: chat connectors can't run unattended, and the site is hosted on GitHub Pages.

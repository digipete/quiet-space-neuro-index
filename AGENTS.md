# Project rules

- Visitor analytics are first-party: the browser writes anonymous rows to the `site_events` table via `src/lib/analytics.ts`, read only by admins at `/admin/analytics`. Why: GitHub Pages hosting, no cookie banner needed, data stays in our own database.
- Analytics must never store personal data (no IPs, emails, user IDs, or assessment answers) and skip headless/bot browsers so pre-rendering doesn't log fake visits.
- GitHub Pages uses Node 22 and npm ci; keep package-lock.json synchronized whenever package.json dependencies change because CI requires the npm lockfile and Puppeteer requires Node >=22.12.0.
# Search Console: what's wrong, and keeping it healthy automatically

## What I found (checked live today)

- **Connection works.** Lovable can still read your Google Search Console. Your site's property (index.quietspace.club) is listed, and you are the owner.
- **Google has not processed your sitemap.** It was last submitted on 21 Sep and still shows "pending". It was never sent again after the new pages went live. The live sitemap has 47 pages and reports no errors.
- **Your key pages are not in Google's index.** The homepage and the spaces page both show "Crawled – currently not indexed". Google last visited them on 16 Oct. It can read them fine, but it chose not to list them yet.
- **What the drop looks like:**

```text
Week of     Clicks  Impressions
12 Oct        1         28
19 Oct        3        124   <- peak
26 Oct        0          2
02 Nov        0          0
09 Nov        0          7
```

  The traffic came almost entirely from blog articles. When Google re-checked the site in mid-October it kept very little of it in its index, so impressions fell to almost nothing.
- **Old duplicate addresses are still in Google's data.** Some articles appear both with and without a final "/". That splits their ranking signals. The site now always points to the "/" version, but Google hasn't caught up.
- **Likely cause (not certain):** a young site with few links from other websites, which went through lots of address and content changes in Sep–Oct. Google often holds back indexing in that situation. Search Console doesn't say why, so I can't confirm this.

## The plan

### 1. Fix it now (one-off)
- Resubmit the sitemap so Google processes the current 47 pages.
- Check the index status of all 47 pages and list which are in Google, which aren't, and why.
- Send the key pages to Bing/IndexNow again.
- You press "Request indexing" in Search Console for the homepage, /spaces/, the two guides and the tool. Google only allows this by hand. I'll give you a list of direct links.

### 2. Make it run itself
Add an automatic job to your existing GitHub setup:
- **On every deploy:** resubmit the sitemap to Google, but only when it changed, and send changed pages to Bing/IndexNow.
- **Every Monday:** collect last week's clicks, impressions, top searches and top pages, and check the index status of about 10 key pages.
- **Results show on your admin dashboard** in a new "Search" panel next to visitor analytics. You don't need to open Search Console.
- **Alerts only when something breaks:** for example, impressions drop by more than half week-on-week, a key page drops out of Google, or the sitemap shows errors. You get a GitHub email, so you only hear about real problems.

### 3. Grow the signals Google is missing (ongoing, from the earlier marketing plan)
Links from other websites matter most here: listed spaces linking to their profile, directory listings, and LinkedIn posts about the self-assessment tool. The weekly report will show whether these are working.

## One-time setup from you (about 10 minutes, with step-by-step instructions)
The automatic job needs its own Google login, because Lovable's connection only works inside chat:
1. Create a free Google "service account" and download its key.
2. Add it as a user on your Search Console property.
3. Paste the key into GitHub as a secret.

## Technical details
- New `scripts/search-console-sync.mjs`. It uses a service-account JWT for the Search Console API: sitemaps PUT, searchAnalytics query, and urlInspection for a fixed key-page list. Changes are detected by comparing a hash of the sitemap with the last stored run.
- Add a step to `.github/workflows/node.js.yml` after deploy, plus a new scheduled workflow (cron Mondays 07:00 UTC). Secret: `GSC_SERVICE_ACCOUNT_JSON`. The property is read from the API `/sites` list, not hard-coded.
- New table `search_console_snapshots` (week, clicks, impressions, ctr, position, top_queries jsonb, top_pages jsonb, index_status jsonb). Only admins can read it (`is_admin()`), and the workflow writes using the service role key secret.
- New "Search" section in `AdminAnalytics.tsx`.
- Alerts: the workflow fails or opens a GitHub issue when the thresholds are crossed.
- Tests for the alert thresholds (more than a 50% impressions drop, a key page leaving the index, sitemap errors).

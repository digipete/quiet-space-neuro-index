# Fix listing photos showing "Image unavailable" in your browser

## What I found
- Your screenshot shows "Image unavailable". That message only appears when your browser tried to load a photo and it failed. So the page is the new version; the photo request itself is what's failing.
- From here (fresh browsers on phone and desktop, a Mac Safari and a Chrome identity) all six photo files load fine with the right type and size.
- Your site sits behind Cloudflare, which keeps its own copies of files in each city. My checks went through Paris; you go through London. The most likely cause is that Cloudflare's London copy of these photo addresses is an old "not found" from before the photos were added. This is not yet confirmed. A browser extension blocking the photos is the other possibility.

## The fix
1. **Give every photo a fresh address on each deploy.** A short version code is added to each photo's address (e.g. `...jpg?v=abc123`). No old copy anywhere, in Cloudflare or a browser, can be reused, so this stops it happening again.
2. **Retry once before giving up.** If a photo fails, the page tries again once with a new address before showing "Image unavailable". The same applies to the large photo on each space's own page.
3. **Report failures to your dashboard.** When a photo still fails for a real visitor, an anonymous "photo failed" count is recorded (just the photo address, nothing personal). Then you can see the problem without needing a screenshot.
4. **Check after deploy.** The deploy check fetches every photo through the live address and fails if any photo isn't a real image.

## One thing you can do right now (2 minutes)
In Cloudflare, open quietspace.club, go to Caching → Configuration, and click **Purge Everything**. Then reload the spaces page. If the photos appear, that confirms the cause. The fix above still stops it coming back.

## Technical details
- `ListingCard.tsx` and `SpaceDetail.tsx`: append `?v=${BUILD_ID}` to local `/spaces/` image URLs. `BUILD_ID` comes from Vite `define` (git SHA or timestamp). On the first `onError`, retry with `&r=<timestamp>`. On the second error, show the placeholder.
- New `site_events` event type `image_failed` (section `listing`, path = image path). This needs a migration to extend the allowed event types. The Admin analytics conversions list ignores it, and a small "Photo failures" line is shown.
- Prerender pages pick up the versioned URL. Add a post-deploy step in the `search-console` job that requests each `/spaces/*.jpg?v=` URL and checks for `200` and `image/*`.
- Tests: image URL versioning helper (adds `v`, leaves external URLs alone), and the retry happens once only.

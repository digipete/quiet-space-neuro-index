# Fix missing workspace photos

## What's wrong

The Jellicoe listing points at a photo hosted on Fora's own website. That site blocks
requests coming from anywhere but itself, so it returns an error instead of the picture —
confirmed by fetching it directly (error 400). The Ministry, White Collar Factory and the
three US listings currently do load, but they're also linked straight from other people's
websites, so they can break the same way at any time without warning.

A second, smaller issue: the space detail page has no fallback, so a broken photo leaves a
blank gap. The listing cards on the directory already show an "Image unavailable" box.

## The fix

1. **Save the photos into the site.** Download each listing's photo once, store it with the
   site's own files, and point the listings at those copies. No more depending on other
   people's servers.
   - The Jellicoe: fetch the working original of the same Fora image (its underlying image
     host serves it fine — verified) and save that.
   - The other five: save the copies of the images they already use.
2. **Update the six listings** in the database to use the site-hosted image addresses.
3. **Add a graceful fallback on the space detail page** so any future missing photo shows a
   tidy placeholder instead of an empty space.

## Result

All six workspace pages show their photo reliably, and the site no longer depends on
external websites allowing us to display their images.

## Technical notes

- Download images to a public folder (e.g. `public/spaces/<slug>.jpg`) or a Supabase Storage
  public bucket; update `listings.image_url` accordingly via migration/SQL.
- Jellicoe source: `https://cdn.sanity.io/images/8vw7318k/production/fc47d9997e4ef5e56da5d58fd27495e6ae72b7f9-2048x1366.jpg?w=1200` (200 OK).
- Resize/compress to ~1200px wide JPEG to keep page weight down.
- `src/pages/SpaceDetail.tsx` (~line 206): mirror the `imageError` fallback pattern from
  `ListingCard.tsx`; add `loading="lazy"` and keep descriptive `alt` text.
- `src/data/listings.js` is stale seed data; live pages read from Supabase, so no change
  needed there unless we want it kept in sync.

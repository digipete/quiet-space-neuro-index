DROP POLICY IF EXISTS "Anyone can record a site event" ON public.site_events;
CREATE POLICY "Anyone can record a site event" ON public.site_events FOR INSERT TO anon, authenticated WITH CHECK (
  (event_type = ANY (ARRAY['page_view','assessment_completed','assessment_shared','space_submitted','space_claimed','contact_submitted','listing_cta_clicked','image_failed']))
  AND (section = ANY (ARRAY['guide','assessment','listing','other']))
  AND (char_length(path) BETWEEN 1 AND 300)
  AND (char_length(referrer_source) BETWEEN 1 AND 100)
  AND (COALESCE(char_length(utm_source),0) <= 100) AND (COALESCE(char_length(utm_medium),0) <= 100) AND (COALESCE(char_length(utm_campaign),0) <= 100));
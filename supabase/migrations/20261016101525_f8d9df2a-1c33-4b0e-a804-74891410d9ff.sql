CREATE TABLE public.site_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  path text NOT NULL,
  section text NOT NULL,
  referrer_source text NOT NULL DEFAULT 'direct',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.site_events TO anon, authenticated;
GRANT SELECT ON public.site_events TO authenticated;
GRANT ALL ON public.site_events TO service_role;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a site event" ON public.site_events FOR INSERT TO anon, authenticated
WITH CHECK (
  event_type IN ('page_view','assessment_completed','assessment_shared','space_submitted','space_claimed','contact_submitted','listing_cta_clicked')
  AND section IN ('guide','assessment','listing','other')
  AND char_length(path) BETWEEN 1 AND 300
  AND char_length(referrer_source) BETWEEN 1 AND 100
  AND coalesce(char_length(utm_source),0) <= 100
  AND coalesce(char_length(utm_medium),0) <= 100
  AND coalesce(char_length(utm_campaign),0) <= 100
);
CREATE POLICY "Admins can view site events" ON public.site_events FOR SELECT TO authenticated USING (public.is_admin());
CREATE INDEX site_events_created_at_idx ON public.site_events (created_at DESC);
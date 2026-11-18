CREATE TABLE public.search_console_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL UNIQUE,
  clicks integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  ctr numeric NOT NULL DEFAULT 0,
  position numeric NOT NULL DEFAULT 0,
  top_queries jsonb NOT NULL DEFAULT '[]'::jsonb,
  top_pages jsonb NOT NULL DEFAULT '[]'::jsonb,
  index_status jsonb NOT NULL DEFAULT '[]'::jsonb,
  sitemap_status jsonb NOT NULL DEFAULT '{}'::jsonb,
  alerts jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.search_console_snapshots TO authenticated;
GRANT ALL ON public.search_console_snapshots TO service_role;
ALTER TABLE public.search_console_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view search snapshots" ON public.search_console_snapshots FOR SELECT TO authenticated USING (public.is_admin());
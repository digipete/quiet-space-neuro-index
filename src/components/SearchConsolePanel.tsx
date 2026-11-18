import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

type Row = { key: string; clicks: number; impressions: number; position: number };
type Snap = {
  week_start: string; clicks: number; impressions: number; position: number;
  top_queries: Row[]; top_pages: Row[]; alerts: string[];
  index_status: { url: string; indexed: boolean; coverage: string }[];
  sitemap_status: { lastSubmitted?: string; isPending?: boolean; errors?: string };
};

const SearchConsolePanel = () => {
  const [snaps, setSnaps] = useState<Snap[] | null>(null);
  useEffect(() => {
    (supabase.from('search_console_snapshots' as never) as any)
      .select('*').order('week_start', { ascending: false }).limit(12)
      .then(({ data }: { data: Snap[] | null }) => setSnaps(data ?? []));
  }, []);

  if (!snaps) return null;
  if (!snaps.length) return (
    <Card className="mb-6"><CardHeader><CardTitle>Google search</CardTitle>
      <CardDescription>The first weekly report appears here after the Monday job runs.</CardDescription></CardHeader></Card>
  );
  const [w, prev] = snaps;
  const delta = prev ? w.impressions - prev.impressions : 0;
  const path = (u: string) => u.replace(/^https?:\/\/[^/]+/, '') || '/';
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Google search</CardTitle>
        <CardDescription>Week starting {w.week_start} · updated every Monday</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {w.alerts.length > 0 && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
            {w.alerts.map((a) => <p key={a}>{a}</p>)}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><p className="text-muted-foreground">Clicks</p><p className="text-2xl font-semibold">{w.clicks}</p></div>
          <div><p className="text-muted-foreground">Impressions</p><p className="text-2xl font-semibold">{w.impressions}</p>
            {prev && <p className="text-xs text-muted-foreground">{delta >= 0 ? '+' : ''}{delta} vs previous week</p>}</div>
          <div><p className="text-muted-foreground">Avg position</p><p className="text-2xl font-semibold">{Number(w.position).toFixed(1)}</p></div>
          <div><p className="text-muted-foreground">Key pages in Google</p><p className="text-2xl font-semibold">{w.index_status.filter((p) => p.indexed).length}/{w.index_status.length}</p></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div><p className="font-medium mb-2">Top searches</p>
            <table className="w-full"><tbody>{w.top_queries.map((q) => <tr key={q.key} className="border-t border-border"><td className="py-1.5">{q.key}</td><td className="text-right">{q.impressions}</td></tr>)}</tbody></table></div>
          <div><p className="font-medium mb-2">Key pages</p>
            <table className="w-full"><tbody>{w.index_status.map((p) => <tr key={p.url} className="border-t border-border"><td className="py-1.5 truncate max-w-[12rem]">{path(p.url)}</td><td className={`text-right ${p.indexed ? 'text-primary' : 'text-muted-foreground'}`}>{p.indexed ? 'In Google' : p.coverage}</td></tr>)}</tbody></table></div>
        </div>
        <p className="text-xs text-muted-foreground">Sitemap last sent {w.sitemap_status.lastSubmitted?.slice(0, 10) ?? '—'}{w.sitemap_status.isPending ? ' · waiting for Google' : ''} · errors {w.sitemap_status.errors ?? 0}</p>
      </CardContent>
    </Card>
  );
};
export default SearchConsolePanel;

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

type Ev = { event_type: string; path: string; section: string; referrer_source: string; utm_campaign: string | null; created_at: string };

const SECTIONS = [
  { key: 'guide', label: 'Guides & articles' },
  { key: 'assessment', label: 'Self-assessment tool' },
  { key: 'listing', label: 'NeuroIndex listings' },
];
const CONVERSIONS: Record<string, string> = {
  assessment_completed: 'Assessment completed',
  assessment_shared: 'Assessment result shared',
  listing_cta_clicked: 'Clicked to list or find a space',
  space_submitted: 'Space submitted',
  space_claimed: 'Listing claimed',
  contact_submitted: 'Contact form sent',
};
const RANGES = [7, 30, 90];

function countBy<T>(rows: T[], key: (r: T) => string) {
  const m = new Map<string, number>();
  rows.forEach((r) => m.set(key(r), (m.get(key(r)) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState(30);
  const [rows, setRows] = useState<Ev[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return navigate('/admin/auth');
      const { data: isAdmin } = await supabase.rpc('is_admin');
      if (!isAdmin) return navigate('/admin/auth');
      setRows(null);
      const since = new Date(Date.now() - days * 86400000).toISOString();
      const all: Ev[] = [];
      for (let from = 0; ; from += 1000) {
        const { data, error } = await supabase.from('site_events')
          .select('event_type,path,section,referrer_source,utm_campaign,created_at')
          .gte('created_at', since).order('created_at', { ascending: false }).range(from, from + 999);
        if (error) { setError(error.message); return; }
        all.push(...(data as Ev[]));
        if (!data || data.length < 1000) break;
      }
      setRows(all);
    })();
  }, [days, navigate]);

  const stats = useMemo(() => {
    if (!rows) return null;
    const views = rows.filter((r) => r.event_type === 'page_view');
    const conv = rows.filter((r) => r.event_type !== 'page_view');
    const daily = new Map<string, { day: string; visits: number; conversions: number }>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
      daily.set(d, { day: d.slice(5), visits: 0, conversions: 0 });
    }
    rows.forEach((r) => { const d = daily.get(r.created_at.slice(0, 10)); if (d) r.event_type === 'page_view' ? d.visits++ : d.conversions++; });
    const sourceConv = new Map(countBy(conv, (r) => r.referrer_source));
    return {
      views, conv,
      daily: [...daily.values()],
      bySection: SECTIONS.map((s) => ({ ...s, visits: views.filter((v) => v.section === s.key).length, conversions: conv.filter((c) => c.section === s.key).length })),
      sources: countBy(views, (r) => r.referrer_source).slice(0, 12).map(([name, n]) => ({ name, n, c: sourceConv.get(name) ?? 0 })),
      pages: countBy(views.filter((v) => v.section !== 'other'), (r) => r.path).slice(0, 15),
      conversions: Object.entries(CONVERSIONS).map(([k, label]) => ({ label, n: conv.filter((c) => c.event_type === k).length })),
      campaigns: countBy(rows.filter((r) => r.utm_campaign), (r) => r.utm_campaign!).slice(0, 10),
    };
  }, [rows, days]);

  const pct = (c: number, v: number) => (v ? `${((c / v) * 100).toFixed(1)}%` : '–');

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Visitor analytics | Admin</title><meta name="robots" content="noindex" /></Helmet>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Visitor analytics</h1>
            <p className="text-sm text-muted-foreground">Guides, self-assessment and NeuroIndex listings. No cookies or personal data collected.</p>
          </div>
          <div className="flex gap-2">
            {RANGES.map((r) => <Button key={r} size="sm" variant={r === days ? 'default' : 'outline'} onClick={() => setDays(r)}>{r} days</Button>)}
            <Button size="sm" variant="ghost" asChild><Link to="/admin/dashboard">Back to admin</Link></Button>
          </div>
        </div>

        {error && <p className="text-destructive">Could not load analytics: {error}</p>}
        {!stats && !error && <p className="text-muted-foreground">Loading…</p>}
        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card><CardHeader className="pb-2"><CardDescription>Page visits</CardDescription><CardTitle className="text-3xl">{stats.views.length}</CardTitle></CardHeader></Card>
              <Card><CardHeader className="pb-2"><CardDescription>Conversions</CardDescription><CardTitle className="text-3xl">{stats.conv.length}</CardTitle></CardHeader></Card>
              <Card><CardHeader className="pb-2"><CardDescription>Conversion rate</CardDescription><CardTitle className="text-3xl">{pct(stats.conv.length, stats.views.length)}</CardTitle></CardHeader></Card>
              <Card><CardHeader className="pb-2"><CardDescription>Top source</CardDescription><CardTitle className="text-3xl truncate">{stats.sources[0]?.name ?? '–'}</CardTitle></CardHeader></Card>
            </div>

            <Card>
              <CardHeader><CardTitle>Daily visits and conversions</CardTitle></CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.daily}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="visits" name="Visits" fill="hsl(var(--primary))" />
                    <Bar dataKey="conversions" name="Conversions" fill="hsl(var(--accent-foreground))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              {stats.bySection.map((s) => (
                <Card key={s.key}>
                  <CardHeader className="pb-2"><CardDescription>{s.label}</CardDescription><CardTitle>{s.visits} visits</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{s.conversions} conversions · {pct(s.conversions, s.visits)}</CardContent>
                </Card>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader><CardTitle>Referral sources</CardTitle><CardDescription>Where visitors arrived from</CardDescription></CardHeader>
                <CardContent>
                  <table className="w-full text-sm"><thead className="text-muted-foreground"><tr><th className="text-left py-1">Source</th><th className="text-right">Visits</th><th className="text-right">Conversions</th></tr></thead>
                    <tbody>{stats.sources.map((s) => <tr key={s.name} className="border-t border-border"><td className="py-2">{s.name}</td><td className="text-right">{s.n}</td><td className="text-right">{s.c}</td></tr>)}</tbody></table>
                  {!stats.sources.length && <p className="text-muted-foreground text-sm">No visits yet.</p>}
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Conversions</CardTitle><CardDescription>Actions that matter</CardDescription></CardHeader>
                <CardContent>
                  <table className="w-full text-sm"><tbody>{stats.conversions.map((c) => <tr key={c.label} className="border-t border-border"><td className="py-2">{c.label}</td><td className="text-right font-semibold">{c.n}</td></tr>)}</tbody></table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Top pages</CardTitle></CardHeader>
                <CardContent>
                  <table className="w-full text-sm"><tbody>{stats.pages.map(([p, n]) => <tr key={p} className="border-t border-border"><td className="py-2 truncate max-w-xs">{p}</td><td className="text-right">{n}</td></tr>)}</tbody></table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Campaigns</CardTitle><CardDescription>Links tagged with utm_campaign</CardDescription></CardHeader>
                <CardContent>
                  {stats.campaigns.length ? <table className="w-full text-sm"><tbody>{stats.campaigns.map(([p, n]) => <tr key={p} className="border-t border-border"><td className="py-2">{p}</td><td className="text-right">{n}</td></tr>)}</tbody></table>
                    : <p className="text-sm text-muted-foreground">Add ?utm_source=linkedin&utm_campaign=name to links you share to see them here.</p>}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Sparkles, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Rec = { id: string; title: string; location: string; neuro_score: number; reason: string };

const examples = [
  "I'm sensitive to noise and bright lights, and I focus best in the mornings in a quiet room near central London.",
  "I have ADHD and need somewhere with movement breaks, a bit of background buzz, and flexible booking.",
];

export default function FindMySpace() {
  const [needs, setNeeds] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recs, setRecs] = useState<Rec[] | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(null); setRecs(null);
    const { data, error } = await supabase.functions.invoke("recommend-spaces", { body: { needs } });
    setLoading(false);
    if (error || data?.error) {
      let msg = data?.error as string | undefined;
      try { msg = msg ?? (await (error as any)?.context?.json())?.error; } catch { /* ignore */ }
      setError(msg ?? "Sorry, we couldn't get recommendations just now. Please try again.");
      return;
    }
    setRecs(data.recommendations ?? []);
  }

  return (
    <main className="container mx-auto max-w-3xl px-4 py-12">
      <Helmet>
        <title>Find My Space: Personalised Quiet Workspace Matches | NeuroIndex</title>
        <meta name="description" content="Describe your sensory needs and how you like to work, and get matched with neuro-friendly workspaces from the NeuroIndex directory." />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold mb-3">Find a space that suits how you work</h1>
      <p className="text-muted-foreground mb-8">
        Tell us about your sensory needs and work preferences. We'll suggest the best matches from our listed spaces.
        What you type is only used to make suggestions and is not saved.
      </p>

      <form onSubmit={submit} className="space-y-4">
        <Label htmlFor="needs">Your needs and preferences</Label>
        <Textarea id="needs" rows={6} maxLength={1500} value={needs}
          onChange={(e) => setNeeds(e.target.value)}
          placeholder="For example: noise, lighting, crowds, time of day, location, budget…" />
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <Button key={ex} type="button" variant="outline" size="sm" className="h-auto whitespace-normal text-left"
              onClick={() => setNeeds(ex)}>{ex}</Button>
          ))}
        </div>
        <Button type="submit" disabled={loading || needs.trim().length < 10}>
          <Sparkles className="mr-2 h-4 w-4" />{loading ? "Finding matches…" : "Recommend spaces"}
        </Button>
      </form>

      <section aria-live="polite" className="mt-10 space-y-4">
        {error && <p className="text-destructive">{error}</p>}
        {recs && recs.length === 0 && (
          <p className="text-muted-foreground">No close matches yet. <Link className="underline" to="/spaces/">Browse all spaces</Link>.</p>
        )}
        {recs?.map((r, i) => (
          <Card key={r.id}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Match {i + 1} · Neuro Score {r.neuro_score}</p>
              <h2 className="text-xl font-semibold mt-1">{r.title}</h2>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1"><MapPin className="h-4 w-4" />{r.location}</p>
              <p className="mt-3">{r.reason}</p>
              <Button asChild variant="link" className="px-0 mt-2"><Link to={`/space/${r.id}/`}>View this space</Link></Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

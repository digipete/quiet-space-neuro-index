import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';

type Q = { area: string; text: string };

const QUESTIONS: Q[] = [
  { area: 'Noise', text: 'There is an enclosed room anyone can book for focused work, without giving a reason.' },
  { area: 'Noise', text: 'Desks are placed away from kitchens, printers and main walkways.' },
  { area: 'Noise', text: 'Calls happen in booths or rooms, not at desks.' },
  { area: 'Noise', text: 'Hard surfaces are softened with carpet, acoustic panels or soft furnishings.' },
  { area: 'Lighting', text: 'No lights flicker or hum.' },
  { area: 'Lighting', text: 'People can dim or switch off the light at their own desk.' },
  { area: 'Lighting', text: 'There is natural light, with blinds to control glare.' },
  { area: 'Smell & temperature', text: 'Food is eaten away from desks and cleaning products are low-scent.' },
  { area: 'Smell & temperature', text: 'People can move to a cooler or warmer spot.' },
  { area: 'Space', text: 'People can keep a consistent desk if hot-desking is difficult for them.' },
  { area: 'Space', text: 'There is a quiet recovery room that is not also used for meetings.' },
  { area: 'Predictability', text: 'Office changes and busy days are announced in advance.' },
  { area: 'Predictability', text: 'There is one named person to raise environmental issues with.' },
  { area: 'Predictability', text: 'New starters and visitors get a map, photos or virtual tour beforehand.' },
];

const OPTIONS = [
  { label: 'Yes', score: 2 },
  { label: 'Partly', score: 1 },
  { label: 'No', score: 0 },
];

const MAX = QUESTIONS.length * 2;

function band(pct: number) {
  if (pct >= 80) return { name: 'Strong', text: 'Your space already supports most neurodivergent people well. Publish it — candidates, staff and visitors look for this. Workspace providers can list for free and apply for NeuroFlow certification.' };
  if (pct >= 50) return { name: 'Workable, with gaps', text: 'The basics are partly there. Fix noise and a bookable quiet room first — they make the biggest difference for the least money.' };
  return { name: 'Likely to exclude people', text: 'Some people will struggle to work well here. Start with a quiet, bookable room and clear lighting control, and consider assessed external space as a reasonable adjustment in the meantime.' };
}

const SensorySelfAssessment = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);
  const answered = Object.keys(answers).length;

  const result = useMemo(() => {
    const total = Object.values(answers).reduce((a, b) => a + b, 0);
    const pct = Math.round((total / MAX) * 100);
    const areas: Record<string, { got: number; max: number }> = {};
    QUESTIONS.forEach((q, i) => {
      areas[q.area] ??= { got: 0, max: 0 };
      areas[q.area].got += answers[i] ?? 0;
      areas[q.area].max += 2;
    });
    return { pct, areas };
  }, [answers]);

  const b = band(result.pct);
  const shareText = `Our workspace scored ${result.pct}/100 on the NeuroIndex sensory self-assessment. Try it: https://index.quietspace.club/tools/sensory-self-assessment/`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Free Workspace Sensory Self-Assessment"
        description="Score your office or coworking space on noise, lighting, smell, space and predictability in two minutes. Free, no sign-up — get a result and a prioritised list of fixes."
        keywords="sensory self-assessment, workspace sensory assessment, office sensory audit tool, neuro-inclusive workplace score, sensory friendly office checklist"
        url="https://index.quietspace.club/tools/sensory-self-assessment/"
      />
      <div className="container mx-auto px-4 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">Free tool</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Workspace Sensory Self-Assessment</h1>
          <p className="text-lg text-foreground/85 leading-relaxed mb-10">
            Fourteen questions, about two minutes. Answer for the space you manage or work in and get a score out of 100
            with the areas to fix first. Nothing is stored or sent anywhere. Based on our{' '}
            <Link to="/blog/office-sensory-audit-checklist/" className="text-primary underline underline-offset-2">office sensory audit checklist</Link>.
          </p>

          {!done ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="space-y-5"
            >
              {QUESTIONS.map((q, i) => (
                <fieldset key={i} className="rounded-lg border border-border p-5 bg-card">
                  <legend className="sr-only">{q.text}</legend>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">{q.area}</p>
                  <p className="text-foreground font-medium mb-4">{i + 1}. {q.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {OPTIONS.map((o) => (
                      <label
                        key={o.label}
                        className={`cursor-pointer rounded-md border px-4 py-2 text-sm transition-colors ${
                          answers[i] === o.score ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`q${i}`}
                          className="sr-only"
                          checked={answers[i] === o.score}
                          onChange={() => setAnswers({ ...answers, [i]: o.score })}
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <div className="flex items-center gap-4 pt-2">
                <Button type="submit" size="lg" disabled={answered < QUESTIONS.length}>See my score</Button>
                <span className="text-sm text-muted-foreground">{answered} of {QUESTIONS.length} answered</span>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="rounded-xl border border-border bg-card p-8">
                <p className="text-sm text-muted-foreground mb-1">Your score</p>
                <p className="text-5xl font-bold text-primary mb-2">{result.pct}<span className="text-2xl text-muted-foreground">/100</span></p>
                <h2 className="text-2xl font-bold text-foreground mb-3">{b.name}</h2>
                <p className="text-foreground/85 leading-relaxed">{b.text}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">By area</h2>
                <div className="space-y-3">
                  {Object.entries(result.areas).map(([area, v]) => {
                    const p = Math.round((v.got / v.max) * 100);
                    return (
                      <div key={area}>
                        <div className="flex justify-between text-sm mb-1"><span className="text-foreground">{area}</span><span className="text-muted-foreground">{p}%</span></div>
                        <div className="h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${p}%` }} /></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button onClick={() => navigator.clipboard?.writeText(shareText)}>Copy result to share</Button>
                <Button variant="outline" asChild><Link to="/workspace-providers/">List your space free</Link></Button>
                <Button variant="outline" asChild><Link to="/spaces/">Find an assessed space</Link></Button>
                <Button variant="ghost" onClick={() => { setAnswers({}); setDone(false); }}>Start again</Button>
              </div>
            </div>
          )}

          <section className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">About this assessment</h2>
            <p className="text-foreground/85 leading-relaxed">
              This is a quick self-check, not a certification. The full NeuroFlow assessment measures noise, lighting and
              sensory load on site against a consistent standard, and certified spaces carry a Neuro Index score on this
              directory. See <Link to="/how-it-works/" className="text-primary underline underline-offset-2">how the scoring works</Link>.
            </p>
            <h3 className="text-lg font-semibold text-foreground">Who is it for?</h3>
            <p className="text-foreground/85 leading-relaxed">
              Office and facilities managers, HR and inclusion leads, and coworking operators who want a fast read on how
              neuro-inclusive their space is. See our guides for <Link to="/for/hr-teams/" className="text-primary underline underline-offset-2">HR teams</Link> and{' '}
              <Link to="/for/managers/" className="text-primary underline underline-offset-2">managers</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SensorySelfAssessment;

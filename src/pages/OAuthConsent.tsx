import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: any; error: { message: string } | null }>;
};
const oauth = () => (supabase.auth as unknown as { oauth: OAuthApi }).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSignedIn(!!s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;
    if (!authorizationId) { setError("This link is missing its authorization request."); return; }
    if (!signedIn) return;
    (async () => {
      try {
        const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) return setError(error.message);
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) { window.location.href = immediate; return; }
        setDetails(data);
      } catch {
        if (active) setError("The authorization request could not be loaded. It may have expired.");
      }
    })();
    return () => { active = false; };
  }, [authorizationId, signedIn]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
  }

  async function decide(approve: boolean) {
    setBusy(true);
    try {
      const { data, error } = approve
        ? await oauth().approveAuthorization(authorizationId)
        : await oauth().denyAuthorization(authorizationId);
      if (error) { setBusy(false); return setError(error.message); }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) { setBusy(false); return setError("No redirect was returned."); }
      window.location.href = target;
    } catch {
      setBusy(false);
      setError("Something went wrong. Please try again.");
    }
  }

  let body: React.ReactNode;
  if (error) body = <p className="text-destructive">Could not complete this request: {error}</p>;
  else if (signedIn === null) body = <p className="text-muted-foreground">Loading…</p>;
  else if (!signedIn) body = (
    <form onSubmit={signIn} className="space-y-4">
      <div className="space-y-2"><Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <Button type="submit" disabled={busy} className="w-full">Sign in to continue</Button>
    </form>
  );
  else if (!details) body = <p className="text-muted-foreground">Loading…</p>;
  else body = (
    <div className="space-y-4">
      <p>{details.client?.name ?? "This app"} wants to use NeuroIndex as you.</p>
      <div className="flex gap-3">
        <Button disabled={busy} onClick={() => decide(true)}>Approve</Button>
        <Button variant="outline" disabled={busy} onClick={() => decide(false)}>Deny</Button>
      </div>
    </div>
  );

  return (
    <main className="container mx-auto max-w-md py-16 px-4">
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <Card>
        <CardHeader>
          <CardTitle>Connect an app to NeuroIndex</CardTitle>
          <CardDescription>Approve access for an AI assistant.</CardDescription>
        </CardHeader>
        <CardContent>{body}</CardContent>
      </Card>
    </main>
  );
}

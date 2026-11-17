import { createClient } from "@supabase/supabase-js";

type TokenContext = { getToken: () => string | undefined | null };

export function supabaseForUser(ctx: TokenContext) {
  const token = ctx.getToken();
  if (!token) throw new Error("supabaseForUser requires a verified OAuth token");
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase URL or key is not configured in the MCP environment.");
  return createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

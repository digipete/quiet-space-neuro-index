import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchSpacesTool from "./tools/search-spaces";
import getSpaceDetailsTool from "./tools/get-space-details";

// Vite inlines the stable ref; the published SUPABASE_URL may be a proxy.
const projectRef = import.meta.env["VITE_SUPABASE_PROJECT_ID"] ?? "project-ref-unset";

export default defineMcp({
  name: "neuroindex",
  title: "NeuroIndex Directory",
  version: "1.1.0",
  instructions:
    "Read-only tools for the NeuroIndex directory of neuro-friendly workspaces, coworking spaces, and meeting rooms. Callers sign in with OAuth. Use `search_spaces` to discover spaces and `get_space_details` to retrieve the full profile for a specific listing.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchSpacesTool, getSpaceDetailsTool],
});

import { defineTool } from "@lovable.dev/mcp-js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

function createPublicSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase URL or key is not configured in the MCP environment.");
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export default defineTool({
  name: "search_spaces",
  title: "Search neuro-friendly workspaces",
  description:
    "Search the NeuroIndex directory of neuro-friendly workspaces, coworking spaces, and meeting rooms. Supports filtering by location, certification, minimum neuro score, and free-text search over titles, descriptions, locations, and amenities.",
  inputSchema: {
    query: z.string().optional().describe("Free-text search across title, description, location, and amenities."),
    location: z.string().optional().describe("Filter by country/region (e.g. 'UK', 'United States')."),
    certification: z.enum(["all", "Certified", "Self-Reported", "Partner", "Pending"]).optional().describe("Certification filter."),
    minNeuroScore: z.number().min(0).max(10).optional().describe("Minimum neuro-inclusivity score."),
    limit: z.number().min(1).max(50).default(20).describe("Maximum number of results to return (1-50)."),
    offset: z.number().min(0).default(0).describe("Pagination offset."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, location, certification, minNeuroScore, limit, offset }) => {
    const supabase = createPublicSupabase();

    let builder = supabase.from("listings").select("*", { count: "exact" });

    if (certification && certification !== "all") {
      builder = builder.eq("certification", certification);
    }

    if (typeof minNeuroScore === "number") {
      builder = builder.gte("neuro_score", minNeuroScore);
    }

    if (location?.trim()) {
      builder = builder.ilike("location", `%${location.trim()}%`);
    }

    if (query?.trim()) {
      const term = query.trim().toLowerCase();
      builder = builder.or(`title.ilike.%${term}%,description.ilike.%${term}%,location.ilike.%${term}%`);
    }

    const { data, error, count } = await builder
      .order("neuro_score", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }

    const spaces = (data || []).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      location: item.location,
      neuro_score: item.neuro_score,
      user_rating: item.user_rating,
      certification: item.certification,
      price: item.price,
      capacity: item.capacity,
      image_url: item.image_url,
      amenities: Array.isArray(item.amenities) ? item.amenities : [],
    }));

    return {
      content: [
        {
          type: "text",
          text: `Found ${count ?? spaces.length} space(s). Showing ${spaces.length} result(s) starting at offset ${offset}.`,
        },
        {
          type: "text",
          text: JSON.stringify({ total: count ?? spaces.length, offset, limit, spaces }, null, 2),
        },
      ],
    };
  },
});

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
  name: "get_space_details",
  title: "Get workspace details",
  description:
    "Return the full neuro-accessibility profile for a single workspace by its ID, including amenities, sensory features, pricing, capacity, hours, certification, and community rating.",
  inputSchema: {
    id: z.string().uuid().describe("The UUID of the workspace listing."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id }) => {
    const supabase = createPublicSupabase();

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return { content: [{ type: "text", text: `Database error: ${error.message}` }], isError: true };
    }

    if (!data) {
      return { content: [{ type: "text", text: `Workspace ${id} not found.` }], isError: true };
    }

    const space = {
      id: data.id,
      title: data.title,
      description: data.description,
      full_description: data.full_description,
      location: data.location,
      neuro_score: data.neuro_score,
      user_rating: data.user_rating,
      certification: data.certification,
      price: data.price,
      capacity: data.capacity,
      hours_of_operation: data.hours_of_operation,
      image_url: data.image_url,
      amenities: Array.isArray(data.amenities) ? data.amenities : [],
    };

    return {
      content: [
        {
          type: "text",
          text: `${space.title} — ${space.location} (Neuro Score: ${space.neuro_score}, Rating: ${space.user_rating}/5)`,
        },
        { type: "text", text: JSON.stringify(space, null, 2) },
      ],
    };
  },
});

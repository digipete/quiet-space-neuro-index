import { defineMcp } from "@lovable.dev/mcp-js";
import searchSpacesTool from "./tools/search-spaces";
import getSpaceDetailsTool from "./tools/get-space-details";

export default defineMcp({
  name: "neuroindex",
  title: "NeuroIndex Directory",
  version: "1.0.0",
  instructions:
    "Public read-only tools for the NeuroIndex directory of neuro-friendly workspaces, coworking spaces, and meeting rooms. Use `search_spaces` to discover spaces and `get_space_details` to retrieve the full profile for a specific listing.",
  tools: [searchSpacesTool, getSpaceDetailsTool],
});

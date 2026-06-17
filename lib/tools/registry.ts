export type ToolStatus = "live" | "coming-soon";

export interface ToolSummary {
  id: string;
  name: string;
  description: string;
  status: ToolStatus;
  href?: string;
}

export const toolRegistry = [
  {
    id: "tiktok-comment",
    name: "TikTok Comment",
    description: "TikTok comment generator for grouped replies, tone control, and video context.",
    status: "live",
    href: "/tools/tiktok-comment",
  },
  {
    id: "sequence-generator",
    name: "Sequence Generator",
    description:
      "Math sequence generator for arithmetic, geometric, Fibonacci, random, and formula-based sequences.",
    status: "live",
    href: "/tools/sequence-generator",
  },
  {
    id: "bible-verse",
    name: "Bible Verse",
    description:
      "Random Bible verse generator filtering by Old/New Testament and categories like Comfort, Faith, and Wisdom.",
    status: "live",
    href: "/tools/bible-verse",
  },
  {
    id: "more-generators",
    name: "More generators",
    description: "Additional generators are coming soon.",
    status: "coming-soon",
  },
] as const satisfies readonly ToolSummary[];

export const liveTools = toolRegistry.filter((tool) => tool.status === "live");

export function getToolById<T extends (typeof toolRegistry)[number]["id"]>(id: T) {
  return toolRegistry.find(
    (tool): tool is Extract<(typeof toolRegistry)[number], { id: T }> => tool.id === id,
  );
}

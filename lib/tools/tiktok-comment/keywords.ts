import { MAX_KEYWORDS } from "./constants";

export function parseKeywordsInput(value: string): string[] {
  const seen = new Set<string>();
  const keywords: string[] = [];

  for (const token of value.split(/[,;\n]+/)) {
    const cleaned = token.replace(/^#+/, "").replace(/\s+/g, " ").trim();

    if (!cleaned) {
      continue;
    }

    const normalized = cleaned.toLowerCase();

    if (seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    keywords.push(cleaned);

    if (keywords.length >= MAX_KEYWORDS) {
      break;
    }
  }

  return keywords;
}

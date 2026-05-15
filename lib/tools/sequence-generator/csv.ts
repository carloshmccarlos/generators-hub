import type { SequenceEntry } from "./types";

export function buildSequenceCsv(entries: SequenceEntry[]) {
  return ["n,value", ...entries.map((entry) => `${entry.n},${entry.value}`)].join("\n");
}

export function buildSequenceClipboardText(values: number[]) {
  return values.join(", ");
}

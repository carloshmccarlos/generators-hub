export type SequenceMode = "arithmetic" | "geometric" | "fibonacci" | "random" | "formula";

export interface SequenceDraft {
  mode: SequenceMode;
  arithmeticFirst: string;
  arithmeticDifference: string;
  arithmeticTerms: string;
  geometricFirst: string;
  geometricRatio: string;
  geometricTerms: string;
  fibonacciTerms: string;
  randomMin: string;
  randomMax: string;
  randomCount: string;
  randomAllowDuplicates: boolean;
  formulaExpression: string;
  formulaStartIndex: string;
  formulaTerms: string;
}

export interface SequenceModeOption {
  id: SequenceMode;
  label: string;
  description: string;
}

export interface SequenceEntry {
  n: number;
  value: number;
}

export interface SequenceSummary {
  count: number;
  first: number;
  last: number;
  min: number;
  max: number;
}

export interface SequencePoint {
  x: number;
  y: number;
  n: number;
  value: number;
}

export interface SequenceResult {
  mode: SequenceMode;
  entries: SequenceEntry[];
  values: number[];
  summary: SequenceSummary;
  chartPoints: SequencePoint[];
  chartPath: string | null;
  chartMessage: string | null;
  csv: string;
}

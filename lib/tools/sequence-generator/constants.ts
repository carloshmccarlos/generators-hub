import type { SequenceDraft, SequenceModeOption } from "./types";

export const SEQUENCE_DRAFT_STORAGE_KEY = "generator-hub:sequence-generator:draft";

export const SEQUENCE_COUNT_LIMITS = {
  min: 1,
  max: 200,
} as const;

export const MAX_SEQUENCE_ABS_VALUE = 1e12;

export const CHART_SIZE = {
  width: 720,
  height: 220,
  paddingX: 24,
  paddingY: 20,
} as const;

export const FORMULA_FUNCTION_NAMES = ["abs", "sqrt", "floor", "ceil", "round"] as const;

export const SEQUENCE_MODE_OPTIONS = [
  {
    id: "arithmetic",
    label: "Arithmetic",
    description: "First term, difference, count.",
  },
  {
    id: "geometric",
    label: "Geometric",
    description: "First term, ratio, count.",
  },
  {
    id: "fibonacci",
    label: "Fibonacci",
    description: "Classic 0, 1 seed.",
  },
  {
    id: "random",
    label: "Random",
    description: "Integer range and count.",
  },
  {
    id: "formula",
    label: "Formula",
    description: "Expression with n.",
  },
] as const satisfies readonly SequenceModeOption[];

export const DEFAULT_SEQUENCE_DRAFT: SequenceDraft = {
  mode: "arithmetic",
  arithmeticFirst: "5",
  arithmeticDifference: "3",
  arithmeticTerms: "10",
  geometricFirst: "2",
  geometricRatio: "2",
  geometricTerms: "8",
  fibonacciTerms: "10",
  randomMin: "1",
  randomMax: "100",
  randomCount: "12",
  randomAllowDuplicates: false,
  formulaExpression: "2 * n ^ 2 + 1",
  formulaStartIndex: "1",
  formulaTerms: "8",
};

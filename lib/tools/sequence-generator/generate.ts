import { buildSequenceChart } from "./chart";
import { MAX_SEQUENCE_ABS_VALUE, SEQUENCE_COUNT_LIMITS } from "./constants";
import { buildSequenceCsv } from "./csv";
import { compileFormulaExpression } from "./formula";
import type { SequenceDraft, SequenceEntry, SequenceMode, SequenceResult } from "./types";

function parseRequiredNumber(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label} is required.`);
  }

  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${label} must be a finite number.`);
  }

  return parsed;
}

function parseInteger(value: string, label: string) {
  const parsed = parseRequiredNumber(value, label);
  if (!Number.isInteger(parsed)) {
    throw new Error(`${label} must be an integer.`);
  }

  if (!Number.isSafeInteger(parsed)) {
    throw new Error(`${label} is too large.`);
  }

  return parsed;
}

function parseCount(value: string, label: string) {
  const parsed = parseInteger(value, label);

  if (parsed < SEQUENCE_COUNT_LIMITS.min || parsed > SEQUENCE_COUNT_LIMITS.max) {
    throw new Error(
      `${label} must be between ${SEQUENCE_COUNT_LIMITS.min} and ${SEQUENCE_COUNT_LIMITS.max}.`,
    );
  }

  return parsed;
}

function assertValidValue(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    throw new Error("Sequence produced a non-finite value.");
  }

  if (Math.abs(value) > MAX_SEQUENCE_ABS_VALUE) {
    throw new Error("Sequence values must stay within +/-1e12.");
  }
}

function finalizeResult(mode: SequenceMode, entries: SequenceEntry[]): SequenceResult {
  for (const entry of entries) {
    assertValidValue(entry.value);
  }

  const values = entries.map((entry) => entry.value);
  const summary = {
    count: values.length,
    first: values[0] ?? 0,
    last: values[values.length - 1] ?? 0,
    min: Math.min(...values),
    max: Math.max(...values),
  };
  const chart = buildSequenceChart(entries);

  return {
    mode,
    entries,
    values,
    summary,
    chartPoints: chart.points,
    chartPath: chart.path,
    chartMessage: chart.message,
    csv: buildSequenceCsv(entries),
  };
}

function generateArithmetic(draft: SequenceDraft) {
  const first = parseRequiredNumber(draft.arithmeticFirst, "First term");
  const difference = parseRequiredNumber(draft.arithmeticDifference, "Difference");
  const terms = parseCount(draft.arithmeticTerms, "Terms");

  const entries = Array.from({ length: terms }, (_, index) => ({
    n: index + 1,
    value: first + difference * index,
  }));

  return finalizeResult("arithmetic", entries);
}

function generateGeometric(draft: SequenceDraft) {
  const first = parseRequiredNumber(draft.geometricFirst, "First term");
  const ratio = parseRequiredNumber(draft.geometricRatio, "Ratio");
  const terms = parseCount(draft.geometricTerms, "Terms");

  const entries = Array.from({ length: terms }, (_, index) => ({
    n: index + 1,
    value: first * ratio ** index,
  }));

  return finalizeResult("geometric", entries);
}

function generateFibonacci(draft: SequenceDraft) {
  const terms = parseCount(draft.fibonacciTerms, "Terms");
  const values: number[] = [];

  for (let index = 0; index < terms; index += 1) {
    if (index === 0) {
      values.push(0);
      continue;
    }

    if (index === 1) {
      values.push(1);
      continue;
    }

    values.push(values[index - 1] + values[index - 2]);
  }

  return finalizeResult(
    "fibonacci",
    values.map((value, index) => ({
      n: index + 1,
      value,
    })),
  );
}

function generateRandom(draft: SequenceDraft) {
  const min = parseInteger(draft.randomMin, "Minimum");
  const max = parseInteger(draft.randomMax, "Maximum");
  const count = parseCount(draft.randomCount, "Count");

  if (min > max) {
    throw new Error("Minimum must be less than or equal to maximum.");
  }

  const rangeSize = max - min + 1;
  if (!draft.randomAllowDuplicates && count > rangeSize) {
    throw new Error("Count exceeds the available integer range without duplicates.");
  }

  const values: number[] = [];

  if (draft.randomAllowDuplicates) {
    for (let index = 0; index < count; index += 1) {
      values.push(min + Math.floor(Math.random() * rangeSize));
    }
  } else {
    const picked = new Set<number>();

    while (picked.size < count) {
      picked.add(min + Math.floor(Math.random() * rangeSize));
    }

    values.push(...picked);
  }

  return finalizeResult(
    "random",
    values.map((value, index) => ({
      n: index + 1,
      value,
    })),
  );
}

function generateFormula(draft: SequenceDraft) {
  const terms = parseCount(draft.formulaTerms, "Terms");
  const startIndex = draft.formulaStartIndex.trim()
    ? parseInteger(draft.formulaStartIndex, "Start index")
    : 1;

  if (!Number.isSafeInteger(startIndex + terms - 1)) {
    throw new Error("Start index is too large.");
  }

  const evaluate = compileFormulaExpression(draft.formulaExpression);
  const entries = Array.from({ length: terms }, (_, index) => {
    const n = startIndex + index;
    return {
      n,
      value: evaluate(n),
    };
  });

  return finalizeResult("formula", entries);
}

export function generateSequence(draft: SequenceDraft) {
  switch (draft.mode) {
    case "arithmetic":
      return generateArithmetic(draft);
    case "geometric":
      return generateGeometric(draft);
    case "fibonacci":
      return generateFibonacci(draft);
    case "random":
      return generateRandom(draft);
    case "formula":
      return generateFormula(draft);
    default:
      throw new Error("Unsupported sequence mode.");
  }
}

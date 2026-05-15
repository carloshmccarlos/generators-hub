import { FORMULA_FUNCTION_NAMES } from "./constants";

const INVALID_CHAR_PATTERN = /[^0-9A-Za-z_+\-*/%^().,\s]/;
const IDENTIFIER_PATTERN = /[A-Za-z_]+/g;
const ALLOWED_IDENTIFIERS = new Set<string>(["n", ...FORMULA_FUNCTION_NAMES]);

export function compileFormulaExpression(expression: string) {
  const trimmed = expression.trim();

  if (!trimmed) {
    throw new Error("Enter a formula first.");
  }

  if (INVALID_CHAR_PATTERN.test(trimmed)) {
    throw new Error("Formula contains invalid characters.");
  }

  const identifiers = trimmed.match(IDENTIFIER_PATTERN) ?? [];
  for (const identifier of identifiers) {
    if (!ALLOWED_IDENTIFIERS.has(identifier)) {
      throw new Error(`Unsupported token: ${identifier}.`);
    }
  }

  let source = trimmed.replace(/\^/g, "**");

  for (const name of FORMULA_FUNCTION_NAMES) {
    source = source.replace(new RegExp(`\\b${name}\\b`, "g"), `Math.${name}`);
  }

  let evaluator: (n: number) => unknown;

  try {
    evaluator = new Function("n", `"use strict"; return (${source});`) as (n: number) => unknown;
  } catch {
    throw new Error("Formula is not valid.");
  }

  return (n: number) => {
    let value: unknown;

    try {
      value = evaluator(n);
    } catch {
      throw new Error("Formula could not be evaluated.");
    }

    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error("Formula returned a non-finite value.");
    }

    return value;
  };
}

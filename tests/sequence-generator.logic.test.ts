import { describe, expect, it, vi } from "vitest";

import {
  DEFAULT_SEQUENCE_DRAFT,
  buildSequenceChart,
  buildSequenceCsv,
  compileFormulaExpression,
  generateSequence,
} from "@/lib/tools/sequence-generator";

describe("sequence generator logic", () => {
  it("generates arithmetic sequences", () => {
    const result = generateSequence({
      ...DEFAULT_SEQUENCE_DRAFT,
      mode: "arithmetic",
      arithmeticFirst: "4",
      arithmeticDifference: "2",
      arithmeticTerms: "5",
    });

    expect(result.values).toEqual([4, 6, 8, 10, 12]);
    expect(result.summary.first).toBe(4);
    expect(result.summary.last).toBe(12);
  });

  it("generates geometric sequences", () => {
    const result = generateSequence({
      ...DEFAULT_SEQUENCE_DRAFT,
      mode: "geometric",
      geometricFirst: "3",
      geometricRatio: "2",
      geometricTerms: "4",
    });

    expect(result.values).toEqual([3, 6, 12, 24]);
  });

  it("generates fibonacci sequences", () => {
    const result = generateSequence({
      ...DEFAULT_SEQUENCE_DRAFT,
      mode: "fibonacci",
      fibonacciTerms: "6",
    });

    expect(result.values).toEqual([0, 1, 1, 2, 3, 5]);
  });

  it("generates random integer sequences", () => {
    const randomSpy = vi
      .spyOn(Math, "random")
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.49)
      .mockReturnValueOnce(0.99);

    const result = generateSequence({
      ...DEFAULT_SEQUENCE_DRAFT,
      mode: "random",
      randomMin: "1",
      randomMax: "10",
      randomCount: "3",
      randomAllowDuplicates: true,
    });

    expect(result.values).toEqual([1, 5, 10]);
    randomSpy.mockRestore();
  });

  it("generates formula sequences", () => {
    const result = generateSequence({
      ...DEFAULT_SEQUENCE_DRAFT,
      mode: "formula",
      formulaExpression: "2 * n ^ 2 + 1",
      formulaStartIndex: "1",
      formulaTerms: "4",
    });

    expect(result.entries.map((entry) => entry.n)).toEqual([1, 2, 3, 4]);
    expect(result.values).toEqual([3, 9, 19, 33]);
  });

  it("rejects unsupported formula tokens", () => {
    expect(() => compileFormulaExpression("pow(n, 2)")).toThrow("Unsupported token: pow.");
  });

  it("rejects formula results that are not finite", () => {
    expect(() =>
      generateSequence({
        ...DEFAULT_SEQUENCE_DRAFT,
        mode: "formula",
        formulaExpression: "1 / (n - 1)",
        formulaStartIndex: "1",
        formulaTerms: "3",
      }),
    ).toThrow("Formula returned a non-finite value.");
  });

  it("rejects sequence values above the size limit", () => {
    expect(() =>
      generateSequence({
        ...DEFAULT_SEQUENCE_DRAFT,
        mode: "arithmetic",
        arithmeticFirst: "1000000000000",
        arithmeticDifference: "1",
        arithmeticTerms: "2",
      }),
    ).toThrow("Sequence values must stay within +/-1e12.");
  });

  it("rejects random unique counts that exceed the integer range", () => {
    expect(() =>
      generateSequence({
        ...DEFAULT_SEQUENCE_DRAFT,
        mode: "random",
        randomMin: "1",
        randomMax: "3",
        randomCount: "4",
        randomAllowDuplicates: false,
      }),
    ).toThrow("Count exceeds the available integer range without duplicates.");
  });

  it("builds csv output", () => {
    expect(
      buildSequenceCsv([
        { n: 1, value: 5 },
        { n: 2, value: 8 },
      ]),
    ).toBe("n,value\n1,5\n2,8");
  });

  it("normalizes chart points", () => {
    const chart = buildSequenceChart([
      { n: 1, value: 10 },
      { n: 2, value: 20 },
      { n: 3, value: 15 },
    ]);

    expect(chart.points).toHaveLength(3);
    expect(chart.path?.startsWith("M ")).toBe(true);
    expect(chart.message).toBeNull();
  });
});

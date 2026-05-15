import { CHART_SIZE } from "./constants";
import type { SequenceEntry, SequencePoint } from "./types";

interface SequenceChart {
  points: SequencePoint[];
  path: string | null;
  message: string | null;
}

export function buildSequenceChart(entries: SequenceEntry[]): SequenceChart {
  if (entries.length < 2) {
    return {
      points: [],
      path: null,
      message: "Chart appears when at least two values are available.",
    };
  }

  const values = entries.map((entry) => entry.value);
  if (values.some((value) => !Number.isFinite(value))) {
    return {
      points: [],
      path: null,
      message: "Chart is unavailable for this result.",
    };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const innerWidth = CHART_SIZE.width - CHART_SIZE.paddingX * 2;
  const innerHeight = CHART_SIZE.height - CHART_SIZE.paddingY * 2;

  const points = entries.map((entry, index) => {
    const ratio = max === min ? 0.5 : (entry.value - min) / (max - min);
    const x = CHART_SIZE.paddingX + (index / (entries.length - 1)) * innerWidth;
    const y = CHART_SIZE.paddingY + (1 - ratio) * innerHeight;

    return {
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      n: entry.n,
      value: entry.value,
    };
  });

  return {
    points,
    path: points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" "),
    message: null,
  };
}

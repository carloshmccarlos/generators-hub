"use client";

import { motion } from "framer-motion";
import { Copy, Download, Sparkles, BarChart3, Table2, Hash } from "lucide-react";

import { CHART_SIZE, SEQUENCE_MODE_OPTIONS } from "@/lib/tools/sequence-generator";

import type { useSequenceGenerator } from "./use-sequence-generator";

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 });

function formatValue(value: number) {
  return Number.isInteger(value) ? numberFormatter.format(value) : numberFormatter.format(Number(value.toFixed(6)));
}

function formatAxisValue(value: number) {
  if (Math.abs(value) >= 1000000) return numberFormatter.format(value);
  if (Math.abs(value) >= 100) return numberFormatter.format(value);
  if (Math.abs(value) >= 1) return value.toFixed(1);
  return value.toFixed(3);
}

interface ResultsPanelProps {
  generatorState: ReturnType<typeof useSequenceGenerator>["state"];
  actions: ReturnType<typeof useSequenceGenerator>["actions"];
}

export function ResultsPanel({ generatorState, actions }: ResultsPanelProps) {
  const { result, resultsRef } = generatorState;
  const modeLabel = result ? SEQUENCE_MODE_OPTIONS.find((o) => o.id === result.mode)?.label ?? result.mode : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      ref={resultsRef}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.04]">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm font-semibold text-[#1c1c1c]">Results</span>
          {result && <span className="text-xs text-[#b0aea7]">• {modeLabel}</span>}
        </div>

        {result && (
          <div className="flex gap-2">
            <button
              onClick={() => void actions.copySequence()}
              className="flex items-center gap-1.5 rounded-lg border border-[#e5e4de]/70 bg-white px-3 py-1.5 text-xs font-medium text-[#6b6b6b] shadow-sm transition-all hover:border-black/20 hover:text-black"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
            <button
              onClick={actions.downloadCsv}
              className="flex items-center gap-1.5 rounded-lg border border-[#e5e4de]/70 bg-white px-3 py-1.5 text-xs font-medium text-[#6b6b6b] shadow-sm transition-all hover:border-black/20 hover:text-black"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>
          </div>
        )}
      </div>

      {!result ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#e5e4de]/60 bg-white/40 py-20 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/[0.03]">
            <Hash className="h-7 w-7 text-black/25" />
          </div>
          <p className="mt-4 text-base font-semibold text-[#1c1c1c]">Ready to generate</p>
          <p className="mt-1.5 text-sm text-[#b0aea7]">Select a mode and enter values</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Stats Row */}
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: "Count", value: result.summary.count },
              { label: "First", value: formatValue(result.summary.first) },
              { label: "Last", value: formatValue(result.summary.last) },
              { label: "Min", value: formatValue(result.summary.min) },
              { label: "Max", value: formatValue(result.summary.max) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[#e5e4de]/70 bg-white px-4 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
              >
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#b0aea7]">{stat.label}</div>
                <div
                  className="mt-1 text-base font-bold text-[#1c1c1c] truncate"
                  title={String(stat.value)}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Curve Chart */}
          {result.chartPath && (
            <div className="rounded-2xl border border-[#e5e4de]/70 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.04]">
                    <BarChart3 className="h-3.5 w-3.5 text-black" />
                  </div>
                  <span className="text-sm font-semibold text-[#1c1c1c]">Curve</span>
                </div>
                <span className="text-xs text-[#b0aea7]">{result.chartPoints.length} points</span>
              </div>

              <div className="relative">
                <svg
                  role="img"
                  aria-label="Sequence chart"
                  viewBox={`0 0 ${CHART_SIZE.width} ${CHART_SIZE.height}`}
                  className="h-[200px] w-full"
                >
                  {[0.25, 0.5, 0.75].map((y) => (
                    <line
                      key={y}
                      x1={CHART_SIZE.paddingX}
                      x2={CHART_SIZE.width - CHART_SIZE.paddingX}
                      y1={(CHART_SIZE.height - CHART_SIZE.paddingY) * y + CHART_SIZE.paddingY * (1 - y)}
                      y2={(CHART_SIZE.height - CHART_SIZE.paddingY) * y + CHART_SIZE.paddingY * (1 - y)}
                      stroke="oklch(92% 0.01 85 / 0.3)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  ))}

                  <line
                    x1={CHART_SIZE.paddingX}
                    x2={CHART_SIZE.width - CHART_SIZE.paddingX}
                    y1={CHART_SIZE.height - CHART_SIZE.paddingY}
                    y2={CHART_SIZE.height - CHART_SIZE.paddingY}
                    stroke="oklch(80% 0.01 85 / 0.5)"
                    strokeWidth="1"
                  />

                  <line
                    x1={CHART_SIZE.paddingX}
                    x2={CHART_SIZE.paddingX}
                    y1={CHART_SIZE.paddingY}
                    y2={CHART_SIZE.height - CHART_SIZE.paddingY}
                    stroke="oklch(80% 0.01 85 / 0.5)"
                    strokeWidth="1"
                  />

                  <path
                    d={`${CHART_SIZE.paddingX},${CHART_SIZE.height - CHART_SIZE.paddingY} ${result.chartPath} ${CHART_SIZE.width - CHART_SIZE.paddingX},${CHART_SIZE.height - CHART_SIZE.paddingY} Z`}
                    fill="#1c1c1c"
                    fillOpacity="0.06"
                  />

                  <path
                    d={result.chartPath}
                    fill="none"
                    stroke="#1c1c1c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {result.chartPoints.map((point, i) => (
                    <g key={i}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill="#1c1c1c"
                        opacity="0.15"
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="2.5"
                        fill="#1c1c1c"
                      />
                    </g>
                  ))}
                </svg>

                <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between overflow-hidden py-1 text-[9px] text-[#b0aea7]">
                  <span className="truncate" title={formatAxisValue(result.summary.max)}>{formatAxisValue(result.summary.max)}</span>
                  <span className="truncate" title={formatAxisValue(result.summary.min)}>{formatAxisValue(result.summary.min)}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-xs text-[#b0aea7]">
                <span>0</span>
                <span>n = {result.summary.count}</span>
              </div>
            </div>
          )}

          {/* Values Table */}
          <div className="rounded-2xl border border-[#e5e4de]/70 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="flex items-center gap-2.5 border-b border-[#e5e4de]/40 px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/[0.04]">
                <Table2 className="h-3.5 w-3.5 text-black" />
              </div>
              <span className="text-sm font-semibold text-[#1c1c1c]">Values</span>
              <span className="text-xs text-[#b0aea7]">({result.entries.length} terms)</span>
            </div>
            <div className="max-h-[280px] overflow-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b border-[#e5e4de]/30">
                    <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">n</th>
                    <th className="px-5 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">value</th>
                  </tr>
                </thead>
                <tbody>
                  {result.entries.map((entry, i) => (
                    <tr
                      key={`${entry.n}-${i}`}
                      className="border-b border-[#e5e4de]/20 transition-colors hover:bg-black/[0.015]"
                    >
                      <td className="px-5 py-2.5 font-mono text-sm text-[#6b6b6b]">{entry.n}</td>
                      <td className="px-5 py-2.5 font-mono text-sm font-medium text-[#1c1c1c]">
                        {formatValue(entry.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
}

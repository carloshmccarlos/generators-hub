"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { SEQUENCE_COUNT_LIMITS, type SequenceMode } from "@/lib/tools/sequence-generator";

import type { useSequenceGenerator } from "./use-sequence-generator";

const FIELD_CLASS =
  "w-full rounded-xl border border-[#e5e4de] bg-[#faf9f5] px-4 py-3 text-sm text-[#1c1c1c] outline-none transition-all placeholder:text-[#b0aea7] focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.04]";

interface FormPanelProps {
  generatorState: ReturnType<typeof useSequenceGenerator>["state"];
  actions: ReturnType<typeof useSequenceGenerator>["actions"];
}

function NumberField({
  id,
  label,
  value,
  onChange,
  inputMode = "decimal",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  inputMode?: "decimal" | "numeric";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD_CLASS}
      />
    </div>
  );
}

function modeFields(
  mode: SequenceMode,
  generatorState: ReturnType<typeof useSequenceGenerator>["state"],
  actions: ReturnType<typeof useSequenceGenerator>["actions"],
) {
  const { draft } = generatorState;

  switch (mode) {
    case "arithmetic":
      return (
        <div className="grid grid-cols-3 gap-3">
          <NumberField id="first" label="First" value={draft.arithmeticFirst} onChange={(v) => actions.updateDraft({ arithmeticFirst: v })} />
          <NumberField id="diff" label="Diff" value={draft.arithmeticDifference} onChange={(v) => actions.updateDraft({ arithmeticDifference: v })} />
          <NumberField id="terms" label="Terms" value={draft.arithmeticTerms} onChange={(v) => actions.updateDraft({ arithmeticTerms: v })} inputMode="numeric" />
        </div>
      );
    case "geometric":
      return (
        <div className="grid grid-cols-3 gap-3">
          <NumberField id="first" label="First" value={draft.geometricFirst} onChange={(v) => actions.updateDraft({ geometricFirst: v })} />
          <NumberField id="ratio" label="Ratio" value={draft.geometricRatio} onChange={(v) => actions.updateDraft({ geometricRatio: v })} />
          <NumberField id="terms" label="Terms" value={draft.geometricTerms} onChange={(v) => actions.updateDraft({ geometricTerms: v })} inputMode="numeric" />
        </div>
      );
    case "fibonacci":
      return (
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <NumberField id="terms" label="Terms (max 100)" value={draft.fibonacciTerms} onChange={(v) => actions.updateDraft({ fibonacciTerms: v })} inputMode="numeric" />
          </div>
          <div className="rounded-xl border border-[#e5e4de]/60 bg-white px-4 py-3 text-xs text-[#6b6b6b] shadow-sm">
            Seed: <span className="font-semibold text-[#1c1c1c]">0, 1</span>
          </div>
        </div>
      );
    case "random":
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <NumberField id="min" label="Min" value={draft.randomMin} onChange={(v) => actions.updateDraft({ randomMin: v })} inputMode="numeric" />
            <NumberField id="max" label="Max" value={draft.randomMax} onChange={(v) => actions.updateDraft({ randomMax: v })} inputMode="numeric" />
            <NumberField id="count" label="Count" value={draft.randomCount} onChange={(v) => actions.updateDraft({ randomCount: v })} inputMode="numeric" />
          </div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e5e4de]/60 bg-white px-4 py-3 text-sm transition-all hover:border-black/20">
            <input
              type="checkbox"
              checked={draft.randomAllowDuplicates}
              onChange={(e) => actions.updateDraft({ randomAllowDuplicates: e.target.checked })}
              className="h-4 w-4 rounded border-[#e5e4de] text-black focus:ring-black/20"
            />
            <span className="text-[#6b6b6b]">Allow duplicates</span>
          </label>
        </div>
      );
    case "formula":
      return (
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]" htmlFor="expr">
              Expression
            </label>
            <input
              id="expr"
              value={draft.formulaExpression}
              onChange={(e) => actions.updateDraft({ formulaExpression: e.target.value })}
              className={FIELD_CLASS}
              placeholder="e.g. 2 * n ^ 2 + 1"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberField id="start" label="Start" value={draft.formulaStartIndex} onChange={(v) => actions.updateDraft({ formulaStartIndex: v })} inputMode="numeric" />
            <NumberField id="terms" label="Terms" value={draft.formulaTerms} onChange={(v) => actions.updateDraft({ formulaTerms: v })} inputMode="numeric" />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function FormPanel({ generatorState, actions }: FormPanelProps) {
  const { draft, error } = generatorState;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.16 }}
      className="space-y-4"
    >
      <div className="rounded-2xl border border-[#e5e4de]/80 bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
          Terms: {SEQUENCE_COUNT_LIMITS.min} – {SEQUENCE_COUNT_LIMITS.max}
        </div>
        {modeFields(draft.mode, generatorState, actions)}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-rose-200/80 bg-rose-50/60 px-4 py-3 text-sm font-medium text-rose-600"
          >
            {error}
          </motion.div>
        )}
        <button
          type="button"
          onClick={actions.generateCurrent}
          className="group relative mt-5 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.99]"
        >
          <Sparkles className="h-4 w-4" />
          Generate
        </button>
      </div>
    </motion.div>
  );
}

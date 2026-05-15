"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { GOAL_OPTIONS, LANGUAGE_OPTIONS, MAX_CAPTION_LENGTH, TONE_OPTIONS } from "@/lib/tools/tiktok-comment";
import type { CommentGoalId, LanguageCode, ToneId } from "@/lib/tools/tiktok-comment";

import type { useCommentGenerator } from "./use-comment-generator";

const CAPTION_PLACEHOLDERS = [
  "Food vlog, checking out a viral restaurant...",
  "Workout routine check-in, the progress is showing...",
  "Daily OOTD post, the summer look is clean...",
];

interface FormPanelProps {
  generatorState: ReturnType<typeof useCommentGenerator>["state"];
  actions: ReturnType<typeof useCommentGenerator>["actions"];
}

export function FormPanel({ generatorState, actions }: FormPanelProps) {
  const { draft, loading, error } = generatorState;
  const captionLen = draft.caption.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
      className="space-y-5"
    >
      <div className="rounded-2xl border border-[#e5e4de]/80 bg-white p-6 shadow-[0_4px_32px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="caption" className="text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
                Caption
              </label>
              <span className={`text-[11px] font-medium tabular-nums transition-colors ${
                captionLen > MAX_CAPTION_LENGTH * 0.9 ? "text-rose-500" : "text-[#6b6b6b]/60"
              }`}>
                {captionLen}/{MAX_CAPTION_LENGTH}
              </span>
            </div>
            <textarea
              id="caption"
              rows={5}
              maxLength={MAX_CAPTION_LENGTH}
              placeholder={CAPTION_PLACEHOLDERS.join("\n")}
              value={draft.caption}
              onChange={(e) => actions.updateDraft({ caption: e.target.value })}
              className="w-full resize-none rounded-xl border border-[#e5e4de] bg-[#faf9f5] px-4 py-3.5 text-sm leading-relaxed text-[#1c1c1c] outline-none transition-all placeholder:text-[#b0aea7] focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.04]"
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  void actions.generate();
                }
              }}
            />
            <p className="mt-1.5 text-[11px] text-[#b0aea7]">Cmd/Ctrl + Enter to submit</p>
          </div>

          <div>
            <label htmlFor="keywords" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
              Keywords / Hashtags
            </label>
            <input
              id="keywords"
              type="text"
              value={draft.keywords}
              onChange={(e) => actions.updateDraft({ keywords: e.target.value })}
              placeholder="e.g. viral, food, summer"
              className="w-full rounded-xl border border-[#e5e4de] bg-[#faf9f5] px-4 py-3 text-sm text-[#1c1c1c] outline-none transition-all placeholder:text-[#b0aea7] focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.04]"
            />
          </div>

          <div>
            <label htmlFor="language" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
              Language
            </label>
            <div className="relative">
              <select
                id="language"
                value={draft.language}
                onChange={(e) => actions.updateDraft({ language: e.target.value as LanguageCode })}
                className="w-full appearance-none rounded-xl border border-[#e5e4de] bg-[#faf9f5] px-4 py-3 pr-10 text-sm font-medium text-[#1c1c1c] outline-none transition-all focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.04]"
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b]">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">Tone</div>
            <div className="flex flex-wrap gap-2">
              {TONE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => actions.updateDraft({ tone: option.id as ToneId })}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    draft.tone === option.id
                      ? "border-black bg-black text-white shadow-sm"
                      : "border-[#e5e4de] bg-white text-[#6b6b6b] hover:border-black/30 hover:text-[#1c1c1c]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">
              Goals
              <span className="rounded-full bg-[#f3f2ee] px-2 py-0.5 text-[10px] font-medium text-[#6b6b6b]">
                {draft.goals.length}/2
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((option) => {
                const active = draft.goals.includes(option.id as CommentGoalId);
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => actions.toggleGoal(option.id as CommentGoalId)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      active
                        ? "border-black/20 bg-black/[0.04] text-[#1c1c1c] shadow-sm"
                        : "border-[#e5e4de] bg-white text-[#6b6b6b] hover:border-black/30 hover:text-[#1c1c1c]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-rose-200/80 bg-rose-50/60 px-4 py-3 text-sm font-medium text-rose-600"
            >
              {error}
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => void actions.generate()}
            disabled={loading}
            className="group relative mt-2 flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:scale-[0.99] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
          >
            <motion.span
              animate={loading ? { rotate: 360 } : { rotate: 0 }}
              transition={loading ? { repeat: Infinity, duration: 1.5, ease: "linear" } : {}}
            >
              <Sparkles className="h-4 w-4" />
            </motion.span>
            {loading ? "Generating..." : "Generate Comments"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

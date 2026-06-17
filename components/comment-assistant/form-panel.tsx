"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

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
  const { draft, loading, error, cooldownRemaining } = generatorState;
  const captionLen = draft.caption.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="h-full flex flex-col"
    >
      {/* Outer Shell - Double Bezel Technique */}
      <div className="rounded-[2.25rem] bg-black/[0.015] p-2 sm:p-2.5 h-full flex flex-col min-h-0">
        {/* Inner Core */}
        <div className="rounded-[1.875rem] border border-black/5 bg-white p-5 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.03)] ring-1 ring-white/50 inset-ring inset-ring-white/50 flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="flex-1 flex flex-col min-h-[120px]">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="caption" className="text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c]/50">
                  Caption
                </label>
                <span className={`text-[10px] font-mono font-medium tabular-nums transition-colors ${
                  captionLen > MAX_CAPTION_LENGTH * 0.9 ? "text-rose-500" : "text-[#1c1c1c]/40"
                }`}>
                  {captionLen}/{MAX_CAPTION_LENGTH}
                </span>
              </div>
              <textarea
                id="caption"
                maxLength={MAX_CAPTION_LENGTH}
                placeholder={CAPTION_PLACEHOLDERS.join("\n")}
                value={draft.caption}
                onChange={(e) => actions.updateDraft({ caption: e.target.value })}
                className="w-full flex-1 resize-none rounded-2xl border-none bg-black/[0.02] px-4 py-4 text-sm leading-relaxed text-[#1c1c1c] outline-none transition-all placeholder:text-black/30 focus:bg-black/[0.04] focus:ring-4 focus:ring-black/[0.02] custom-scrollbar"
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !loading && cooldownRemaining <= 0) {
                    e.preventDefault();
                    void actions.generate();
                  }
                }}
              />
              <p className="mt-2 text-[10px] font-medium text-black/30 shrink-0">Cmd/Ctrl + Enter to submit</p>
            </div>

            <div>
              <label htmlFor="keywords" className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c]/50">
                Keywords / Hashtags
              </label>
              <input
                id="keywords"
                type="text"
                value={draft.keywords}
                onChange={(e) => actions.updateDraft({ keywords: e.target.value })}
                placeholder="e.g. viral, food, summer"
                className="w-full rounded-2xl border-none bg-black/[0.02] px-4 py-3.5 text-sm text-[#1c1c1c] outline-none transition-all placeholder:text-black/30 focus:bg-black/[0.04] focus:ring-4 focus:ring-black/[0.02]"
              />
            </div>

            <div>
              <label htmlFor="language" className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c]/50">
                Language
              </label>
              <div className="relative">
                <select
                  id="language"
                  value={draft.language}
                  onChange={(e) => actions.updateDraft({ language: e.target.value as LanguageCode })}
                  className="w-full appearance-none rounded-2xl border-none bg-black/[0.02] px-4 py-3.5 pr-10 text-sm font-medium text-[#1c1c1c] outline-none transition-all focus:bg-black/[0.04] focus:ring-4 focus:ring-black/[0.02]"
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c]/50">Tone</div>
              <div className="flex flex-wrap gap-2">
                {TONE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => actions.updateDraft({ tone: option.id as ToneId })}
                    className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                      draft.tone === option.id
                        ? "bg-[#1c1c1c] text-white shadow-md shadow-black/10"
                        : "bg-black/[0.03] text-[#1c1c1c]/60 hover:bg-black/[0.06] hover:text-[#1c1c1c]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#1c1c1c]/50">
                Goals
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-mono font-medium text-[#1c1c1c]/50">
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
                      className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                        active
                          ? "bg-black/[0.06] text-[#1c1c1c] shadow-sm ring-1 ring-black/10"
                          : "bg-transparent text-[#1c1c1c]/50 ring-1 ring-black/5 hover:bg-black/[0.02] hover:text-[#1c1c1c]"
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
                className="rounded-xl bg-rose-50 px-4 py-3 text-[13px] font-medium text-rose-600 ring-1 ring-rose-200/50"
              >
                {error}
              </motion.div>
            )}

            <button
              type="button"
              onClick={() => void actions.generate()}
              disabled={loading || cooldownRemaining > 0}
              className="group relative mt-4 flex w-full items-center justify-between overflow-hidden rounded-[1.25rem] bg-[#1c1c1c] px-2 py-2 text-white shadow-xl shadow-black/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-black/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
            >
              <div className="flex items-center gap-3 pl-4 pr-2">
                <motion.span
                  animate={loading ? { rotate: 360 } : { rotate: 0 }}
                  transition={loading ? { repeat: Infinity, duration: 1.5, ease: "linear" } : {}}
                  className="text-white/70 group-hover:text-white transition-colors"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.span>
                <span className="text-[14px] font-semibold tracking-wide">
                  {loading ? "Generating..." : cooldownRemaining > 0 ? `Wait ${cooldownRemaining}s` : "Generate Comments"}
                </span>
              </div>
              
              {/* Button-in-Button architecture for trailing icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-white/20 group-hover:translate-x-[-2px] group-hover:scale-105">
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

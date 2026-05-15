"use client";

import { motion } from "framer-motion";
import {
  Copy,
  Download,
  Sparkles,
  Heart,
  MessageSquare,
  Flame,
  Shield,
  Check,
} from "lucide-react";
import { useState } from "react";

import { COMMENT_GROUP_KEYS, GROUP_META } from "@/lib/tools/tiktok-comment";
import type { CommentGroupIcon, CommentGroupKey } from "@/lib/tools/tiktok-comment";

import type { useCommentGenerator } from "./use-comment-generator";

const ICON_MAP: Record<CommentGroupIcon, typeof Heart> = {
  heart: Heart,
  message: MessageSquare,
  flame: Flame,
  shield: Shield,
};

const ACCENT_MAP: Record<CommentGroupKey, { dot: string; border: string; bg: string }> = {
  high_like: { dot: "bg-emerald-400", border: "border-l-emerald-400/60", bg: "bg-emerald-50/40" },
  high_reply: { dot: "bg-lime-400", border: "border-l-lime-400/60", bg: "bg-lime-50/40" },
  debate_starter: { dot: "bg-amber-400", border: "border-l-amber-400/60", bg: "bg-amber-50/40" },
  safe: { dot: "bg-sky-400", border: "border-l-sky-400/60", bg: "bg-sky-50/40" },
};

interface ResultsPanelProps {
  generatorState: ReturnType<typeof useCommentGenerator>["state"];
  actions: ReturnType<typeof useCommentGenerator>["actions"];
}

export function ResultsPanel({ generatorState, actions }: ResultsPanelProps) {
  const { result, resultsRef, loading } = generatorState;

  const totalComments = result
    ? COMMENT_GROUP_KEYS.reduce((sum, key) => sum + result[key].length, 0)
    : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.18 }}
      ref={resultsRef}
      className="flex flex-col gap-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.04]">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm font-semibold text-[#1c1c1c]">Results</span>
          {result && (
            <span className="rounded-full bg-black/[0.06] px-2.5 py-0.5 text-[11px] font-semibold text-[#6b6b6b]">
              {totalComments}
            </span>
          )}
        </div>

        {result && (
          <div className="flex gap-2">
            <button
              onClick={actions.exportTxt}
              className="flex items-center gap-1.5 rounded-lg border border-[#e5e4de]/70 bg-white px-3 py-1.5 text-xs font-medium text-[#6b6b6b] shadow-sm transition-all hover:border-black/20 hover:text-black"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
            <button
              onClick={() => void actions.copyAll()}
              className="flex items-center gap-1.5 rounded-lg border border-[#e5e4de]/70 bg-white px-3 py-1.5 text-xs font-medium text-[#6b6b6b] shadow-sm transition-all hover:border-black/20 hover:text-black"
            >
              <Copy className="h-3.5 w-3.5" /> Copy All
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
            <Sparkles className="h-7 w-7 text-black/25" />
          </div>
          <p className="mt-4 text-base font-semibold text-[#1c1c1c]">
            {loading ? "Generating comments..." : "Waiting for generation"}
          </p>
          <p className="mt-1.5 text-sm text-[#b0aea7]">
            {loading
              ? "This may take a few seconds"
              : "Fill in the form and click Generate Comments"}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {COMMENT_GROUP_KEYS.map((groupKey, groupIndex) => {
            const meta = GROUP_META[groupKey];
            const accent = ACCENT_MAP[groupKey];
            const Icon = ICON_MAP[meta.icon];
            const comments = result[groupKey];

            return (
              <GroupCard
                key={groupKey}
                groupKey={groupKey}
                meta={meta}
                accent={accent}
                Icon={Icon}
                comments={comments}
                groupIndex={groupIndex}
                actions={actions}
              />
            );
          })}
        </div>
      )}
    </motion.section>
  );
}

interface GroupCardProps {
  groupKey: CommentGroupKey;
  meta: { label: string; accent: string; icon: CommentGroupIcon };
  accent: { dot: string; border: string; bg: string };
  Icon: typeof Heart;
  comments: string[];
  groupIndex: number;
  actions: ReturnType<typeof useCommentGenerator>["actions"];
}

function GroupCard({ groupKey, meta, accent, Icon, comments, groupIndex, actions }: GroupCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyComment = async (comment: string, index: number) => {
    await actions.copyComment(comment);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const handleCopyGroup = async () => {
    await actions.copyGroup(groupKey);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: groupIndex * 0.07 }}
      className={`rounded-2xl border border-[#e5e4de]/70 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] ${accent.border} border-l-[3px]`}
    >
      <div className="flex items-center justify-between border-b border-[#e5e4de]/40 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${accent.bg}`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-[#1c1c1c]">{meta.label}</span>
          <span className="rounded-full bg-[#f3f2ee] px-2 py-0.5 text-[11px] font-mono-label text-[#6b6b6b]">
            {comments.length}
          </span>
        </div>
        <button
          onClick={handleCopyGroup}
          className="flex items-center gap-1.5 rounded-lg border border-[#e5e4de]/60 bg-white px-3 py-1.5 text-[11px] font-medium text-[#6b6b6b] transition-all hover:border-black/20 hover:text-black"
        >
          <Copy className="h-3 w-3" /> Copy group
        </button>
      </div>

      <div className="divide-y divide-[#e5e4de]/30">
        {comments.map((comment, index) => {
          const justCopied = copiedIndex === index;
          return (
            <button
              key={`${groupKey}-${index}`}
              onClick={() => void handleCopyComment(comment, index)}
              className="group relative flex w-full items-start gap-4 px-5 py-3.5 text-left transition-all hover:bg-black/[0.015]"
              title="Click to copy"
            >
              <span className="mt-0.5 shrink-0 font-mono-label text-[11px] text-[#b0aea7] tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-sm leading-relaxed text-[#1c1c1c] transition-colors group-hover:text-black">
                {comment}
              </span>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-transparent transition-all group-hover:border-[#e5e4de] group-hover:bg-white">
                {justCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-[#b0aea7] transition-colors group-hover:text-black" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

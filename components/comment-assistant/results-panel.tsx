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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
      ref={resultsRef}
      className="flex flex-col gap-6 h-full min-h-0"
    >
      <div className="flex items-center justify-between pl-1 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 ring-1 ring-black/5">
            <Sparkles className="h-3.5 w-3.5 text-[#1c1c1c]" />
          </div>
          <span className="text-[14px] font-bold tracking-wide text-[#1c1c1c]">Results</span>
          {result && (
            <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-mono font-medium text-[#1c1c1c]/60">
              {totalComments}
            </span>
          )}
        </div>

        {result && (
          <div className="flex gap-2">
            <button
              onClick={actions.exportTxt}
              className="group flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#1c1c1c]/60 shadow-sm transition-all hover:border-black/10 hover:text-[#1c1c1c] active:scale-95"
            >
              <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" /> Export
            </button>
            <button
              onClick={() => void actions.copyAll()}
              className="group flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#1c1c1c]/60 shadow-sm transition-all hover:border-black/10 hover:text-[#1c1c1c] active:scale-95"
            >
              <Copy className="h-3.5 w-3.5 transition-transform group-hover:scale-105" /> Copy All
            </button>
          </div>
        )}
      </div>

      {!result ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-black/10 bg-white/40 py-24 text-center flex-1 min-h-0"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/[0.02] ring-1 ring-black/5">
            <Sparkles className="h-6 w-6 text-black/20" />
          </div>
          <p className="mt-5 text-[15px] font-semibold text-[#1c1c1c]/80">
            {loading ? "Generating comments..." : "Waiting for generation"}
          </p>
          <p className="mt-1.5 text-[13px] text-[#1c1c1c]/40">
            {loading
              ? "This may take a few seconds"
              : "Fill in the form and click Generate Comments"}
          </p>
        </motion.div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-3 -mr-3 pb-6 min-h-0">
          <div className="grid gap-5 md:grid-cols-2">
            {COMMENT_GROUP_KEYS.map((groupKey, groupIndex) => {
              const meta = GROUP_META[groupKey];
              const Icon = ICON_MAP[meta.icon];
              const comments = result[groupKey];

              return (
                <GroupCard
                  key={groupKey}
                  groupKey={groupKey}
                  meta={meta}
                  Icon={Icon}
                  comments={comments}
                  groupIndex={groupIndex}
                  actions={actions}
                />
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
}

interface GroupCardProps {
  groupKey: CommentGroupKey;
  meta: { label: string; icon: CommentGroupIcon };
  Icon: typeof Heart;
  comments: string[];
  groupIndex: number;
  actions: ReturnType<typeof useCommentGenerator>["actions"];
}

function GroupCard({ groupKey, meta, Icon, comments, groupIndex, actions }: GroupCardProps) {
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: groupIndex * 0.08 }}
      className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] ring-1 ring-white/50 inset-ring inset-ring-white/50"
    >
      <div className="flex items-center justify-between border-b border-black/[0.04] bg-black/[0.01] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
            <Icon className="h-3.5 w-3.5 text-[#1c1c1c]/70" />
          </div>
          <span className="text-[13px] font-bold tracking-wide text-[#1c1c1c]">{meta.label}</span>
          <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-mono font-medium text-[#1c1c1c]/50">
            {comments.length}
          </span>
        </div>
        <button
          onClick={handleCopyGroup}
          className="group flex items-center gap-1.5 rounded-full border border-black/5 bg-white px-3 py-1 text-[11px] font-medium text-[#1c1c1c]/50 shadow-sm transition-all hover:border-black/10 hover:text-[#1c1c1c] active:scale-95"
        >
          <Copy className="h-3 w-3 transition-transform group-hover:scale-110" /> Copy
        </button>
      </div>

      <div className="divide-y divide-black/[0.03]">
        {comments.map((comment, index) => {
          const justCopied = copiedIndex === index;
          return (
            <button
              key={`${groupKey}-${index}`}
              onClick={() => void handleCopyComment(comment, index)}
              className="group relative flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-black/[0.015]"
              title="Click to copy"
            >
              <span className="mt-0.5 shrink-0 font-mono text-[10px] text-[#1c1c1c]/30 transition-colors group-hover:text-[#1c1c1c]/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-[13px] leading-relaxed text-[#1c1c1c]/80 transition-colors group-hover:text-[#1c1c1c]">
                {comment}
              </span>
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#1c1c1c]/40 opacity-0 transition-all group-hover:opacity-100">
                {justCopied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

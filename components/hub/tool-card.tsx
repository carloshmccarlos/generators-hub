"use client";

import { motion } from "framer-motion";
import { ArrowRight, Hash, MessageCircle } from "lucide-react";

import type { ToolSummary } from "@/lib/tools/registry";
import { cardReveal } from "./animations";

const toolMeta: Record<
  string,
  { icon: React.ReactNode }
> = {
  "tiktok-comment": {
    icon: <MessageCircle className="h-5 w-5" />,
  },
  "sequence-generator": {
    icon: <Hash className="h-5 w-5" />,
  },
};

export function ToolCard({ tool, index }: { tool: ToolSummary; index: number }) {
  const meta = toolMeta[tool.id] ?? { icon: <Hash className="h-5 w-5" /> };

  return (
    <motion.a
      custom={index}
      variants={cardReveal}
      href={tool.href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#e5e4de]/70 bg-white p-8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.1)] hover:border-black/20"
    >
      <div className="absolute left-0 right-0 top-0 h-1 bg-black/10 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-500 group-hover:scale-110">
          {meta.icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#b0aea7]">
          Live
        </span>
      </div>

      <h3 className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-[#1c1c1c]">
        {tool.name}
      </h3>

      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#6b6b6b]">
        {tool.description}
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#6b6b6b] transition-all duration-300 group-hover:gap-3 group-hover:text-black">
        <span>Open tool</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </motion.a>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { ToolSummary } from "@/lib/tools/registry";
import { cardReveal } from "./animations";

const toolAccents: Record<string, { hue: string; label: string }> = {
  "tiktok-comment": { hue: "oklch(58% 0.14 65)", label: "Social" },
  "sequence-generator": { hue: "oklch(52% 0.12 220)", label: "Math" },
  "bible-verse": { hue: "oklch(50% 0.10 150)", label: "Content" },
};

export function ToolCard({ tool, index }: { tool: ToolSummary; index: number }) {
  const accent = toolAccents[tool.id] ?? { hue: "oklch(58% 0.14 65)", label: "Tool" };
  const idx = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      custom={index}
      variants={cardReveal}
      href={tool.href}
      className="group relative flex items-start gap-6 sm:gap-8 py-7 sm:py-8 border-b border-[var(--color-border)] cursor-pointer"
      style={{ textDecoration: "none" }}
    >
      {/* Index number */}
      <div
        className="shrink-0 pt-1 select-none"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          color: "var(--color-muted)",
          opacity: 0.5,
          minWidth: "2rem",
        }}
      >
        {idx}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {/* Category label */}
            <div className="mb-2 flex items-center gap-2">
              <span
                className="live-dot"
                style={{ background: accent.hue }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: accent.hue,
                  textTransform: "uppercase",
                }}
              >
                {accent.label}
              </span>
            </div>

            {/* Tool name */}
            <h3
              className="font-display leading-tight tracking-tight text-[var(--color-foreground)] transition-transform duration-500 ease-out group-hover:translate-x-2"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 700,
              }}
            >
              {tool.name}
            </h3>

            {/* Description */}
            <p
              className="mt-2 text-[14px] leading-relaxed max-w-md"
              style={{ color: "var(--color-muted)" }}
            >
              {tool.description}
            </p>
          </div>

          {/* Arrow indicator */}
          <div
            className="shrink-0 mt-1 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-transparent transition-all duration-500 ease-out group-hover:bg-[var(--color-foreground)] group-hover:border-[var(--color-foreground)]"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <ArrowUpRight
              className="transition-all duration-500 ease-out group-hover:text-[var(--color-background)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ width: "1rem", height: "1rem", color: "var(--color-muted)" }}
            />
          </div>
        </div>
      </div>

      {/* Hover fill line at bottom */}
      <div
        className="absolute bottom-0 left-0 h-px w-0 bg-[var(--color-foreground)] transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden
      />
    </motion.a>
  );
}

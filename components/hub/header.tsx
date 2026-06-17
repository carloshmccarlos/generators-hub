"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "./animations";
import { liveTools } from "@/lib/tools/registry";

export function HubHeader() {
  const toolCount = liveTools.length;

  return (
    <motion.header
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative pt-16 pb-6 sm:pt-20"
    >
      <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[oklch(58%_0.14_65/0.2)] bg-[oklch(58%_0.14_65/0.05)] px-3 py-1.5 backdrop-blur-md">
        <span className="live-dot" />
        <span
          style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em" }}
          className="uppercase font-semibold text-[oklch(58%_0.14_65)]"
        >
          {toolCount} tools live
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="font-display leading-[1.05] tracking-tight text-[var(--color-foreground)]"
        style={{
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          fontWeight: 700,
        }}
      >
        Generator
        <br />
        <span style={{ fontWeight: 400, fontStyle: "italic", color: "var(--color-muted)" }}>
          Hub.
        </span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="mt-5 text-[15px] leading-relaxed max-w-sm"
        style={{ color: "var(--color-muted)" }}
      >
        AI-powered generators for creators and developers.
        All tools run client-side — no accounts, no data storage.
      </motion.p>
    </motion.header>
  );
}

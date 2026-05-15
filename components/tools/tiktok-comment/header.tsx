"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      className="flex flex-col items-start gap-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-rose/20 bg-rose/5 px-3.5 py-1.5 font-mono-label text-rose">
        Comment Generator
      </span>

      <h1 className="font-display text-[2rem] font-semibold leading-tight tracking-tight text-foreground">
        TikTok Comment Generator.
      </h1>

      <p className="text-[15px] leading-relaxed text-muted">
        Short inputs. Grouped output. Native-sounding.
      </p>
    </motion.header>
  );
}
"use client";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainer } from "./animations";

export function HubHeader() {
  return (
    <motion.header
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start"
    >
      <motion.div variants={fadeInUp} className="mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e4de]/70 bg-white/80 px-4 py-2 text-sm font-medium text-[#6b6b6b] shadow-sm backdrop-blur-xl">
          Generator Hub
        </span>
      </motion.div>

      <motion.h1
        variants={fadeInUp}
        className="font-display text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[1.05] tracking-tight text-[#1c1c1c]"
      >
        Create faster.
        <br />
        <span className="text-black/60">Think smarter.</span>
      </motion.h1>

      <motion.p
        variants={fadeInUp}
        className="mt-7 max-w-xl text-[18px] leading-relaxed text-[#6b6b6b]"
      >
        AI-powered generators for content creators and developers.
        Pick a tool and start creating in seconds.
      </motion.p>
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";
import { useMemo } from "react";

import { toolRegistry } from "@/lib/tools/registry";
import { fadeInUp, sectionContainer } from "./animations";

export function ComingSoon() {
  const items = useMemo(
    () => toolRegistry.filter((tool) => tool.status === "coming-soon"),
    [],
  );

  if (items.length === 0) return null;

  return (
    <motion.section
      variants={sectionContainer}
      initial="hidden"
      animate="visible"
      className="mt-4"
    >
      <motion.div
        variants={fadeInUp}
        className="flex items-center gap-5 rounded-3xl border border-dashed border-[#e5e4de]/60 bg-white/60 p-7 shadow-sm"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#e5e4de]/60 bg-white">
          <Clock3 className="h-5 w-5 text-[#b0aea7]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-[#1c1c1c]">
            More generators on the way
          </h3>
          <p className="mt-0.5 text-sm text-[#6b6b6b]">
            New tools are in development. Check back soon.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
}

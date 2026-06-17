"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { toolRegistry } from "@/lib/tools/registry";
import { fadeInUp } from "./animations";

export function ComingSoon() {
  const items = useMemo(
    () => toolRegistry.filter((tool) => tool.status === "coming-soon"),
    [],
  );

  if (items.length === 0) return null;

  return (
    <motion.p
      variants={fadeInUp}
      className="mt-3 flex items-center gap-2.5 text-[13px]"
      style={{ color: "var(--color-muted)", opacity: 0.6 }}
    >
      <span
        style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.08em" }}
        className="uppercase"
      >
        More tools in development
      </span>
      <span aria-hidden>—</span>
      <span>check back soon.</span>
    </motion.p>
  );
}

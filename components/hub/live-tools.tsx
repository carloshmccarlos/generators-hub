"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { liveTools } from "@/lib/tools/registry";
import { sectionContainer } from "./animations";
import { ToolCard } from "./tool-card";

export function LiveTools() {
  const tools = useMemo(() => liveTools, []);

  if (tools.length === 0) return null;

  return (
    <motion.section
      variants={sectionContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-5 sm:grid-cols-2"
    >
      {tools.map((tool, i) => (
        <ToolCard key={tool.id} tool={tool} index={i} />
      ))}
    </motion.section>
  );
}

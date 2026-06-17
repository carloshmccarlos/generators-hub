"use client";

import { motion } from "framer-motion";

import { staggerContainer } from "./animations";
import { HubHeader } from "./header";
import { LiveTools } from "./live-tools";
import { ComingSoon } from "./coming-soon";
import { HubInfo } from "./hub-info";

export function HubPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--color-background)] text-[var(--color-foreground)] bg-noise">
      <div className="pointer-events-none fixed inset-0 bg-dot-grid opacity-100" />

      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-16 px-5 pb-12 sm:px-8 lg:px-10"
      >
        <HubHeader />

        {/* Tool index */}
        <section className="space-y-2 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.12em", color: "var(--color-muted)", opacity: 0.5 }}
              className="uppercase"
            >
              Tools
            </span>
          </div>
          <LiveTools />
          <ComingSoon />
        </section>

        <HubInfo />
      </motion.main>
    </div>
  );
}

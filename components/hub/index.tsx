"use client";

import { motion } from "framer-motion";

import { staggerContainer } from "./animations";
import { HubHeader } from "./header";
import { LiveTools } from "./live-tools";
import { ComingSoon } from "./coming-soon";
import { HubFooter } from "./footer";

export function HubPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#faf9f5] text-[#1c1c1c]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.03),transparent)]" />

      <div className="pointer-events-none fixed left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/[0.015] blur-3xl" />
      <div className="pointer-events-none fixed right-0 bottom-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/4 rounded-full bg-black/[0.015] blur-3xl" />

      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-16 px-5 pb-16 pt-16 sm:px-8 sm:pt-20 lg:px-10 lg:pt-24"
      >
        <HubHeader />
        <LiveTools />
        <ComingSoon />
        <HubFooter />
      </motion.main>
    </div>
  );
}

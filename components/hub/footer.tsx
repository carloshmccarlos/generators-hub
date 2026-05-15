"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "./animations";

export function HubFooter() {
  return (
    <motion.footer
      variants={fadeInUp}
      className="mt-auto flex flex-col items-center gap-2 pt-12 pb-8 text-center"
    >
      <div className="h-px w-16 bg-[#e5e4de]" />
      <p className="mt-3 text-sm text-[#6b6b6b]">
        Generator Hub &copy; 2026
      </p>
    </motion.footer>
  );
}

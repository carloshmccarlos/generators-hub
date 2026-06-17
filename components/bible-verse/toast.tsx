"use client";

import { motion } from "framer-motion";

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[#1c1c1c] px-5 py-2.5 text-sm font-medium text-white shadow-lg z-50"
    >
      {message}
    </motion.div>
  );
}

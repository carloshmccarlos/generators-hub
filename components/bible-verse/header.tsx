"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-md">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-[#1c1c1c] sm:text-[2rem]">
            Bible Verse Generator
          </h1>
          <p className="text-sm font-medium text-[#6b6b6b]">KJV · Filter by Testament & Category · Bookmark Favorites</p>
        </div>
      </div>
      <p className="max-w-xl text-[15px] leading-relaxed text-[#6b6b6b]">
        <span className="font-semibold text-[#1c1c1c]">Generate random Bible verses.</span>{" "}
        Select Old or New Testament and filter by topics such as Wisdom, Faith, Strength, and Comfort.
      </p>
    </motion.div>
  );
}

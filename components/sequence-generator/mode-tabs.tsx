"use client";

import { motion } from "framer-motion";
import { Calculator, Waves, Binary, Dices, FunctionSquare } from "lucide-react";

import { SEQUENCE_MODE_OPTIONS, type SequenceMode } from "@/lib/tools/sequence-generator";

interface ModeTabsProps {
  currentMode: SequenceMode;
  onModeChange: (mode: SequenceMode) => void;
}

const MODE_ICONS: Record<SequenceMode, typeof Calculator> = {
  arithmetic: Calculator,
  geometric: Waves,
  fibonacci: Binary,
  random: Dices,
  formula: FunctionSquare,
};

export function ModeTabs({ currentMode, onModeChange }: ModeTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.12 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {SEQUENCE_MODE_OPTIONS.map((option, i) => {
        const selected = currentMode === option.id;
        const Icon = MODE_ICONS[option.id];

        return (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => onModeChange(option.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.04 * i, ease: [0.25, 0.1, 0.25, 1] }}
            className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-3.5 transition-all ${
              selected
                ? "border-black bg-black text-white shadow-sm"
                : "border-[#e5e4de] bg-white text-[#6b6b6b] hover:border-black/30 hover:text-[#1c1c1c]"
            }`}
          >
            <Icon className={`h-5 w-5 ${selected ? "text-white/80" : "text-[#b0aea7]"}`} />
            <div className="text-[13px] font-medium">{option.label}</div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

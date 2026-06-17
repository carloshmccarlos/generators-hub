"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Info, HelpCircle, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getGeneratorFaq } from "@/lib/content/generator-info";

export function AboutFaqInline() {
  const faq = getGeneratorFaq("tiktok-comment");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!faq) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-12 pb-20 border-t border-black/5 mt-16 lg:mt-20 w-full animate-in fade-in duration-300 items-start">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="lg:col-span-5 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-[#b0aea7]" />
          <h2 className="text-sm font-semibold tracking-wide uppercase text-[#6b6b6b]">
            About This Tool
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-[#1c1c1c]">
          Instantly generate native-feeling TikTok comments tailored to your content. Fast, contextual, and optimized for engagement.
        </p>
        
        <div className="flex flex-wrap lg:flex-col items-start gap-x-6 gap-y-2.5 mt-2">
          {["AI-Powered", "Context Aware", "Multiple Tones"].map((feature, index) => (
            <div key={index} className="flex items-center gap-1.5 text-[13px] font-medium text-[#6b6b6b]">
              <Check className="h-3.5 w-3.5 text-[#1c1c1c]/40" />
              {feature}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="lg:col-span-7 w-full rounded-2xl border border-[#e5e4de]/60 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.02)] overflow-hidden h-fit"
      >
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#e5e4de]/40 bg-[#faf9f5]">
          <HelpCircle className="h-4 w-4 text-[#b0aea7]" />
          <h3 className="text-xs font-bold tracking-wide uppercase text-[#6b6b6b]">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="divide-y divide-[#e5e4de]/40">
          {faq.items.slice(0, 4).map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="flex flex-col">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex items-center justify-between px-6 py-4 text-left focus:outline-none group transition-colors hover:bg-black/[0.01]"
                >
                  <span className={`text-[13px] font-medium transition-colors duration-200 ${
                    isOpen ? "text-[#1c1c1c]" : "text-[#6b6b6b] group-hover:text-[#1c1c1c]"
                  }`}>
                    {item.question}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-[#b0aea7] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#1c1c1c]" : "rotate-0 group-hover:text-[#1c1c1c]"}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-[13px] leading-relaxed text-[#6b6b6b]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

export default AboutFaqInline;

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Info, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { getGeneratorAbout, getGeneratorFaq } from "@/lib/content/generator-info";

interface AboutFaqInlineProps {
  isMeditative?: boolean;
}

export function AboutFaqInline({ isMeditative = false }: AboutFaqInlineProps) {
  const about = getGeneratorAbout("bible-verse");
  const faq = getGeneratorFaq("bible-verse");
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!about || !faq) return null;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={`flex flex-col gap-16 pt-16 pb-32 transition-colors duration-[1500ms]`}>
      {/* Editorial Separator Line Above */}
      <div className="flex justify-center mb-4">
         <div className={`w-24 h-px ${isMeditative ? "bg-white/20" : "bg-black/10"}`} />
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* About Section */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          className="lg:col-span-7 flex flex-col gap-10"
        >
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-all duration-[1500ms] ${
              isMeditative 
                ? "bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" 
                : "bg-black/[0.03] border border-black/5"
            }`}>
              <Info className={`h-5 w-5 ${isMeditative ? "text-white/70" : "text-black/60"}`} />
            </div>
            <h2 className={`font-display text-3xl font-medium tracking-tight transition-colors duration-[1500ms] ${isMeditative ? "text-white" : "text-[#18181b]"}`}>
              {about.title}
            </h2>
          </div>

          <div className={`flex flex-col gap-6 text-[16px] leading-[1.8] transition-colors duration-[1500ms] font-light tracking-wide ${
            isMeditative ? "text-white/60" : "text-black/60"
          }`}>
            <p className={`font-medium text-[18px] leading-relaxed transition-colors duration-[1500ms] ${isMeditative ? "text-white/90" : "text-[#18181b]"}`}>
              {about.intro}
            </p>
            {about.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section (Accordion) */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="lg:col-span-5 flex flex-col gap-10"
        >
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm transition-all duration-[1500ms] ${
              isMeditative 
                ? "bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" 
                : "bg-black/[0.03] border border-black/5"
            }`}>
              <HelpCircle className={`h-5 w-5 ${isMeditative ? "text-white/70" : "text-black/60"}`} />
            </div>
            <h2 className={`font-display text-3xl font-medium tracking-tight transition-colors duration-[1500ms] ${isMeditative ? "text-white" : "text-[#18181b]"}`}>
              {faq.eyebrow}
            </h2>
          </div>

          <div className="flex flex-col w-full">
            {faq.items.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index} 
                  className={`flex flex-col border-b transition-colors duration-[1500ms] ${
                    isMeditative ? "border-white/10" : "border-black/5"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between py-6 text-left focus:outline-none group"
                  >
                    <h3 className={`text-[16px] font-medium pr-6 transition-colors duration-500 ${
                      isMeditative 
                        ? isOpen ? "text-white" : "text-white/70 group-hover:text-white" 
                        : isOpen ? "text-black" : "text-black/70 group-hover:text-black"
                    }`}>
                      {item.question}
                    </h3>
                    <div className={`flex items-center justify-center h-8 w-8 rounded-full transition-all duration-500 shrink-0 ${
                      isMeditative
                        ? isOpen ? "bg-white/10 text-white" : "bg-transparent text-white/30 group-hover:bg-white/5 group-hover:text-white/70"
                        : isOpen ? "bg-black/5 text-black" : "bg-transparent text-black/30 group-hover:bg-black/5 group-hover:text-black/70"
                    }`}>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className={`pb-8 text-[15px] leading-relaxed font-light tracking-wide transition-colors duration-[1500ms] ${
                          isMeditative ? "text-white/50" : "text-black/50"
                        }`}>
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

      {/* Features Glass Card - FULL WIDTH */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
        className={`relative overflow-hidden w-full rounded-3xl p-8 sm:p-12 backdrop-blur-3xl transition-all duration-[1500ms] border mt-8 ${
        isMeditative 
          ? "bg-white/[0.03] border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" 
          : "bg-white/60 border-black/5 shadow-sm"
      }`}>
        {/* Subtle accent glow inside the card */}
        <div className={`absolute top-0 right-0 w-[400px] h-[400px] blur-[100px] -translate-y-1/2 translate-x-1/3 rounded-full opacity-30 ${isMeditative ? "bg-indigo-500/20" : "bg-amber-500/10"}`} />
        <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] blur-[80px] translate-y-1/2 -translate-x-1/3 rounded-full opacity-20 ${isMeditative ? "bg-purple-500/20" : "bg-orange-500/10"}`} />

        <div className="relative z-10 flex flex-col items-center">
          <h3 className={`mb-10 text-[12px] font-bold uppercase tracking-[0.3em] transition-colors duration-[1500ms] text-center ${
            isMeditative ? "text-white/50" : "text-black/40"
          }`}>
            Core Features
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12 w-full max-w-5xl mx-auto">
            {about.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-4 group">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                  isMeditative 
                    ? "bg-white/5 text-white/50 group-hover:bg-white/15 group-hover:text-white" 
                    : "bg-black/5 text-black/50 group-hover:bg-black/10 group-hover:text-black"
                }`}>
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span className={`text-[15px] leading-relaxed transition-colors duration-500 font-light ${
                  isMeditative ? "text-white/60 group-hover:text-white/90" : "text-black/60 group-hover:text-black/90"
                }`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

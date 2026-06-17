"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, RefreshCw, Copy, Loader2, Moon, Sun, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

import { Toast } from "./toast";
import { AboutFaqInline } from "./about-faq-inline";
import { useBibleVerse } from "./use-bible-verse";
import { formatVerseReference } from "@/lib/tools/bible-verse/generate";
import type { SpiritualMood, BibleVersion } from "@/lib/tools/bible-verse/types";

const MOODS: { id: SpiritualMood; label: string; icon: string }[] = [
  { id: "random", label: "Guide Me", icon: "✨" },
  { id: "anxious", label: "Anxious", icon: "🌪️" },
  { id: "sad", label: "Sad", icon: "🌧️" },
  { id: "confused", label: "Confused", icon: "🌫️" },
  { id: "grateful", label: "Grateful", icon: "☀️" },
  { id: "seeking", label: "Seeking", icon: "🧭" },
];

const VERSIONS: { id: BibleVersion; label: string }[] = [
  { id: "KJV", label: "King James Version" },
  { id: "NIV", label: "New International Version" },
  { id: "ESV", label: "English Standard Version" },
  { id: "WEB", label: "World English Bible" },
  { id: "BBE", label: "Bible in Basic English" },
  { id: "ASV", label: "American Standard Version" },
];

export function BibleVerseGenerator() {
  const { state, actions } = useBibleVerse();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by assuming light mode initially for render
  const isMeditative = mounted ? state.uiMode === "meditative" : false;
  const { currentVerse, filter } = state;

  // Stagger animation for words
  const renderVerseWords = (text: string) => {
    const words = text.split(" ");
    return words.map((word, i) => (
      <motion.span
        key={`${word}-${i}`}
        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: i * 0.04,
        }}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <div 
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-[1500ms] ease-in-out ${
        isMeditative ? "bg-[#0a0a0b] text-[#f4f4f5]" : "bg-[#faf9f5] text-[#18181b]"
      }`}
    >
      {/* Noise Texture for Premium Print Feel */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-overlay bg-noise z-0" />

      {/* Dynamic Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Main Ambient Glow */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: isMeditative ? [0.4, 0.5, 0.4] : [0.5, 0.6, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-colors duration-[1500ms] ${
            isMeditative ? "bg-indigo-900/20" : "bg-[var(--color-accent-copper-light)]/40"
          }`}
        />
        
        {/* Secondary Orb */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full blur-[100px] transition-colors duration-[1500ms] ${
            isMeditative ? "bg-purple-900/10" : "bg-amber-100/40"
          }`}
        />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 pb-32 pt-6 sm:px-8 lg:px-10">
        
        {/* Top Nav (Glassmorphism) */}
        <div className="flex items-center justify-between mb-16 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <a
              href="/"
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm backdrop-blur-2xl transition-all duration-500 ${
                isMeditative
                  ? "border-white/5 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  : "border-black/5 bg-white/60 text-black/60 hover:bg-white/80 hover:text-black"
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to hub
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex items-center gap-3"
          >
            {/* Version Selector */}
            <div className={`hidden sm:flex items-center gap-1 p-1 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
              isMeditative ? "bg-white/5 border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : "bg-white/60 border-black/5 shadow-sm"
            }`}>
              {VERSIONS.map((v) => {
                const isActive = state.version === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => actions.setVersion(v.id)}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? isMeditative ? "text-white" : "text-black"
                        : isMeditative ? "text-white/40 hover:text-white/80" : "text-black/40 hover:text-black/80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeVersion"
                        className={`absolute inset-0 rounded-full ${isMeditative ? "bg-white/10 shadow-sm" : "bg-white shadow-sm"}`}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{v.id}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => actions.setUiMode(isMeditative ? "minimal" : "meditative")}
              className={`group flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-2xl transition-all duration-500 overflow-hidden ${
                isMeditative 
                  ? "border-white/5 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                  : "border-black/5 bg-white/60 text-black/60 hover:bg-white/80 hover:text-black shadow-sm"
              }`}
              title={isMeditative ? "Switch to Light Mode" : "Switch to Meditative Mode"}
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMeditative ? "sun" : "moon"}
                    initial={{ y: -20, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMeditative ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Mobile Version Selector */}
        <div className="sm:hidden flex justify-center mb-8">
          <div className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-2xl transition-all ${
            isMeditative ? "bg-white/5 border-white/5" : "bg-white/60 border-black/5"
          }`}>
            {VERSIONS.map((v) => {
              const isActive = state.version === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => actions.setVersion(v.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? isMeditative ? "bg-white/10 text-white shadow-sm" : "bg-white text-black shadow-sm"
                      : isMeditative ? "text-white/40" : "text-black/40"
                  }`}
                >
                  {v.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="flex flex-col items-center text-center gap-4 mb-20"
        >
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl overflow-hidden mb-2 group">
             <div className="absolute inset-0 bg-gradient-to-br from-[#1c1c1c] to-[#000000] z-0" />
             <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <BookOpen className="h-6 w-6 text-white/90 relative z-20 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight">
            Spiritual Prompt
          </h1>
          <p className={`text-[15px] max-w-md tracking-wide leading-relaxed ${isMeditative ? "text-white/50" : "text-black/50"}`}>
            A space for peace and reflection. Select your current mood and receive a guiding verse.
          </p>
        </motion.div>

        {/* Generator Section */}
        <div className="flex flex-col items-center justify-center space-y-16">
          
          {/* Testament Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
            className="flex flex-col items-center mb-2"
          >
            <div className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-2xl transition-all ${
              isMeditative ? "bg-white/5 border-white/5" : "bg-white/60 border-black/5"
            }`}>
              {[
                { id: "all", label: "Whole Bible" },
                { id: "old", label: "Old Testament" },
                { id: "new", label: "New Testament" }
              ].map((t) => {
                const isActive = filter.testament === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => actions.updateFilter({ testament: t.id as any })}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? isMeditative ? "bg-white/10 text-white shadow-sm" : "bg-white text-black shadow-sm"
                        : isMeditative ? "text-white/40 hover:text-white/70" : "text-black/40 hover:text-black/70"
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Mood Selector (Premium Glass Pills) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-wrap justify-center gap-3 max-w-xl">
              {MOODS.map((mood) => {
                const isActive = filter.mood === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => actions.updateFilter({ mood: mood.id })}
                    className={`group relative flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-medium transition-all duration-500 ${
                      isActive
                        ? isMeditative 
                          ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" 
                          : "bg-black text-white border-transparent shadow-md"
                        : isMeditative
                          ? "bg-transparent text-white/40 border-white/10 hover:bg-white/5 hover:text-white/90 hover:border-white/20"
                          : "bg-white/40 backdrop-blur-md text-black/60 border-black/5 hover:bg-white/80 hover:text-black hover:border-black/10 hover:shadow-sm"
                    } border`}
                  >
                    <span className="text-base group-hover:scale-110 transition-transform duration-300">{mood.icon}</span>
                    <span className="tracking-wide">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Main Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="relative"
          >
            {/* Glowing backdrop for button */}
            <div className={`absolute -inset-1 rounded-full blur-md opacity-30 transition-opacity duration-500 ${isMeditative ? "bg-white/10" : "bg-black/5"}`} />
            
            <motion.button
              whileHover={{ scale: state.isLoading ? 1 : 1.02 }}
              whileTap={{ scale: state.isLoading ? 1 : 0.98 }}
              onClick={actions.generateVerse}
              disabled={state.isLoading}
              className={`relative flex items-center justify-center gap-3 overflow-hidden rounded-full px-10 py-5 shadow-sm transition-all duration-500 ${
                isMeditative
                  ? "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-2xl"
                  : "bg-white/80 border border-black/5 text-black hover:bg-white hover:border-black/10 hover:shadow-md backdrop-blur-2xl"
              } ${state.isLoading ? "cursor-wait" : ""}`}
            >
              {/* Shimmer effect while loading */}
              {state.isLoading && (
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
              
              <span className={`relative z-10 font-display text-[1.1rem] tracking-wide ${state.isLoading ? "opacity-70" : "opacity-100"}`}>
                {state.isLoading ? "Seeking..." : currentVerse ? "Receive Another" : "Receive a Verse"}
              </span>
              
              {state.isLoading ? (
                <Loader2 className="relative z-10 h-4 w-4 animate-spin opacity-70" />
              ) : currentVerse ? (
                <RefreshCw className="relative z-10 h-4 w-4 opacity-70 transition-transform duration-700 group-hover:rotate-180" />
              ) : (
                <Sparkles className="relative z-10 h-4 w-4 text-[var(--color-accent-copper)]" />
              )}
            </motion.button>
          </motion.div>

          {/* Verse Display (Exquisite Typography) */}
          <div className="w-full min-h-[300px] flex flex-col items-center">
            <AnimatePresence mode="wait">
              {currentVerse && (
                <motion.div
                  key={currentVerse.id}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 0.98 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full max-w-4xl px-6 text-center"
                >
                  <div className="relative pt-8 pb-12">
                    {/* Beautiful Decorative Quotation Mark */}
                    <div className={`absolute -top-6 left-1/2 -translate-x-1/2 font-display text-8xl leading-none opacity-10 select-none ${isMeditative ? "text-white" : "text-black"}`}>
                      "
                    </div>

                    <h2 
                      className="font-display leading-[1.6] tracking-tight relative z-10 text-pretty" 
                      style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
                    >
                      {renderVerseWords(currentVerse.text)}
                    </h2>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-col items-center gap-8 mt-12"
                    >
                      {/* Divider line */}
                      <div className={`w-12 h-px ${isMeditative ? "bg-white/20" : "bg-black/10"}`} />

                      <div className="flex flex-col items-center gap-4">
                        <p 
                          className={`text-sm font-semibold tracking-[0.2em] uppercase ${
                            isMeditative ? "text-white/50" : "text-black/40"
                          }`}
                        >
                          {formatVerseReference(currentVerse)}
                        </p>

                        {/* Premium Copy Button */}
                        <button
                          onClick={() => actions.copyVerse(currentVerse)}
                          className={`group flex h-9 items-center gap-2.5 px-5 rounded-full border transition-all duration-300 backdrop-blur-md ${
                            isMeditative 
                              ? "border-white/5 text-white/40 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/10" 
                              : "border-black/5 text-black/40 bg-white/50 hover:bg-white/80 hover:text-black hover:border-black/10"
                          }`}
                          title="Copy verse"
                        >
                          <Copy className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                          <span className="text-[11px] font-medium tracking-widest uppercase">Copy</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* About / FAQ Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-16 relative"
        >
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px ${isMeditative ? "bg-gradient-to-r from-transparent via-white/10 to-transparent" : "bg-gradient-to-r from-transparent via-black/10 to-transparent"}`} />
          <div className={`transition-opacity duration-1000 ${isMeditative ? "opacity-60 hover:opacity-100" : "opacity-100"}`}>
             <AboutFaqInline isMeditative={isMeditative} />
          </div>
        </motion.div>

      </main>

      <AnimatePresence>
        {state.toast && <Toast message={state.toast} />}
      </AnimatePresence>
    </div>
  );
}

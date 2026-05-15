"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { Toast } from "@/components/sequence-generator/toast";

import { FormPanel } from "./form-panel";
import { ResultsPanel } from "./results-panel";
import { useCommentGenerator } from "./use-comment-generator";

export function CommentAssistant() {
  const { state, actions } = useCommentGenerator();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#faf9f5] text-[#1c1c1c]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,0,0,0.03),transparent)]" />

      <div className="pointer-events-none fixed right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-black/[0.02] blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-5 pb-24 pt-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#e5e4de]/70 bg-white/80 px-4 py-2 text-sm font-medium text-[#6b6b6b] shadow-sm backdrop-blur-xl transition-all hover:border-black/20 hover:text-black"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to hub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay: 0.08 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black shadow-md">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-[#1c1c1c] sm:text-[2rem]">
                TikTok Comment
              </h1>
              <p className="text-sm font-medium text-[#6b6b6b]">Generator</p>
            </div>
          </div>
          <p className="max-w-xl text-[15px] leading-relaxed text-[#6b6b6b]">
            <span className="font-semibold text-[#1c1c1c]">Comments that read native.</span>{" "}
            Short inputs. Grouped output. Fast copy.
          </p>
        </motion.div>

        <div className="flex flex-col gap-10">
          <FormPanel generatorState={state} actions={actions} />
          <ResultsPanel generatorState={state} actions={actions} />
        </div>
      </main>

      <AnimatePresence>
        {state.toast && <Toast message={state.toast} />}
      </AnimatePresence>
    </div>
  );
}

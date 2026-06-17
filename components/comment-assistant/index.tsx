"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { Toast } from "@/components/sequence-generator/toast";

import { FormPanel } from "./form-panel";
import { ResultsPanel } from "./results-panel";
import { useCommentGenerator } from "./use-comment-generator";
import { AboutFaqInline } from "./about-faq-inline";

export function CommentAssistant() {
  const { state, actions } = useCommentGenerator();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fcfbf9] text-[#1c1c1c] selection:bg-[#1c1c1c] selection:text-white">
      {/* Structural Grid Background */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="pointer-events-none fixed left-0 right-0 top-0 h-[500px] bg-gradient-to-b from-white/80 to-transparent" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col gap-10 px-6 pb-32 pt-8 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/60 px-4 py-2 text-[13px] font-medium text-[#1c1c1c]/60 shadow-sm backdrop-blur-md transition-all hover:border-black/10 hover:bg-white hover:text-[#1c1c1c]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to hub
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[#1c1c1c] shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-white/10 inset-ring inset-ring-white/20">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-display text-[2.25rem] font-bold tracking-tight text-[#1c1c1c] leading-[1.1]">
                TikTok Comment
              </h1>
              <p className="text-[15px] font-medium text-[#1c1c1c]/50 uppercase tracking-[0.1em]">Generator</p>
            </div>
          </div>
          <p className="max-w-xl text-[16px] leading-relaxed text-[#1c1c1c]/70 mt-1">
            <span className="font-semibold text-[#1c1c1c]">Comments that read native.</span>{" "}
            Short inputs. Grouped output. Fast copy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-4 lg:h-[720px]">
          <div className="lg:col-span-5 h-full">
            <FormPanel generatorState={state} actions={actions} />
          </div>
          <div className="lg:col-span-7 h-full min-h-0">
            <ResultsPanel generatorState={state} actions={actions} />
          </div>
        </div>

        <AboutFaqInline />
      </main>

      <AnimatePresence>
        {state.toast && <Toast message={state.toast} />}
      </AnimatePresence>
    </div>
  );
}

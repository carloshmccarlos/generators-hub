"use client";

import { useEffect, useRef, useState } from "react";

import {
  DEFAULT_SEQUENCE_DRAFT,
  SEQUENCE_DRAFT_STORAGE_KEY,
  buildSequenceClipboardText,
  generateSequence,
  type SequenceDraft,
  type SequenceMode,
  type SequenceResult,
} from "@/lib/tools/sequence-generator";

function mergeDraft(value: unknown): SequenceDraft {
  if (!value || typeof value !== "object") {
    return DEFAULT_SEQUENCE_DRAFT;
  }

  return {
    ...DEFAULT_SEQUENCE_DRAFT,
    ...(value as Partial<SequenceDraft>),
  };
}

export function useSequenceGenerator() {
  const [draft, setDraft] = useState<SequenceDraft>(DEFAULT_SEQUENCE_DRAFT);
  const [result, setResult] = useState<SequenceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const resultsRef = useRef<HTMLElement | null>(null);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SEQUENCE_DRAFT_STORAGE_KEY);
      if (saved) {
        setDraft(mergeDraft(JSON.parse(saved)));
      }
    } catch {
      setDraft(DEFAULT_SEQUENCE_DRAFT);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(SEQUENCE_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  }, [draft, isHydrated]);

  useEffect(() => {
    if (result) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => setToast(null), 1400);
  };

  return {
    state: {
      draft,
      result,
      error,
      toast,
      resultsRef,
    },
    actions: {
      setMode: (mode: SequenceMode) => {
        setDraft((current) => ({ ...current, mode }));
        setError(null);
      },
      updateDraft: (patch: Partial<SequenceDraft>) => {
        setDraft((current) => ({ ...current, ...patch }));
      },
      generateCurrent: () => {
        try {
          const nextResult = generateSequence(draft);
          setError(null);
          setResult(nextResult);
          showToast("Sequence ready");
        } catch (error) {
          const message = error instanceof Error ? error.message : "Could not generate the sequence.";
          setError(message);
        }
      },
      copySequence: async () => {
        if (!result) {
          return;
        }

        await navigator.clipboard.writeText(buildSequenceClipboardText(result.values));
        showToast("Copied");
      },
      downloadCsv: () => {
        if (!result) {
          return;
        }

        const blob = new Blob([result.csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `sequence-${draft.mode}-${new Date().toISOString().slice(0, 10)}.csv`;
        anchor.click();
        URL.revokeObjectURL(url);
        showToast("CSV ready");
      },
      clearError: () => setError(null),
    },
  };
}

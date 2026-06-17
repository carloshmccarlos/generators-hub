"use client";

import { useEffect, useRef, useState } from "react";
import {
  generateRandomVerse,
  formatVerseClipboardText,
} from "@/lib/tools/bible-verse/generate";
import type { BibleVerse, VerseFilter, BibleVersion } from "@/lib/tools/bible-verse/types";

const BIBLE_VERSE_DRAFT_KEY = "generator_bible_verse_draft";
const BIBLE_VERSE_PREFS_KEY = "generator_bible_verse_prefs";

export const DEFAULT_VERSE_FILTER: VerseFilter = {
  mood: "random",
  testament: "all",
};

function mergeFilterDraft(value: unknown): VerseFilter {
  if (!value || typeof value !== "object") {
    return DEFAULT_VERSE_FILTER;
  }
  return {
    ...DEFAULT_VERSE_FILTER,
    ...(value as Partial<VerseFilter>),
  };
}

export type UiMode = "minimal" | "meditative";

export function useBibleVerse() {
  const [filter, setFilter] = useState<VerseFilter>(DEFAULT_VERSE_FILTER);
  const [currentVerse, setCurrentVerse] = useState<BibleVerse | null>(null);
  
  const [uiMode, setUiMode] = useState<UiMode>("minimal");
  const [version, setVersion] = useState<BibleVersion>("KJV");
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const toastTimer = useRef<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(BIBLE_VERSE_DRAFT_KEY);
      if (savedDraft) setFilter(mergeFilterDraft(JSON.parse(savedDraft)));

      const savedPrefs = localStorage.getItem(BIBLE_VERSE_PREFS_KEY);
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        if (prefs.uiMode) setUiMode(prefs.uiMode);
        if (prefs.version) setVersion(prefs.version);
      }
    } catch {
      // Ignore errors
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when things change
  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(BIBLE_VERSE_DRAFT_KEY, JSON.stringify(filter));
  }, [filter, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(BIBLE_VERSE_DRAFT_KEY, JSON.stringify(filter));
  }, [filter, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(BIBLE_VERSE_PREFS_KEY, JSON.stringify({ uiMode, version }));
  }, [uiMode, version, isHydrated]);

  // Clean up toast timer
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

  const generateVerse = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const verse = await generateRandomVerse(filter, version);
      setCurrentVerse(verse);
      
    } catch {
      showToast("Error generating verse");
    } finally {
      setIsLoading(false);
    }
  };

  const copyVerse = async (verse: BibleVerse) => {
    try {
      const text = formatVerseClipboardText(verse);
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch {
      showToast("Failed to copy");
    }
  };

  return {
    state: {
      filter,
      currentVerse,
      uiMode,
      version,
      isLoading,
      toast,
      isHydrated,
    },
    actions: {
      setUiMode,
      setVersion,
      updateFilter: (patch: Partial<VerseFilter>) => {
        setFilter((current) => ({ ...current, ...patch }));
      },
      generateVerse,
      copyVerse,
    },
  };
}

export type BibleVerseState = ReturnType<typeof useBibleVerse>["state"];
export type BibleVerseActions = ReturnType<typeof useBibleVerse>["actions"];

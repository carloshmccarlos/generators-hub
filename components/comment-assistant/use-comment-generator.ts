"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { COMMENT_GROUP_KEYS, GROUP_META, LANGUAGE_OPTIONS, TONE_OPTIONS, GOAL_OPTIONS } from "@/lib/tools/tiktok-comment";
import { parseKeywordsInput } from "@/lib/tools/tiktok-comment";
import { formatAllClipboardText, formatGroupClipboardText } from "@/lib/tools/tiktok-comment";
import type { CommentGoalId, CommentGroupKey, GeneratedComments, LanguageCode, ToneId } from "@/lib/tools/tiktok-comment";

const STORAGE_KEY = "generator-hub:tiktok-comment:draft";
const REQUEST_TIMEOUT_MS = 35000;
const COOLDOWN_MS = 30000;

export interface CommentDraft {
  caption: string;
  keywords: string;
  language: LanguageCode;
  tone: ToneId;
  goals: CommentGoalId[];
}

const defaultDraft: CommentDraft = {
  caption: "",
  keywords: "",
  language: "en",
  tone: "funny_meme",
  goals: ["max_likes", "praise_hype"],
};

function loadDraft(): CommentDraft {
  if (typeof window === "undefined") return defaultDraft;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultDraft;
    const parsed = JSON.parse(raw) as Partial<CommentDraft>;
    return {
      caption: typeof parsed.caption === "string" ? parsed.caption : defaultDraft.caption,
      keywords: typeof parsed.keywords === "string" ? parsed.keywords : defaultDraft.keywords,
      language: (parsed.language as LanguageCode) ?? defaultDraft.language,
      tone: (parsed.tone as ToneId) ?? defaultDraft.tone,
      goals: Array.isArray(parsed.goals) ? (parsed.goals as CommentGoalId[]) : defaultDraft.goals,
    };
  } catch {
    return defaultDraft;
  }
}

function saveDraft(draft: CommentDraft) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // ignore
  }
}

export function useCommentGenerator() {
  const [draft, setDraft] = useState<CommentDraft>(loadDraft);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedComments | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inCooldownRef = useRef(false);
  const cooldownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    saveDraft(draft);
  }, [draft]);

  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  const updateDraft = useCallback((patch: Partial<CommentDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  }, []);

  const toggleGoal = useCallback((goal: CommentGoalId) => {
    setDraft((prev) => {
      const has = prev.goals.includes(goal);
      if (has) {
        return { ...prev, goals: prev.goals.filter((g) => g !== goal) };
      }
      if (prev.goals.length >= 2) {
        return { ...prev, goals: [prev.goals[1] ?? prev.goals[0], goal] };
      }
      return { ...prev, goals: [...prev.goals, goal] };
    });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const startCooldown = useCallback(() => {
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }

    inCooldownRef.current = true;
    setCooldownRemaining(COOLDOWN_MS / 1000);

    cooldownIntervalRef.current = setInterval(() => {
      setCooldownRemaining((prev) => {
        if (prev <= 1) {
          if (cooldownIntervalRef.current) {
            clearInterval(cooldownIntervalRef.current);
            cooldownIntervalRef.current = null;
          }
          inCooldownRef.current = false;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const generate = useCallback(async () => {
    if (inCooldownRef.current) return;

    const caption = draft.caption.trim();
    if (!caption) {
      setError("Please describe the video first");
      return;
    }
    if (draft.goals.length === 0) {
      setError("Select at least one goal");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/tools/tiktok-comment/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption,
          keywords: parseKeywordsInput(draft.keywords),
          language: draft.language,
          tone: draft.tone,
          goals: draft.goals,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = (await response.json()) as GeneratedComments | { error: string };

      if (!response.ok) {
        const message = "error" in data ? data.error : "Something went wrong, try again.";
        throw new Error(message);
      }

      setResult(data as GeneratedComments);

      setTimeout(() => {
        if (resultsRef.current && window.innerWidth < 1024) {
          resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Generation timed out. Try again.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong, try again.");
      }
    } finally {
      setLoading(false);
      startCooldown();
    }
  }, [draft, startCooldown]);

  const copyComment = useCallback(
    async (comment: string) => {
      try {
        await navigator.clipboard.writeText(comment);
        showToast("Copied");
      } catch {
        showToast("Copy failed");
      }
    },
    [showToast],
  );

  const copyGroup = useCallback(
    async (groupKey: CommentGroupKey) => {
      if (!result) return;
      try {
        await navigator.clipboard.writeText(formatGroupClipboardText(groupKey, result[groupKey]));
        showToast("Copied group");
      } catch {
        showToast("Copy failed");
      }
    },
    [result, showToast],
  );

  const copyAll = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatAllClipboardText(result));
      showToast("Copied all");
    } catch {
      showToast("Copy failed");
    }
  }, [result, showToast]);

  const exportTxt = useCallback(() => {
    if (!result) return;
    const text = formatAllClipboardText(result);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tiktok-comments.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Exported .txt");
  }, [result, showToast]);

  return {
    state: {
      draft,
      loading,
      error,
      result,
      toast,
      cooldownRemaining,
      resultsRef,
      languageLabel: LANGUAGE_OPTIONS.find((o) => o.id === draft.language)?.label ?? draft.language,
      toneLabel: TONE_OPTIONS.find((o) => o.id === draft.tone)?.label ?? draft.tone,
    },
    actions: {
      updateDraft,
      toggleGoal,
      generate,
      copyComment,
      copyGroup,
      copyAll,
      exportTxt,
    },
  };
}

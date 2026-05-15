import { z } from "zod";

import { AppError } from "@/lib/errors";

import { COMMENT_GROUP_KEYS, GOAL_OPTIONS, LANGUAGE_OPTIONS, MAX_CAPTION_LENGTH, TONE_OPTIONS } from "./constants";
import type { GeneratedComments } from "./types";

const languageValues = LANGUAGE_OPTIONS.map((option) => option.id) as [string, ...string[]];
const goalValues = GOAL_OPTIONS.map((option) => option.id) as [string, ...string[]];
const toneValues = TONE_OPTIONS.map((option) => option.id) as [string, ...string[]];

export const generateCommentInputSchema = z
  .object({
    caption: z.string().trim().min(1, "Please describe the video first").max(MAX_CAPTION_LENGTH),
    keywords: z.array(z.string().trim().min(1)).max(12).default([]),
    language: z.enum(languageValues),
    goals: z.array(z.enum(goalValues)).min(1),
    tone: z.enum(toneValues),
  })
  .strict();

export const generatedCommentsSchema = z
  .object(
    COMMENT_GROUP_KEYS.reduce(
      (shape, groupKey) => {
        shape[groupKey] = z.array(z.string().trim().min(1));
        return shape;
      },
      {} as Record<(typeof COMMENT_GROUP_KEYS)[number], z.ZodArray<z.ZodString>>,
    ),
  )
  .strict();

export function coerceGeneratedComments(value: unknown): GeneratedComments {
  try {
    return generatedCommentsSchema.parse(value);
  } catch {
    throw new AppError("Model output was invalid.", 502);
  }
}

export function parseGeneratedCommentsContent(content: string): GeneratedComments {
  const stripped = content
    .replace(/```json\s*/gi, "")
    .replace(/```/g, "")
    .trim();

  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");

  if (start < 0 || end < 0 || end <= start) {
    throw new AppError("Model did not return JSON content.", 502);
  }

  const extracted = stripped.slice(start, end + 1);
  try {
    const parsed = JSON.parse(extracted) as unknown;
    return coerceGeneratedComments(parsed);
  } catch {
    throw new AppError("Model output could not be parsed.", 502);
  }
}

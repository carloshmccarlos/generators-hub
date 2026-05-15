import { AppError } from "@/lib/errors";

import { AI_OPENING_BLOCKLIST, COMMENT_GROUP_KEYS, DISPLAY_COUNTS, UNSAFE_PHRASES } from "./constants";
import type { CommentGroupKey, GeneratedComments } from "./types";

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function stripLeadingNoise(value: string): string {
  return value
    .replace(/^[-•*]\s+/g, "")
    .replace(/^\d+[\.\)]\s+/g, "")
    .replace(/^["'“”]+/g, "")
    .replace(/["'“”]+$/g, "");
}

export function normalizeComment(value: string): string {
  return normalizeWhitespace(stripLeadingNoise(value));
}

function canonicalKey(value: string): string {
  return normalizeComment(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

function wordCount(value: string): number {
  const latinWords = value.match(/[A-Za-z0-9']+/g)?.length ?? 0;
  const cjkChars = value.match(/[\p{Script=Han}]/gu)?.length ?? 0;
  if (latinWords > 0) {
    return latinWords;
  }
  return Math.max(1, Math.ceil(cjkChars / 2));
}

function hasBlockedOpening(value: string): boolean {
  const lower = value.toLowerCase();
  return AI_OPENING_BLOCKLIST.some((phrase) => lower.startsWith(phrase));
}

function hasUnsafeLanguage(value: string): boolean {
  const lower = value.toLowerCase();
  return UNSAFE_PHRASES.some((phrase) => lower.includes(phrase.toLowerCase()));
}

function hasTargetedAttack(value: string): boolean {
  return /(?:you(?:'re|\s+are)|u\s+are)\s+(?:an?\s+)?(?:idiot|stupid|dumb|moron|loser|trash|worthless)/i.test(
    value,
  );
}

function levenshteinDistance(left: string, right: string): number {
  if (left === right) {
    return 0;
  }

  if (left.length === 0) {
    return right.length;
  }

  if (right.length === 0) {
    return left.length;
  }

  const previous = new Array(right.length + 1).fill(0);
  const current = new Array(right.length + 1).fill(0);

  for (let column = 0; column <= right.length; column += 1) {
    previous[column] = column;
  }

  for (let row = 1; row <= left.length; row += 1) {
    current[0] = row;

    for (let column = 1; column <= right.length; column += 1) {
      const cost = left[row - 1] === right[column - 1] ? 0 : 1;
      current[column] = Math.min(
        previous[column] + 1,
        current[column - 1] + 1,
        previous[column - 1] + cost,
      );
    }

    for (let column = 0; column <= right.length; column += 1) {
      previous[column] = current[column];
    }
  }

  return previous[right.length];
}

function similarityRatio(left: string, right: string): number {
  const a = canonicalKey(left);
  const b = canonicalKey(right);
  const longest = Math.max(a.length, b.length);

  if (longest === 0) {
    return 1;
  }

  return 1 - levenshteinDistance(a, b) / longest;
}

function isNearDuplicate(candidate: string, existing: string[]): boolean {
  return existing.some((value) => similarityRatio(candidate, value) >= 0.85);
}

function shouldRejectComment(value: string, groupKey: CommentGroupKey, acceptedAcrossGroups: string[]): boolean {
  if (!value) {
    return true;
  }

  if (hasBlockedOpening(value) || hasUnsafeLanguage(value) || hasTargetedAttack(value)) {
    return true;
  }

  const key = canonicalKey(value);

  if (!key) {
    return true;
  }

  if (acceptedAcrossGroups.some((existing) => canonicalKey(existing) === key)) {
    return true;
  }

  return isNearDuplicate(value, acceptedAcrossGroups);
}

export function filterGeneratedComments(raw: GeneratedComments): GeneratedComments {
  const acceptedAcrossGroups: string[] = [];
  const filtered = Object.fromEntries(COMMENT_GROUP_KEYS.map((groupKey) => [groupKey, []])) as unknown as GeneratedComments;

  for (const groupKey of COMMENT_GROUP_KEYS) {
    for (const candidate of raw[groupKey]) {
      const normalized = normalizeComment(candidate);

      if (shouldRejectComment(normalized, groupKey, acceptedAcrossGroups)) {
        continue;
      }

      filtered[groupKey].push(normalized);
      acceptedAcrossGroups.push(normalized);
    }
  }

  for (const groupKey of COMMENT_GROUP_KEYS) {
    if (filtered[groupKey].length < DISPLAY_COUNTS[groupKey]) {
      throw new AppError("Not enough usable comments. Try adjusting your tone or goal.", 422);
    }
  }

  return filtered;
}

import { COMMENT_GROUP_KEYS, GROUP_META } from "./constants";
import type { CommentGroupKey, GeneratedComments } from "./types";

export function formatGroupClipboardText(
  groupKey: CommentGroupKey,
  comments: string[],
): string {
  return [GROUP_META[groupKey].label, ...comments.map((comment) => `- ${comment}`)].join("\n");
}

export function formatAllClipboardText(comments: GeneratedComments): string {
  return COMMENT_GROUP_KEYS.map((groupKey) => formatGroupClipboardText(groupKey, comments[groupKey])).join(
    "\n\n",
  );
}

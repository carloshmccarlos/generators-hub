import { AppError } from "@/lib/errors";
import { buildSiliconConfigFromEnv, callSiliconChatCompletions } from "@/lib/silicon";

import { DISPLAY_COUNTS } from "./constants";
import { filterGeneratedComments } from "./filter";
import { buildGenerationMessages } from "./prompt";
import { parseGeneratedCommentsContent } from "./schema";
import type { GenerateCommentInput, GeneratedComments } from "./types";

type GenerateCommentsOptions = {
  env: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
};

function trimToDisplayCounts(comments: GeneratedComments): GeneratedComments {
  return Object.fromEntries(
    Object.entries(comments).map(([groupKey, items]) => [
      groupKey,
      items.slice(0, DISPLAY_COUNTS[groupKey as keyof GeneratedComments]),
    ]),
  ) as GeneratedComments;
}

export async function generateComments(
  input: GenerateCommentInput,
  options: GenerateCommentsOptions,
): Promise<GeneratedComments> {
  const config = buildSiliconConfigFromEnv(options.env);
  const messages = buildGenerationMessages(input);
  const content = await callSiliconChatCompletions(config, messages, options.fetchImpl);
  const parsed = parseGeneratedCommentsContent(content);
  const filtered = filterGeneratedComments(parsed);
  return trimToDisplayCounts(filtered);
}

export function createServerError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  return new AppError("Something went wrong, try again.", 500);
}

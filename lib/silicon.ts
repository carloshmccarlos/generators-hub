import { AppError } from "@/lib/errors";

const SILICON_TIMEOUT_MS = 60000;
const DEFAULT_SILICON_BASE_URL = "https://api.siliconflow.cn/v1";
const DEFAULT_SILICON_MODEL = "deepseek-ai/DeepSeek-V4-Flash";

type SiliconConfig = {
  apiKey: string;
  model: string;
  baseUrl: string;
};

type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type SiliconChatPayload = {
  model: string;
  messages: OpenAIMessage[];
  max_tokens: number;
  temperature: number;
  top_p: number;
  top_k: number;
  frequency_penalty: number;
  enable_thinking: boolean;
};

function cleanBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function firstDefined(...values: Array<string | undefined>): string | undefined {
  return values.find((value) => typeof value === "string" && value.trim().length > 0)?.trim();
}

function extractErrorMessage(payload: unknown, status: number): string {
  if (typeof payload === "object" && payload !== null) {
    const maybe = payload as Record<string, unknown>;
    const nestedMessage =
      maybe.error && typeof maybe.error === "object" ? (maybe.error as Record<string, unknown>).message : undefined;
    const message =
      (typeof maybe.message === "string" && maybe.message) ||
      (typeof nestedMessage === "string" && nestedMessage) ||
      (typeof maybe.error === "string" && maybe.error);

    if (message) {
      return message;
    }
  }

  return `SiliconFlow request failed with status ${status}.`;
}

function extractTextFromContent(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((part) => extractTextFromContent(part)).join("");
  }

  if (value && typeof value === "object") {
    const record = value as { content?: unknown; message?: { content?: unknown }; text?: unknown };

    if (typeof record.text === "string") {
      return record.text;
    }

    if (record.message?.content !== undefined) {
      return extractTextFromContent(record.message.content);
    }

    if (record.content !== undefined) {
      return extractTextFromContent(record.content);
    }
  }

  return "";
}

function extractContent(payload: unknown): string {
  const record = payload as {
    choices?: Array<{ message?: { content?: unknown } }>;
    output?: Array<{ content?: unknown; message?: { content?: unknown }; text?: unknown }>;
    output_text?: unknown;
  };

  const choiceContent = record.choices?.[0]?.message?.content;

  if (typeof choiceContent === "string" || Array.isArray(choiceContent)) {
    return extractTextFromContent(choiceContent);
  }

  if (typeof record.output_text === "string") {
    return record.output_text;
  }

  if (Array.isArray(record.output)) {
    for (const item of record.output) {
      const content = extractTextFromContent(item);
      if (content) {
        return content;
      }
    }
  }

  return "";
}

export async function callSiliconChatCompletions(
  config: SiliconConfig,
  messages: OpenAIMessage[],
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), SILICON_TIMEOUT_MS);

  try {
    const response = await fetchImpl(`${cleanBaseUrl(config.baseUrl)}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        max_tokens: 2000,
        temperature: 0.85,
        top_p: 0.85,
        top_k: 50,
        frequency_penalty: 0.1,
        enable_thinking: false,
      } satisfies SiliconChatPayload),
      signal: controller.signal,
    });

    const payload = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      throw new AppError(extractErrorMessage(payload, response.status), 502);
    }

    const content = extractContent(payload);

    if (typeof content !== "string" || content.trim().length === 0) {
      throw new AppError("SiliconFlow returned an empty response.", 502);
    }

    return content;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new AppError("Generation timed out. Try again.", 504);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Something went wrong, try again.", 502);
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export function buildSiliconConfigFromEnv(env: Record<string, string | undefined>): SiliconConfig {
  const apiKey = firstDefined(env.SILICON_API_KEY, env.KEY);
  const model = firstDefined(env.SILICON_MODEL) ?? DEFAULT_SILICON_MODEL;
  const baseUrl = firstDefined(env.SILICON_BASE_URL) ?? DEFAULT_SILICON_BASE_URL;

  if (!apiKey) {
    throw new AppError("Missing SiliconFlow config.", 503);
  }

  return {
    apiKey,
    model,
    baseUrl,
  };
}

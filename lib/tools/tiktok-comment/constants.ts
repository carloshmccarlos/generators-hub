import type {
  CommentGoalId,
  CommentGroupIcon,
  CommentGroupKey,
  GroupMeta,
  LanguageCode,
  SelectOption,
  ToneId,
} from "./types";

export const COMMENT_GROUP_KEYS: CommentGroupKey[] = [
  "high_like",
  "high_reply",
  "debate_starter",
  "safe",
];

export const DISPLAY_COUNTS: Record<CommentGroupKey, number> = {
  high_like: 6,
  high_reply: 6,
  debate_starter: 5,
  safe: 5,
};

export const REQUEST_COUNTS: Record<CommentGroupKey, number> = {
  high_like: 7,
  high_reply: 7,
  debate_starter: 6,
  safe: 6,
};

export const MAX_CAPTION_LENGTH = 2000;
export const MAX_KEYWORDS = 12;

export const LANGUAGE_OPTIONS: SelectOption<LanguageCode>[] = [
  { id: "en", label: "English",          prompt: "English" },
  { id: "cn", label: "中文 (简)",         prompt: "Chinese (Simplified)" },
  { id: "tw", label: "中文 (繁)",         prompt: "Chinese (Traditional)" },
  { id: "ja", label: "日本語",            prompt: "Japanese" },
  { id: "ko", label: "한국어",            prompt: "Korean" },
  { id: "es", label: "Español",          prompt: "Spanish" },
  { id: "pt", label: "Português",        prompt: "Portuguese" },
  { id: "fr", label: "Français",         prompt: "French" },
  { id: "de", label: "Deutsch",          prompt: "German" },
  { id: "id", label: "Indonesia",        prompt: "Indonesian" },
  { id: "th", label: "ภาษาไทย",          prompt: "Thai" },
  { id: "vi", label: "Tiếng Việt",       prompt: "Vietnamese" },
  { id: "ar", label: "العربية",          prompt: "Arabic" },
  { id: "hi", label: "हिन्दी",            prompt: "Hindi" },
  { id: "ru", label: "Русский",          prompt: "Russian" },
  { id: "tr", label: "Türkçe",           prompt: "Turkish" },
  { id: "it", label: "Italiano",         prompt: "Italian" },
  { id: "ms", label: "Melayu",           prompt: "Malay" },
];

export const GOAL_OPTIONS: SelectOption<CommentGoalId>[] = [
  {
    id: "max_likes",
    label: "Max Likes",
    prompt: "safe, relatable, widely appealing",
  },
  {
    id: "max_replies",
    label: "Max Replies",
    prompt: "asks a question and invites responses",
  },
  {
    id: "debate_starter",
    label: "Debate Starter",
    prompt: "mildly contrarian but respectful",
  },
  {
    id: "praise_hype",
    label: "Praise / Hype",
    prompt: "genuine compliments with fan energy",
  },
  {
    id: "humor",
    label: "Humor",
    prompt: "light jokes, memes, playful energy",
  },
  {
    id: "genuine_insight",
    label: "Genuine Insight",
    prompt: "adds real value or a thoughtful observation",
  },
];

export const TONE_OPTIONS: SelectOption<ToneId>[] = [
  { id: "funny_meme", label: "Funny / Meme", prompt: "funny, playful, meme-like" },
  { id: "gen_z", label: "Gen Z", prompt: "casual, modern, lowkey, fr fr" },
  {
    id: "sincere_heartfelt",
    label: "Sincere / Heartfelt",
    prompt: "warm, sincere, emotionally clear",
  },
  {
    id: "professional_thoughtful",
    label: "Professional / Thoughtful",
    prompt: "clear, polished, thoughtful, calm",
  },
  { id: "fan_hype", label: "Fan / Hype", prompt: "enthusiastic fan energy" },
  {
    id: "neutral_balanced",
    label: "Neutral / Balanced",
    prompt: "balanced and natural",
  },
];

export const GROUP_META: Record<CommentGroupKey, GroupMeta> = {
  high_like: { label: "High-Like", accent: "border-l-emerald-300 bg-emerald-50/50", icon: "heart" },
  high_reply: { label: "High-Reply", accent: "border-l-lime-400 bg-lime-50/50", icon: "message" },
  debate_starter: { label: "Debate Starter", accent: "border-l-amber-300 bg-amber-50/50", icon: "flame" },
  safe: { label: "Safe", accent: "border-l-sky-300 bg-sky-50/50", icon: "shield" },
};

export const AI_OPENING_BLOCKLIST = [
  "absolutely!",
  "as an ai",
  "i completely agree that",
  "great video!",
  "love this!",
];

export const UNSAFE_PHRASES = [
  "idiot",
  "stupid",
  "dumb",
  "moron",
  "loser",
  "trash",
  "kill yourself",
  "worthless",
  "垃圾",
  "废物",
  "蠢",
  "笨",
];

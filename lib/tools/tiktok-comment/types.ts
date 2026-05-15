export type LanguageCode =
  | "en"
  | "cn"
  | "tw"
  | "ja"
  | "ko"
  | "es"
  | "pt"
  | "fr"
  | "de"
  | "id"
  | "th"
  | "vi"
  | "ar"
  | "hi"
  | "ru"
  | "tr"
  | "it"
  | "ms";

export type CommentGoalId =
  | "max_likes"
  | "max_replies"
  | "debate_starter"
  | "praise_hype"
  | "humor"
  | "genuine_insight";

export type ToneId =
  | "funny_meme"
  | "gen_z"
  | "sincere_heartfelt"
  | "professional_thoughtful"
  | "fan_hype"
  | "neutral_balanced";

export type CommentGroupKey =
  | "high_like"
  | "high_reply"
  | "debate_starter"
  | "safe";

export interface GenerateCommentInput {
  caption: string;
  keywords: string[];
  language: LanguageCode;
  goals: CommentGoalId[];
  tone: ToneId;
}

export type GeneratedComments = Record<CommentGroupKey, string[]>;

export interface SelectOption<T extends string> {
  id: T;
  label: string;
  prompt: string;
}

export type CommentGroupIcon = "heart" | "message" | "flame" | "shield";

export interface GroupMeta {
  label: string;
  accent: string;
  icon: CommentGroupIcon;
}

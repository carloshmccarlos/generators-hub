export type Testament = "old" | "new";

export type BibleVersion = "KJV" | "WEB" | "BBE";

export type VerseCategory =
  | "Comfort"
  | "Faith"
  | "Love"
  | "Wisdom"
  | "Strength"
  | "Hope"
  | "Peace"
  | "Gratitude";

export type SpiritualMood = 
  | "anxious" // Needs comfort, peace
  | "sad" // Needs hope, encouragement
  | "confused" // Needs wisdom, guidance
  | "grateful" // Needs praise, thanksgiving
  | "seeking" // Needs faith, direction
  | "random"; // Let the spirit guide

export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version: BibleVersion;
  testament: Testament;
  category: VerseCategory;
  tags: string[]; // for semantic matching
}

export interface VerseFilter {
  mood: SpiritualMood;
  testament: Testament | "all";
  book?: string; // Optional specific book
}

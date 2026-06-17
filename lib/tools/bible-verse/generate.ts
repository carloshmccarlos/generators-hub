import type { BibleVerse, VerseFilter, SpiritualMood, BibleVersion } from "./types";
import { BIBLE_VERSES } from "./verses";

export type VerseReference = Omit<BibleVerse, "text" | "version">;

const MOOD_TAG_MAP: Record<SpiritualMood, string[]> = {
  anxious: ["comfort", "peace", "hope"],
  sad: ["hope", "strength", "comfort", "love"],
  confused: ["wisdom", "faith"],
  grateful: ["gratitude", "love", "faith"],
  seeking: ["faith", "wisdom", "strength"],
  random: [],
};

export function getFilteredVerses(filter: VerseFilter): VerseReference[] {
  return BIBLE_VERSES.filter((verse) => {
    // 1. Testament Scope
    if (filter.testament !== "all" && verse.testament !== filter.testament) {
      return false;
    }

    // 2. Book Scope
    if (filter.book && filter.book !== "all" && verse.book !== filter.book) {
      return false;
    }

    // 3. Mood Semantic Filtering
    if (filter.mood && filter.mood !== "random") {
      const targetTags = MOOD_TAG_MAP[filter.mood];
      // Check if verse tags overlap with target tags
      const hasSemanticMatch = verse.tags.some((tag) => targetTags.includes(tag));
      if (!hasSemanticMatch) {
        return false;
      }
    }

    return true;
  });
}

export async function generateRandomVerse(filter: VerseFilter, version: BibleVersion = "KJV"): Promise<BibleVerse> {
  const matches = getFilteredVerses(filter);
  
  let selectedRef: VerseReference;
  if (matches.length === 0) {
    // Fallback to absolute random if no matches
    const randomIndex = Math.floor(Math.random() * BIBLE_VERSES.length);
    selectedRef = BIBLE_VERSES[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * matches.length);
    selectedRef = matches[randomIndex];
  }

  // Fetch the actual text from bible-api.com
  const query = `${selectedRef.book}+${selectedRef.chapter}:${selectedRef.verse}`;
  try {
    const response = await fetch(`https://bible-api.com/${query}?translation=${version.toLowerCase()}`);
    if (!response.ok) {
      throw new Error("Failed to fetch verse");
    }
    const data = await response.json();
    
    // Clean up text (API sometimes returns newlines or extra spaces)
    let text = data.text.trim();
    text = text.replace(/\n/g, " ");

    return {
      ...selectedRef,
      text,
      version,
    };
  } catch (error) {
    console.error("Bible API Error:", error);
    // Fallback text if network fails
    return {
      ...selectedRef,
      text: "[Network error: Unable to fetch verse text. Please check your connection.]",
      version,
    };
  }
}

export function formatVerseReference(verse: BibleVerse | VerseReference): string {
  return `${verse.book} ${verse.chapter}:${verse.verse}`;
}

export function formatVerseClipboardText(verse: BibleVerse): string {
  return `"${verse.text}" — ${formatVerseReference(verse)} (${verse.version})`;
}

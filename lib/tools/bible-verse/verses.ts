import type { BibleVerse } from "./types";

export const BIBLE_VERSES: Omit<BibleVerse, "text" | "version">[] = [
  // COMFORT
  {
    id: "comfort_1",
    book: "Psalms",
    chapter: 23,
    verse: 1,

    testament: "old",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_2",
    book: "Psalms",
    chapter: 23,
    verse: 4,

    testament: "old",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_3",
    book: "Psalms",
    chapter: 34,
    verse: 18,

    testament: "old",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_4",
    book: "Psalms",
    chapter: 46,
    verse: 1,

    testament: "old",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_5",
    book: "Matthew",
    chapter: 11,
    verse: 28,

    testament: "new",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_6",
    book: "Romans",
    chapter: 8,
    verse: 28,

    testament: "new",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_7",
    book: "2 Corinthians",
    chapter: 1,
    verse: 3,

    testament: "new",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_8",
    book: "2 Corinthians",
    chapter: 1,
    verse: 4,

    testament: "new",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_9",
    book: "1 Peter",
    chapter: 5,
    verse: 7,

    testament: "new",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },
  {
    id: "comfort_10",
    book: "Revelation",
    chapter: 21,
    verse: 4,

    testament: "new",
    category: "Comfort",
    tags: ["comfort", "kjv"],
  },

  // FAITH
  {
    id: "faith_1",
    book: "Hebrews",
    chapter: 11,
    verse: 1,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_2",
    book: "Proverbs",
    chapter: 3,
    verse: 5,

    testament: "old",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_3",
    book: "Proverbs",
    chapter: 3,
    verse: 6,

    testament: "old",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_4",
    book: "Mark",
    chapter: 11,
    verse: 24,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_5",
    book: "Romans",
    chapter: 10,
    verse: 17,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_6",
    book: "Hebrews",
    chapter: 11,
    verse: 6,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_7",
    book: "Ephesians",
    chapter: 2,
    verse: 8,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_8",
    book: "Romans",
    chapter: 1,
    verse: 17,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_9",
    book: "James",
    chapter: 1,
    verse: 6,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },
  {
    id: "faith_10",
    book: "Galatians",
    chapter: 2,
    verse: 20,

    testament: "new",
    category: "Faith",
    tags: ["faith", "kjv"],
  },

  // LOVE
  {
    id: "love_1",
    book: "John",
    chapter: 3,
    verse: 16,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_2",
    book: "1 Corinthians",
    chapter: 13,
    verse: 4,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_3",
    book: "1 Corinthians",
    chapter: 13,
    verse: 13,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_4",
    book: "1 John",
    chapter: 4,
    verse: 8,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_5",
    book: "1 John",
    chapter: 4,
    verse: 19,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_6",
    book: "Romans",
    chapter: 5,
    verse: 8,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_7",
    book: "John",
    chapter: 15,
    verse: 13,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_8",
    book: "Ephesians",
    chapter: 4,
    verse: 32,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_9",
    book: "Colossians",
    chapter: 3,
    verse: 14,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },
  {
    id: "love_10",
    book: "1 John",
    chapter: 3,
    verse: 18,

    testament: "new",
    category: "Love",
    tags: ["love", "kjv"],
  },

  // WISDOM
  {
    id: "wisdom_1",
    book: "Proverbs",
    chapter: 1,
    verse: 7,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_2",
    book: "Proverbs",
    chapter: 3,
    verse: 13,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_3",
    book: "Proverbs",
    chapter: 4,
    verse: 7,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_4",
    book: "Proverbs",
    chapter: 16,
    verse: 16,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_5",
    book: "James",
    chapter: 1,
    verse: 5,

    testament: "new",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_6",
    book: "James",
    chapter: 3,
    verse: 17,

    testament: "new",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_7",
    book: "Ecclesiastes",
    chapter: 7,
    verse: 12,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_8",
    book: "Colossians",
    chapter: 4,
    verse: 5,

    testament: "new",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_9",
    book: "Proverbs",
    chapter: 9,
    verse: 10,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },
  {
    id: "wisdom_10",
    book: "Proverbs",
    chapter: 19,
    verse: 8,

    testament: "old",
    category: "Wisdom",
    tags: ["wisdom", "kjv"],
  },

  // STRENGTH
  {
    id: "strength_1",
    book: "Isaiah",
    chapter: 40,
    verse: 29,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_2",
    book: "Isaiah",
    chapter: 40,
    verse: 31,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_3",
    book: "Isaiah",
    chapter: 41,
    verse: 10,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_4",
    book: "Philippians",
    chapter: 4,
    verse: 13,

    testament: "new",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_5",
    book: "Psalms",
    chapter: 28,
    verse: 7,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_6",
    book: "Psalms",
    chapter: 46,
    verse: 1,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_7",
    book: "2 Timothy",
    chapter: 1,
    verse: 7,

    testament: "new",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_8",
    book: "Joshua",
    chapter: 1,
    verse: 9,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_9",
    book: "Psalms",
    chapter: 18,
    verse: 2,

    testament: "old",
    category: "Strength",
    tags: ["strength", "kjv"],
  },
  {
    id: "strength_10",
    book: "2 Corinthians",
    chapter: 12,
    verse: 9,

    testament: "new",
    category: "Strength",
    tags: ["strength", "kjv"],
  },

  // HOPE
  {
    id: "hope_1",
    book: "Jeremiah",
    chapter: 29,
    verse: 11,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_2",
    book: "Romans",
    chapter: 12,
    verse: 12,

    testament: "new",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_3",
    book: "Romans",
    chapter: 15,
    verse: 13,

    testament: "new",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_4",
    book: "Psalms",
    chapter: 39,
    verse: 7,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_5",
    book: "Psalms",
    chapter: 42,
    verse: 11,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_6",
    book: "Lamentations",
    chapter: 3,
    verse: 22,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_7",
    book: "Lamentations",
    chapter: 3,
    verse: 23,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_8",
    book: "Lamentations",
    chapter: 3,
    verse: 24,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_9",
    book: "Hebrews",
    chapter: 6,
    verse: 19,

    testament: "new",
    category: "Hope",
    tags: ["hope", "kjv"],
  },
  {
    id: "hope_10",
    book: "Psalms",
    chapter: 119,
    verse: 114,

    testament: "old",
    category: "Hope",
    tags: ["hope", "kjv"],
  },

  // PEACE
  {
    id: "peace_1",
    book: "Philippians",
    chapter: 4,
    verse: 6,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_2",
    book: "Philippians",
    chapter: 4,
    verse: 7,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_3",
    book: "John",
    chapter: 14,
    verse: 27,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_4",
    book: "John",
    chapter: 16,
    verse: 33,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_5",
    book: "Isaiah",
    chapter: 26,
    verse: 3,

    testament: "old",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_6",
    book: "Colossians",
    chapter: 3,
    verse: 15,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_7",
    book: "2 Thessalonians",
    chapter: 3,
    verse: 16,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_8",
    book: "Psalms",
    chapter: 29,
    verse: 11,

    testament: "old",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_9",
    book: "Romans",
    chapter: 8,
    verse: 6,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },
  {
    id: "peace_10",
    book: "Romans",
    chapter: 12,
    verse: 18,

    testament: "new",
    category: "Peace",
    tags: ["peace", "kjv"],
  },

  // GRATITUDE
  {
    id: "gratitude_1",
    book: "1 Thessalonians",
    chapter: 5,
    verse: 18,

    testament: "new",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_2",
    book: "Psalms",
    chapter: 100,
    verse: 4,

    testament: "old",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_3",
    book: "Psalms",
    chapter: 107,
    verse: 1,

    testament: "old",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_4",
    book: "Psalms",
    chapter: 118,
    verse: 24,

    testament: "old",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_5",
    book: "Colossians",
    chapter: 3,
    verse: 17,

    testament: "new",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_6",
    book: "Psalms",
    chapter: 95,
    verse: 2,

    testament: "old",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_7",
    book: "Ephesians",
    chapter: 5,
    verse: 20,

    testament: "new",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_8",
    book: "Psalms",
    chapter: 136,
    verse: 1,

    testament: "old",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_9",
    book: "Philippians",
    chapter: 4,
    verse: 6,

    testament: "new",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
  {
    id: "gratitude_10",
    book: "Colossians",
    chapter: 4,
    verse: 2,

    testament: "new",
    category: "Gratitude",
    tags: ["gratitude", "kjv"],
  },
];

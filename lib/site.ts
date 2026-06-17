export const siteName = "Generator Hub";
export const siteUrl = "https://generators.317713.xyz";

export const siteTitle = "Generator Hub | TikTok Comment, Sequence & Bible Verse Tools";

export const siteDescription =
  "Compact generators for TikTok comments, math sequences, random Bible verses, and ETL sequence guides. Built for fast discovery, clean indexing, and AI citations.";

export const siteKeywords = [
  "generator hub",
  "AI generator hub",
  "TikTok comment generator",
  "sequence generator",
  "math sequence generator",
  "bible verse generator",
  "random bible verse",
  "daily bible verse",
  "Informatica sequence generator",
  "IICS sequence generator",
  "Snowflake sequence",
  "surrogate key generator",
  "ETL sequence guide",
  "AI citations",
  "llms.txt",
  "structured data",
  "schema markup",
  "robots.txt",
  "sitemap.xml",
];

export const siteAuthor = "Generator Hub Team";
export const siteAuthorEmail = "contact@generators.317713.xyz";
export const siteLocale = "en";

export function buildAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      en: `${siteUrl}${path}`,
      "x-default": `${siteUrl}${path}`,
    },
  } as const;
}

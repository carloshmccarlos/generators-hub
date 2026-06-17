import type { Metadata } from "vinext/shims/metadata";

import { JsonLd } from "@/components/seo/json-ld";
import { BibleVerseTool } from "@/components/tools/bible-verse";
import { buildAboutStructuredData, buildFaqStructuredData, buildToolStructuredData } from "@/lib/seo";
import { getGeneratorAbout, getGeneratorFaq } from "@/lib/content/generator-info";
import { getToolById } from "@/lib/tools/registry";
import { buildAlternates, siteKeywords, siteName, siteUrl } from "@/lib/site";

const tool = getToolById("bible-verse");
const aboutData = getGeneratorAbout("bible-verse");
const faqData = getGeneratorFaq("bible-verse");

if (!tool) {
  throw new Error("Bible Verse tool metadata is missing.");
}

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  applicationName: siteName,
  keywords: siteKeywords,
  metadataBase: new URL(siteUrl),
  alternates: buildAlternates(tool.href ?? "/tools/bible-verse"),
  robots: {
    index: true,
    follow: true,
    googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  openGraph: {
    title: `${tool.name} | ${siteName}`,
    description: tool.description,
    siteName,
    url: `${siteUrl}${tool.href ?? "/tools/bible-verse"}`,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: tool.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${tool.name} | ${siteName}`,
    description: tool.description,
    images: [
      {
        url: "/og-image.png",
        alt: tool.name,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildToolStructuredData(tool!)} />
      <JsonLd data={buildAboutStructuredData(aboutData)} />
      <JsonLd data={buildFaqStructuredData(faqData)} />
      <BibleVerseTool />
    </>
  );
}

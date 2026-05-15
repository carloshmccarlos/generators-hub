import type { Metadata } from "vinext/shims/metadata";

import { JsonLd } from "@/components/seo/json-ld";
import { SequenceGeneratorTool } from "@/components/tools/sequence-generator";
import { buildToolStructuredData } from "@/lib/seo";
import { getToolById } from "@/lib/tools/registry";
import { buildAlternates, siteKeywords, siteName, siteUrl } from "@/lib/site";

const tool = getToolById("sequence-generator");

if (!tool) {
  throw new Error("Sequence Generator tool metadata is missing.");
}

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  applicationName: siteName,
  keywords: siteKeywords,
  metadataBase: new URL(siteUrl),
  alternates: buildAlternates(tool.href ?? "/tools/sequence-generator"),
  robots: {
    index: true,
    follow: true,
    googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  openGraph: {
    title: `${tool.name} | ${siteName}`,
    description: tool.description,
    siteName,
    url: `${siteUrl}${tool.href ?? "/tools/sequence-generator"}`,
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
      <SequenceGeneratorTool />
    </>
  );
}

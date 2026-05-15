import type { Metadata } from "vinext/shims/metadata";

import { JsonLd } from "@/components/seo/json-ld";
import { TikTokCommentTool } from "@/components/tools/tiktok-comment";
import { buildToolStructuredData } from "@/lib/seo";
import { getToolById } from "@/lib/tools/registry";
import { buildAlternates, siteKeywords, siteName, siteUrl } from "@/lib/site";

const tool = getToolById("tiktok-comment");

if (!tool) {
  throw new Error("TikTok Comment tool metadata is missing.");
}

export const metadata: Metadata = {
  title: tool.name,
  description: tool.description,
  applicationName: siteName,
  keywords: siteKeywords,
  metadataBase: new URL(siteUrl),
  alternates: buildAlternates(tool.href ?? "/tools/tiktok-comment"),
  robots: {
    index: true,
    follow: true,
    googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  openGraph: {
    title: `${tool.name} | ${siteName}`,
    description: tool.description,
    siteName,
    url: `${siteUrl}${tool.href ?? "/tools/tiktok-comment"}`,
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
      <TikTokCommentTool />
    </>
  );
}

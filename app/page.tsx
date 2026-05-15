import type { Metadata } from "vinext/shims/metadata";

import { JsonLd } from "@/components/seo/json-ld";
import { HubPage } from "@/components/hub";
import { buildHomeStructuredData } from "@/lib/seo";
import { buildAlternates, siteDescription, siteKeywords, siteName, siteTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteTitle },
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  metadataBase: new URL(siteUrl),
  alternates: buildAlternates("/"),
  robots: {
    index: true,
    follow: true,
    googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
    url: siteUrl,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        alt: siteName,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={buildHomeStructuredData()} />
      <HubPage />
    </>
  );
}

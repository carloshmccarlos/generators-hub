import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "vinext/shims/metadata";
import {
  buildAlternates,
  siteAuthorEmail,
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/site";
import { siteStructuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  metadataBase: new URL(siteUrl),
  alternates: buildAlternates("/"),
  verification: {
    google: "google7cfc68ab913bcd14",
  },
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf9f5",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
        />
        {children}
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]/80 py-6 backdrop-blur-md">
          <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-xs text-[var(--color-muted)]">
              <span className="font-display font-semibold text-[var(--color-foreground)]">{siteName}</span>
              <span className="hidden sm:inline opacity-30 text-[var(--color-muted)]">|</span>
              <span>&copy; 2026. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
              <a href="/" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">Home</a>
              <a href="/tools/tiktok-comment" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">TikTok Comment</a>
              <a href="/tools/sequence-generator" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">Sequence</a>
              <a href="/tools/bible-verse" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">Bible Verse</a>
              <a href="/sitemap.xml" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">Sitemap</a>
              <a href="/llms.txt" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">llms.txt</a>
              <a href={`mailto:${siteAuthorEmail}`} className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-150">Support</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

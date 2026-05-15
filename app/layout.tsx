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
        <footer className="border-t border-[#e5e4de] bg-[#faf9f5]/80">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
            <div className="grid gap-10 sm:grid-cols-4">
              <div className="sm:col-span-1">
                <div className="font-display font-semibold text-[#1c1c1c]">{siteName}</div>
                <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]">
                  Free generators for TikTok comments, math sequences, and ETL guidance. No accounts, no data storage.
                </p>
              </div>
              {[
                {
                  label: "Site",
                  links: [
                    { href: "/", label: "Home" },
                    { href: "/about", label: "About" },
                    { href: "/faq", label: "FAQ" },
                  ],
                },
                {
                  label: "Tools",
                  links: [
                    { href: "/tools/tiktok-comment", label: "TikTok Comment" },
                    { href: "/tools/sequence-generator", label: "Sequence Generator" },
                  ],
                },
                {
                  label: "Contact",
                  links: [],
                },
              ].map((group) => (
                <div key={group.label}>
                  <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#6b6b6b]">{group.label}</div>
                  {group.links.length > 0 && (
                    <div className="flex flex-col items-start gap-1.5">
                      {group.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          className="relative text-sm text-[#6b6b6b] transition-colors hover:text-[#1c1c1c] after:absolute after:-bottom-px after:left-0 after:h-px after:w-0 after:bg-[#1c1c1c] after:transition-all after:duration-300 hover:after:w-full"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {group.label === "Contact" && (
                    <div className="space-y-1.5 text-sm text-[#6b6b6b]">
                      <p>{siteAuthorEmail}</p>
                      <p className="text-[#b0aea7]">{siteName} &copy; 2026</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

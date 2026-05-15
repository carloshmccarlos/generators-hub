import { buildAlternates, siteAuthor, siteAuthorEmail, siteDescription, siteKeywords, siteName, siteTitle, siteUrl } from "@/lib/site";
import type { SequenceGuide } from "@/lib/content/sequence-guides";
import type { GeneratorAbout, GeneratorFaq } from "@/lib/content/generator-info";
import { liveTools, type ToolSummary } from "@/lib/tools/registry";
import type { Metadata } from "vinext/shims/metadata";

type JsonLdNode = Record<string, unknown>;

const organizationId = `${siteUrl}#organization`;
const websiteId = `${siteUrl}#website`;
const appId = `${siteUrl}#app`;
const authorId = `${siteUrl}#author`;

function createBreadcrumbList(items: Array<{ name: string; url: string }>): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function createItemList(items: Array<{ name: string; url: string; description: string }>): JsonLdNode {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

function getToolFeatures(tool: ToolSummary): string[] {
  if (tool.id === "sequence-generator") {
    return [
      "Arithmetic sequences",
      "Geometric sequences",
      "Fibonacci sequences",
      "Random sequences",
      "Formula-based sequences",
      "CSV export",
      "Inline SVG chart output",
    ];
  }

  if (tool.id === "tiktok-comment") {
    return [
      "Grouped TikTok comments",
      "Caption-aware prompts",
      "Goal and tone controls",
      "Copy-ready results",
    ];
  }

  return [tool.name];
}

export const siteStructuredData: JsonLdNode = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      email: siteAuthorEmail,
      author: { "@id": authorId },
    },
    {
      "@type": "Person",
      "@id": authorId,
      name: siteAuthor,
      email: siteAuthorEmail,
      url: siteUrl,
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: siteName,
      url: siteUrl,
      description: siteDescription,
      inLanguage: "en",
      keywords: siteKeywords.join(", "),
      publisher: {
        "@id": organizationId,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": appId,
      name: siteName,
      applicationCategory: "WebApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description: siteDescription,
      inLanguage: "en",
      isAccessibleForFree: true,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: liveTools.map((tool) => tool.name),
      publisher: {
        "@id": organizationId,
      },
    },
    createItemList(
      liveTools.map((tool) => ({
        name: tool.name,
        url: `${siteUrl}${tool.href}`,
        description: tool.description,
      })),
    ),
  ],
};

export function buildHomeStructuredData(): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#home`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": appId,
        },
        breadcrumb: createBreadcrumbList([{ name: "Home", url: siteUrl }]),
      },
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/#collection`,
        url: siteUrl,
        name: siteTitle,
        description: siteDescription,
        mainEntity: createItemList([
          ...liveTools.map((tool) => ({
            name: tool.name,
            url: `${siteUrl}${tool.href}`,
            description: tool.description,
          })),
          {
            name: "Informatica Sequence Generator",
            url: `${siteUrl}/informatica-sequence-generator`,
            description: "Guide for Informatica Sequence Generator behavior and surrogate key flow.",
          },
          {
            name: "IICS Sequence Generator",
            url: `${siteUrl}/iics-sequence-generator`,
            description: "Guide for Sequence Generator behavior in Informatica Intelligent Cloud Services.",
          },
          {
            name: "Snowflake Sequence Generator",
            url: `${siteUrl}/snowflake-sequence-generator`,
            description: "Guide for Snowflake SEQUENCE objects and NEXTVAL usage.",
          },
          {
            name: "Sequence Generator Meaning",
            url: `${siteUrl}/sequence-generator-meaning`,
            description: "Guide to the term across math, ETL, and digital electronics contexts.",
          },
        ]),
      },
    ],
  };
}

export function buildToolStructuredData(tool: ToolSummary): JsonLdNode {
  const path = tool.href ?? `/${tool.id}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#page`,
        url: `${siteUrl}${path}`,
        name: `${tool.name} | ${siteName}`,
        description: tool.description,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        breadcrumb: createBreadcrumbList([
          { name: "Home", url: siteUrl },
          { name: tool.name, url: `${siteUrl}${path}` },
        ]),
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}${path}#app`,
        name: tool.name,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        url: `${siteUrl}${path}`,
        description: tool.description,
        inLanguage: "en",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: getToolFeatures(tool),
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}

export function buildGuideStructuredData(guide: SequenceGuide): JsonLdNode {
  const path = `/${guide.slug}`;
  const faqItems = guide.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#page`,
        url: `${siteUrl}${path}`,
        name: `${guide.title} | ${siteName}`,
        description: guide.description,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        breadcrumb: createBreadcrumbList([
          { name: "Home", url: siteUrl },
          { name: guide.title, url: `${siteUrl}${path}` },
        ]),
      },
      {
        "@type": "TechArticle",
        "@id": `${siteUrl}${path}#article`,
        headline: guide.title,
        description: guide.description,
        articleSection: guide.conceptsTitle,
        inLanguage: "en",
        mainEntityOfPage: {
          "@id": `${siteUrl}${path}#page`,
        },
        author: {
          "@id": organizationId,
        },
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}${path}#faq`,
        mainEntity: faqItems,
      },
    ],
  };
}

export function buildAboutMetadata(about: GeneratorAbout): Metadata {
  const path = `/${about.slug}`;

  return {
    title: about.title,
    description: about.description,
    applicationName: siteName,
    keywords: [about.title, "about", "generator hub", "tutorial", "guide"],
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(path),
    robots: {
      index: true,
      follow: true,
      googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    openGraph: {
      title: `${about.title} | ${siteName}`,
      description: about.description,
      siteName,
      url: `${siteUrl}${path}`,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: about.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${about.title} | ${siteName}`,
      description: about.description,
      images: [{ url: "/og-image.png", alt: about.title }],
    },
  };
}

export function buildFaqMetadata(faq: GeneratorFaq): Metadata {
  const path = `/${faq.slug}`;

  return {
    title: faq.title,
    description: faq.description,
    applicationName: siteName,
    keywords: [faq.title, "FAQ", "frequently asked questions", "help", "support"],
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(path),
    robots: {
      index: true,
      follow: true,
      googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    openGraph: {
      title: `${faq.title} | ${siteName}`,
      description: faq.description,
      siteName,
      url: `${siteUrl}${path}`,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: faq.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${faq.title} | ${siteName}`,
      description: faq.description,
      images: [{ url: "/og-image.png", alt: faq.title }],
    },
  };
}

export function buildAboutStructuredData(about: GeneratorAbout): JsonLdNode {
  const path = `/${about.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#page`,
        url: `${siteUrl}${path}`,
        name: `${about.title} | ${siteName}`,
        description: about.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        breadcrumb: createBreadcrumbList([
          { name: "Home", url: siteUrl },
          { name: about.title, url: `${siteUrl}${path}` },
        ]),
        author: { "@id": authorId },
        publisher: { "@id": organizationId },
      },
    ],
  };
}

export function buildFaqStructuredData(faq: GeneratorFaq): JsonLdNode {
  const path = `/${faq.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#page`,
        url: `${siteUrl}${path}`,
        name: `${faq.title} | ${siteName}`,
        description: faq.description,
        inLanguage: "en",
        isPartOf: { "@id": websiteId },
        breadcrumb: createBreadcrumbList([
          { name: "Home", url: siteUrl },
          { name: faq.title, url: `${siteUrl}${path}` },
        ]),
        author: { "@id": authorId },
        publisher: { "@id": organizationId },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}${path}#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { metadata as informaticaMetadata } from "@/app/informatica-sequence-generator/page";
import { metadata as informaticaConfigMetadata } from "@/app/informatica-sequence-generator-config/page";
import { metadata as iicsMetadata } from "@/app/iics-sequence-generator/page";
import { metadata as meaningMetadata } from "@/app/sequence-generator-meaning/page";
import { metadata as snowflakeMetadata } from "@/app/snowflake-sequence-generator/page";
import { metadata as sequenceToolMetadata } from "@/app/tools/sequence-generator/page";
import { buildGuideStructuredData, buildHomeStructuredData, buildToolStructuredData, siteStructuredData } from "@/lib/seo";
import { toolRegistry } from "@/lib/tools/registry";

describe("site surface", () => {
  it("marks sequence generator as a live tool", () => {
    expect(toolRegistry).toContainEqual(
      expect.objectContaining({
        id: "sequence-generator",
        status: "live",
        href: "/tools/sequence-generator",
      }),
    );
  });

  it("ships crawl files for the sequence routes", () => {
    const packageJson = readFileSync(resolve(process.cwd(), "package.json"), "utf8");
    const wrangler = readFileSync(resolve(process.cwd(), "wrangler.jsonc"), "utf8");
    const robots = readFileSync(resolve(process.cwd(), "public/robots.txt"), "utf8");
    const sitemap = readFileSync(resolve(process.cwd(), "public/sitemap.xml"), "utf8");
    const llms = readFileSync(resolve(process.cwd(), "public/llms.txt"), "utf8");

    expect(packageJson).toContain('"deploy": "pnpm run build && pnpm exec wrangler deploy --keep-vars"');
    expect(wrangler).toContain('"keep_vars": true');
    expect(wrangler).toContain('"pattern": "generators.317713.xyz"');
    expect(robots).toContain("Sitemap: https://generators.317713.xyz/sitemap.xml");
    expect(robots).toContain("llms.txt");
    expect(sitemap).toContain("/tools/sequence-generator");
    expect(sitemap).toContain("/informatica-sequence-generator");
    expect(sitemap).toContain("/informatica-sequence-generator-config");
    expect(sitemap).toContain("/iics-sequence-generator");
    expect(sitemap).toContain("/snowflake-sequence-generator");
    expect(sitemap).toContain("/sequence-generator-meaning");
    expect(sitemap).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);

    expect(llms).toContain("Compact tool hub for TikTok comments, math sequences, and ETL sequence guidance.");
    expect(llms).toContain("/tools/sequence-generator");
    expect(llms).toContain("/snowflake-sequence-generator");
    expect(llms).toContain("/sequence-generator-meaning");
  });

  it("exposes canonical metadata for the new tool and guide pages", () => {
    expect(sequenceToolMetadata.alternates?.canonical).toBe("/tools/sequence-generator");
    expect(informaticaMetadata.alternates?.canonical).toBe("/informatica-sequence-generator");
    expect(informaticaConfigMetadata.alternates?.canonical).toBe("/informatica-sequence-generator-config");
    expect(iicsMetadata.alternates?.canonical).toBe("/iics-sequence-generator");
    expect(snowflakeMetadata.alternates?.canonical).toBe("/snowflake-sequence-generator");
    expect(meaningMetadata.alternates?.canonical).toBe("/sequence-generator-meaning");
  });

  it("publishes structured data for the site, tools, and guides", () => {
    const graph = siteStructuredData["@graph"] as Array<Record<string, unknown>>;
    const softwareApplication = graph.find((node) => node["@type"] === "SoftwareApplication");

    expect(softwareApplication?.name).toBe("Generator Hub");
    expect(softwareApplication?.featureList).toContain("TikTok Comment");
    expect(softwareApplication?.featureList).toContain("Sequence Generator");

    const sequenceTool = toolRegistry.find((tool) => tool.id === "sequence-generator");
    const guide = {
      slug: "sequence-generator-meaning",
      eyebrow: "Meaning",
      title: "Sequence Generator Meaning",
      description: "Understand what sequence generator means across math, ETL, and hardware.",
      intro: "",
      conceptsTitle: "Concepts",
      concepts: [],
      tableTitle: "Table",
      table: { headers: [], rows: [] },
      stepsTitle: "Steps",
      steps: [],
      codeExamples: [],
      faq: [{ question: "What is it?", answer: "A generator." }],
      related: [],
    };

    const toolData = buildToolStructuredData(sequenceTool!);
    const guideData = buildGuideStructuredData(guide);
    const homeData = buildHomeStructuredData();

    expect((toolData["@graph"] as Array<Record<string, unknown>>)[1]?.featureList).toContain("CSV export");
    expect((guideData["@graph"] as Array<Record<string, unknown>>)[2]?.["@type"]).toBe("FAQPage");
    expect((homeData["@graph"] as Array<Record<string, unknown>>)[1]?.["@type"]).toBe("CollectionPage");
  });
});

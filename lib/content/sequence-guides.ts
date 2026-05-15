import type { Metadata } from "vinext/shims/metadata";

import { buildAlternates, siteName, siteUrl } from "@/lib/site";

export interface GuideTable {
  headers: string[];
  rows: string[][];
}

export interface GuideCodeExample {
  title: string;
  language: string;
  code: string;
}

export interface GuideFaqItem {
  question: string;
  answer: string;
}

export interface GuideLink {
  href: string;
  label: string;
}

export interface SequenceGuide {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  conceptsTitle: string;
  concepts: string[];
  tableTitle: string;
  table: GuideTable;
  stepsTitle: string;
  steps: string[];
  codeExamples: GuideCodeExample[];
  faq: GuideFaqItem[];
  related: GuideLink[];
}

export const sequenceGuideSlugs = [
  "informatica-sequence-generator",
  "informatica-sequence-generator-config",
  "iics-sequence-generator",
  "snowflake-sequence-generator",
  "sequence-generator-meaning",
] as const;

type SequenceGuideSlug = (typeof sequenceGuideSlugs)[number];

const sharedRelated: GuideLink[] = [
  { href: "/tools/sequence-generator", label: "Sequence Generator tool" },
  { href: "/sequence-generator-meaning", label: "Sequence generator meaning" },
  { href: "/snowflake-sequence-generator", label: "Snowflake guide" },
];

export const sequenceGuides: Record<SequenceGuideSlug, SequenceGuide> = {
  "informatica-sequence-generator": {
    slug: "informatica-sequence-generator",
    eyebrow: "Informatica",
    title: "Informatica Sequence Generator",
    description:
      "Learn what the Informatica Sequence Generator does, when to use it, and how NEXTVAL and CURRVAL behave in ETL mappings.",
    intro:
      "Use Sequence Generator when your mapping needs a predictable surrogate key inside PowerCenter.",
    conceptsTitle: "What It Does",
    concepts: [
      "Generates numeric values inside a mapping without relying on the source system.",
      "Usually feeds surrogate keys for dimensions, staging tables, or row-level IDs.",
      "Exposes two ports: NEXTVAL for the next generated number and CURRVAL for the current one.",
    ],
    tableTitle: "Core Ports",
    table: {
      headers: ["Element", "Meaning", "Typical Use"],
      rows: [
        ["NEXTVAL", "Next generated value in the sequence.", "Write a new surrogate key."],
        ["CURRVAL", "Current value after NEXTVAL advances.", "Reuse the same generated key downstream."],
        ["Start value", "First emitted value.", "Set the first key in a load."],
        ["Increment by", "Step size between values.", "Control key spacing or partitioning."],
      ],
    },
    stepsTitle: "Basic Flow",
    steps: [
      "Add the Sequence Generator transformation to the mapping.",
      "Configure start value, increment, and port usage.",
      "Connect NEXTVAL to the target key column that needs a new identifier.",
      "Use CURRVAL only when you need the same generated value more than once in the mapping.",
    ],
    codeExamples: [
      {
        title: "Typical surrogate-key pattern",
        language: "txt",
        code: "SRC_CUSTOMER -> EXP_CLEAN -> SEQ_CUSTOMER_KEY.NEXTVAL -> TGT_DIM_CUSTOMER.CUSTOMER_KEY",
      },
    ],
    faq: [
      {
        question: "When should I use CURRVAL?",
        answer: "Use it when one generated key needs to feed multiple downstream fields in the same mapping.",
      },
      {
        question: "Why use Sequence Generator instead of source keys?",
        answer: "Source keys often collide across systems or are not stable enough for dimensional models.",
      },
      {
        question: "Does Sequence Generator guarantee no gaps in surrogate keys?",
        answer: "No. Sequence Generator does not roll back values after session failures or row rejections. Gaps are expected and normal in ETL workflows.",
      },
      {
        question: "Can I share one Sequence Generator across multiple target tables?",
        answer: "Yes, technically, but it is not recommended. Shared generators produce interleaved key ranges, making it harder to reason about each table's key domain. Use a separate generator per target table for clean key segregation.",
      },
    ],
    related: [
      { href: "/informatica-sequence-generator-config", label: "Configuration guide" },
      { href: "/iics-sequence-generator", label: "IICS Sequence Generator" },
      { href: "/informatica-sequence-generator/about", label: "About this guide" },
      { href: "/informatica-sequence-generator/faq", label: "Extended FAQ" },
      ...sharedRelated,
    ],
  },
  "informatica-sequence-generator-config": {
    slug: "informatica-sequence-generator-config",
    eyebrow: "Informatica Config",
    title: "Informatica Sequence Generator Config",
    description:
      "Configure Informatica Sequence Generator start values, increments, and restart behavior without breaking surrogate key flows.",
    intro:
      "Most configuration problems come from start values, increment rules, or restart expectations. Lock those first.",
    conceptsTitle: "Config Priorities",
    concepts: [
      "Start value decides the first emitted number in the mapping run.",
      "Increment controls how far the generator advances each row.",
      "Restart behavior matters when a workflow resumes after a failure or a partial load.",
    ],
    tableTitle: "Settings to Check",
    table: {
      headers: ["Setting", "What to verify", "Risk if wrong"],
      rows: [
        ["Start value", "Matches the next unused key range.", "Duplicate keys in target tables."],
        ["Increment by", "Uses the expected step size.", "Unexpected gaps or collisions."],
        ["Cycle", "Usually off for surrogate keys.", "Values wrap and overwrite old key ranges."],
        ["Recovery plan", "Documents how restarts re-align keys.", "Partial loads become inconsistent."],
      ],
    },
    stepsTitle: "Safe Configuration Sequence",
    steps: [
      "Find the current maximum surrogate key in the target table.",
      "Set the start value above that maximum before the next load.",
      "Keep increment at 1 unless you have a documented multi-stream strategy.",
      "Test a restart path so the mapping does not reuse already written keys.",
    ],
    codeExamples: [
      {
        title: "Pre-load target check",
        language: "sql",
        code: "SELECT COALESCE(MAX(customer_key), 0) AS current_max_key\nFROM dim_customer;",
      },
    ],
    faq: [
      {
        question: "Should I enable cycle?",
        answer: "Not for surrogate-key generation. Cycling makes value reuse possible and breaks key uniqueness.",
      },
      {
        question: "Why did my restarted workflow skip values?",
        answer: "Sequence-style generators often favor uniqueness over perfect continuity, so gaps are normal after retries.",
      },
      {
        question: "How many cached values should I configure?",
        answer: "The default cache size (typically 1000) works for most loads. Increase it for high-volume mappings to reduce I/O overhead. Reduce it if you restart sessions frequently and want smaller gaps.",
      },
    ],
    related: [
      { href: "/informatica-sequence-generator", label: "Informatica basics" },
      { href: "/snowflake-sequence-generator", label: "Snowflake sequence guide" },
      { href: "/informatica-sequence-generator-config/about", label: "About this guide" },
      { href: "/informatica-sequence-generator-config/faq", label: "Extended FAQ" },
      ...sharedRelated,
    ],
  },
  "iics-sequence-generator": {
    slug: "iics-sequence-generator",
    eyebrow: "IICS",
    title: "IICS Sequence Generator",
    description:
      "Understand how Sequence Generator works in Informatica Intelligent Cloud Services and where it differs from PowerCenter mappings.",
    intro:
      "In IICS, Sequence Generator still solves surrogate-key creation, but the surrounding mapping experience is cloud-native and lighter.",
    conceptsTitle: "Key Differences",
    concepts: [
      "The transformation is configured inside a cloud mapping instead of a PowerCenter repository object.",
      "Use it when target rows need generated IDs during ingestion, staging, or dimensional loads.",
      "The core intent stays the same: stable, generated numbers inside the ETL flow.",
    ],
    tableTitle: "IICS vs PowerCenter",
    table: {
      headers: ["Area", "IICS", "PowerCenter"],
      rows: [
        ["Authoring", "Cloud mapping designer", "Desktop repository tools"],
        ["Typical use", "Cloud pipelines and synchronized loads", "On-prem ETL and warehouse feeds"],
        ["Generator goal", "Generated surrogate keys", "Generated surrogate keys"],
      ],
    },
    stepsTitle: "Typical Mapping Setup",
    steps: [
      "Create or open the IICS mapping task.",
      "Add Sequence Generator where the row stream needs generated values.",
      "Map the generated output to the target key column.",
      "Validate the target load with a short sample run before the full task.",
    ],
    codeExamples: [
      {
        title: "Simple cloud mapping flow",
        language: "txt",
        code: "Source -> Expression -> Sequence Generator -> Target",
      },
    ],
    faq: [
      {
        question: "Does IICS Sequence Generator replace database sequences?",
        answer: "No. It is an ETL-side generator, useful when you want the mapping to control ID assignment.",
      },
      {
        question: "When should I use a database sequence instead?",
        answer: "Use database-native sequences when the warehouse owns the key lifecycle or multiple loaders must share one source of truth.",
      },
      {
        question: "Can I migrate a PowerCenter mapping with Sequence Generator to IICS?",
        answer: "Yes, but review the configuration. IICS mappings have fewer configuration options than PowerCenter for Sequence Generator. The core behavior stays the same, but some advanced settings like cache size may not transfer directly.",
      },
    ],
    related: [
      { href: "/informatica-sequence-generator", label: "PowerCenter basics" },
      { href: "/snowflake-sequence-generator", label: "Snowflake comparison" },
      { href: "/iics-sequence-generator/about", label: "About this guide" },
      { href: "/iics-sequence-generator/faq", label: "Extended FAQ" },
      ...sharedRelated,
    ],
  },
  "snowflake-sequence-generator": {
    slug: "snowflake-sequence-generator",
    eyebrow: "Snowflake",
    title: "Snowflake Sequence Generator",
    description:
      "Create and use Snowflake SEQUENCE objects with NEXTVAL for inserts, staging tables, and surrogate keys.",
    intro:
      "Snowflake sequences are database objects, not ETL transformations. They are useful when the warehouse should own generated IDs.",
    conceptsTitle: "When to Use It",
    concepts: [
      "Use `CREATE SEQUENCE` when key generation belongs in the database layer.",
      "Call `NEXTVAL` in inserts, merges, or default expressions when new rows need unique numeric IDs.",
      "Prefer one sequence per key domain so ID ranges stay easy to reason about.",
    ],
    tableTitle: "Important Syntax",
    table: {
      headers: ["Syntax", "Purpose", "Example"],
      rows: [
        ["CREATE SEQUENCE", "Define the sequence object.", "CREATE SEQUENCE customer_seq START = 1 INCREMENT = 1;"],
        ["NEXTVAL", "Advance and return the next value.", "customer_seq.NEXTVAL"],
        ["ALTER SEQUENCE", "Adjust behavior later.", "ALTER SEQUENCE customer_seq SET INCREMENT = 10;"],
      ],
    },
    stepsTitle: "Warehouse-Owned Key Flow",
    steps: [
      "Create the sequence object in the schema that owns the target table.",
      "Reference `sequence_name.NEXTVAL` inside the insert or merge statement.",
      "Validate that downstream ETL does not also generate a competing key.",
      "Document the sequence owner so loads and DDL stay aligned.",
    ],
    codeExamples: [
      {
        title: "Create and use a sequence",
        language: "sql",
        code: "CREATE OR REPLACE SEQUENCE customer_seq START = 1 INCREMENT = 1;\n\nINSERT INTO dim_customer (customer_key, customer_name)\nSELECT customer_seq.NEXTVAL, customer_name\nFROM stg_customer;",
      },
    ],
    faq: [
      {
        question: "Why are there gaps in sequence values?",
        answer: "Gaps are normal. Uniqueness matters more than perfectly contiguous numbering.",
      },
      {
        question: "Should ETL and Snowflake both generate keys?",
        answer: "No. Pick one owner for the surrogate key lifecycle or the model will drift.",
      },
      {
        question: "Can I use a Snowflake sequence as a primary key default?",
        answer: "Yes. Assign the sequence NEXTVAL as the default value for a column: `ALTER TABLE t ALTER COLUMN id SET DEFAULT seq.NEXTVAL`. This moves key generation into the database layer for all insert operations.",
      },
      {
        question: "How do I reset a sequence after truncating the target table?",
        answer: "Use `ALTER SEQUENCE seq_name SET VALUE = 0` to reset to the initial value. The next NEXTVAL call returns the START value (or START + INCREMENT if SET VALUE is above it).",
      },
    ],
    related: [
      { href: "/informatica-sequence-generator", label: "Informatica comparison" },
      { href: "/iics-sequence-generator", label: "IICS guide" },
      { href: "/snowflake-sequence-generator/about", label: "About this guide" },
      { href: "/snowflake-sequence-generator/faq", label: "Extended FAQ" },
      ...sharedRelated,
    ],
  },
  "sequence-generator-meaning": {
    slug: "sequence-generator-meaning",
    eyebrow: "Meaning",
    title: "Sequence Generator Meaning",
    description:
      "Understand what 'sequence generator' means across math tools, ETL software, and digital electronics before choosing the right solution.",
    intro:
      "Sequence generator is a shared term. The right answer depends on whether you mean numbers, ETL keys, or hardware state transitions.",
    conceptsTitle: "Three Common Meanings",
    concepts: [
      "Math tool: generates arithmetic, geometric, Fibonacci, random, or formula-based number sequences.",
      "ETL tool: generates numeric identifiers for records inside Informatica, IICS, or a warehouse like Snowflake.",
      "Digital electronics: describes logic that emits a defined output sequence over clock cycles.",
    ],
    tableTitle: "Which One Do You Need?",
    table: {
      headers: ["Context", "What users want", "Best starting point"],
      rows: [
        ["Math", "A fast web tool and chart.", "/tools/sequence-generator"],
        ["ETL", "How-to guidance and configuration help.", "/informatica-sequence-generator"],
        ["Digital electronics", "Concept explanation and diagrams.", "/sequence-generator-meaning"],
      ],
    },
    stepsTitle: "Quick Decision Path",
    steps: [
      "If you need terms like 2, 5, 8, 11, use the math tool.",
      "If you need surrogate keys in a mapping, use the ETL guides.",
      "If you are studying state machines or counters, read the electronics explanation and diagram.",
    ],
    codeExamples: [
      {
        title: "Math-style sequence rule",
        language: "txt",
        code: "a(n) = 2 * n^2 + 1",
      },
      {
        title: "ETL-style generated key reference",
        language: "txt",
        code: "Sequence Generator -> NEXTVAL -> surrogate_key",
      },
    ],
    faq: [
      {
        question: "Is a sequence generator always a calculator?",
        answer: "No. In ETL and hardware contexts, it usually refers to a mechanism that emits ordered values over time or rows.",
      },
      {
        question: "Why do search results mix unrelated topics?",
        answer: "Because the same phrase is used by math tools, data platforms, and digital electronics courses.",
      },
      {
        question: "How do I know which type of sequence generator I need?",
        answer: "Check your context. If you are working with numbers and patterns, you need a math tool. If you are building a data pipeline, you need an ETL sequence generator. If you are studying digital circuits, you need a hardware state machine explanation.",
      },
    ],
    related: [
      { href: "/tools/sequence-generator", label: "Try the math tool" },
      { href: "/informatica-sequence-generator", label: "Read the Informatica guide" },
      { href: "/snowflake-sequence-generator", label: "Read the Snowflake guide" },
      { href: "/sequence-generator-meaning/about", label: "About this guide" },
      { href: "/sequence-generator-meaning/faq", label: "Extended FAQ" },
    ],
  },
};

export function getSequenceGuide(slug: SequenceGuideSlug) {
  return sequenceGuides[slug];
}

export function buildGuideMetadata(guide: SequenceGuide): Metadata {
  const path = `/${guide.slug}`;

  return {
    title: guide.title,
    description: guide.description,
    applicationName: siteName,
    keywords: [
      guide.title,
      guide.eyebrow,
      guide.conceptsTitle,
      "sequence generator",
      "ETL sequence guide",
      "AI search",
    ],
    metadataBase: new URL(siteUrl),
    alternates: buildAlternates(path),
    robots: {
      index: true,
      follow: true,
      googleBot: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    openGraph: {
      title: `${guide.title} | ${siteName}`,
      description: guide.description,
      siteName,
      url: `${siteUrl}${path}`,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | ${siteName}`,
      description: guide.description,
      images: [
        {
          url: "/og-image.png",
          alt: guide.title,
        },
      ],
    },
  };
}

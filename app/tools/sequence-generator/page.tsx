import type { Metadata } from "vinext/shims/metadata";

import { JsonLd } from "@/components/seo/json-ld";
import { SequenceGeneratorTool } from "@/components/tools/sequence-generator";
import { getGeneratorAbout, getGeneratorFaq } from "@/lib/content/generator-info";
import { buildAboutStructuredData, buildFaqStructuredData, buildToolStructuredData } from "@/lib/seo";
import { getToolById } from "@/lib/tools/registry";
import { buildAlternates, siteKeywords, siteName, siteUrl } from "@/lib/site";

const tool = getToolById("sequence-generator");
const aboutData = getGeneratorAbout("sequence-generator");
const faqData = getGeneratorFaq("sequence-generator");

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
      <JsonLd data={buildAboutStructuredData(aboutData)} />
      <JsonLd data={buildFaqStructuredData(faqData)} />
      <SequenceGeneratorTool>
        <div className="mt-8 flex flex-col gap-8 pb-12">
          {/* About Section */}
          <section className="relative overflow-hidden rounded-[2rem] border border-[#e5e4de]/70 bg-white/60 p-6 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:p-10">
            <div className="relative z-10 mb-6">
              <div className="mb-4 inline-flex items-center rounded-full border border-black/5 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1c1c1c] shadow-sm">
                {aboutData.eyebrow}
              </div>
              <h2 className="font-display text-[1.75rem] font-medium leading-[1.2] text-[#1c1c1c] sm:text-4xl">
                {aboutData.title}
              </h2>
            </div>
            
            <div className="relative z-10 mb-10 space-y-5 text-[15px] leading-[1.7] text-[#4a4a4a] sm:text-[16px]">
              {aboutData.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {aboutData.features.length > 0 && (
              <div className="relative z-10 mt-10">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.08em] text-[#6b6b6b]">
                  Features & Highlights
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {aboutData.features.map((f) => (
                    <li key={f} className="flex items-start gap-3.5 rounded-2xl border border-[#e5e4de]/50 bg-white/80 p-5 shadow-sm transition hover:border-[#d0cfc9]">
                      <div className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-black/[0.03] text-[#1c1c1c]">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <span className="text-[14px] leading-relaxed text-[#4a4a4a]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* FAQ Section */}
          <section className="relative overflow-hidden rounded-[2rem] border border-[#e5e4de]/70 bg-white/60 p-6 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:p-10">
             <div className="relative z-10 mb-10">
              <div className="mb-4 inline-flex items-center rounded-full border border-black/5 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1c1c1c] shadow-sm">
                {faqData.eyebrow}
              </div>
              <h2 className="font-display text-[1.75rem] font-medium leading-[1.2] text-[#1c1c1c] sm:text-4xl">
                {faqData.title}
              </h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-[#6b6b6b]">{faqData.intro}</p>
            </div>

            <div className="relative z-10 grid gap-4 sm:grid-cols-2">
              {faqData.items.map((item) => (
                <div key={item.question} className="flex flex-col rounded-[1.25rem] border border-[#e5e4de]/50 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#d0cfc9] hover:shadow-md">
                  <h3 className="text-[16px] font-semibold leading-snug text-[#1c1c1c]">{item.question}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-[#6b6b6b]">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SequenceGeneratorTool>
    </>
  );
}

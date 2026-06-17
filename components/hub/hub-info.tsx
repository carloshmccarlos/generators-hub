"use client";

import { getGeneratorAbout, getGeneratorFaq } from "@/lib/content/generator-info";

export function HubInfo() {
  const about = getGeneratorAbout("hub");
  const faq = getGeneratorFaq("hub");

  return (
    <section className="opacity-75 transition-opacity hover:opacity-100">
      <details className="group [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between border-t border-[var(--color-border)] py-6 font-mono text-[11px] font-medium uppercase tracking-widest text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
          <span>More Information & FAQ</span>
          <span className="transition-transform duration-300 group-open:-rotate-180">↓</span>
        </summary>

        <div className="mt-8 space-y-12 pb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-[var(--color-foreground)]">
              {about.title}
            </h2>
            <div className="space-y-3 text-[14px] leading-relaxed text-[var(--color-muted)]">
              <p>{about.intro}</p>
              {about.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-[var(--color-muted)]">
              {about.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[oklch(58%_0.14_65)]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="space-y-6">
            <h2 className="font-display text-xl font-bold text-[var(--color-foreground)]">
              {faq.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {faq.items.map((item, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-[14px] font-semibold text-[var(--color-foreground)]">
                    {item.question}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[var(--color-muted)]">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </details>
    </section>
  );
}

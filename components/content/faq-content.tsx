import type { GeneratorFaq } from "@/lib/content/generator-info";
import { StaticPage } from "./static-page";

interface FaqContentProps {
  faq: GeneratorFaq;
}

export function FaqContent({ faq }: FaqContentProps) {
  return (
    <StaticPage eyebrow={faq.eyebrow} title={faq.title} intro={faq.intro}>
      <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
        <div className="space-y-3">
          {faq.items.map((item) => (
            <div key={item.question} className="rounded-2xl border border-border/70 bg-background px-4 py-4">
              <h2 className="text-base font-semibold text-foreground">{item.question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {faq.links.length > 0 && (
        <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
          <div className="font-mono-label text-muted mb-4">Related Pages</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {faq.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-sm font-medium text-foreground transition hover:border-brand/20"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </StaticPage>
  );
}

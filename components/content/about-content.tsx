import type { GeneratorAbout } from "@/lib/content/generator-info";
import { StaticPage } from "./static-page";

interface AboutContentProps {
  about: GeneratorAbout;
}

export function AboutContent({ about }: AboutContentProps) {
  return (
    <StaticPage eyebrow={about.eyebrow} title={about.title} intro={about.intro}>
      <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
        <div className="space-y-4 text-[15px] leading-relaxed text-foreground">
          {about.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
        <div className="font-mono-label text-muted mb-4">Features &amp; Highlights</div>
        <ul className="space-y-3">
          {about.features.map((f) => (
            <li key={f} className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm leading-relaxed text-foreground">
              {f}
            </li>
          ))}
        </ul>
      </section>

      {about.links.length > 0 && (
        <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
          <div className="font-mono-label text-muted mb-4">Related Pages</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {about.links.map((link) => (
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

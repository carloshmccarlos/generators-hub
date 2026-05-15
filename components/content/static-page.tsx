import type { ReactNode } from "react";

interface StaticPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

export function StaticPage({ eyebrow, title, intro, children }: StaticPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 bg-dot-grid opacity-100" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-[980px] flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:px-10">
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono-label text-muted shadow-sm transition hover:border-brand/20 hover:text-foreground"
          >
            Back to hub
          </a>
        </div>

        <article className="space-y-8">
          <header className="max-w-3xl space-y-4">
            <div className="inline-flex items-center rounded-full border border-brand/10 bg-brand-soft px-3.5 py-1 font-mono-label text-brand shadow-sm">
              {eyebrow}
            </div>
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-[3.2rem]">
              {title}
            </h1>
            <p className="max-w-2xl text-[16px] leading-relaxed text-muted">{intro}</p>
          </header>
          {children}
        </article>
      </main>
    </div>
  );
}

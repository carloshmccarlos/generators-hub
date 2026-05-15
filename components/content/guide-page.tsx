"use client";

import type { ReactNode } from "react";

import { CopyButton } from "@/components/comment-assistant/copy-button";
import type { SequenceGuide } from "@/lib/content/sequence-guides";

interface GuidePageProps {
  guide: SequenceGuide;
  children?: ReactNode;
}

export function GuidePage({ guide, children }: GuidePageProps) {
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
              {guide.eyebrow}
            </div>
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-foreground sm:text-[3.2rem]">
              {guide.title}
            </h1>
            <p className="max-w-2xl text-[16px] leading-relaxed text-muted">{guide.intro}</p>
          </header>

          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="font-mono-label text-muted">{guide.conceptsTitle}</div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
              {guide.concepts.map((concept) => (
                <li key={concept} className="rounded-2xl border border-border/70 bg-background px-4 py-3">
                  {concept}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="font-mono-label text-muted">{guide.tableTitle}</div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/80">
              <table className="w-full border-collapse">
                <thead className="bg-surface-strong">
                  <tr>
                    {guide.table.headers.map((header) => (
                      <th key={header} className="px-4 py-3 text-left font-mono-label text-muted">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {guide.table.rows.map((row) => (
                    <tr key={row.join("|")} className="border-t border-border/70">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 text-sm leading-relaxed text-foreground">
                          {cell.startsWith("/") ? <a href={cell} className="text-brand underline-offset-2 hover:underline">{cell}</a> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="font-mono-label text-muted">{guide.stepsTitle}</div>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground">
              {guide.steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3">
                  <span className="font-mono-label text-brand">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {children}

          <section className="space-y-4">
            {guide.codeExamples.map((example) => (
              <div key={example.title} className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-mono-label text-muted">Code</div>
                    <h2 className="mt-1 text-lg font-semibold text-foreground">{example.title}</h2>
                  </div>
                  <CopyButton
                    onClick={() => void navigator.clipboard.writeText(example.code)}
                    text="Copy"
                    variant="subtle"
                  />
                </div>
                <pre className="overflow-x-auto rounded-2xl border border-border/80 bg-background p-4 text-sm leading-relaxed text-foreground">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="font-mono-label text-muted">FAQ</div>
            <div className="mt-4 space-y-3">
              {guide.faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-border/70 bg-background px-4 py-4">
                  <h2 className="text-base font-semibold text-foreground">{item.question}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
            <div className="font-mono-label text-muted">Related</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {guide.related.map((link) => (
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
        </article>
      </main>
    </div>
  );
}

export function MeaningDiagram() {
  return (
    <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
      <div className="font-mono-label text-muted">Diagram</div>
      <h2 className="mt-1 text-lg font-semibold text-foreground">Digital electronics view</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <div className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-center text-sm font-medium text-foreground">
          Clock
        </div>
        <div className="text-center font-mono-label text-muted">-&gt;</div>
        <div className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-center text-sm font-medium text-foreground">
          State register
        </div>
        <div className="text-center font-mono-label text-muted">-&gt;</div>
        <div className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-center text-sm font-medium text-foreground">
          Next-state logic
        </div>
        <div className="text-center font-mono-label text-muted">-&gt;</div>
        <div className="rounded-2xl border border-border/70 bg-background px-4 py-4 text-center text-sm font-medium text-foreground">
          Output sequence
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        In hardware, a sequence generator usually means logic that advances state on each clock cycle and emits a defined pattern over time.
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-3 px-6">
      <h1 className="text-2xl font-semibold">Ativa Site</h1>
      <p className="text-sm text-[var(--foreground)]/70">
        Site scaffold (Phase 0). Content, blocks, templates and design tokens land phase by phase
        per <code>docs/TRACKER.md</code>; pages render from the CMS via the SDK.
      </p>
    </main>
  );
}

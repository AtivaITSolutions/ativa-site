---
description: Reconcile the code with the docs — list every mismatch and wait for approval before editing.
allowed-tools: Read, Glob, Grep
---

Compare the current code in this repo against the documentation and report drift. **Do not edit anything yet** — this is a review step.

1. **Re-read** (don't rely on memory — I may have edited these by hand):
   - `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE.md`, `docs/DESIGN.md`, `docs/SEO.md`, `docs/SECURITY.md`, `docs/TESTING.md`, `docs/DECISIONS.md`, `docs/TRACKER.md`, `docs/CHANGELOG.md`
   - the SDK contract at `../ativa-cms/docs/SDK.md` and the schema at `../ativa-cms/docs/DATABASE.md`
   - `.env.example` and the `Commands` section of `CLAUDE.md`

2. **Find every mismatch** between code and docs, for example:
   - blocks/components whose fields or variants differ from `docs/DESIGN.md` or the SDK contract
   - env vars used in code but missing from `.env.example` (or vice versa)
   - scripts in `package.json` not reflected in the `Commands` section
   - URL/redirect/schema-markup behavior that diverges from `docs/SEO.md`
   - data access that doesn't match `docs/DATABASE.md` / the schema

3. **Report** each mismatch as: `file:line` → what the code does → what the doc says → proposed fix, and which side you believe is correct.

4. **If code and docs genuinely disagree on intent**, flag it and ask me which is the source of truth. Never silently change a doc to match buggy code, and never edit `../ativa-cms`.

5. **Wait for my approval** before making any edits.

# Ativa Site

Rebuild of ativaitsolutions.com (currently WordPress + Elementor) as a Next.js website whose content is managed by the Ativa CMS; hundreds of service, location, service-in-location and blog pages.

**Stack:** Next.js (App Router, TypeScript strict), standalone app (not a monorepo). Content read from MongoDB Atlas `site_ativa` via a **read-only** DB user and the `@ativa/cms-sdk` package (dev: `"@ativa/cms-sdk": "file:../ativa-cms/packages/sdk"`). Cloudinary images, Tailwind CSS + this site's own design tokens. Self-hosted on our VPS (PM2, Nginx) behind Cloudflare, built with `output: "standalone"`. No Vercel-only features.

## Commands
<!-- Scripts are created in a later phase; verify each once they exist. -->
- `npm run dev` — start the dev server. _TODO: verify once scripts exist._
- `npm run lint` — lint. _TODO: verify once scripts exist._
- `npm run typecheck` — TypeScript check. _TODO: verify once scripts exist._
- `npm run test` — run tests. _TODO: verify once scripts exist._
- `npm run build` — production build. _TODO: verify once scripts exist._
- `npm run cms:push` — send block and template definitions to the CMS. _TODO: verify once scripts exist._

## Workspace
This repo lives next to `../ativa-cms/` in the same workspace folder. The two repos are independent (separate Git, package.json, env, CI, deploy); the only code link is `@ativa/cms-sdk`.

- **SDK contract:** `../ativa-cms/docs/SDK.md` — read before touching blocks, templates or data access.
- **Database schema:** `../ativa-cms/docs/DATABASE.md` — the source of truth for the data model.
- The workspace root holds `CLAUDE.md` and `PROJECT-BRIEF.md` (the full specification).

## Docs index
Read the relevant doc before working on that area. Don't import all docs with `@` — load what you need, to save context.
- `docs/PRD.md` — what we're building and for whom; scope. Read before changing scope or features.
- `docs/ARCHITECTURE.md` — stack, folders, data flow, env vars, deployment. Read before structural changes.
- `docs/DATABASE.md` — what this site reads and the read-only user. Read before data access. (Schema: `../ativa-cms/docs/DATABASE.md`.)
- `docs/DESIGN.md` — design tokens, components, block catalogue. Read before any UI or block.
- `docs/SEO.md` — URL rules, metadata, structured data, redirects. Read before anything touching URLs or markup.
- `docs/SECURITY.md` — threat model and per-feature checklist. Read before forms, tokens or signatures.
- `docs/TESTING.md` — what to test and the definition of done. Read before writing tests or declaring done.
- `docs/DECISIONS.md` — ADRs. Read/append when making a significant decision.
- `docs/TRACKER.md` — phases and tasks; the current phase. Read at the start of every task.
- `docs/CHANGELOG.md` — what changed, newest first. Update when a phase closes.
- `../ativa-cms/docs/SDK.md` and `../ativa-cms/docs/DATABASE.md` — the shared contract and schema (above).

## Rules
- Work **phase by phase** per `docs/TRACKER.md`. Stop at the end of each phase for my review.
- Never read, print or log `.env` files or secrets. Never hardcode keys.
- This site **never writes to the database** and never holds write credentials or login code. Forms POST to the CMS, never to the database.
- Blocks follow the SDK contract **exactly**: the definition file (JSON-serializable, pushed to the CMS) stays separate from the React component.
- Keep **every existing WordPress URL exactly** as it is (flat root slugs with trailing slash), per `docs/SEO.md`.
- Style **only** through the design tokens in `docs/DESIGN.md`. No one-off colors, sizes or fonts.
- Validate all external input and all block props (Zod via the SDK).
- Check current library docs before using a library; don't rely on memory.
- Never install a dependency without saying why.
- Never say "done" without running lint, typecheck, tests and build.

## Docs maintenance
- `docs/` are the source of truth. I may edit them by hand at any time; always **re-read** the relevant doc instead of relying on what you remember from earlier in the session.
- If code and docs disagree, **STOP and ask me** which is right. Never silently change a doc to match buggy code.
- Update docs in the **same task** as the code change:
  - new block or token → `DESIGN.md`
  - URL, redirect or schema-markup change → `SEO.md`
  - new decision → `DECISIONS.md`
  - task done → `TRACKER.md`
  - phase done → `CHANGELOG.md`
  - new env var → `.env.example`
  - new command → `CLAUDE.md`
  - scope change → `PRD.md` (ask me first)
- A needed SDK or database change comes to me as a **question**, never as an edit to `../ativa-cms`.
- Every doc has a `Last updated: YYYY-MM-DD` line at the top; update it when you edit the doc.

## Never
- Never run `git add` / `commit` / `push` — suggest a commit message instead.
- Never delete files without asking.
- Never disable a security check to make something pass.
- Never edit files in `../ativa-cms` from a session opened in this repo.

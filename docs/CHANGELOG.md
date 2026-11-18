# Changelog — Ativa Site

Last updated: 2026-11-18

> Purpose: a human-readable log of what changed, newest first, in the style of [Keep a Changelog](https://keepachangelog.com/). Add an entry when a phase closes (via `/phase-done`) or when a notable change ships. Group changes under Added / Changed / Fixed / Removed / Security.

## [Unreleased]

### Added
- Documentation-driven project scaffold: `CLAUDE.md`, `README.md`, `.env.example`, `.gitignore`.
- `.claude/` config: `settings.json` permissions, slash commands (`/phase-done`, `/update-docs`, `/security-review`), and read-only review agents (`security-reviewer`, `code-reviewer`).
- `docs/` templates: PRD, Architecture, Database, Design, SEO, Security, Testing, Decisions, Tracker, Changelog.
- Docs filled from `PROJECT-BRIEF.md` (PRD, Architecture, Database, Design, SEO, Security, Testing, Decisions, Tracker with phases 0–11 + Later).
- **Phase 0 — App scaffold:** standalone Next.js 16 app (React 19, Tailwind v4, `output: "standalone"`, port 3000), `@ativa/cms-sdk` installed via `file:../ativa-cms/packages/sdk` (`transpilePackages`).
- `.nvmrc` (20.19.0); scripts `dev`/`lint`/`typecheck`/`test`/`build` plus a `cms:push` placeholder. Checks pass; site runs on `:3000`.
- **Phase 1 — SDK adopt:** example block `blocks/hero/definition.ts` (`heroDef`) that type-checks against `@ativa/cms-sdk`; added `zod` dependency. Site typecheck/lint/build/test green.
- **Phase 2 — read path:** `hero`/`richText`/`ctaBanner` blocks + registry (safe Tiptap-JSON renderer); catch-all `[...path]` + home routes with `trailingSlash: true`, `generateMetadata`, `notFound`; `lib/cms.ts` read layer via `@ativa/cms-sdk/server` (read-only, `server-only`, per-path `unstable_cache` tag); `cms.config.ts`; dev-only `scripts/seed.mjs`; Atlas setup guide.
- Build switched to **webpack** (`--webpack`) with Tailwind v4 via PostCSS (`@tailwindcss/postcss`), because Turbopack can't resolve the `file:` SDK dep during dev; added dep `mongodb` (seed + SDK runtime). See `../ativa-cms/docs/DECISIONS.md` ADR-017.
- **Phase 3b-i — schema push (site side):** real `cms:push` — `blocks/definitions.ts` (definitions only, no React) sent to the CMS via `@ativa/cms-sdk/cli` `pushSchema` from `scripts/cms-push.ts`, run with **tsx** (`node --import tsx`). New env vars `CMS_URL`, `CMS_API_KEY` (optional `GIT_COMMIT`). Added devDep `tsx`. Typecheck/lint/build green.
- **Phase 3b-iii — revalidate (site side):** `app/api/revalidate/route.ts` using `createRevalidateHandler` from `@ativa/cms-sdk/next` — verifies the CMS's `x-cms-signature` HMAC, then revalidates the per-path cache tags. New env var `CMS_REVALIDATE_SECRET` (shared with the CMS registry). Typecheck/lint/build green.
- **Phase 5 — media (site side):** images referenced by `{ mediaId }` now render for real. `lib/cms.ts#getPageMedia` resolves a page's media via the SDK (`collectMediaIds` + `getMediaByIds` 0.6.0) and passes the map to `<PageRenderer media={…}>`; `lib/cloudinary.ts` is a `next/image` loader that inserts `f_auto,q_auto,w_<width>` into the stored Cloudinary URL (no `remotePatterns` needed); `components/CmsImage.tsx` renders responsive images with required alt and a placeholder when media is missing; `Hero` uses it. No new env var. Typecheck/lint/build green.
- **Phase 4d — redirects (site side):** `proxy.ts` (Next 16's Node-runtime middleware, renamed from `middleware.ts`) honors CMS-managed redirects — on a content path it looks up the `redirects` collection via the SDK's new `getRedirectByPath` (0.5.0) and emits a real **301** with `NextResponse.redirect(url, 301)` (trailing-slash-normalized, query preserved), before routing/404. `lib/cms.ts#getRedirect`. No new env var. Typecheck/lint/build green.
- **Phase 4a — preview (site side):** `app/api/preview/route.ts` (`createPreviewHandler`) verifies the CMS's signed token + expiry, enables Draft Mode, and redirects to the path; `lib/cms.ts` reads `draftBlocks` uncached in Draft Mode; `app/api/preview/exit` leaves Draft Mode. New env var `CMS_PREVIEW_SECRET` (shared with the CMS registry). Typecheck/lint/build green.

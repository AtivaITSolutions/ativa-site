# Tracker — Ativa Site

Last updated: 2026-11-18

> Purpose: the single place that says what phase we are in and what is left to do. Work proceeds phase by phase; stop at the end of each phase for review. Check off tasks as they land and move the "Current phase" marker. Record anything blocking in the last section.

## Current phase

**→ Phase 6 — Ativa design system + block library — site side** (next; stops for approval)

_Phase 5 (media, site side) is **code complete**: media resolution + Cloudinary `next/image` loader + `CmsImage` (SDK 0.6.0), Hero renders real images. All checks green 2026-11-18, awaiting review. Live render needs Atlas + a Cloudinary-backed media item. **Phase 6 is gated** on the Ativa inspiration designs + locked fonts/colors (see Blocked)._

## Phases

Same phase numbers as `../ativa-cms/docs/TRACKER.md`. These are the **site** tasks only. Do not build later-phase work early.

### Phase 0 — App scaffold ✅
- [x] Next.js 16 app (Tailwind v4, `output: "standalone"`, port 3000)
- [x] `@ativa/cms-sdk` as a `file:../ativa-cms/packages/sdk` dependency (symlinked; `transpilePackages`)
- [x] Scripts: `dev`, `lint`, `typecheck`, `test`, `build` (+ `cms:push` placeholder); `.nvmrc` (20.19.0)
- **Done when:** the site runs locally on `:3000` and all checks pass (admin runs on `:3001` in the CMS repo). ✅ Verified 2026-11-13 — site boots on :3000; typecheck/lint/build/test all green.

### Phase 1 — SDK contract (adopt) ✅
- [x] Add an example `heroDef` that type-checks against the SDK inside this repo (`blocks/hero/definition.ts`)
- [x] Add `zod` dependency (SDK source is transpiled into the site; block props validated via Zod)
- **Done when:** the example `heroDef` type-checks in `ativa-site` (SDK tests pass in the CMS repo). ✅ Verified 2026-11-13 — site typecheck/lint/build/test all green.

### Phase 2 — Minimal site (read path) ✅
- [x] `hero`, `richText`, `ctaBanner` blocks (definition + component; safe Tiptap-JSON renderer)
- [x] Block registry (`blocks/index.ts`)
- [x] Catch-all `[...path]` + home route, `trailingSlash: true`, `generateMetadata`, `notFound`
- [x] Per-path cache tags (`unstable_cache`, tag `page:<path>`)
- [x] Seed script for home and `/seo-agency-in-los-angeles/` (dev-only readWrite URI)
- [x] Atlas setup guide (`docs/DATABASE.md` → Atlas setup)
- **Done when:** both seeded pages render at their exact URLs, unknown paths 404, and bad block data does not crash. ⚠️ Typecheck/lint/build/test green and dev server boots (2026-11-13); **full page rendering requires a live Atlas DB + `npm run seed`** (credentials needed — run by the maintainer).
- Note: site builds with **webpack** (`--webpack`) + Tailwind-via-PostCSS while the SDK is a `file:` dep (Turbopack can't resolve it) — see `../ativa-cms/docs/DECISIONS.md` ADR-017.

### Phase 3 — Minimal CMS (write path) — site side
- [x] `cms:push` script (send block/template definitions to the CMS) — **3b-i**, tsx runner + `@ativa/cms-sdk/cli`; checks green 2026-11-17 (live push needs a site + API key)
- [x] `/api/revalidate` route verifying the `x-cms-signature` HMAC — **3b-iii** (`createRevalidateHandler` from `@ativa/cms-sdk/next`; env `CMS_REVALIDATE_SECRET`); checks green 2026-11-17
- **Done when:** an edit published in the CMS appears on the running site within seconds without a rebuild. ⚠️ Code complete; live flow needs Atlas + matching revalidate secret in `.env` and the CMS registry.

### Phase 4 — Drafts, preview, revisions — site side
- [x] `/api/preview` route: verify signed token (signature + expiry), enable Draft Mode, render `draftBlocks` — **4a** (`createPreviewHandler`; `lib/cms.ts` reads `draftBlocks` uncached in Draft Mode; `/api/preview/exit` leaves it). Env `CMS_PREVIEW_SECRET`. Checks green 2026-11-17.
- [x] Device-width preview works inside the CMS iframe — **4a** (CMS embeds this route; dev only — prod needs `frame-ancestors` for the CMS origin).
- [x] `proxy.ts` honors auto-301 redirects on slug changes — **4d** (Next 16 Node-runtime `proxy.ts`; `lib/cms.ts#getRedirect` via SDK `getRedirectByPath` 0.5.0; real 301 via `NextResponse.redirect(url, 301)`); checks green 2026-11-18
- **Done when:** a valid preview shows draft content, an expired/forged token is refused, and slug-change 301s resolve on the site. ⚠️ Code complete 2026-11-18; live 301 needs Atlas + a redirect row (created by changing a published page's path in the CMS).

### Phase 5 — Media library — site side ✅ — code complete & all checks green (2026-11-18)
- [x] Resolve media by id to URL at render — `lib/cms.ts#getPageMedia` (SDK `collectMediaIds` + `getMediaByIds`) builds a media map passed to `<PageRenderer media={…}>`
- [x] Cloudinary image loader + required alt + graceful fallback — `lib/cloudinary.ts` (`next/image` loader, inserts `f_auto,q_auto,w_<width>`), `components/CmsImage.tsx` (alt always present, placeholder when media missing); `Hero` renders the real image
- **Done when:** images picked in the CMS render correctly on the site via the loader. ⚠️ Code complete 2026-11-18; live render needs a running Atlas + a Cloudinary-backed media item. See `../ativa-cms/docs/DECISIONS.md` ADR-023.

### Phase 6 — Ativa design system + block library (stops for approval)
- [ ] Propose design tokens and a `/design-system` page from the inspiration designs, then **wait for approval**
- [ ] Build ~25 blocks in batches of ~5, each with a `/blocks` catalogue entry, reviewed after each batch
- [ ] Push schema (`cms:push`) when the set is complete
- **Done when:** tokens and the block library are approved, all blocks render correctly, and the schema is pushed to the CMS. (Depends on inspiration designs — see Blocked / Questions.)

### Phase 7 — Templates, taxonomies, globals, blog — site side
- [ ] 8 Ativa template definitions pushed (Service, Location, Service × Location, Landing, Generic, Contact, Blog post, Legal)
- [ ] Render template-driven pages (locked blocks, allowed types, URL pattern, SEO defaults)
- [ ] Blog index and category archive pages
- [ ] Render globals (header, footer, nav, settings, global blocks)
- **Done when:** each template renders a correct page and the blog index/archives work.

### Phase 8 — SEO completeness
- [ ] Wire `buildMetadata` fallbacks
- [ ] JSON-LD builders wired per page type
- [ ] Sitemap index + `robots`
- [ ] Related-content (services/locations) resolvers on pages
- [ ] **Lighthouse ≥ 90** on home, a service and a location page
- **Done when:** metadata/JSON-LD/sitemap/robots are correct per type and the Lighthouse targets are met.

### Phase 9 — Roles, security hardening, leads — site side
- [ ] SDK form component wired; forms POST to `/api/forms/{siteSlug}` with honeypot
- [ ] Secure headers set (CSP, HSTS, etc.)
- [ ] Rate-limit behavior verified against the CMS endpoint
- **Done when:** contact/lead forms submit to the CMS, spam is rejected, and security headers are present.

### Phase 10 — WordPress import (stops for approval) — site side
- [ ] Provide the URL inventory and known fixes to the import tooling
- [ ] Verify imported draft pages render at identical paths
- [ ] Add redirects/fixes: Austin→Dallas link, UK locations decision, Web Stories decision
- **Done when:** imported pages render correctly at identical paths and the known fixes are resolved.

### Phase 11 — Deploy
- [ ] GitHub Actions for the site repo (checks, standalone build, SSH upload, PM2 reload; run `cms:push`)
- [ ] VPS setup for the site (user, PM2, Nginx, SSL)
- [ ] Cloudflare DNS move keeping email records; HTML cache rules; purge on publish
- [ ] Health checks and uptime monitor
- **Done when:** the site deploys via CI to the VPS, serves at its domain through Cloudflare, and purges on publish. Claude provides steps/scripts only; it does not run anything on the server.

### Later — BoomClapsDance (second site)
- [ ] Extract `site-starter` from `ativa-site` (SDK wired, generic blocks, empty design system, no Ativa content)
- [ ] Create `boomclaps-site` from the starter; confirm editing works with no CMS code change
- **Done when:** a second site runs from the starter and is editable via the CMS with no CMS code change (registration tracked in the CMS repo).

## Blocked / Questions

Open items from the project brief (section 10) that affect the site. Date each as it is answered and move resolved ones to `DECISIONS.md`.

- **2026-11-11 — Ativa inspiration designs; fonts and colors locked first.** Gates Phase 6 (tokens, `/design-system`, and the whole block library). Waiting on supplied designs.
- **2026-11-11 — Web Stories: keep, redirect or drop?** Affects the sitemap, redirects and migration inventory (Phases 8/10).
- **2026-11-11 — UK location pages: build or remove?** The current UK links are empty placeholders; decision needed before migration (Phases 8/10) — see `SEO.md` known fixes.
- **2026-11-11 — Move ativaitsolutions.com DNS to Cloudflare, copying email records.** Required for Phase 11 (deploy/cutover); must preserve email (MX/other) records.
- **2026-11-11 — VPS data-center location & free RAM; matching Atlas region.** Affects read latency and the Phase 11 cutover (shared with the CMS tracker).

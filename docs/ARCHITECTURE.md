# Architecture — Ativa Site

Last updated: 2026-11-13

> Purpose: how the Ativa Site is built and how its parts fit together. It records the stack and why each piece was chosen, the folder layout, how content flows in (read-only, via the SDK), the external services, the environment variables (names only), and how we deploy. Read this before changing structure, boundaries, data flow, or deployment.

## Stack

| Choice | Reason |
| --- | --- |
| **Next.js (App Router) + RSC** | Server-render hundreds of content pages fast; the catch-all route maps any path to a page. |
| **TypeScript (strict)** | Block props and SDK types are checked at compile time against the contract. |
| **Standalone app (not a monorepo)** | The site is independently deployable; its only CMS link is the SDK package. |
| **`@ativa/cms-sdk`** | The single code link to the CMS: definitions, read-only data client, renderer, route helpers. |
| **MongoDB Atlas (read-only)** | Reads `site_ativa` via a read-only user through the SDK; never writes. |
| **Cloudinary** | Images served/transformed from the `ativa/` folder; media resolved by id. |
| **Tailwind CSS + this site's design tokens** | All styling flows through the site's tokens (see `DESIGN.md`); no one-off values. |
| **PM2 + Nginx + Cloudflare; `output: "standalone"`** | Self-hosted behind Cloudflare's cache; no Vercel-only features. |

## Folder structure

Planned layout (see the workspace `CLAUDE.md`):

- `app/` — routes: `layout`, `[...path]/page.tsx` (the SDK catch-all), `api/revalidate`, `api/preview`, `sitemap.ts`, `robots.ts`.
- `blocks/` — one folder per block: `definition.ts` (JSON, pushed to the CMS) **+** `Component.tsx` (renders on the site); `index.ts` is the registry.
- `templates/` — template definitions pushed to the CMS.
- `styles/tokens.css` — the design system tokens.
- `cms.config.ts` — site slug, Cloudinary folder, env names.
- `scripts/` — seed, WordPress import helpers.

**Import boundary:** `definition.ts` is JSON-serializable and pushed to the CMS; `Component.tsx` renders only on the site. The CMS never imports site React.

## Data flow

1. The site reads **only `site_ativa`** with a **read-only** Mongo user, via the SDK's `createSiteClient`.
2. The catch-all route resolves a path → page → template, then renders the page's `blocks` through `<PageRenderer>` (invalid blocks are skipped, never crash).
3. **Caching & revalidation:** pages are cached with per-path tags; on publish the CMS calls the site's **signed** `/api/revalidate` (verify `x-cms-signature` HMAC before acting), then purges the URL in Cloudflare.
4. **Preview:** `/api/preview` verifies a signed short-lived token (signature + expiry), enables Draft Mode, and renders `draftBlocks`.
5. **Forms** POST to the CMS (`/api/forms/{siteSlug}`); the site never writes to the database.
6. **Resilience:** if the CMS is down, the site keeps serving cached pages.

## External services

- **MongoDB Atlas** — read via a **read-only** user scoped to `site_ativa` only. Trust boundary: no write credentials ever on the site.
- **Cloudinary** — images from the `ativa/` folder; the SDK's image loader resolves media by id to URL.
- **Cloudflare** — CDN + page cache; purge-by-URL on publish.
- **The CMS** — receives form posts, sends revalidate/preview signals, and receives the site's schema push (`cms:push`).
- **The VPS** — hosts the site (and staging) under its own system user; PM2 behind Nginx.

## Environment variables

Names only — values live in `.env` (never committed). Keep in sync with `.env.example`.

- **Database (read-only):** `MONGODB_URI_READONLY`, `MONGODB_DB` (`site_ativa`).
- **Dev-only (seed):** `SEED_MONGODB_URI` — a readWrite URI used **only** by `npm run seed`, never by the running app. Keep out of production env and git.
- **Site identity:** `SITE_SLUG`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_FOLDER`.
- **Signing secrets (verify only):** `REVALIDATE_SECRET` (HMAC for `/api/revalidate`), `PREVIEW_SECRET` (JWT for `/api/preview`).
- **CMS integration:** `CMS_BASE_URL`, `CMS_FORMS_ENDPOINT` (or derived from `CMS_BASE_URL` + `SITE_SLUG`), `CMS_API_KEY` (schema push via `cms:push`).

## Deployment

- Self-hosted on the VPS: aaPanel + Nginx + PM2, Let's Encrypt, behind Cloudflare.
- Build with `output: "standalone"`.
- GitHub Actions: run checks, build the standalone output in CI, SSH-copy to the VPS, **PM2 reload** (never `pm2 delete` + `pm2 start`); the site also runs `cms:push` to send its block/template definitions to the CMS.

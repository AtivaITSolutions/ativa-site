# Database — Ativa Site (read-only)

Last updated: 2026-11-11

> Purpose: what this site reads from its database and how. The site is **read-only**: it connects to `site_ativa` with a read-only Mongo user and never writes. This doc is a short, site-side view only — the full schema (fields, types, indexes, references) lives in `../ativa-cms/docs/DATABASE.md`, which is the source of truth. If the two disagree, that doc wins; do not define schema here.

## Source of truth

The authoritative schema is **`../ativa-cms/docs/DATABASE.md`** (collections, fields, types, indexes, references, access control). This file lists **only** what the site reads and the constraints it works under. Do not duplicate or redefine field definitions here — if the site needs a schema change, raise it with the maintainer as a **question** (never edit `../ativa-cms`).

## What this site reads

From **`site_ativa`** only (never `cms_core`):

- **`pages`** — resolve a path to a page; render its published `blocks` (or `draftBlocks` in preview); read `seo`, `type`, `templateId`, `serviceId`, `locationId`.
- **`templates`** — pick the template for a page (locked blocks, allowed types, URL pattern, SEO defaults).
- **`services`** — service data and related-service resolution.
- **`locations`** — city/state, phone, address, geo, `nearby[]` for location pages and LocalBusiness markup.
- **`categories`** — blog category archives.
- **`media`** — resolve media **by id** to a Cloudinary URL + dimensions/alt at render time.
- **`globals`** — header, footer, nav, site settings, global blocks.
- **`redirects`** — apply 301/302 redirects.

The site **never** reads `cms_core`, and **never** reads or writes `leads` directly — form submissions POST to the CMS.

## Connection & access

- The site connects to **`site_ativa` only**, with a **read-only** Mongo user scoped to that database.
- Credentials come from `.env` (names in `ARCHITECTURE.md`), never committed; the site holds **no** write credentials.
- All access goes through the SDK's `createSiteClient` — no ad-hoc queries, no writes anywhere.

## Constraints the site relies on

Assumptions the renderer depends on (and must fail gracefully if broken) — keep in sync with the schema doc:

- **Unique `path`** per site: a path resolves to at most one page.
- **Published-only** content on the live site; drafts appear only in preview/Draft Mode.
- **Media referenced by id**, resolved to URL at render; a missing media id degrades gracefully (no crash).
- **Redirects honored** before 404: a path in `redirects` returns the configured 301/302.
- Invalid/unknown blocks are **skipped**, never fatal (SDK `<PageRenderer>` guarantee).

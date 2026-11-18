# SEO — Ativa Site

Last updated: 2026-11-18

> Purpose: the SEO rules for the public site. The overriding constraint: **keep every existing WordPress URL exactly as it is** so rankings survive the rebuild. It covers URL rules, metadata, structured data by page type, sitemaps/robots, redirects, location-page rules, and the WordPress migration. Read this before anything that touches URLs, metadata or markup.

## URL rules

- **Keep WordPress URLs exactly:** flat root slugs with a **trailing slash**, e.g. `/seo-agency-in-los-angeles/`. No locale or section prefixes.
- A **catch-all route** (`app/[...path]/page.tsx`) serves any path by resolving it to a page.
- **Trailing-slash policy:** trailing slash is canonical; a non-slashed request 301-redirects to the slashed form. Casing is lower-case canonical.
- Unknown paths 404 (after checking the `redirects` collection first).

## Metadata rules

- Per page: `title` and `description` from the page's SEO fields, with **template fallbacks** when empty.
- **Self-referencing canonical** on every page.
- Open Graph + Twitter tags; `noindex` honored when set on the page.
- Built with the SDK's `buildMetadata`. Keep titles/descriptions within conventional length limits; one `<h1>` per page.

## Structured data by page type

JSON-LD emitted per type (SDK JSON-LD builders):

- **Home** — Organization + WebSite.
- **Service** — Service.
- **Location** — LocalBusiness (service + area served), with real local data.
- **Service × Location** — Service + LocalBusiness/area.
- **Blog post** — Article/BlogPosting.
- **All pages** — BreadcrumbList; **FAQ** blocks emit FAQPage.

The page `type` (and `seo.schemaType` when set) determines which builders run.

## Sitemaps and robots

- **Sitemaps split by type** (sitemap index + per-type sitemaps); **exclude** drafts and `noindex` pages. Built with `buildSitemap`.
- **robots** via `buildRobots`: allow public content; **disallow** CMS/preview routes, which also send `noindex`.

## Redirects

- The per-site `redirects` collection drives **301/302** handling, applied in **`proxy.ts`** (Next 16's Node-runtime middleware) **before** routing/404, with explicit redirects taking precedence over catch-all resolution. The proxy reads via the SDK's `getRedirectByPath` and emits a real 301 with `NextResponse.redirect(url, 301)` (path normalized to the trailing-slash form; query string preserved).
- **Slug changes on published pages create automatic 301s** (old path → new path): the CMS writes the `redirects` row when an editor changes a published page's path; the site honors it. See `../ativa-cms/docs/DECISIONS.md` ADR-022.

## Location page rules

- Each location page requires a **unique intro block** — no duplicated boilerplate across locations (thin/duplicate content hurts rankings).
- Use real local data: `city`, `state`, `phone`, `address`, `geo`, and `nearby[]` for automatic internal links to nearby locations.
- Emit **LocalBusiness** markup with the location's real NAP (name/address/phone) and area served.

## Migration from WordPress

**Plan**
1. **Inventory** every existing URL from the current sitemap, grouped by type (service, location, service×location, blog, other), with counts — shown and approved **before** any import (Phase 10).
2. **Import** via the WP REST API (fallback: HTML parse) into **draft** pages at **identical paths**; images go to Cloudinary with alt text. Nothing is copied from WordPress server files.
3. **Report** imported / skipped / manual-review items; editors review drafts before publishing.
4. **Preserve URLs**; add 301s only where a path legitimately changes.

**Known fixes / gotchas** (log issues here as found during migration):
- The **Austin** link on the home page currently points to the **Dallas** page — fix the target during migration.
- The **UK location** links are empty placeholders — decide build vs remove (see `TRACKER.md` → Blocked / Questions) and fix/remove accordingly.
- **Web Stories**: decide keep / redirect / drop (open item) before finalizing sitemaps and redirects.

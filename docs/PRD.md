# PRD — Ativa Site

Last updated: 2026-11-11

> Purpose: the product requirements for the Ativa Site — the public rebuild of ativaitsolutions.com. It defines what we are building and for whom: the problem, goals and non-goals, the users, the page types, and the features with acceptance criteria. This is the source of truth for scope; a scope change starts here (ask first). It is not an implementation guide — see `ARCHITECTURE.md` for how.

## Problem

ativaitsolutions.com runs on WordPress + Elementor: content and layout are tangled, the site is slow, and scaling to the hundreds of service / location / service-in-location pages the business needs is painful. Editors fight a page builder; developers can't apply consistent, premium design at scale.

The rebuild must **preserve** what works (every URL and its SEO) and **improve** what doesn't (speed, visual consistency, and a clean editor workflow where content is published from the CMS with no deploy).

## Goals

- Rebuild the site on Next.js, rendering content managed in the Ativa CMS.
- **Keep every existing WordPress URL exactly** (flat root slugs, trailing slash) so rankings survive — see `SEO.md`.
- Premium, consistent design across hundreds of pages, built from design tokens and a block library.
- Fast: meet the Lighthouse / Core Web Vitals targets in `TESTING.md` (≥ 90 on key page types).
- All content fully editable in the CMS with **no deploy**; the site is read-only.
- Correct SEO on every page: metadata, canonical, Open Graph, JSON-LD by type, breadcrumbs, sitemaps, redirects.

## Non-goals

- No internationalization (English only).
- No e-commerce and no public user accounts/login on the site.
- **No write access to any database** and no auth/session code on the site.
- No arbitrary-HTML page builder; pages are composed from developer-built blocks in the CMS.
- The site does not define schema or change the SDK/CMS; such needs go to the maintainer as a question.

## Users

- **Visitors** — prospects searching for services and locations. They need fast, clear, trustworthy pages and an easy path to contact (forms that post to the CMS).
- **Content team** — editors who build and publish pages **in the CMS** (not in this repo). This site renders what they publish; it gives them the blocks, templates and preview to work with.

## Page types

Keep in sync with `SEO.md` and the schema (`../ativa-cms/docs/DATABASE.md`). Each maps to a template and URL pattern.

- **Home** — the root page; Organization/WebSite JSON-LD.
- **Service** — a service offering; Service JSON-LD.
- **Location** — a city/area page; required **unique** intro block, LocalBusiness JSON-LD, real local data.
- **Service × Location** — a service in a specific location (one page per `serviceId + locationId`).
- **Landing** — campaign/marketing pages.
- **Blog post** — article content, per category; Article JSON-LD.
- **Contact** — contact page with a lead form.
- **Legal** — privacy/terms and similar.

## Features

### Rendering & routing
- A catch-all route resolves any path to its page, selects the template, and renders its blocks; unknown paths 404.
- **Acceptance:** Given a published page at `/seo-agency-in-los-angeles/`, When visited, Then it renders at that exact path with a trailing slash; Given an unknown path, Then a 404 is returned.

### Blocks
- Render each `BlockInstance` via the registered component; validate props via the SDK; skip invalid blocks without crashing the page.
- **Acceptance:** Given a block with bad/missing props, When the page renders, Then that block is skipped and the rest of the page still renders.

### SEO & metadata
- Per-page metadata from SEO fields with template fallbacks; self canonical; Open Graph; JSON-LD by type; breadcrumbs; sitemaps split by type; robots.
- **Acceptance:** Given a page with no SEO title, When rendered, Then the template's SEO default title is used and a self-referencing canonical is emitted.

### Forms
- Forms POST to the CMS (`/api/forms/{siteSlug}`) with honeypot; the site never writes to the database.
- **Acceptance:** Given a submitted contact form, When sent, Then it posts to the CMS endpoint (never to the DB) and the visitor sees a success state.

### Preview
- `/api/preview` verifies a signed short-lived token, enables Draft Mode, and renders `draftBlocks` in the CMS iframe.
- **Acceptance:** Given a valid preview token, When opened, Then draft content renders; Given an expired/forged token, Then preview is refused.

### Performance
- Cached pages with per-path tags; on-publish revalidation from the CMS; Cloudflare in front.
- **Acceptance:** Given a publish, When the signed revalidate call arrives, Then the affected path is revalidated and served fresh.

### Accessibility
- Semantic HTML, labels, focus states, keyboard navigation, required alt text, reduced motion; WCAG 2.1 AA.
- **Acceptance:** Given any key page type, When audited, Then it meets the accessibility target and the Lighthouse a11y threshold in `TESTING.md`.

## Open questions

See `TRACKER.md` → **Blocked / Questions** for live items (inspiration designs, Web Stories, UK location pages, DNS move). Move answered ones into `DECISIONS.md`. Date each item.

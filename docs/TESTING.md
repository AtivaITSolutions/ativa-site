# Testing — Ativa Site

Last updated: 2026-11-11

> Purpose: what we test, at which level, the performance targets, how to run the tests, and what "done" means. Read this before writing tests or declaring a task complete.

## What gets tested

### Unit

Pure logic, no network:
- Block prop validation (Zod schemas from the SDK) — valid props pass, invalid are rejected.
- Metadata and JSON-LD builders — correct tags/shape per page type, with template fallbacks.
- URL/slug and redirect helpers — trailing-slash canonicalization, redirect resolution.
- Utilities (media id→URL resolution, breadcrumb building).

### Integration

Route-level behavior with data:
- The **catch-all route** resolves a path to the right template/blocks; unknown paths 404; redirects applied before 404.
- **Preview**: token signature + expiry verified, Draft Mode renders `draftBlocks`; invalid token refused.
- **Revalidate**: `x-cms-signature` HMAC verified, the path revalidates; bad signature refused.
- **Sitemap/robots** generation excludes drafts and `noindex`.

### E2E

Critical visitor journeys (Playwright or equivalent):
- A published page renders correctly at its exact URL (trailing slash).
- A service page and a location page render with the right content and markup.
- Submitting a contact form posts to the CMS and shows a success state.
- Navigation, 404, and a redirect all behave correctly.

## Lighthouse / performance targets

- **Lighthouse ≥ 90** on **Performance, Accessibility, Best Practices, and SEO** for the key page types: **home**, a **service** page, and a **location** page (Phase 8 gate).
- **Core Web Vitals** in the "good" range: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms (field/lab as available).
- Measured in CI and/or locally against a production (`standalone`) build of the affected page types.

## How to run

Commands (marked TODO until the scripts exist — see `CLAUDE.md` Commands):
- `npm run test` — unit/integration (TODO: verify once scripts exist).
- Watch/coverage variants, and the E2E runner, added as scripts land (TODO).
- Lighthouse: run against a local `standalone` build or via a CI Lighthouse step (TODO).

## Definition of done

Checklist to copy per task.

- [ ] Lint passes
- [ ] Typecheck passes
- [ ] Tests pass (new logic has tests)
- [ ] Build passes
- [ ] Lighthouse targets met for affected page types
- [ ] Relevant docs updated (DESIGN/SEO/DATABASE/DECISIONS/TRACKER/.env.example as applicable)
- [ ] Security checklist ticked for the feature (docs/SECURITY.md)

# Decisions — Ativa Site (ADRs)

Last updated: 2026-11-11

> Purpose: the architecture decision record for the site. Every significant or hard-to-reverse decision gets an entry here. A needed change to the SDK contract or the data model is **not** decided here — it goes to the maintainer as a question (never an edit to `../ativa-cms`); record the outcome once decided. Use the template below; keep the Decisions list newest first.

## ADR template

Copy this block for each new decision:

```
### ADR-NNN: <short title>
- Date: YYYY-MM-DD
- Status: Proposed | Accepted | Superseded by ADR-XXX
- Decision: <what we decided, in one or two sentences>
- Context: <the problem and constraints that forced a choice>
- Alternatives considered: <options and why they were rejected>
- Consequences: <trade-offs, follow-ups, what this makes easier/harder>
```

## Decisions

Newest first. These are the founding decisions that shape the **site**; the ecosystem-wide decisions are recorded in `../ativa-cms/docs/DECISIONS.md` (ADR-001…015) and are not re-litigated here.

### ADR-005: The SDK is the only link to the CMS (`file:` in dev, GitHub Packages later)
- Date: 2026-11-11
- Status: Accepted
- Decision: The site depends on `@ativa/cms-sdk` as its sole code link to the CMS — `"@ativa/cms-sdk": "file:../ativa-cms/packages/sdk"` in dev, a pinned GitHub Packages version later.
- Context: The site must stay independently deployable while sharing one contract with the CMS.
- Alternatives considered: Copying SDK code into the site (drift); a runtime HTTP-only contract with no shared types (loses type safety).
- Consequences: Block definitions are pushed to the CMS via the SDK CLI (`cms:push`); contract changes are a maintainer question, never a local edit to `../ativa-cms`. Mirrors CMS ADR-003.

### ADR-004: Self-host on the VPS behind Cloudflare, `output: "standalone"`
- Date: 2026-11-11
- Status: Accepted
- Decision: Deploy the site to the VPS (aaPanel, Nginx, PM2, Let's Encrypt) behind Cloudflare's free CDN, built standalone; no Vercel-only features.
- Context: Cost control and full control of caching/purge; consistent with the CMS hosting.
- Alternatives considered: Vercel (paid, lock-in); other PaaS (cost/control).
- Consequences: Cloudflare page cache + purge-by-URL on publish; deploy via GitHub Actions → SSH → PM2 reload; the site runs `cms:push` on deploy. Mirrors CMS ADR-009.

### ADR-003: Each site has its own design system, built section by section from inspiration designs
- Date: 2026-11-11
- Status: Accepted
- Decision: Build the Ativa design system (tokens + blocks) from supplied inspiration designs, in reviewed batches; style only through tokens.
- Context: The site must look premium and distinct; the CMS stays neutral.
- Alternatives considered: A shared cross-site theme (wrong for distinct brands); design everything up front (blocks the thin-slice build).
- Consequences: `DESIGN.md` tokens and block catalogue are "Pending Phase 6" until inspiration designs are supplied and fonts/colors are locked. Mirrors CMS ADR-013.

### ADR-002: The site is read-only; forms post to the CMS
- Date: 2026-11-11
- Status: Accepted
- Decision: The site never writes to any database and holds no login/session code; it reads `site_ativa` with a read-only Mongo user via the SDK, and all form submissions POST to the CMS (`/api/forms/{siteSlug}`).
- Context: Hard isolation and a smaller attack surface; auth and writes belong to the CMS.
- Alternatives considered: Letting the site write leads directly (needs write credentials — rejected); site-side auth (violates the invariant).
- Consequences: The only DB credential on the site is read-only; preview/revalidate secrets are verify-only. See `SECURITY.md`. Mirrors CMS ADR-006/ADR-007.

### ADR-001: Keep every existing WordPress URL exactly
- Date: 2026-11-11
- Status: Accepted
- Decision: Preserve every current URL exactly — flat root slugs with trailing slash — served by a catch-all route; add 301s only where a path legitimately changes.
- Context: Hundreds of ranking pages; changing URLs would lose SEO.
- Alternatives considered: A new URL scheme with bulk redirects (ranking risk, redirect sprawl).
- Consequences: Trailing-slash canonicalization, redirect handling in middleware, slug-change auto-301s; see `SEO.md`. Mirrors CMS ADR-014.

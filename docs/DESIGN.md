# Design — Ativa Site

Last updated: 2026-11-18

> Purpose: the design system for the **public Ativa Site** (distinct from the CMS admin UI). A premium, consistent website built block by block from inspiration designs. It covers principles, the design tokens (the only source of colors, type, spacing, etc.), components, the block catalogue, layout/breakpoints, accessibility, and do/don't. **Style only through the tokens here** — no one-off colors, sizes or fonts.

## Principles

- **Premium and trustworthy.** The site represents a services business; every page should feel polished and credible.
- **Consistent at scale.** Hundreds of pages must look like one site. Everything is built from shared tokens and a fixed block library — never per-page bespoke styling.
- **Tokens are the single source of truth.** Colors, type, spacing, radius, shadow and motion come only from `styles/tokens.css`. No raw hex, px or font names in components.
- **Fast by default.** Design choices must not jeopardize the Lighthouse / Core Web Vitals targets in `TESTING.md` (image sizing, font loading, minimal layout shift).
- **Accessible by default.** WCAG 2.1 AA: contrast, focus, keyboard, labels, required alt text, reduced motion.
- **Block-composed.** Pages are assembled from blocks in the CMS; each block must look correct in any allowed order and with any valid content.

## Design tokens

**Pending Phase 6: inspiration designs.** Tokens are defined once the Ativa inspiration designs are supplied and fonts/colors are locked (see `TRACKER.md` → Blocked / Questions). When set, they live in `styles/tokens.css` and are the only styling source. Planned token groups:

- **Colors:** each with a role — `background`, `surface`, `foreground`/text, `muted`, `border`, `primary`/brand, `accent`, `success`, `warning`, `destructive` — plus interaction states. _Pending._
- **Typography:** font families, the type scale (sizes/weights/line-heights), and where each is used. _Pending._
- **Spacing:** the spacing scale and layout rhythm. _Pending._
- **Radius:** the radius scale. _Pending._
- **Shadows:** the elevation scale. _Pending._
- **Motion:** durations, easings, and the reduced-motion rule. _Pending._

## Components

Shared primitives used across blocks (buttons, links, inputs, cards, badges, section wrapper, container), each with variants and states. **Pending Phase 6** — defined with the tokens, then documented here as they are built.

- **`CmsImage`** (Phase 5, `components/CmsImage.tsx`) — the standard way blocks render CMS media. Takes a `ResolvedMedia` (from the page's media map) and renders `next/image` via the Cloudinary loader (`lib/cloudinary.ts`, `f_auto,q_auto,w_<width>`); alt text is **always present** (the block's own alt or the media's), and a neutral placeholder shows when the id doesn't resolve, so a missing image never crashes a page. Blocks never build image URLs by hand.

## Block catalogue

**Pending Phase 6: inspiration designs.** Built in batches of ~5 (reviewed after each) toward ~25 blocks, kept in sync with the SDK contract (`../ativa-cms/docs/SDK.md`). Add one entry per block (name, purpose, variants, key fields) as it is created. Planned set:

hero (variants), page header + breadcrumb, rich text, image + text, two-column, stats, process steps, service cards, feature list, pricing, comparison table, testimonials, partner logo strip, case study cards, reviews, map + address, areas served, nearby locations, CTA banner, contact form, lead form, FAQ accordion (FAQ JSON-LD), tabs, gallery, video, related services, related locations, blog feed.

| Block | Purpose | Variants | Key fields |
| --- | --- | --- | --- |
| _Pending Phase 6_ | | | |

## Layout

Breakpoints (desktop / tablet / mobile), container widths, grid and section spacing, and responsive rules. **Pending Phase 6** — set with the tokens from the inspiration designs.

## Accessibility

- Target **WCAG 2.1 AA**. Text contrast ≥ 4.5:1 (≥ 3:1 for large text / UI components).
- Visible focus states on all interactive elements; full keyboard navigation.
- Semantic HTML, labels/ARIA where needed, **required alt text** on images.
- Respect `prefers-reduced-motion`.

## Do / Don't

- **Do** style only through tokens. **Don't** use one-off colors, sizes or fonts.
- **Do** make each block work in any allowed order and with any valid content. **Don't** rely on a fixed page composition.
- **Do** size and lazy-load images for the performance targets. **Don't** ship layout-shifting or oversized media.
- **Do** keep the design consistent across page types. **Don't** introduce per-page bespoke styling.

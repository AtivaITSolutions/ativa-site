# Changelog — Ativa Site

Last updated: 2026-11-13

> Purpose: a human-readable log of what changed, newest first, in the style of [Keep a Changelog](https://keepachangelog.com/). Add an entry when a phase closes (via `/phase-done`) or when a notable change ships. Group changes under Added / Changed / Fixed / Removed / Security.

## [Unreleased]

### Added
- Documentation-driven project scaffold: `CLAUDE.md`, `README.md`, `.env.example`, `.gitignore`.
- `.claude/` config: `settings.json` permissions, slash commands (`/phase-done`, `/update-docs`, `/security-review`), and read-only review agents (`security-reviewer`, `code-reviewer`).
- `docs/` templates: PRD, Architecture, Database, Design, SEO, Security, Testing, Decisions, Tracker, Changelog.
- Docs filled from `PROJECT-BRIEF.md` (PRD, Architecture, Database, Design, SEO, Security, Testing, Decisions, Tracker with phases 0–11 + Later).
- **Phase 0 — App scaffold:** standalone Next.js 16 app (React 19, Tailwind v4, `output: "standalone"`, port 3000), `@ativa/cms-sdk` installed via `file:../ativa-cms/packages/sdk` (`transpilePackages`).
- `.nvmrc` (20.19.0); scripts `dev`/`lint`/`typecheck`/`test`/`build` plus a `cms:push` placeholder. Checks pass; site runs on `:3000`.

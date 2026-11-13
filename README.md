# Ativa Site

Rebuild of **ativaitsolutions.com** (currently WordPress + Elementor) as a Next.js
website whose content is managed by the **Ativa CMS**. Hundreds of service,
location, service-in-location and blog pages are read — read-only — from MongoDB
Atlas (`site_ativa`) through the `@ativa/cms-sdk` package, rendered with this
site's own blocks and design tokens, and served from our VPS behind Cloudflare.

This repo is independent from the CMS. The only code link is `@ativa/cms-sdk`,
which lives in `../ativa-cms/packages/sdk` and is installed during development
with `"@ativa/cms-sdk": "file:../ativa-cms/packages/sdk"`.

## Setup

> _TODO: fill in real setup steps once the app and scripts exist (Phase 1+)._

1. Install Node (see `.nvmrc`, Node >= 20.19) and use npm.
2. `npm ci`
3. Copy `.env.example` to `.env` and fill in values (never commit `.env`).
4. `npm run dev`

## Commands

Scripts are created in a later phase — verify each once it exists.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run lint` | Lint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Run tests |
| `npm run build` | Production build (`output: "standalone"`) |
| `npm run cms:push` | Send block and template definitions to the CMS |

## How this repo works with Claude Code

This is a **documentation-driven** repo. The `docs/` folder is the source of
truth; code is written to match it, not the other way around.

- **`CLAUDE.md`** loads every session: the stack, commands, rules and a docs index.
- **`docs/`** holds one file per concern — `PRD`, `ARCHITECTURE`, `DATABASE`,
  `DESIGN`, `SEO`, `SECURITY`, `TESTING`, `DECISIONS`, `TRACKER`, `CHANGELOG`.
  Read the relevant one before working on that area. The SDK contract and the
  database schema live in the sibling repo (`../ativa-cms/docs/`).
- Work proceeds **phase by phase** per `docs/TRACKER.md`, stopping for review at
  the end of each phase.

### Slash commands

- **`/phase-done`** — run lint, typecheck, tests and build, update `TRACKER.md`
  and `CHANGELOG.md`, list changed files, suggest a commit message, and stop.
- **`/update-docs`** — compare the code against the docs (and the SDK contract),
  list every mismatch, propose fixes, and wait for approval before editing.
- **`/security-review`** — hand the current changes to the `security-reviewer`
  agent and report findings by severity.

### A note on secrets

The permission rules in `.claude/settings.json` (denying reads of `.env`, keys
and PEM files) are **best-effort**, not a security boundary. Real production
secrets should **never** live in this project folder; keep them in the server's
environment / secret store.

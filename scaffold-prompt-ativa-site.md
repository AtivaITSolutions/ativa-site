Set up a documentation-driven project structure for building with Claude Code in THIS repo (ativa-site). This is a scaffold: create the structure and templates only, no application code.

STEP 1: Project answers. Do NOT ask me these questions; use the answers below.
1. Project: Ativa Site. One-line description: rebuild of ativaitsolutions.com (currently WordPress + Elementor) as a Next.js website whose content is managed by the Ativa CMS; hundreds of service, location, service-in-location and blog pages.
2. Tech stack: Next.js (App Router, TypeScript strict), standalone app (not a monorepo). Content comes from MongoDB Atlas via a READ-ONLY database user and the @ativa/cms-sdk package, installed during development with "@ativa/cms-sdk": "file:../ativa-cms/packages/sdk". Cloudinary for images, Tailwind CSS + this site's own design tokens. Self-hosted on our own VPS (PM2, Nginx) behind Cloudflare, built with output "standalone". No Vercel-only features.
3. UI: yes. A premium, consistent public website built block by block from inspiration designs I will supply.
4. Database: yes, read-only. The site reads only its own database `site_ativa`; all writes happen in the CMS. Site forms post to the CMS, never to the database.
5. Package manager: npm. Commands (the scripts get created in a later phase, so mark each one "TODO: verify once scripts exist"): dev `npm run dev`, lint `npm run lint`, typecheck `npm run typecheck`, test `npm run test`, build `npm run build`, plus `npm run cms:push` (sends block and template definitions to the CMS).

Context: this repo sits in a workspace folder next to a sibling repo `ativa-cms/`, which owns the database schema and the SDK contract (../ativa-cms/docs/SDK.md and ../ativa-cms/docs/DATABASE.md). The workspace root holds `CLAUDE.md` and `PROJECT-BRIEF.md` with the full specification. You may read ../PROJECT-BRIEF.md for context, but do NOT copy its content into the docs in this step; templates only.

STEP 2: Before creating anything, check the current Claude Code docs for the correct format of: CLAUDE.md, .claude/settings.json permissions, custom slash commands in .claude/commands/, and subagents in .claude/agents/. Use the current formats, not memory.

STEP 3: Create this structure. NEVER overwrite a file that already exists; if one exists, tell me and skip it.

ativa-site/
├── CLAUDE.md
├── README.md
├── .env.example
├── .gitignore
├── .claude/
│   ├── settings.json
│   ├── commands/
│   │   ├── phase-done.md
│   │   ├── update-docs.md
│   │   └── security-review.md
│   └── agents/
│       ├── security-reviewer.md
│       └── code-reviewer.md
└── docs/
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── DATABASE.md
    ├── DESIGN.md
    ├── SEO.md
    ├── SECURITY.md
    ├── TESTING.md
    ├── DECISIONS.md
    ├── TRACKER.md
    └── CHANGELOG.md

STEP 4: File contents.

CLAUDE.md (keep it under ~120 lines; it loads every session):
- Project name, one-line description, stack
- Commands section (from my answers, each marked TODO until verified)
- "Workspace" section: this repo lives next to ../ativa-cms/. The SDK contract is ../ativa-cms/docs/SDK.md and the database schema is ../ativa-cms/docs/DATABASE.md; read them before touching blocks, templates or data access. The workspace root has CLAUDE.md and PROJECT-BRIEF.md.
- "Docs index": each docs/ file with one line on WHEN to read it, plus the two ativa-cms docs above (read the relevant doc before working on that area; don't import all docs with @, to save context)
- "Rules" section:
  - Work phase by phase per docs/TRACKER.md; stop at the end of each phase for my review
  - Never read, print or log .env files or secrets; never hardcode keys
  - This site never writes to the database and never holds write credentials or login code; forms post to the CMS
  - Blocks follow the SDK contract exactly: definition file (JSON-serializable, pushed to the CMS) separate from the React component
  - Keep every existing WordPress URL exactly as it is (flat root slugs with trailing slash), per docs/SEO.md
  - Style only through the design tokens in docs/DESIGN.md; no one-off colors, sizes or fonts
  - Validate all external input and all block props (Zod via the SDK)
  - Check current library docs before using a library; don't rely on memory
  - Never install a dependency without saying why
  - Never say "done" without running lint, typecheck, tests and build
- "Docs maintenance" section:
  - docs/ are the source of truth. I may edit them by hand at any time; always re-read the relevant doc instead of relying on what you remember from earlier in the session.
  - If code and docs disagree, STOP and ask me which is right. Never silently change a doc to match buggy code.
  - Update docs in the same task as the code change: new block or token → DESIGN.md; URL, redirect or schema markup change → SEO.md; new decision → DECISIONS.md; task done → TRACKER.md; phase done → CHANGELOG.md; new env var → .env.example; new command → CLAUDE.md; scope change → PRD.md (ask me first). A needed SDK or database change goes to me as a question, never as an edit to ../ativa-cms.
  - Every doc has a "Last updated: YYYY-MM-DD" line at the top; update it when you edit the doc.
- "Never" section: never run git add/commit/push (suggest a commit message instead); never delete files without asking; never disable security checks to make something pass; never edit files in ../ativa-cms from a session opened in this repo.

Each docs/ file: a title, "Last updated" line, a one-paragraph purpose statement, and section headings with short HTML comments (<!-- -->) explaining what goes there. Templates:
- PRD.md: Problem, Goals, Non-goals, Users (visitors, content team), Page types (home, service, location, service x location, landing, blog post, contact, legal), Features (each with acceptance criteria), Open questions
- ARCHITECTURE.md: Stack (with reason per choice), Folder structure (app/, blocks/, templates/, styles/, scripts/), Data flow (read-only content via the SDK, catch-all route, caching and revalidation, preview via Draft Mode), External services, Environment variables (names only), Deployment
- DATABASE.md: short. What this site reads (collections in site_ativa), the read-only user it connects with, and a pointer to ../ativa-cms/docs/DATABASE.md as the source of truth. No schema definitions here.
- DESIGN.md: Principles (premium, consistent), Design tokens (colors with roles, typography scale and fonts, spacing, radius, shadows, motion), Components, Block catalogue (each block with variants), Layout (desktop/mobile breakpoints), Accessibility, Do/Don't
- SEO.md: URL rules (keep WordPress URLs, trailing slash), Metadata rules, Structured data by page type, Sitemaps and robots, Redirects, Location page rules (unique intro, local data), Migration from WordPress (URL inventory, known fixes)
- SECURITY.md: Threat model for a read-only public site, Secrets handling, Input validation (forms, preview tokens, revalidate signatures), Headers, Threats and mitigations, Per-feature security checklist (as checkboxes to copy for each new feature)
- TESTING.md: What gets unit/integration/E2E tests, Lighthouse targets, How to run, Definition of done (checklist)
- DECISIONS.md: ADR format template (Date, Decision, Context, Alternatives considered, Consequences) + "Decisions" list
- TRACKER.md: Phases with checkbox tasks, "Current phase" marker, "Blocked / Questions" section
- CHANGELOG.md: Keep a Changelog style, newest first

.claude/settings.json:
- deny: reading .env and .env.* files, secrets folders, *.pem/*.key; Bash(git push *), Bash(git reset --hard *), Bash(rm -rf *), Bash(curl *), Bash(wget *)
- ask: Bash(git commit *), dependency installs (npm install, npm i, npm ci, npx create-*), Bash(npm run cms:push*), Bash(npm run seed*), import scripts (Bash(npm run import*))
- allow: npm run dev/lint/typecheck/test/build, git status, git diff, git log
- Add a note in README that deny rules are best-effort, so real production secrets should never live in the project folder.

.claude/commands:
- phase-done.md: run lint, typecheck, tests, build; report results; update TRACKER.md and CHANGELOG.md; list changed files; suggest a commit message; stop.
- update-docs.md: compare current code against all docs/ (and the SDK contract in ../ativa-cms/docs/SDK.md), list every mismatch, propose fixes, and wait for my approval before editing.
- security-review.md: hand the current changes to the security-reviewer agent and report findings by severity.

.claude/agents:
- security-reviewer.md: read-only reviewer (no edit tools). Checks secrets exposure, that the site has no write access or login code, input validation on forms, preview token and revalidate signature checks, XSS (rich text rendering), security headers, unsafe dependencies, against docs/SECURITY.md. Reports findings by severity with file:line and a suggested fix. Never edits code.
- code-reviewer.md: read-only reviewer. Checks correctness, edge cases, types, consistency with docs/ARCHITECTURE.md, docs/DESIGN.md, docs/SEO.md and ../ativa-cms/docs/SDK.md, dead code, missing tests, accessibility. Reports, never edits.

.gitignore: .env, .env.*, but NOT .env.example; .claude/settings.local.json; node_modules, .next, out, dist, coverage, *.tsbuildinfo, next-env.d.ts, npm-debug.log*, .DS_Store, scripts/output/.
.env.example: header comment only (variables get added later).
README.md: project name, description, setup steps placeholder, and a short "How this repo works with Claude Code" section explaining the docs/ structure and the slash commands.

STEP 5: Initialize git if not already a repo (git init only; no add/commit). Show me the final tree and a one-line summary per file. Remind me to restart the Claude Code session so the new CLAUDE.md loads.

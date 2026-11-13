# Security — Ativa Site

Last updated: 2026-11-11

> Purpose: the security model for a **read-only public website** and the standard the `security-reviewer` agent reviews against. The core invariant: this site never writes to the database, never holds write credentials or login code, and all form submissions go to the CMS. It covers the threat model, secrets handling, input validation, headers, threats and mitigations, and a per-feature checklist to copy for every new feature.

## Threat model

- **What this site is:** a public, read-only Next.js site with **no auth** and **no DB writes**. It renders content from `site_ativa` and posts form submissions to the CMS.
- **Assets to protect:** the read-only DB credentials; the signing secrets (revalidate HMAC, preview JWT) used to **verify** incoming requests; visitor form data in transit to the CMS; and SEO integrity (URLs, redirects, canonical).
- **Out of scope (lives in the CMS):** user accounts, login/sessions, admin authorization, and all write paths.
- **Core invariant:** the site holds no write credentials and no login code; forms POST to the CMS.

## Secrets handling

- Secrets live **only** in `.env` (never committed) and the server environment. Never read, print, log or hardcode them.
- Keep `.env.example` current (names only — see `ARCHITECTURE.md`).
- The **read-only DB user** is the only database credential the site ever holds. The revalidate/preview secrets are used only to **verify** signatures, never to sign write operations.

## Input validation

- Validate **every** external input with **Zod**: contact/lead form fields before posting to the CMS, query/route params, and all block props (via the SDK schema).
- **Preview tokens:** verify **signature AND expiry** before enabling Draft Mode.
- **Revalidate requests:** verify the `x-cms-signature` **HMAC** before acting.
- Reject on any validation/verification failure.

## Headers

Set security headers (via `next.config` / middleware):
- `Content-Security-Policy` (allow self, Cloudinary images, and required origins only)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security`
- `X-Frame-Options` / CSP `frame-ancestors` (allow the CMS origin for the preview iframe only)
- `Permissions-Policy`

CMS/preview routes send `noindex` and are disallowed in robots.

## Threats and mitigations

| Threat | Mitigation |
| --- | --- |
| XSS via rich text | Render Tiptap JSON, never raw HTML; no `dangerouslySetInnerHTML` with unsanitized content. |
| Forged/replayed **preview** token | Verify JWT signature + 5-minute expiry before Draft Mode. |
| Forged/replayed **revalidate** request | Verify `x-cms-signature` HMAC of the body before revalidating. |
| Secret leakage | Secrets only in env; never logged; `.env` never committed. |
| Form spam | Honeypot + rate limit enforced **at the CMS** endpoint; the site includes the honeypot field. |
| Open redirect / SSRF via redirects table | Only apply redirects to known internal paths/allowed targets; validate `to`. |
| Dependency vulnerabilities | Justify and check new dependencies; keep them current. |
| Accidental write access | No write credentials on the site; data access is read-only via the SDK; no write/update/delete calls. |

## Per-feature security checklist

Copy this block for each new feature and tick every box.

- [ ] No secrets read/printed/logged/hardcoded; .env.example updated (names only)
- [ ] No DB writes; data access uses the read-only user via the SDK
- [ ] No login/session/auth code added to the site
- [ ] All external input validated with Zod (form fields, params, block props)
- [ ] Preview token signature AND expiry verified before Draft Mode
- [ ] Revalidate HMAC (x-cms-signature) verified before acting
- [ ] Rich text rendered from Tiptap JSON (no raw HTML / no unsanitized dangerouslySetInnerHTML)
- [ ] Forms post to the CMS endpoint only (never to the database)
- [ ] Security headers present; CMS/preview routes noindex + robots-disallowed
- [ ] New dependencies justified and checked

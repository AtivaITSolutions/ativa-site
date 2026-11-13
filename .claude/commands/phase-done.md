---
description: Close out the current phase — run all checks, update the tracker and changelog, and stop for review.
allowed-tools: Bash(npm run lint*), Bash(npm run typecheck*), Bash(npm run test*), Bash(npm run build*), Bash(git status*), Bash(git diff*), Read, Edit
---

We are finishing the current phase in `docs/TRACKER.md`. Do the following in order and **stop** at the end — do not start the next phase.

1. **Run the checks** and report each result (pass/fail with the key output):
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test`
   - `npm run build`
   If any script does not exist yet, say so and skip it (don't invent results).

2. **If anything failed**, stop here. List the failures and do not update the docs or suggest a commit. Fixing comes first.

3. **If everything passed:**
   - Update `docs/TRACKER.md`: check off the completed tasks and move the "Current phase" marker to the next phase.
   - Update `docs/CHANGELOG.md`: add an entry under `[Unreleased]` (Keep a Changelog style, grouped Added / Changed / Fixed / Removed / Security) describing what this phase delivered.
   - Update the `Last updated:` line in any doc you edit.

4. **List every changed file** in this phase (use `git status` / `git diff`).

5. **Suggest a commit message** (Conventional Commits, e.g. `feat(site): add hero block`). Do **not** run git — just suggest it.

6. **Stop** and tell me the phase is ready for review.

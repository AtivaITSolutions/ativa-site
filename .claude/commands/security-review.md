---
description: Hand the current changes to the security-reviewer agent and report findings by severity.
allowed-tools: Bash(git status*), Bash(git diff*), Read
---

Run a security review of the **current changes** on this branch against `docs/SECURITY.md`.

1. Gather the pending changes (`git status`, `git diff`) so you know what to review.
2. Delegate the review to the **`security-reviewer`** subagent (read-only). Give it the list of changed files and the diff.
3. Report its findings grouped by severity (**Critical / High / Medium / Low / Info**), each with `file:line`, the issue, and a suggested fix.
4. Do **not** fix anything in this command — just report. If there are no findings, say so clearly.

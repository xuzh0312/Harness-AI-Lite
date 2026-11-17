---
name: bug-detect
description: Use when a reviewer finds a project defect, encounters a similar historical error, or rechecks a claimed fix during project development.
---

# Bug Detect: Project Bug Knowledge Base

Used by reviewers to check errors, search historical solutions, and re-verify fixes. The knowledge base is the current Harness's [docs/bugs.md](../../../docs/bugs.md); do not mix projects. It stores reusable problems and verified solutions, not per-round review logs.

## Invocation and Permissions

The main agent loads this skill with the `skill` tool or reads this file's absolute path and passes the path to the reviewer; the reviewer must read and follow it when finding an error or re-verifying a fix. Whether the skill appears in DSH's skill catalog depends on the session working directory and project root; it does not depend on global installation.

The reviewer stays read-only for code and the knowledge base; after invoking the skill it returns query results and record proposals. Only the main agent writes the knowledge base serially; before writing it re-reads the latest content, deduplicates again, and assigns IDs. Multiple reviewers never write the file directly. implementer/infra read matching entries before fixing, and must still verify whether an existing solution applies.

## Query, Confirm, and Deduplicate

1. Verify the concrete trigger conditions and observable consequences. Static reasoning may serve as evidence but must give the full path and be marked as not run; aesthetic preferences, speculative issues, and unrelated suggestions do not enter the knowledge base. Suspicions that cannot yet be confirmed stay in the review report.
2. Search the current project's knowledge base with symptoms, modules, error codes, and root-cause keywords, then read candidate entries. Return "no match" when the first invocation finds no record; do not import errors from other projects. When a defect is known but the root cause is not, create an entry pending localization and mark "root cause unconfirmed."
3. Reuse the original ID when the root cause, trigger mechanism, and fix principle match and no known different applicable constraint exists; different files, pages, or error text alone do not justify a new entry. Do not force a merge when only the error looks similar but the root cause differs or same-class membership cannot be confirmed; add a new entry when clearly different, and localize first or keep a pending-localization record when uncertain.
4. Do not add entries, counts, or repeated evidence for same-round feedback, repeated scans, or repeated evidence of the same problem. When a solved problem recurs in a newly confirmed scenario, update the original entry, recurrence count, and latest occurrence; do not write the file when there is no information gain.
5. If two entries turn out to be the same class after root-cause confirmation, the main agent merges them into the earlier ID, consolidates still-valid information, corrects in-project references, and keeps the old ID as an alias that is never reused. Do not merge different root causes merely to compress the log.

## Status and Solution Evidence

| Status | Conditions and actions |
| --- | --- |
| Pending localization | Defect and impact confirmed, root cause not yet confirmed; do not write it as a known root cause |
| Pending fix | Root cause and fix direction clear, implementation not complete |
| Pending verification | Implementation exists, but behavioral verification of the original problem or reviewer recheck is missing |
| Resolved | Fix for the relevant scope verified, reviewer recheck passed, main agent verified evidence and closed |
| Withdrawn | Recorded finding proven a false positive by evidence; briefly note the reason and remove the wrong solution to prevent reuse |

When the same class recurs, move from resolved back to the appropriate unresolved state, keep the historical valid solution and applicable scope, and state that this recurrence is unresolved. The recurrence count increments once per new, confirmed occurrence scenario, not per review round.

"Proposed fix" and "verified solution" must be separate. An executor claiming a fix, a successful compile, or unrelated tests passing cannot alone change the status to resolved. Rechecking must cover the original trigger behavior and related regressions; if verified statically, explain why that is sufficient to prove the problem is gone and what the coverage limits are. Gaps involving the current recurrence must not be masked by old successful verification.

## Record Proposal Returned to the Main Agent

Along with the normal review conclusion, each valid defect returns:

- Action: add / update / reopen / merge / no change; candidate ID or no match and the deduplication rationale.
- Localization keywords, symptoms, trigger conditions and impact, root cause and confirmation basis; applicable differences between old and new scenarios.
- Proposed status; proposed fix vs. verified solution stated separately.
- Evidence: task or finding reference, code version or uncommitted scope, reproduction and verification method and results; unverified items.

The reviewer does not reserve a new ID in advance and does not treat a record proposal as persisted. After the main agent writes it, it returns the final ID to the reviewer or current task. Use the BUG-0001 form; scan existing IDs (including merge aliases) and take the maximum plus one; never reuse an old ID.

## Single-Entry Format and Compression

The main agent appends or updates one section per entry in the knowledge base, not one file per occurrence:

```markdown
## BUG-0001: Short problem title

- Status: pending localization / pending fix / pending verification / resolved / withdrawn
- Search keywords: module, symptom, root-cause keywords
- Trigger conditions and impact: minimal necessary description
- Root cause and basis: confirmed cause; note when unconfirmed
- Proposed fix: unverified candidate handling; note when none
- Verified solution and applicable scope: note when none; keep important constraints or counterexamples
- Verification evidence: method, actual result, code version or worktree scope, reviewer recheck conclusion
- First found / latest occurrence: date and task or finding reference
- Recurrence count: 0 (the first finding is not a recurrence)
```

Keep only reusable solutions, necessary constraints, and evidence references that can be rechecked. On repeated occurrences update the latest-occurrence information rather than appending a timeline; important new constraints or failed approaches may be briefly noted with their reasons. Raw logs, reproduction scripts, test code, and validation artifacts belong in test; harness cites only necessary evidence and does not copy full logs or sensitive data. Add a merge alias only when an actual merge occurs.

Example: an old page's async callback lacked account-identity validation, and a new page is likewise overwritten by a request sent before switching accounts; the root cause matches, so reuse the original entry, but still verify the new page's fix. The same timeout text from an unreleased connection pool should be investigated as a different problem and must not reuse the identity-validation solution.

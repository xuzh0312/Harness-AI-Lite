---
name: bug-detect
description: Use when a reviewer finds a project defect, encounters a similar historical error, or rechecks a claimed fix during project development.
---

# Bug Detect: Project Error Knowledge Base

Use this skill when reviewers examine errors, retrieve historical solutions, and recheck fixes. The knowledge base is [docs/bugs.md](../../../docs/bugs.md) in the current Harness; do not mix projects. It stores reusable issues and verified solutions, rather than a running log of review rounds.

## Invocation and Permissions

The main agent explicitly reads this skill and passes its path to reviewers. Reviewers must read and execute it when finding errors or rechecking fixes.

Reviewers keep code and the knowledge base read-only and return search results and record proposals after invoking the skill. Only the main agent writes the knowledge base, serially; before writing, reread the latest content, deduplicate again, and allocate IDs. Multiple reviewers do not write directly to files. The implementer reads matching entries before fixing issues and must still verify that an existing solution applies.

## Search, Confirmation, and Deduplication

1. Verify specific trigger conditions and observable consequences. Static reasoning may serve as evidence, but provide the complete causal path and mark it as not run. Aesthetic preferences, speculative issues, and unrelated suggestions do not enter the knowledge base. Keep concerns that cannot yet be confirmed as defects in the review report first.
2. Search the current project's knowledge base using symptom, module, error-code, and root-cause keywords, then read candidate entries. If no records exist on first invocation, return no match rather than importing errors from other projects. For a known defect with an unknown root cause, a new Awaiting diagnosis entry may be created with “root cause unconfirmed” explicitly stated.
3. Reuse the original ID when root cause, trigger mechanism, and repair principle match and no different applicability constraints are known. Different files, pages, or error text do not justify separate records. Do not force a merge when only error text is similar but root causes differ, or when common classification is uncertain. Add a record for a confirmed different issue; when uncertain, diagnose first or retain an Awaiting diagnosis record.
4. Repeated feedback, scans, and evidence for the same issue in the same round create no new record and do not increase counts. When a resolved issue recurs in a newly confirmed occurrence, update the original entry, recurrence count, and latest-occurrence information. Do not write files without new information.
5. If root-cause confirmation shows that two entries describe the same class of issue, the main agent merges them into the earlier ID, consolidates still-valid information, corrects references within the project, and retains the old ID as an alias that is never reused. Do not merge different root causes merely to compress logs.

## Status and Solution Evidence

| Status | Conditions and actions |
| --- | --- |
| Awaiting diagnosis | The defect and impact are confirmed, but the root cause remains unconfirmed; do not present it as known |
| Awaiting fix | Root cause and repair direction are clear, but implementation is unfinished |
| Awaiting verification | An implementation exists, but behavioral verification of the original issue or reviewer rechecking is missing |
| Resolved | Repair verification passes for the relevant issue scope, reviewer rechecking passes, and the main agent closes the record after checking evidence |
| Withdrawn | Evidence shows the recorded finding was a false positive; briefly record why and remove the incorrect solution to prevent later misuse |

When the same error recurs, move from Resolved back to the appropriate unresolved status. Preserve historically valid solutions and their applicable scope, explicitly stating that this recurrence remains unresolved. Increment the recurrence count once for each new, confirmed occurrence, rather than for each review round.

Keep “proposed solution” separate from “verified solution.” An executor's claim of repair, successful compilation, or unrelated passing tests cannot alone change status to Resolved. Rechecking must cover the original trigger behavior and related regressions. If static verification is used, explain why it sufficiently proves the issue has been eliminated and state coverage limitations. Old successful verification must not hide gaps in the current recurrence.

## Record Proposals Returned to the Main Agent

In addition to the normal review conclusion, return the following for every valid defect:

- Action: Add / Update / Reopen / Merge / No change; candidate ID or no match, and deduplication rationale.
- Search keywords, symptom, trigger conditions and impact, root cause and confirmation grounds; applicability differences between old and new occurrences.
- Proposed status; identify proposed and verified solutions separately.
- Evidence: task or finding reference, code version or uncommitted scope, reproduction and verification methods and results; unverified items.

Reviewers do not reserve new IDs or treat record proposals as saved. After writing, the main agent returns the final ID to the reviewer or current task. Use IDs such as BUG-0001, scan existing numbers (including merged aliases), and take the maximum plus one; do not reuse old IDs.

## Entry Format and Compression

The main agent appends or updates a section in the knowledge base rather than creating a file for each occurrence:

```markdown
## BUG-0001: Short issue title

- Status: Awaiting diagnosis / Awaiting fix / Awaiting verification / Resolved / Withdrawn
- Search keywords: Module, symptom, root-cause keywords
- Trigger conditions and impact: Minimum necessary description
- Root cause and grounds: Confirmed cause; state if unconfirmed
- Proposed solution: Unverified candidate approach; state if none
- Verified solution and applicable scope: State if none; retain important constraints or counterexamples
- Verification evidence: Methods, actual results, code version or working-tree scope, reviewer recheck conclusion
- First found / Latest occurrence: Date and task or finding reference
- Recurrence count: 0 (the first finding does not count as recurrence)
```

Retain only reusable solutions, necessary limitations, and evidence references that can be checked again. For repeated instances of the same error, update latest-occurrence information rather than appending an occurrence-by-occurrence timeline. Briefly record reasons for important new applicability conditions or failed approaches when needed. Store raw logs, reproduction scripts, test code, and verification artifacts in test; harness references necessary evidence without copying complete logs or sensitive data. Add merged aliases only when an actual merge occurs.

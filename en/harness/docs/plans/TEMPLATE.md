# <Task ID>: <Task name>

Status: Template, not started. When creating a task, change to Pending / Awaiting confirmation / In progress / Under review / Rework / Blocked / Completed / Cancelled.
The main agent maintains this single record; sub-agents return reports and do not edit it directly.

## Versions and user confirmation (required for feature plans)

Linked specification and current version: fill in the actual link and version; mark not applicable for non-feature tasks.
Plan version: to be filled in; approved combination: none; confirmation status: unconfirmed.
The approved combination records the specification path and version and the plan version; for partial approval, identify the document concerned and the remaining content awaiting confirmation.
User confirmation evidence and date: fill in after confirmation, never in advance; if the current combination becomes invalid, retain the original evidence and state why.
Substantive changes in this version, open questions, and assumptions: to be filled in; explicitly state when there are no questions.
For non-feature tasks, indicate applicability without introducing an additional requirement to confirm the entire plan.

## Goal, scope, and acceptance criteria

Goal, non-goals, allowed modification scope, and user constraints: to be filled in.

Feature plans reference the specification's original requirements, scope, and key behavior, briefly recording implementation goals without copying the entire specification; acceptance items use the specification's AC IDs. For non-feature tasks, record applicable requirements directly here.

| Acceptance item | Expected behavior | Check method | Why required or not applicable |
| --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | To be filled in |

## Environment and input versions

Harness, Project, and Test absolute paths and actual working directory: to be filled in; identify unused areas.
Loaded rules, permissions, repository locations and baselines, and boundaries of existing changes: to be filled in.
Data sources and versions, required requirements and design reading: to be filled in.

## Dispatch and steps

Feature plans use the numbered checklist below, specifying modules or paths, implementation content, and acceptance methods for each item. Ordinary tasks may use the subsequent dispatch table directly without maintaining a duplicate checklist.

| Checklist item ID | Feature or work content and affected modules | Role and allowed write scope | Prerequisites | Specification acceptance IDs, observable acceptance, and check method | Progress |
| --- | --- | --- | --- | --- | --- |
| PLAN-number.item | To be filled in | To be filled in | To be filled in | To be filled in | Not started |

| Subtask / role | Prerequisites | Allowed write scope | Working directory | Acceptance | Status |
| --- | --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | To be filled in | To be filled in | Pending |

Roles not invoked and reasons: to be filled in. Implement feature checklist items serially through implementation, independent review, and main-agent acceptance; necessary read-only investigation may run in parallel, but multiple implementers must not run in parallel.

| Subtask / round | Agent identity, role, and review dimension | Actual creation model | reasoning_effort | Runner-reported differences or none | Returned report reference or summary |
| --- | --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | To be filled in | To be filled in | To be filled in |

## Per-item handoff and acceptance (required for feature execution)

Keep one current brief, delivery summary, and review summary for each item in this record; do not copy files for each conversation round. Save and reference long reports only when necessary; raw diffs, logs, and verification artifacts belong in test.

- Current item and brief: checklist item ID, approved combination, relevant specification acceptance IDs, necessary interfaces and prerequisite results, specific write scope, and check methods.
- Dispatch baseline: relevant repositories, commits, and boundaries of existing uncommitted changes; without Git, record file snapshots or a content comparison baseline.
- Delivery: actual file and structure changes, self-review results, check evidence, unfinished work, and executor identity.
- Review materials: complete task change scope, brief, execution report, and evidence; test location of raw diffs or snapshots.
- Independent conclusions: both reviewer-spec and reviewer-quality reports, each identity and assigned dimension, the same reviewed version, and whether reviews actually ran in parallel or sequentially; gaps, rulings, rework rounds, and verification results.
- Main-agent per-item acceptance: pass / rework / blocked and supporting reasons; start the next implementation item only after passing.
- Resume entry: current item, active agents, next step, approvals and evidence still valid; verify actual state before resuming.

## Progress, findings, and decisions

- [ ] Fill in steps, actual progress, and remaining work.

Record important facts, design choices, user corrections, and reasons; distinguish assumptions from verified facts.

## Verification evidence

| Acceptance item | Working directory, command, or check method | Covered version / diff scope | Actual result | Evidence location |
| --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | Pass / Fail / Not run / Not applicable | To be filled in |

Explain failures, checks not run, and non-applicability; mark evidence invalid and verify again when later changes affect it.

## Independent review and rework

For each scope requiring review, always record reports from two independent instances; both use the reviewer role configuration, but each instance's actual parameters are recorded separately. Explain when review is unnecessary; do not combine review instances because a task is small.

| Review scope and round | Instance and assigned dimension | Agent identity and configuration record reference | Coverage from baseline to final version | Conclusion, evidence, and report reference |
| --- | --- | --- | --- | --- |
| To be filled in | reviewer-spec / specification compliance | To be filled in | To be filled in | To be filled in |
| To be filled in | reviewer-quality / implementation quality | To be filled in | To be filled in | To be filled in |

Whether actually parallel or sequential due to limited capacity: to be filled in. Accept only when both reports recommend approval, cover the same final version, and contain all required evidence; missing reports, required rework, or insufficient evidence prevent acceptance. Retain reasons for conflict rulings, deduplicate repeated findings while keeping their sources. After fixes, both reviewers must check the current version; do not automatically carry forward an old pass.

After every feature checklist item passes, create two new reviewers and record an overall review covering the full feature specification, complete diff, cross-item integration, regression, and validity of final evidence; merely collecting per-item “pass” results is insufficient.

Related bug knowledge base BUG IDs and record actions: to be filled in; state when there are no findings. Do not duplicate full bug entries; detailed root causes and final solutions are stored in docs/bugs.md (relative to Harness).

| Finding | Trigger conditions and impact | Accept or reject and grounds | Fix and verification | Resolved? |
| --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | To be filled in | To be filled in |

If the same issue persists for two consecutive rounds without new evidence, record the main agent's cause reanalysis and adjustments rather than retrying mechanically.

## Blockers and resumption

Missing conditions, attempted actions, impact, work that can continue independently, resume entry, and next step: to be filled in. It must be possible to continue without relying on past chats.

## Main-agent final acceptance

Per-item conclusions, final diff check, unverified items, and remaining issues: to be filled in.
Final version: code commit; explicitly state when uncommitted and record the baseline and change summary. Record relevant Harness commits and necessary data versions; never invent a SHA when no commit exists.
Authorized and actually executed commit / push / release stages: to be filled in.
Final status and reason: to be filled in; archive to completed once everything is complete, and retain blocked or rework tasks in active.


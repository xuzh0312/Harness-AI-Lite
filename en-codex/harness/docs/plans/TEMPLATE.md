# <Task ID>: <Task name>

Status: Template, not started. When creating a task, use Pending / Awaiting confirmation / Awaiting implementation authorization / In progress / Under review / Rework / Blocked / Completed / Cancelled.
The task planner maintains this record during planning. The execution coordinator taking ownership maintains it once implementation is handed over. Subagents only return reports. Record each fact once and cite the relevant checklist item, acceptance ID, or report location elsewhere. Omit empty tables for events that did not occur, such as rework or blockers.

**Resume entry:** Feature scope, current step and responsible role, latest requests or corrections, upstream artifacts and versions, valid authorization and its basis, current item and baseline, active writers, blockers, next step, and evidence locations. Update this entry in place. Cite existing records by location. Verify the actual state before resuming.
Project subagent agreement: reference MODELS.md. For agreements not saved there, hand over confirmation status, the user response and its scope. Include this in the reply for read-only work.

## Versions and user confirmation (required for feature plans)

Linked project proposal (implementation specification) and current version: fill in the actual link and version; mark not applicable for non-feature tasks.
Plan version: to be filled in; approved combination: none; confirmation status: unconfirmed.
The approved combination records the specification path and version and the plan version; for partial approval, identify the document concerned and the remaining content awaiting confirmation.
User confirmation evidence and date: fill in after confirmation, never in advance; if the current combination becomes invalid, retain the original evidence and state why.
Implementation authorization: unauthorized or list authorized items. Record the matching combination, user evidence, and next step. Approval of the documents does not authorize implementation.
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
Record data sources and versions, and the requirements and proposals the implementer must read. For UI items, record the design basis, user choices, acceptance IDs, and checks still to run. If approval relies on a selected mockup, record its path relative to test, commit or backup version, recovery location, content checksum, and associated ACs so reviewers can retrieve and verify it.

## Dispatch and steps

Feature Plans use the numbered checklist. Ordinary tasks can use the dispatch table below. Do not put the same item in both tables.

| Checklist item ID | Feature or work content and affected modules | Role and allowed write scope | Prerequisites | Specification acceptance IDs, observable acceptance, and check method | Progress |
| --- | --- | --- | --- | --- | --- |
| PLAN-number.item | To be filled in | To be filled in | To be filled in | To be filled in | Not started |

| Subtask / role | Prerequisites | Allowed write scope | Working directory | Acceptance | Status |
| --- | --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | To be filled in | To be filled in | Pending |

Run feature checklist items serially through implementation, independent review, and execution coordinator acceptance. Necessary read-only investigation may run in parallel. Explain why any expected role was omitted and mark the work blocked if a required role is missing.

## Per-item handoff and acceptance (required for feature execution)

Keep one current brief, delivery summary, and review summary for each item in this record; do not copy files for each conversation round. Save and reference long reports only when necessary; raw diffs, logs, and verification artifacts belong in test.

- Current item and brief: checklist item ID, approved combination, relevant specification acceptance IDs, necessary interfaces and prerequisite results, specific write scope, and check methods.
- Dispatch baseline: relevant repositories, commits, and boundaries of existing uncommitted changes; without Git, record file snapshots or a content comparison baseline.
- Delivery: actual file and structure changes, self-review results, check evidence, unfinished work, and executor identity.
- Review materials: complete task change scope, brief, execution report, and evidence; test location of raw diffs or snapshots.
- Independent conclusions: refer to the corresponding two review records below without duplicating them.
- Execution coordinator's per-item acceptance: pass / rework / blocked and supporting reasons. Start the next implementation item only after acceptance.

## Progress, findings, and decisions

- [ ] Fill in steps, actual progress, and remaining work.

Record important facts, design choices, user corrections, and reasons; distinguish assumptions from verified facts.

## Verification evidence

| Acceptance item | Working directory, command, or check method | Covered version / diff scope | Actual result | Evidence location |
| --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | Pass / Fail / Not run / Not applicable | To be filled in |

Explain failures, checks not run, and non-applicability; mark evidence invalid and verify again when later changes affect it.

## Independent review and rework

For each scope requiring review, record conclusions from two independent instances separately. Explain when review is unnecessary. Do not combine review instances because the task is small.

| Review scope and round | Review dimension | Instance identity | Coverage from baseline to final version | Conclusion, evidence, or report location |
| --- | --- | --- | --- | --- |
| To be filled in | reviewer-spec / specification compliance | To be filled in | To be filled in | To be filled in |
| To be filled in | reviewer-quality / implementation quality | To be filled in | To be filled in | To be filled in |

Whether actually parallel or sequential due to limited capacity: to be filled in. Under the [two-review acceptance conditions](../../agents/reviewer/AGENT.md#findings-and-conclusions), record the original conclusions from both reports, any remaining blocking findings, and the final acceptance decision. If conclusions still conflict after rechecking, refer them to the user. Record the disputed finding, the user's decision, date, and reviewed version, and keep the original reports intact. Deduplicate findings while preserving their sources. After fixes, both reviewers must check the current version; do not carry forward an old pass automatically.

After accepting all checklist items in the current approved scope, create two new reviewers for an overall review. Check specification coverage, the complete diff, cross-item integration, regressions, and final evidence. Keep the history of approved cancellations without counting them as passed. Items that lack implementation authorization remain pending.

Related bug knowledge base BUG IDs and record actions: to be filled in; state when there are no findings. Do not duplicate full bug entries; detailed root causes and final solutions are stored in docs/bugs.md (relative to Harness).

| Finding | Trigger conditions and impact | Accept or reject and grounds | Fix and verification | Resolved? |
| --- | --- | --- | --- | --- |
| To be filled in | To be filled in | To be filled in | To be filled in | To be filled in |

If the same issue persists for two consecutive rounds without new evidence, record the execution coordinator's review of the cause and what will change before retrying.

## Blockers and resumption

Missing conditions, attempted actions, impact, and work that can continue independently: to be filled in. Update the next step in the resume entry at the top.

## Execution coordinator final acceptance

Per-item conclusions, final diff check, unverified items, and remaining issues: to be filled in. For UI items, match the evidence to the acceptance goal: inspect the mockup to assess design intent, inspect the actual interface at the target viewport for layout, perform the interaction to test behavior, and reopen to test persistence. List only relevant evidence. If one item has several goals, address them separately. Mark missing checks as unverified; viewing a mockup does not replace runtime verification.
Final version: code commit; explicitly state when uncommitted and record the baseline and change summary. Record relevant Harness and test repository commits and necessary data versions. Never invent a SHA when no commit exists.
Authorized and actually executed commit / push / release stages: to be filled in.
Final status and reason: to be filled in; archive to completed once everything is complete, and retain blocked or rework tasks in active.


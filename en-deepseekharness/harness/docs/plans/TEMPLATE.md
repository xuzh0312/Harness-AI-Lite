# <Task ID>: <Task Name>

Status: template, not started. On creation change to Pending / Awaiting confirmation / In progress / In acceptance / Rework / Blocked / Completed / Canceled.
The main agent maintains this single record; subagents return reports and do not modify it directly.

## Version and User Confirmation (required for feature plans)

Linked specification and current version: fill in the actual link and version; non-functional tasks note not applicable.
Plan version: fill in; approved pair: none; confirmation status: unconfirmed.
The approved pair records the specification path and version and the plan version; for partial approval, state which document it covers and what remains unconfirmed.
Basis and date of user confirmation: fill in after confirmation, never prefill; when the current pair becomes invalid, keep the original basis and state why.
Substantive changes in this version, open questions, and assumptions: fill in; explicitly state when there are none.
Non-functional tasks note applicability and do not add a whole-plan confirmation requirement.

## Goals, Scope, and Acceptance Criteria

Goals, non-goals, allowed modification scope, user constraints: fill in.

A feature plan cites the specification's original requirements, scope, and key behavior, briefly states implementation goals, and does not copy the entire specification; acceptance items use the specification's AC IDs. Non-functional tasks record applicable requirements directly here.

| Acceptance item | Expected behavior | Check method | Required or not-applicable reason |
| --- | --- | --- | --- |
| Fill in | Fill in | Fill in | Fill in |

## Environment and Input Versions

Harness, Project, Test absolute paths and actual working directory: fill in; note unused areas.
DSH session workspace, file sandbox, and each subagent's cwd boundaries: fill in.
Loaded rules, permissions, code repository locations and baselines, existing-change boundaries: fill in.
Data sources and versions, required requirements and approach: fill in.

## Dispatch and Steps

Feature plans use the numbered checklist below, each item stating modules or paths, implementation content, and acceptance method; ordinary tasks may use the subsequent dispatch table directly without maintaining the same checklist twice.

| Checklist item ID | Feature or work content, affected modules | Role and allowed write scope | Prerequisites | Specification acceptance IDs, observable acceptance, and check method | Progress |
| --- | --- | --- | --- | --- | --- |
| PLAN-<number>.<item> | Fill in | Fill in | Fill in | Fill in | Not started |

| Subtask / role | Prerequisites | Allowed write scope | Working directory | Acceptance | Status |
| --- | --- | --- | --- | --- | --- |
| Fill in | Fill in | Fill in | Fill in | Fill in | Pending |

Roles not invoked and rationale: fill in. Feature implementation completes implementation, independent review, and main-agent acceptance serially per numbered item; necessary read-only investigation may run in parallel, and multiple implementers do not run in parallel.

| Subtask / round | Subagent name, role, and review dimension | Actual provider/model created | reasoning_effort | DSH-reported route difference or none | Returned report reference or summary |
| --- | --- | --- | --- | --- | --- |
| Fill in | Fill in | Fill in | Fill in | Fill in | Fill in |

Subagent names are unique under the same creator and are not reused; the two reviewers for one item use different names. Actual creation parameters are authoritative from the dispatch record and the subagent reply footer.

## Item Handoff and Acceptance (required for feature execution)

Keep one current brief, delivery summary, and review summary per item in this record; do not copy files per conversation round. Save long reports only when truly needed and cite them; raw diffs, logs, and validation artifacts go in test.

- Current item and brief: checklist item ID, approved pair, relevant specification acceptance IDs, necessary interfaces and prerequisite results, specific write scope, subagent cwd, and check method.
- Dispatch baseline: relevant repositories, commits, and existing uncommitted change boundaries; without Git, record file snapshots or a content-comparison baseline.
- Delivery: actual files and structural changes, self-review results, check evidence, unfinished items, and executor name.
- Review material: complete task change scope, brief, execution report, and evidence; test locations of raw diffs or snapshots.
- Independent conclusions: reviewer-spec and reviewer-quality reports, their names and dimensions, same reviewed version, actual parallel or sequential execution; gaps, adjudications, rework rounds, and recheck results.
- Main-agent item acceptance: pass / rework / blocked and the basis; start the next implementation item only after pass.
- Recovery entry: current item, in-flight agents, next step, still-valid approvals and evidence; verify actual state before continuing.

## Progress, Findings, and Decisions

- [ ] Steps to fill in, actual progress, and remaining work.

Record important facts, approach choices, user corrections, and rationale; distinguish assumptions from verified facts.

## Verification Evidence

| Acceptance item | Working directory, command, or check method | Covered version / diff scope | Actual result | Evidence location |
| --- | --- | --- | --- | --- |
| Fill in | Fill in | Fill in | passed / failed / not run / not applicable | Fill in |

Explain failures, not-run items, and not-applicable items; mark evidence invalid and re-verify when later changes affect it.

## Independent Review and Rework

For each review scope, record two independent instance reports; both share the reviewer role configuration, and each actual parameter set is recorded separately. When no review is needed, state the reason; do not merge review instances just because the task is small.

| Review scope and round | Instance and dimension | Subagent name and configuration record reference | Baseline-to-final version covered | Conclusion, evidence, and report reference |
| --- | --- | --- | --- | --- |
| Fill in | reviewer-spec / specification conformance | Fill in | Fill in | Fill in |
| Fill in | reviewer-quality / implementation quality | Fill in | Fill in | Fill in |

Actual parallel or sequential review due to capacity: fill in; when capacity is insufficient, record the actual DSH limitation (such as `ACTIVATION_LIMIT_REACHED`), subagents waited for or collected, and state that they were not parallel. Accept only after both reports recommend pass, cover the same final version, and necessary evidence is complete; missing, needs rework, or insufficient evidence cannot pass. Keep the basis for conflict adjudication; deduplicate repeated findings but keep sources. After a fix, both must verify the current version and must not carry over an old pass automatically.

After all checklist items pass, create two new reviewers and record one overall review: full-feature specification coverage, complete diff, cross-item integration, regression, and final evidence validity; do not merely summarize per-item "pass."

Related bug knowledge base BUG IDs and record actions: fill in; state when none. Do not copy full defect entries; detailed root causes and final solutions live in docs/bugs.md (relative to Harness).

| Finding | Trigger conditions and impact | Accepted or rejected and basis | Fix and recheck | Resolved |
| --- | --- | --- | --- | --- |
| Fill in | Fill in | Fill in | Fill in | Fill in |

When the same problem persists for two rounds without new evidence, record the main agent's root-cause review and adjustment; do not retry mechanically.

## Blockers and Recovery

Missing conditions, attempted actions, impact, work that can continue independently, recovery entry, and next step: fill in. Work can continue without relying on past chat.

## Main Agent Final Acceptance

Item conclusions, final diff check, unverified items, remaining issues: fill in.
Final version: code commit; explicitly note when uncommitted, recording baseline and change summary. Record relevant Harness commits and necessary data versions; do not invent a SHA when there is no commit.
Authorized and actually performed commit/push/release stages: fill in.
Profile, plugin, preset, or host environment changes and authorization basis: fill in; state when none.
Final status and rationale: fill in; archive to completed when all is done, keep active when blocked or in rework.

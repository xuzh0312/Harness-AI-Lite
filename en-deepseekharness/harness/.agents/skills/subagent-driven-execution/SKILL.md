---
name: subagent-driven-execution
description: Use when an approved feature plan is ready for implementation or an in-progress feature needs task-by-task subagent execution, independent review, or recovery.
---

# Subagent-Driven Execution: Item-by-Item Dispatch and Independent Acceptance

The main agent reads the current specification, plan, and [main agent runbook](../../../docs/runbooks/main-agent.md), then loops through "implement one item → two parallel independent reviewers → rework/recheck → main agent acceptance," followed by an overall review by two new reviewers. This skill uses only DSH's `subagent`, `send_message`, `list_agents`, `wait_agent`, file tools, and shell; it does not depend on extra plugins, scheduled tasks, or scripts.

## 1. Verify Approval and Recovery Point

Confirm that implementation is authorized, the current specification and plan versions match the approved pair, key questions are settled, and paths, DSH workspace and write permissions, dependencies, and current code state are verified. Do not start when the user only asked for planning; return to [feature-plan](../feature-plan/SKILL.md) for material changes. Do not re-request a still-valid approval because the session changed.

Use the original plan as the single progress record, following the [plan template](../../../docs/plans/TEMPLATE.md) to record the current item, subagent names, cwd, creation parameters, baseline, brief, delivery and review summaries, rework rounds, evidence, and next step. On start or resume, read the actual files and verify in-flight agent status, existing changes, and evidence; DSH's `running` / `inactive` only reflects activity, not completion, success, or failure. Coordinate still-running tasks first and do not duplicate dispatch. When an original agent cannot be recovered, pass its verified delivery and remaining scope to a new agent and keep the original record.

When an approved old plan lacks a standalone specification, first derive a related specification under feature-plan's compatibility rules; do not add unapproved requirements through backfilled documentation.

## 2. Prepare a Brief for One Implementation Item

Choose one item from the uncompleted items whose dependencies are satisfied, in plan order; implement items serially, starting the next only after independent review and main-agent acceptance of the previous. Do not start implementer and infra implementation work in parallel. Necessary read-only investigation may run in parallel but cannot replace unsatisfied implementation prerequisites.

Create a fresh implementer or infra context for each new item: use `subagent` with an explicit name, cwd, provider, model, and reasoning_effort; do not use `subagent_fork` instead of implementation or review. The architect participates in upfront analysis, important design deviations, and fact-finding, not repeated calls for every role. Subagents do not create nested agents; the main agent dispatches reviewers, and an executor's self-review does not replace independent review.

Keep the brief in the corresponding plan item, using the [subtask handoff template](../../../agents/TASK_TEMPLATE.md) to provide:

- The current checklist item, approved document pair, relevant specification acceptance IDs and original constraints, goals, and non-goals.
- The three areas' actual paths, subagent cwd, applicable rules, necessary interfaces, prerequisite acceptance results, and relevant skill names or `SKILL.md` absolute paths.
- The specific allowed read/write scope, existing user changes, verification method and evidence location, and necessary dependencies.
- The baseline before this item, output requirements, and the brief's location in the original plan.

Do not copy the full conversation or the history of all completed tasks. Subagents cannot see the main conversation, so the brief must be self-contained; save a long report separately only when truly needed and cite it. Briefs, reports, and review summaries go in the original plan by default; do not create a file for each handoff round.

Before dispatch, record the relevant repository commits and the boundaries of existing uncommitted changes; for uncommitted content, untracked files, or areas without Git, save a baseline snapshot of the relevant files in test when needed for full-content comparison. Do not infer this item's diff afterward from `git status` or `HEAD~1` alone, and do not commit or initialize a repository merely to ease review.

Before each creation, re-read [MODELS.md](../../../agents/MODELS.md), verify routes and values with `list_subagent_models`, pass the role's model and reasoning effort explicitly, and record the actual parameters and reply footer per its rules. A fresh context must receive all necessary material; when DSH refuses creation (unauthorized route, `ACTIVATION_LIMIT_REACHED`, etc.), report the limitation and do not silently downgrade or pretend creation succeeded. When capacity is insufficient, collect or wait for existing subagents to settle before retrying.

## 3. Receive Implementation and Verification Reports

The executor implements within the assigned scope, runs targeted verification and a self-review, and returns the shared role format: actual files and structural changes, full diff scope, working directory and check results, evidence, unfinished work, and blockers. DSH returns only the subagent's final reply; the main agent cannot see intermediate steps. When the report lacks necessary material, follow up with `send_message` and do not invent the process. The main agent keeps dispatch responsibility, does not modify the executor's files while it works, and does not take over implementation to bypass review; update the dispatch boundary first if adjustment is needed.

The main agent verifies the actual delivery. When the report has unfinished work, key issues, or missing evidence, first supply context, rework, or record a blocker; do not treat a "completed" label as acceptance. The main agent updates structural changes in [paths.md](../../../docs/paths.md) no later than the next dispatch or review.

The product lives in project/code; tests, all auxiliary code, diff exports, snapshots, raw logs, and validation artifacts live in test; harness holds only management documents. Generate a final installer package in project/installpark only when the user explicitly requests it or an explicitly approved plan contains a packaging item; do not commit, push, merge, or release additionally, and do not change the profile or plugins without authorization.

## 4. Dispatch Two Parallel Reviewers

After each implementation item is delivered, the main agent uses `subagent` to create two reviewers distinct from the executor and from each other, with fresh contexts, and puts both calls in one message so they run in parallel. Never use `subagent_fork` for a reviewer. Both use the same reviewer role configuration in MODELS.md; for each creation, read it separately, verify with `list_subagent_models`, pass parameters explicitly, and record each instance's name, dimension, round, and actual parameters. Provide the same brief, specification constraints, reviewed version, complete task diff and baseline, execution report, and verification evidence; for rechecks, use `send_message` to the item's two instances. The diff includes all commits and uncommitted changes for this item, not just the latest commit; without Git, compare a baseline snapshot with current files. Save raw diffs and snapshots in test; the plan records only paths and coverage.

Both instances read the actual files independently and form one clear judgment each without reading the other's initial conclusion:

- **reviewer-spec / specification conformance**: whether the item's behavior, boundaries, and acceptance are satisfied, and whether anything is missing or out of scope.
- **reviewer-quality / implementation quality**: correctness, project conventions, regression risk, maintainability, and whether tests and verification evidence are valid.

Each report uses "recommend pass / needs rework / insufficient evidence," states its dimension, round, actually covered version, and limitations. Accept only after both reports are present, both recommend pass, they cover the same final version, and the main agent verifies; missing either report, either needing rework, or insufficient evidence means no pass. Adjudicate conflicts by evidence; do not vote or let one dimension's pass cancel the other; deduplicate repeated findings but keep both sources and conclusions. Report confirmed cross-dimension defects as well.

Do not change the reviewed scope before both reports return; if external changes occur, update the reviewed version for both and recheck—do not mix versions. When capacity is insufficient, run the two independent instances sequentially and state that they were not parallel; DSH defaults to `maxActiveSubagents=8`, so at the limit wait for existing subagents to settle and retry. If either instance cannot be provided, record an acceptance blocker and do not downgrade to one reviewer covering both dimensions. Checks should match this item's risk; do not mechanically rerun valid same-version evidence, but add targeted verification for concrete doubts or new differences affecting the conclusion.

When a defect is found or a fix rechecked, the reviewer loads [bug-detect](../bug-detect/SKILL.md) with the `skill` tool or by absolute path and returns only deduplicated record proposals; the main agent writes the project bug knowledge base serially. Subagents do not modify shared records directly.

## 5. Rework, Item Acceptance, and Interruption Recovery

The main agent verifies each finding and records the rationale for accepting a fix or rejecting it with evidence. When a fix is needed, prefer the original executor: a local subagent can continue the conversation, so use `send_message` to provide the concrete findings, acceptance criteria, and allowed scope. If the original agent is unavailable or the role configuration has changed, re-read the configuration, create a new agent, and hand off existing results and unresolved items.

After a fix, rerun affected checks; the main agent provides the same final version and new diff to the item's two reviewers, who recheck the original findings and related regressions independently; valid evidence may be reused when this dimension is unaffected, but the current version must still be verified and confirmed. Prefer restoring the original two instances; if they cannot be restored or the role configuration changed, create and hand off per the new configuration. After both conclusions satisfy the pass conditions, the main agent verifies the evidence. If the same problem persists for two rounds without new evidence, re-examine the root cause, approach, and dispatch; ask the architect to analyze when necessary, and present only concrete open questions when user decisions are needed. Do not retry mechanically forever, and do not "park and count as complete" unmet requirements, required verification, or blocking defects after a round limit.

The main agent checks off an item only after its specification, quality, and necessary checks are satisfied, recording the baseline-to-final diff scope, reviewer conclusions, and evidence. Record completion and the next step before dispatching the next item; raw reports do not become a second progress source.

Pure-review items in the plan are handled directly by the two reviewers in their dimensions; main-agent acceptance items are executed by the main agent; do not recursively review a reviewer's report. After a real implementation change, two instances must still recheck and meet the same-version pass conditions.

When permissions, dependencies, DSH subagent capability, model routes, or necessary decisions are missing, record the specific blocker, attempted actions, impact, and recovery conditions; do not start implementation dependent on that condition. Other independent, authorized read-only investigation and document preparation may continue. On recovery, re-verify affected evidence and keep still-valid approvals and accepted items.

## 6. Overall Review and Final Acceptance

After all implementation items pass, the main agent creates reviewer-spec and reviewer-quality with fresh contexts and reviews the entire specification and the complete final diff since the feature baseline in parallel. The former checks full-feature acceptance coverage and cross-item behavior; the latter checks cross-item interfaces, data flow, regressions, and final evidence validity; both follow Section 4's pass conditions and capacity rules for two independent, same-version reports. Per-item pass summaries alone are not an overall review.

Handle overall findings through the same fix, targeted verification, and independent recheck loop; if an accepted item changes, reopen the affected items and re-accept them without redoing unrelated work whose evidence remains valid. After all required checks, mandatory reviews, and main-agent final acceptance are satisfied, update the specification status, path index, and plan evidence, archive the plan to completed, and correct the specification's plan link.

The final reply states what was completed, actual verification, and limitations. Unfinished, blocked, or not-run required checks must not be marked passed; acceptance does not automatically authorize extra Git operations, profile changes, or release.

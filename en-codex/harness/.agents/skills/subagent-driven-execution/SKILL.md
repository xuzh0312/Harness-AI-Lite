---
name: subagent-driven-execution
description: Use when an approved feature plan is ready for implementation or an in-progress feature needs task-by-task subagent execution, independent review, or recovery.
---

# Subagent Driven Execution: Item-by-Item Delegation and Independent Acceptance

The main agent reads the current specification, plan, and [main agent handbook](../../../docs/runbooks/main-agent.md), then follows the loop “implement one item → independent review by two parallel reviewers → rework and recheck → main agent acceptance.” Two new reviewers perform overall review at the end. This skill draws on Superpowers' task-driven approach and uses the current runtime's subagent tools, with no external plugin, background scheduler, or Bash script dependency.

## 1. Verify Approval and Resume Position

Confirm that the user authorized implementation, the current specification and plan versions match the approved pair, key questions are resolved, and paths, permissions, dependencies, and current code state have been verified. Do not start when only planning was requested. Return to [feature-plan](../feature-plan/SKILL.md) for revision and confirmation after material changes. Do not request still-valid approval again because the session changed.

Use the original plan as the sole progress record. Following the [plan template](../../../docs/plans/TEMPLATE.md), save the current item, executor identity, baseline, brief, delivery and review summaries, rework rounds, evidence, and next step. On startup or recovery, read actual files and verify in-flight agent status, existing changes, and evidence. Coordinate tasks still running before dispatching duplicates. If the original agent cannot be restored, hand verified delivery and unfinished scope to a new agent, preserving the original record.

If an older approved plan lacks a separate specification, first derive a linked specification under feature-plan's compatibility rules; do not add unapproved requirements while completing documents.

## 2. Prepare a Brief for One Implementation Item

Choose one unfinished item whose dependencies are satisfied, following plan order. Execute implementation items serially; start the next only after independent review and main agent acceptance of the previous item. Necessary read-only investigation may run in parallel but cannot replace unmet implementation prerequisites.

Create a fresh implementer context for every new implementation item. Subagents do not create nested agents; the main agent dispatches reviewers, and executor self-review does not replace independent review.

Save the brief in the corresponding item of the original plan. Use the [handoff template](../../../agents/TASK_TEMPLATE.md) to provide:

- The current checklist item, approved document pair, relevant specification acceptance IDs and original constraints, goal, and non-goals.
- Actual paths for the three areas, working directory, applicable rules, necessary interfaces, and accepted prerequisite results. For interface items, include the selected design path, key states, interaction constraints, and scenarios requiring hands-on verification. Prototypes serve as design references only.
- Specific allowed read/write scope, existing user changes, verification methods and evidence locations, and necessary dependencies.
- The baseline before this item starts, output requirements, and the location of this item's brief in the original plan.

Do not copy entire chats or the history of all completed tasks. Save a separate management document and reference it only when a long report is needed; briefs, reports, and review summaries go directly in the original plan by default. Do not create files for each handoff round.

Before delegation, the main agent records relevant repository commits and boundaries of existing uncommitted changes. For uncommitted content, untracked files, or areas without Git, save prior snapshots of relevant files in test when needed for complete content comparison. Do not infer the item's diff solely from later git status or HEAD~1, and do not commit or initialize repositories without authorization merely to simplify review.

Before each creation, reread [MODELS.md](../../../agents/MODELS.md), explicitly pass the role's model and reasoning effort, and record actual parameters and reply footers under its rules. Fresh contexts must receive necessary materials. If the tool cannot explicitly configure them, report the limitation without silently downgrading or pretending creation succeeded.

## 3. Receive Implementation and Verification Reports

The executor implements within the assigned scope, performs targeted verification and self-review, and returns in the shared role format: actual file and structural changes, complete diff scope, working directory and check results, evidence, unfinished items, and blockers. The main agent retains coordination responsibility, does not edit executor-owned files during execution, and does not take over implementation to bypass review. Update assignment boundaries first when adjustments are needed.

The main agent checks actual delivery. If the report contains unfinished work, key questions, or missing evidence, first supply context, arrange rework, or record a blocker. Do not treat a “Completed” label as acceptance. The main agent updates structural changes according to [paths.md](../../../docs/paths.md), no later than the next assignment or review.

The software itself belongs in project/code; tests and all auxiliary code, diff exports, snapshots, raw logs, and verification artifacts belong in test. harness stores management documents only. Generate final installation packages in project/installpark only when the user explicitly requests them or explicitly approves a packaging item in the plan. Do not additionally commit, push, merge, or publish.

## 4. Dispatch Two Parallel Reviewers

After each implementation item is delivered, the main agent creates two reviewers with independent contexts, distinct from the executor and from each other, for parallel review. Both use the same reviewer-role configuration from MODELS.md; reread it and explicitly pass parameters for each creation, recording each identity, dimension, round, and actual parameters. Provide the same brief, specification constraints, reviewed version, complete task diff and baseline, execution report, and verification evidence. Both instances for the item may be restored for rechecking. The diff includes all committed and uncommitted changes for this item, rather than only the latest commit. Without Git, compare prior snapshots with current files. Store raw diffs and snapshots in test; the plan records only paths and coverage.

Both instances independently read actual files and each provides one explicit judgment, without first reading the other's initial conclusion:

- **reviewer-spec / Specification compliance**: Whether corresponding behavior, boundaries, and acceptance requirements are met, and whether work is missing or exceeds scope.
- **reviewer-quality / Implementation quality**: Whether correctness, project conventions, related regression risks, maintainability, and test and verification evidence are satisfactory.

Each report uses “Recommend approval / Rework required / Insufficient evidence” and states its assigned dimension, round, actual version covered, and limitations. The main agent accepts only after both reports are available, both recommend approval and cover the same final version, and the main agent has verified them. Missing reports, rework requirements, or insufficient evidence prevent acceptance. Resolve conflicts through evidence, without voting or offsetting issues with approval in the other dimension. The main agent deduplicates repeated findings while preserving both sources and conclusions. Proven defects across dimensions must also be reported.

Do not change the reviewed scope before both reports return. If external changes occur, update the reviewed version for both and recheck; do not mix versions. When capacity is insufficient, complete the two independent instances sequentially and state that they were not parallel. If either instance cannot be provided, record acceptance as blocked rather than letting one reviewer cover both dimensions. Checks should address the item's risks. Do not mechanically rerun valid evidence for the same version; add targeted verification for specific concerns or new changes affecting conclusions.

When finding defects or rechecking fixes, reviewers invoke [bug-detect](../bug-detect/SKILL.md) and return only deduplicated record proposals. The main agent writes the project error knowledge base serially. Subagents do not directly edit shared records.

## 5. Rework, Item Acceptance, and Interruption Recovery

The main agent verifies every finding and records the rationale for accepting a fix or rejecting a finding with evidence. When repair is needed, prefer restoring the original executor and supply specific findings, acceptance requirements, and allowed scope. If the original agent is unavailable or current role configuration has changed, reread configuration, create a new agent, and hand over existing results and unresolved matters.

After fixes, rerun affected checks. The main agent gives both reviewers in the group the same final version and new diff. Each rechecks original findings and related regressions. Valid evidence may be reused for an unaffected dimension, but the current version must still be checked and confirmed. Prefer restoring both original instances; if they cannot be restored or role configuration has changed, create replacements under the new configuration and hand over the work. After both conclusions meet passing conditions, the main agent checks the evidence. If the same issue persists for two consecutive rounds without new evidence, revisit the root cause, approach, and delegation. Ask only specific questions when user decisions are needed. Do not retry mechanically forever or mark unmet requirements, mandatory verification, or blocking defects as “deferred and complete” after reaching a round count.

The main agent marks an item as passed only when it meets the specification, quality requirements, and necessary checks, recording the baseline-to-final diff scope, reviewer conclusions, and evidence. Record completion and the next step before assigning the next item; raw reports do not become a separate progress source.

Review-only plan items are completed directly by the two reviewers according to their dimensions; main agent acceptance items are performed by the main agent. Do not recursively arrange review of reviewers' reports. Actual implementation changes still require rechecking by both instances and same-version passing conclusions.

If permissions, dependencies, runtime capabilities, or necessary decisions are missing, record the specific blocker, attempted actions, effects, and recovery conditions. Do not start implementation dependent on that condition. Other independent, authorized read-only investigation and document preparation may continue. On recovery, reverify affected evidence while preserving still-valid approvals and accepted items.

## 6. Overall Review and Final Acceptance

After all implementation items pass, the main agent creates fresh reviewer-spec and reviewer-quality instances with independent contexts to review the entire specification and complete final diff since the feature's starting baseline in parallel. The former checks full-feature acceptance coverage and cross-item behavior; the latter checks cross-item interfaces, data flow, regressions, and validity of final evidence. Both follow Section 4's passing conditions and capacity rules for two independent, same-version reports. Item acceptance summaries alone do not constitute overall review.

Handle overall findings through the same closed loop of repair, targeted verification, and independent rechecking. If accepted items change, reopen and reaccept affected items without repeating unrelated work whose evidence remains valid. After all necessary checks, mandatory reviews, and main agent final acceptance are satisfied, update the specification status, path index, and plan evidence, archive the plan in completed, and correct its link in the specification.

The final reply states completed work, actual verification, and limitations. Unfinished or blocked work and required checks not run cannot be marked as passed. Acceptance does not automatically authorize additional Git operations or publication.

---
name: subagent-driven-execution
description: Use to execute or resume an approved feature plan within the user's explicit implementation authorization. Skip for planning alone.
---

# Subagent Driven Execution: Item-by-Item Delegation and Independent Acceptance

The Execution Coordinator reads the current specification, plan, and [execution handbook](../../docs/runbooks/execution.md). For each item, implement, obtain two independent parallel reviews, rework and recheck as needed, and then accept. Two new reviewers perform overall review at the end. This skill draws on Superpowers' task-driven approach and uses the current runner's subagent tools, with no external plugin, background scheduler, or Bash script dependency.

## 1. Verify Approval and Resume Position

Confirm implementation authorization, that current specification and plan versions match the approved pair, that key questions are resolved, and that paths, permissions, dependencies, and code state are verified. Do not start for planning-only requests. Return to [feature-plan](../feature-plan/SKILL.md) for revision and confirmation after substantive changes. At first dispatch or resumption of an item that depends on a selected mockup, follow `test/README.md` to retrieve the pinned version referenced by the plan and verify the mockup and required resources. If verification fails, pause the item until that version is recovered or the user confirms independently testable written criteria. Retain still-valid approval across sessions.

Before dispatch, resumption, or rework, use the hot entry and current project proposal to verify actual versions and status of upstream artifacts the item depends on, such as features and stack and UI/UX. Checking only the plan and proposal version numbers is insufficient. Pause affected items when a dependency has changed, needs review, cannot be verified, or conflicts with the user's request, even if the old approval has not yet been updated. Check the impact and ask the user if ambiguous. Substantive changes require revision and confirmation of the relevant pair and authorization. Keep valid approval for unaffected items and leave unrelated cold records unread.

The original plan is the sole progress record. Use the [plan template](../../docs/plans/TEMPLATE.md) to record the current item, implementer, baseline, brief, delivery and review summaries, rework rounds, evidence, and next step. At startup or recovery, check actual files, in-flight work, and evidence; do not dispatch twice. If the original implementer cannot be restored, verify that writing stopped or isolate its write scope before handing verified work and unfinished items to a new instance. Do not reassign overlapping writes while status is unknown.

If a legacy approved plan lacks a separate specification, derive the linked specification under feature-plan's compatibility rules without adding unapproved requirements.

## 2. Prepare a Brief for One Implementation Item

Before first dispatch, check cross-item interfaces with providers and consumers, including fields, units, and failure contracts. Choose one authorized item with satisfied dependencies in plan order. Start the next only after independent review and acceptance of the previous item. Necessary read-only work may run in parallel.

Create a fresh implementer context for each new item. Subagents do not create nested agents. The Execution Coordinator dispatches reviewers; implementer self-review does not replace independent review.

Use the [handoff template](../../agents/TASK_TEMPLATE.md) to reference the current item and relevant ACs from the original plan. Do not copy chat history, the entire plan, or completed items. For interface work, identify key states, interaction constraints, and scenarios requiring actual use. Link a selected mockup when available; otherwise reference approved specifications or the existing interface. Do not produce a mockup simply for dispatch.

Before dispatch, the Execution Coordinator records relevant repository commits and boundaries of existing uncommitted changes. For uncommitted content, untracked files, or areas without Git, save prior snapshots of relevant files in test when needed for a complete comparison. Do not infer the item's full diff from later `git status` or `HEAD~1`, or commit or initialize repositories without authorization merely to simplify review.

Follow [MODELS.md](../../agents/MODELS.md) when creating instances.

## 3. Receive Implementation and Verification Reports

The implementer implements, verifies, and self-reviews within scope, then reports using the [role protocol](../../agents/README.md). The Execution Coordinator does not edit implementer-owned files during execution or take over implementation to bypass review. If an adjustment is needed, update the assignment boundary first.

Check actual delivery and evidence. Obtain missing materials, send work back, or explain the blocker. Update the stable index per the [path table](../../docs/paths.md) before the next assignment or review; if writing is unauthorized, hand off actual paths and updates still needed.

Follow the [work-area and packaging rules](../../ARCHITECTURE.md). Generate no installer unless current authorization covers it. Do not commit, push, merge, or publish without authorization.

## 4. Dispatch Two Parallel Reviewers

After delivery of each item, create reviewer-spec and reviewer-quality for independent parallel review under the [reviewer protocol](../../agents/reviewer/AGENT.md). Give both the same brief, baseline, full diff, implementer report, and evidence. Cover committed and uncommitted changes; compare prior snapshots where there is no Git. Keep raw materials in test and record locations and coverage in the plan.

Freeze the reviewed version and keep each conclusion separately. Under the [dual-review acceptance conditions](../../agents/reviewer/AGENT.md#findings-and-conclusions), check same-version reports, required evidence, rulings, and outstanding blockers before acceptance. If capacity is insufficient, use independent contexts sequentially and say so. Missing either instance blocks acceptance.

When finding defects or rechecking fixes, reviewers use [bug-detect](../bug-detect/SKILL.md) and return only deduplicated record proposals. The Execution Coordinator writes the knowledge base serially. Subagents do not edit shared records directly.

## 5. Rework, Item Acceptance, and Interruption Recovery

The Execution Coordinator checks each finding and records the decision to fix it. If evidence challenges a finding, ask the original reviewer to recheck. If disagreement remains, follow [conflicting conclusions and user rulings](../../agents/reviewer/AGENT.md#conflicting-conclusions-and-user-rulings) and hand the decision to the user. Do not dismiss the finding yourself. Prefer restoring the original implementer with concrete findings, acceptance criteria, and allowed scope. If restoration is impossible or settings change, hand confirmed facts, ruled-out possibilities, and open questions to a new instance.

After fixes, rerun affected checks. Give both reviewers access to the full baseline-to-final diff for the same version, with emphasis on changes in this round, original findings, and related regressions. Reuse unaffected evidence, but both reviewers must confirm the current version. Prefer restoring the original reviewers; hand off if restoration is unavailable or settings must change. Once both conclusions meet the acceptance conditions, the Execution Coordinator checks the evidence. If the same issue persists for two rounds without new evidence, revisit it under the execution handbook. Do not retry mechanically or mark unmet acceptance conditions complete.

Mark an item passed only once specifications, quality, and required checks are satisfied. Record diff scope, reviewer identities and conclusions, evidence, and the next step before releasing instances no longer needed. Keep the original plan active while remaining items await authorization.

Review-only items go directly to the two reviewers. The Execution Coordinator handles acceptance items. Do not recursively review reviewer reports. Actual implementation changes still require rechecking by both instances and same-version acceptance.

When permissions, dependencies, runner capabilities, or key decisions are missing, record the blocker, attempted actions, impact, and recovery conditions. Do not start dependent work. Continue authorized, independent read-only investigation or document preparation. On resumption, reverify affected evidence and retain still-valid approval and accepted items.

## 6. Overall Review and Final Acceptance

After all implementation items in the current approved scope pass, create fresh reviewer-spec and reviewer-quality instances to review the current complete specification and full diff since feature work began. The former checks acceptance coverage and cross-item behavior; the latter checks interfaces, data flow, regressions, and final evidence. Keep cancelled items in the history and ensure still-valid acceptance criteria and dependencies remain covered. Overall review must meet Section 4's same-version dual-review conditions.

Handle overall findings through repair, verification, and independent rechecking. Reopen only affected items. If some items still lack implementation authorization, record this batch's conclusions and keep the plan in active. Passing a batch does not complete the plan. Once all required checks and final acceptance for the whole plan are satisfied, update specification status and evidence, archive the plan to completed, correct specification links, and verify the path index.

The final reply states what was completed, what was verified, and any limits. Unfinished or blocked work and required checks not run cannot be marked passed. Acceptance does not automatically authorize Git operations or publication.

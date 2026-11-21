# Main-agent execution and acceptance handbook

This handbook defines a general behavioral protocol, with no background scheduler or native configuration. The entry point is [AGENTS.md](../../AGENTS.md); role responsibilities are governed by the [role protocol](../../agents/README.md), and model configuration solely by [MODELS.md](../../agents/MODELS.md).

## 1. Entry confirmation and task record

Read the Harness entry point, [path table](../paths.md), and rules applicable to the target directory. Confirm actual locations of all three areas, read and write permissions, task authorization, current code state, and existing changes. If a path is absent but can reliably be determined from the current workspace, inspect first; mark unused areas not applicable, and ask only when an actual missing detail affects the work.

Confirm working directory, rule loading, and access permissions separately. Harness provides the management basis; choose the execution directory for the task. Software commands usually run in project/code, while project documentation tasks run in harness. Do not assume that directories share a repository or permissions merely because they are open in the same workspace.

Use the [plan template](../plans/TEMPLATE.md) to create one task record under active for tasks that require dispatch or ongoing tracking. Feature tasks on the direct-edit path are exempt. On the feature planning path, feature-plan creates the record itself. If a record exists, check the actual files and evidence before resuming it. Pure Q&A and minor wording adjustments need no formal plan, but still require applicable verification results. Only the main agent updates shared records and status.

## 2. Define acceptance and choose roles

First record the goal, non-goals, allowed modification scope, expected behavior, and how to verify it. Check each file category's location against ARCHITECTURE.md: software implementation belongs in project/code, tests and helper code belong in test, and harness retains only management materials. Clarify unresolved key requirements first; for implementation details that do not affect the goal, choose the smallest solution and record why.

For new features and feature enhancements, let the user choose between feature planning and direct edits by the main agent. Present the two paths neutrally. If the user chooses direct edits, work within the granted authorization. No new feature specification or implementation plan is required. If the user chooses planning, read [feature-plan](../../.agents/skills/feature-plan/SKILL.md). Ask the user for the project overview if it is missing and for the technology stack if one has already been chosen but is undocumented. If the stack is undecided and the user chooses to plan it together, follow [tech-stack-plan](../../.agents/skills/tech-stack-plan/SKILL.md) with the user. Update only the project overview and technology stack architecture, then reread both documents. The main agent interviews the user one question at a time while drafting the specification, checks requirement coverage, and generates a numbered implementation checklist. The specification and plan share a feature ID, have separate versions, and are presented together for user confirmation. Until the user approves the entire combination, limit work to research, discussion, and planning documents, and hold dependent implementation. Partial answers leave that approval pending. After confirmation, track any authorized execution in the original plan. For substantive changes, return to feature-plan to revise the documents and reconfirm the combination. Other tasks follow their applicable processes without requiring a new feature plan.

| Task condition | Roles and sequence |
| --- | --- |
| Pure Q&A, minor wording adjustments | Main agent completes and checks directly |
| Small code fix with clear scope | implementer → two reviewers in parallel → main-agent acceptance |
| User chooses direct feature edits | Main agent edits → applicable independent review and verification for the change type → main-agent acceptance |
| User chooses feature planning | Main agent interviews the user and maintains the specification and plan, mapping out user tasks first if there is an interface → user approves both documents together → refine and hand off the interface as needed → dispatch, review, and accept each item if implementation is authorized → overall review and main-agent acceptance |
| Cross-module or important interface decisions in non-feature tasks | Main agent analyzes the decision and checks requirements and authorization → implementer → two reviewers in parallel → main-agent acceptance |
| Interactive interface design | Read [UIUX-design](../../.agents/skills/UIUX-design/README.md) → UIdesign confirms representative pages with the user and hands off the designs, status, and remaining checks to the main agent |
| Environment, scripts, CI, build, or packaging | implementer → two reviewers in parallel → main-agent acceptance. The main agent analyzes important design decisions first |
| Rule changes affecting subsequent decisions | Main agent or implementer edits → two reviewers review scenarios in parallel → main-agent acceptance |
| Mixed code and infrastructure tasks | Complete dependencies first. Independent implementer instances may work in parallel when their write scopes are disjoint. After integration, two reviewers review in parallel |

Create sub-agents only for work the task requires. Whenever independent review is required, the main agent dispatches two independent instances, reviewer-spec for specification compliance and reviewer-quality for implementation quality. Both read the reviewer configuration in MODELS.md. If there is no feature specification, reviewers use the task requirements and existing contracts. For code, infrastructure, and decision-affecting rule changes, acceptance requires both reports from separate reviewer instances independent of the author.

The implementation parallelism for mixed tasks in the table applies only to non-feature tasks. Once a feature plan is approved and implementation is authorized, use [subagent-driven-execution](../../.agents/skills/subagent-driven-execution/SKILL.md). Assign only the current item to each new implementer context. Complete implementation, self-review, two parallel reviews, any necessary rework and verification, and main-agent acceptance before starting the next item. Necessary read-only investigation may run in parallel. After all implementation items pass, create two new reviewers for one overall review.

## 3. Dispatch and integration

Use the [handoff template](../../agents/TASK_TEMPLATE.md), providing explicit paths, baseline, write scope, dependencies, acceptance, and role configuration. Before each creation, reread the corresponding role in MODELS.md and explicitly set model and reasoning effort. Only when required by the tool, use a fresh-context method supporting explicit configuration, such as fork_turns=none, and provide all necessary task materials. Do not make roles depend on chat history that was not supplied.

Stay within the runner's concurrency limit. When capacity is insufficient, run both reviewers sequentially in independent contexts and record their actual execution order. Run other tasks sequentially as well when capacity is insufficient. Do not write to the same file in parallel or let sub-agents spawn nested agents. The main agent must also avoid editing an executor's assigned files while that executor is working. Confirm key design decisions before starting implementation that depends on them.

On receiving results, verify the actual files, change scope, outcomes, and evidence before reporting completion. The main agent consolidates shared records. Save designs and prototypes only in the test locations specified in the assignment. Reviewers treat the materials under review as read-only. If out-of-scope changes are found, identify their source first and preserve the user's existing content.

For approved feature plans, keep briefs, executor identities, pre-dispatch baselines, delivery and review summaries, rework rounds, and next steps centrally in the original plan. Dispatch only the current item, necessary interfaces, prerequisite results, and global constraints. Store raw diffs, pre-work snapshots of uncommitted content, and verification artifacts in test. Keep only management summaries and references in harness. Cover the complete task diff, including uncommitted work.

## 4. Review, rework, and blockers

Give both reviewers the same goal, requirement sources, acceptance criteria, design, reviewed version, complete task diff, executor report, and evidence; each independently forms an initial judgment. For uncommitted work, provide file scope and working-tree state; do not use a nonexistent commit SHA as a version baseline. Keep the reviewed version unchanged until both reports return; if external changes alter it, update the inputs and review again rather than mixing versions.

Each instance returns Recommend approval / Rework required / Insufficient evidence for its assigned dimension, identifying instance, dimension, round, covered version, and evidence; the main agent retains both conclusions. Accept only when both recommend approval, cover the same final version, and contain all necessary evidence; a missing or non-passing report prevents marking completion. Resolve conflicts by evidence, without voting or offsetting one conclusion against the other; deduplicate repeated findings while retaining both sources. Prefer resuming the original executor and the same two reviewers for rework; if they cannot be resumed or the role configuration has changed, create new instances with the latest configuration and hand off context. Do not mechanically rerun checks when evidence for the same version remains valid.

Also provide the [bug-detect skill](../../.agents/skills/bug-detect/SKILL.md) and [project bug knowledge base](../bugs.md). Reviewers invoke the skill on defect discovery or fix verification and return search and recording proposals; before writing, the main agent rereads the latest knowledge base, deduplicates by root cause, and serially assigns IDs or updates original entries. Parallel reviewers never write directly. Reopen the original record for recurrence of the same kind, retaining the applicability scope of verified solutions; do not update when there is no new information.

For fixes, give the implementer the relevant BUG entries and check that earlier solutions apply before using them. After verification, the main agent adds the actual solution and evidence, changing status to Resolved only when closure conditions are met. If the knowledge base is not writable, return the unsaved proposal and record the specific blocker. Mandatory review and verification still proceed. Task records reference only final BUG IDs to avoid duplicating full entries.

For every finding, explicitly accept a fix or reject it with supporting reasons; the main agent records the ruling. If acceptance criteria themselves must change, return to requirements confirmation; do not conceal failures by deleting checks or lowering standards. After fixes, the executor reruns affected checks, and both reviewers separately verify relevant findings, new diffs, and the final version. Valid evidence may be reused where a review dimension has not changed, but each reviewer must explicitly check the current version before main-agent acceptance. Verification boundaries follow the [reviewer protocol](../../agents/reviewer/AGENT.md).

If the same issue persists for two consecutive rework rounds without new evidence, the main agent reanalyzes root cause, approach, and dispatch rather than retrying mechanically; when user decisions are needed, raise only the specific unresolved matters. This rule does not automatically stop all fixes that are making progress.

When necessary permissions, dependencies, external services, key requirements, or mandatory review capability are missing, record the specific blocker, attempted actions, impact, and recovery conditions. Continue authorized work independent of that condition; after recovery, resume from the recorded position and check that existing evidence remains valid.

## 5. Final acceptance and status

| Status | Entry condition |
| --- | --- |
| Pending | Goal exists, execution has not started |
| Awaiting confirmation | Feature specification and plan drafts have been created or revised and await user confirmation of the current combination; dependent implementation must not start |
| In progress | Analysis, design, or implementation starts after entry confirmation |
| Under review | Delivery is inspectable and review or evidence checks are underway |
| Rework | Findings require fixes and have been assigned |
| Blocked | An external condition or key decision is missing; the blocked portion has explicit recovery conditions |
| Completed | Scope, applicable checks, mandatory review, and final acceptance are all satisfied |
| Cancelled | User cancels the task; record the reason and archive, without implying implementation |

The main agent updates status according to actual conditions. On the feature planning path, start implementation only after the user approves both current documents together and grants implementation authorization. Substantive revisions return to Awaiting confirmation. If the user approves planning alone, wait for implementation authorization. After fixes, return to Under review. After a blocker clears, resume the corresponding stage and respect any outstanding confirmation requirement. Set the main task to Completed only when its own acceptance conditions are met.

Before completion, confirm each item:

- The final diff matches task scope and preserves the user's existing changes; new files comply with the three-area boundaries, and no installer was generated without packaging being requested.
- The docs/paths.md path table and current actual directory trees have been checked, including structural changes made by the task; explicitly identify unchecked areas rather than claiming synchronization is complete.
- Every required acceptance item has evidence or a reasonable explanation of non-applicability; failed or unrun required checks and missing key evidence cannot be marked as passing.
- Evidence records the working directory, check method, result, and covered version or working-tree scope; conclusions affected by later changes have been reverified. Do not rerun unrelated checks whose evidence remains valid.
- All blocking findings have been fixed and verified, or have explicit rulings consistent with confirmed requirements; unmet requirements cannot be ruled a pass.
- Every mandatory review scope has reports from two independent instances, covering specification compliance and implementation quality respectively, both recommending approval for the same final version; honestly record sequential review due to limited capacity rather than claiming parallelism.
- For planning-only work, check the delivered specification and plan versions, approval status, and open questions. For design-only work, assess the drafts or design notes the user requested. If implementation items remain, record the delivery and where to resume, then keep the plan in active pending implementation authorization.
- For authorized feature plans that were implemented, check that the current specification and plan versions match the approved combination. Every implementation item must pass independent review and acceptance. An overall review must verify coverage of the full specification, cross-item integration, regression, and final evidence. Repeat acceptance for every item affected by later changes.
- The user can understand the delivery, limitations, and remaining issues. Review approval does not mean release, merge, or acceptance on the target machine has occurred.

If a task record exists, the main agent records results and moves it to completed once acceptance conditions are met. Leave outstanding tasks in active and state their status. Feature specifications remain in specs with updated status and plan links, and approval remains valid after archiving. Record code commits and necessary data versions. For uncommitted work, explicitly write “uncommitted” and record the baseline, change summary, evidence, and boundaries of existing changes. Store raw logs, screenshots, and other verification artifacts in test. Keep only summaries, references, and sources in harness task records.

harness and project/code are version-controlled separately. Acceptance does not automatically authorize commit, push, merge, release, or destructive operations; act within the current task's explicit authorization and record the delivery stages actually completed.

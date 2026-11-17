# Main-agent execution and acceptance handbook

This handbook defines a general behavioral protocol, with no background scheduler or native configuration. The entry point is [AGENTS.md](../../AGENTS.md); role responsibilities are governed by the [role protocol](../../agents/README.md), and model configuration solely by [MODELS.md](../../agents/MODELS.md).

## 1. Entry confirmation and task record

Read the Harness entry point, [path table](../paths.md), and rules applicable to the target directory. Confirm actual locations of all three areas, read and write permissions, task authorization, current code state, and existing changes. If a path is absent but can reliably be determined from the current workspace, inspect first; mark unused areas not applicable, and ask only when an actual missing detail affects the work.

Confirm working directory, rule loading, and access permissions separately. Harness provides the management basis; choose the execution directory for the task. Software commands usually run in project/code, while project documentation tasks run in harness. Do not assume that directories share a repository or permissions merely because they are open in the same workspace.

For tasks requiring dispatch or ongoing tracking, use the [plan template](../plans/TEMPLATE.md) to create a single task record under active; feature-plan directly creates this record for feature tasks, so do not create another beforehand. If a record exists, check actual files and evidence before resuming rather than starting over. Pure Q&A and minor wording adjustments need no formal plan, but still require applicable verification results. Only the main agent updates shared records and status.

## 2. Define acceptance and choose roles

First record the goal, non-goals, allowed modification scope, expected behavior, and how to verify it. Check each file category's location against ARCHITECTURE.md: software implementation belongs in project/code, tests and helper code belong in test, and harness retains only management materials. Clarify unresolved key requirements first; for implementation details that do not affect the goal, choose the smallest solution and record why.

For new features and feature enhancements, first invoke [feature-plan](../../.agents/skills/feature-plan/SKILL.md): architect investigates facts, and the main agent interviews in rounds according to decision dependencies, offers recommendations, maintains a draft specification, and then generates a numbered implementation checklist. The specification and plan share a feature ID but are versioned separately and presented together for user confirmation. Before confirmation, perform only research, discussion, and planning documentation; do not start dependent implementation. Partial answers are not approval of the entire combination. After confirmation, record execution progress in the original plan; substantive changes return to feature-plan for revision and reconfirmation of the combination. Other tasks follow their applicable processes without requiring a new feature plan.

| Task condition | Roles and sequence |
| --- | --- |
| Pure Q&A, minor wording adjustments | Main agent completes and checks directly |
| Small code fix with clear scope | implementer → two reviewers in parallel → main-agent acceptance |
| New features and feature enhancements | feature-plan: architect analysis → main-agent interviews and specification/plan maintenance → user confirms combination → execution skill dispatches, reviews, and accepts each item → overall review and main-agent acceptance |
| Cross-module or important interface decisions in non-feature tasks | architect → main agent checks requirements and authorization → implementer / infra → two reviewers in parallel → main-agent acceptance |
| Environment, scripts, CI, build, or packaging | infra → two reviewers in parallel → main-agent acceptance; invoke architect first for important design decisions |
| Rule changes affecting subsequent decisions | Main agent or implementer edits → two reviewers review scenarios in parallel → main-agent acceptance |
| Mixed code and infrastructure tasks | Complete prerequisites first when dependent; implementer and infra may run in parallel when independent and write scopes are disjoint; after integration, two reviewers review in parallel |

Do not create sub-agents without actual work merely to use all four roles. Whenever independent review is required, the main agent dispatches two independent instances, reviewer-spec for specification compliance and reviewer-quality for implementation quality, both reading the reviewer configuration in MODELS.md. For non-feature tasks, the specification basis is the task requirements and existing contracts; a new specification document is not mandatory. For code, infrastructure, and decision-affecting rule changes, either missing report blocks acceptance; author self-review or one instance handling both dimensions is no substitute.

The implementation parallelism for mixed tasks in the table applies only to non-feature tasks. Approved feature plans use [subagent-driven-execution](../../.agents/skills/subagent-driven-execution/SKILL.md): each new implementer / infra context handles only the current item, proceeding through implementation, self-review, two parallel reviewers, rework verification, and main-agent acceptance before starting the next implementation item; necessary read-only investigation may run in parallel. After all implementation items pass, create two new reviewers for one overall review.

## 3. Dispatch and integration

Use the [handoff template](../../agents/TASK_TEMPLATE.md), providing explicit paths, baseline, write scope, dependencies, acceptance, and role configuration. Before each creation, reread the corresponding role in MODELS.md and explicitly set model and reasoning effort. Only when required by the tool, use a fresh-context method supporting explicit configuration, such as fork_turns=none, and provide all necessary task materials. Do not make roles depend on chat history that was not supplied.

Stay within the runner's concurrency limit; when capacity is insufficient, retain two reviewers with independent contexts and run them sequentially, recording that they were not parallel; do not reduce to one reviewer. Run other tasks sequentially as well when capacity is insufficient. Do not write to the same file in parallel or let sub-agents spawn nested agents. The main agent must also avoid editing an executor's assigned files while that executor is working. Do not start implementation dependent on an architect's key decision until that decision is confirmed.

On receiving results, check actual files, change scope, outcomes, and evidence rather than merely relaying a sub-agent's “completed” claim. The main agent consolidates shared task records; role design and review are read-only by default. If out-of-scope changes are found, identify their source first; do not overwrite or revert the user's existing content.

For feature tasks, keep briefs, executor identities, pre-dispatch baselines, delivery and review summaries, rework rounds, and next steps centrally in the original plan; do not create another progress ledger. Dispatch only the current item, necessary interfaces, prerequisite results, and global constraints, without copying the entire chat. Raw diffs, pre-work snapshots of uncommitted content, and verification artifacts belong in test; harness retains only management summaries and references. Uncommitted work must still cover the complete task diff, rather than checking only HEAD~1.

## 4. Review, rework, and blockers

Give both reviewers the same goal, requirement sources, acceptance criteria, design, reviewed version, complete task diff, executor report, and evidence; each independently forms an initial judgment. For uncommitted work, provide file scope and working-tree state; do not use a nonexistent commit SHA as a version baseline. Keep the reviewed version unchanged until both reports return; if external changes alter it, update the inputs and review again rather than mixing versions.

Each instance returns Recommend approval / Rework required / Insufficient evidence for its assigned dimension, identifying instance, dimension, round, covered version, and evidence; the main agent retains both conclusions. Accept only when both recommend approval, cover the same final version, and contain all necessary evidence; a missing or non-passing report prevents marking completion. Resolve conflicts by evidence, without voting or offsetting one conclusion against the other; deduplicate repeated findings while retaining both sources. Prefer resuming the original executor and the same two reviewers for rework; if they cannot be resumed or the role configuration has changed, create new instances with the latest configuration and hand off context. Do not mechanically rerun checks when evidence for the same version remains valid.

Also provide the [bug-detect skill](../../.agents/skills/bug-detect/SKILL.md) and [project bug knowledge base](../bugs.md). Reviewers invoke the skill on defect discovery or fix verification and return search and recording proposals; before writing, the main agent rereads the latest knowledge base, deduplicates by root cause, and serially assigns IDs or updates original entries. Parallel reviewers never write directly. Reopen the original record for recurrence of the same kind, retaining the applicability scope of verified solutions; do not update when there is no new information.

For fixes, give implementer or infra the relevant BUG entries, but do not apply old solutions without checking. After verification, the main agent adds the actual solution and evidence, changing status to Resolved only when closure conditions are met. If the knowledge base is not writable, return the unsaved proposal and record the specific blocker rather than claiming it was saved; mandatory review and verification still proceed. Task records reference only final BUG IDs to avoid duplicating full entries.

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

The main agent updates status according to actual conditions. Implementation begins only after the user approves the feature document combination and implementation is authorized; substantive revisions return to Awaiting confirmation. Approval of planning alone does not trigger implementation. After rework fixes, return to Under review; after a blocker clears, return to the corresponding stage, without bypassing outstanding user confirmation. A subtask's “completed” status cannot directly mark the main task Completed.

Before completion, confirm each item:

- The final diff matches task scope and preserves the user's existing changes; new files comply with the three-area boundaries, and no installer was generated without packaging being requested.
- The docs/paths.md path table and current actual directory trees have been checked, including structural changes made by the task; explicitly identify unchecked areas rather than claiming synchronization is complete.
- Every required acceptance item has evidence or a reasonable explanation of non-applicability; failed or unrun required checks and missing key evidence cannot be marked as passing.
- Evidence records the working directory, check method, result, and covered version or working-tree scope; conclusions affected by later changes have been reverified. Do not rerun unrelated checks whose evidence remains valid.
- All blocking findings have been fixed and verified, or have explicit rulings consistent with confirmed requirements; unmet requirements cannot be ruled a pass.
- Every mandatory review scope has reports from two independent instances, covering specification compliance and implementation quality respectively, both recommending approval for the same final version; honestly record sequential review due to limited capacity rather than claiming parallelism.
- Current feature specification and plan versions match the approved combination; every implementation item has passed individual independent review and acceptance, and full-feature specification coverage, cross-item integration, regression, and final evidence have passed an overall review; items affected by later changes have been accepted again.
- The user can understand the delivery, limitations, and remaining issues. Review approval does not mean release, merge, or acceptance on the target machine has occurred.

After completion, the main agent records results and moves the task record to completed; tasks not meeting the conditions remain in active with their status stated. Feature specifications remain in specs with updated status and plan links; the archive move does not invalidate approval. Record code commits and necessary data versions; when uncommitted, explicitly write “uncommitted” and record baseline, change summary, evidence, and boundaries of existing changes. Raw logs, screenshots, and other verification artifacts all remain in test; harness task records retain only summaries, references, and sources.

harness and project/code are version-controlled separately. Acceptance does not automatically authorize commit, push, merge, release, or destructive operations; act within the current task's explicit authorization and record the delivery stages actually completed.

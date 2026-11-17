# Main Agent Execution and Acceptance Runbook

This runbook defines general behavioral protocol and does not depend on DSH background schedulers or native presets. The entry point is [AGENTS.md](../../AGENTS.md); role responsibilities follow the [role protocol](../../agents/README.md); model configuration follows [MODELS.md](../../agents/MODELS.md) only.

## 1. Entry Confirmation and Task Records

Read the Harness entry, [path registry](../paths.md), and target-directory rules. DSH automatically loads the user-global chain (`$DSH_HOME/AGENTS.md`, `~/.agents/AGENTS.md`) and the project chain (project root to the session working directory) before the first request; when harness is the working directory, harness/AGENTS.md takes effect automatically; when the session working directory is inside harness and harness is the project root, `.agents/skills` also enters the catalog. When starting from another directory, or when the catalog does not contain a required skill, read the entry and `SKILL.md` absolute paths explicitly. Confirm the three areas' actual locations, DSH workspace and write sandbox, task authorization, current code state, and existing changes. When paths are not provided but can be reliably determined from the current workspace, check first; mark unused areas as not applicable, and ask only when something is genuinely missing and affecting work.

Confirm the working directory, rule loading, and access permissions separately. A DSH session has one working directory; choose the execution directory by task. Business commands usually run in project/code, and project-document tasks run in harness; commands can use `workdir` to select a directory, and switching directories does not mean they share a repository or permissions. A subagent's cwd must be passed explicitly at creation; when omitted it inherits the caller's current working directory—do not assume isolation from the main session.

For tasks that need dispatch or ongoing tracking, create a single task record under active using the [plan template](../plans/TEMPLATE.md); for feature tasks, feature-plan creates this record directly; do not create another. When a record exists, verify actual files and evidence before resuming; do not start over. Pure Q&A and minor wording changes need no formal plan but must still state applicable verification results. Only the main agent updates shared records and status. DSH's `todo_write` is only a main-agent progress aid; goal, schedule, team task, and plan mode do not replace plan files or the approved pair, and scheduled tasks are created only when the user explicitly requests them.

## 2. Define Acceptance and Select Roles

First record goals, non-goals, allowed modification scope, expected behavior, and verification method. Check each file type's location per ARCHITECTURE.md: the product in project/code, tests and auxiliary code in test, harness only management material. Clarify unresolved key requirements first; for implementation details that do not affect the goal, choose the smallest solution and record the rationale.

For new features and enhancements, first invoke [feature-plan](../../.agents/skills/feature-plan/SKILL.md): the architect investigates facts, the main agent interviews by dependency and attaches recommendations while maintaining the draft specification, then produces a numbered implementation checklist. The specification and plan share a feature number, are versioned separately, and are presented together for user confirmation. Until then, perform only investigation, discussion, and planning-document writing; do not start dependent implementation, and a partial answer is not overall approval. After confirmation, record execution progress in the original plan; return to feature-plan for material changes and reconfirm the pair. Other tasks follow the applicable process without a mandatory feature plan.

| Task condition | Roles and order |
| --- | --- |
| Pure Q&A, minor wording changes | Main agent completes directly and checks |
| A clearly scoped small code fix | implementer → two reviewers in parallel → main agent acceptance |
| New features and functional enhancements | feature-plan: architect analysis → main agent interviews and maintains specification and plan → user confirms pair → execution skill dispatches, reviews, and accepts item by item → overall review and main agent acceptance |
| Cross-module or important interface decisions in non-feature tasks | architect → main agent verifies requirements and authorization → implementer/infra → two reviewers in parallel → main agent acceptance |
| Environment, scripts, CI, build, or packaging | infra → two reviewers in parallel → main agent acceptance; invoke architect first for important design decisions |
| Rule changes affecting later decisions | main agent or implementer edits → two reviewers exercise scenarios in parallel → main agent acceptance |
| Mixed code and infrastructure tasks | Complete prerequisites first when dependencies exist; when independent and write scopes are disjoint, implementer and infra may run in parallel; after integration, two reviewers review in parallel |

Do not create subagents without real tasks just to fill four roles. Whenever independent review is required, the main agent uses `subagent` to create two fresh-context, instruction-constrained read-only instances, reviewer-spec and reviewer-quality, for specification conformance and implementation quality, both using the reviewer configuration in MODELS.md; put both calls in one message to run in parallel, never `subagent_fork`. Non-functional tasks use task requirements and existing contracts as the specification basis and do not force a new specification. Code, infrastructure, and decision-affecting rule changes with either report missing are acceptance blockers; do not substitute author self-review or one instance covering both. DSH defaults to `maxDepth=1` (direct children only) and `maxActiveSubagents=8`; when capacity is insufficient, collect completed subagents before starting the next, and the two review instances may complete sequentially with that recorded—never merge them.

The parallel implementation arrangement in the mixed-task row applies only to non-functional tasks. An approved feature plan uses [subagent-driven-execution](../../.agents/skills/subagent-driven-execution/SKILL.md): each new implementer/infra context handles only the current item, completing implementation, self-review, two-reviewer parallel review, rework/recheck, and main-agent acceptance before the next item; necessary read-only investigation may run in parallel. After all implementation items pass, create two new reviewers for one overall review.

## 3. Dispatch and Integration

Use the [subtask handoff template](../../agents/TASK_TEMPLATE.md) to pass explicit absolute paths, subagent cwd, baseline, write scope, dependencies, acceptance, and role configuration. Before each creation, re-read the corresponding role in MODELS.md, verify routes with `list_subagent_models`, and set provider, model, and reasoning_effort explicitly; do not rely on inherited defaults. `subagent` creates a fresh context; subagents cannot see the main conversation, so task material must be self-contained; do not use `subagent_fork` instead of independent implementation or review for convenience.

A subagent's permission scope is fixed at creation and cannot be widened inside the child session; when write or approval capability is missing, record the specific limitation and handle it in the main session—do not ask the subagent to bypass or repeatedly retry denied operations. When DSH refuses creation (unauthorized route, `ACTIVATION_LIMIT_REACHED`, etc.), report the limitation and wait or collect existing subagents; do not silently downgrade.

Do not exceed DSH concurrency limits; when capacity is insufficient, the two reviewers keep independent contexts and complete sequentially, recording that they were not parallel; do not reduce to one reviewer. Other tasks execute sequentially under the same capacity constraint. Do not write the same file concurrently or let subagents spawn nested agents. The main agent does not modify an executor's assigned files while it works. Do not start implementation dependent on an architect decision before it is confirmed.

After receiving a return, verify actual files, change scope, results, and evidence; do not merely relay the subagent's "done." DSH returns results through completion notices and subagent messages; notices may omit the closing text adjacent to a message, and the main agent cannot see intermediate steps. Prefer ending the turn to await the completion notice; when using `wait_agent`, set a sufficient timeout—`timedOut` only means no new input yet, not failure. Follow up with `send_message` when material is missing; do not invent the process. The main agent consolidates shared task records; role design and review are read-only by default. On out-of-scope changes, identify the source first and do not overwrite or revert existing user content.

For feature tasks, the brief, executor identity, pre-dispatch baseline, delivery and review summaries, rework rounds, and next step stay in the original plan; do not create a separate progress ledger. Dispatch only this item, necessary interfaces, prerequisite results, and global constraints—do not copy the whole conversation. Raw diffs, pre-change snapshots of uncommitted content, and validation artifacts go in test; harness keeps only management summaries and references. Uncommitted state must also cover the complete task change; do not look only at HEAD~1.

When many mutually independent checks are needed, the workflow tool can fan out; its `agent()` accepts only provider/model and cannot set reasoning_effort, so it is not used for this protocol's two-reviewer review and does not replace main-agent acceptance.

## 4. Review, Rework, and Blockers

Provide both reviewers with the same goal, requirement sources, acceptance, approach, reviewed version, complete task diff, executor report, and evidence, and let each form an initial judgment independently. For uncommitted work, provide file scope and worktree state; do not use a nonexistent commit SHA as the version baseline. Keep the reviewed version unchanged until both reports return; when external changes alter it, update the inputs and recheck—do not mix versions.

Each instance returns recommend pass / needs rework / insufficient evidence for its dimension, stating instance identity, dimension, round, covered version, and evidence; the main agent keeps both conclusions. Accept only when both recommend pass, cover the same final version, and necessary evidence is complete; any missing report or any non-pass prevents checking the task complete. Adjudicate conflicts by evidence; do not vote or cancel one with the other; deduplicate repeated findings after preserving both sources. Prefer restoring the original executor and the group's two reviewers for rework: a local subagent can continue via `send_message`; when it cannot be recovered or role configuration changed, create and hand off per the latest configuration. Do not mechanically rerun valid same-version checks.

Provide the [bug-detect skill](../../.agents/skills/bug-detect/SKILL.md) and the [project bug knowledge base](../bugs.md) together. Reviewers load the skill with `skill` or read it by absolute path and return queries and record proposals; the main agent re-reads the latest knowledge base before writing, deduplicates by root cause, and assigns IDs or updates entries serially. Parallel reviewers never write directly. Reopen the original entry for recurrence, preserving the verified solution's applicable scope; do not update without new information.

For fixes, provide the relevant BUG entries to implementer or infra, but do not apply an old solution without verification. After recheck, the main agent adds the actual solution and evidence, and closes only when closure conditions are met. When the knowledge base is not writable, return the unsaved proposal and record the specific blocker; do not claim it was saved. Mandatory review and verification still run. Task records cite only the final BUG IDs; do not copy full entries.

Adjudicate each finding explicitly: accept a fix or reject it with evidence, and record the decision. When acceptance criteria themselves must change, return to requirements confirmation; do not hide failure by deleting checks or lowering standards. After a fix, rerun affected checks; both reviewers recheck related findings, new differences, and the final version; when this dimension is unaffected, valid evidence may be reused, but the current version must be explicitly verified before the main agent accepts. Recheck boundaries follow the [reviewer protocol](../../agents/reviewer/AGENT.md).

When the same problem persists for two rework rounds without new evidence, the main agent re-analyzes the root cause, approach, and dispatch instead of mechanically retrying; when a user decision is needed, present only the concrete open questions. This rule does not automatically stop all fixes that are making progress.

When necessary permissions, dependencies, external services, key requirements, or mandatory review capability are missing, record the specific blocker, attempted actions, impact, and recovery conditions. Continue authorized work that does not depend on that condition; after recovery, resume from the recorded point and verify whether existing evidence remains valid. In DSH also record the actual errors for sandbox denial, unavailable routes, capacity limits, or invisible skills.

## 5. Final Acceptance and Status

| Status | Entry condition |
| --- | --- |
| Pending | Goal exists, execution has not started |
| Awaiting confirmation | Feature specification and plan drafts are created or revised, waiting for the user to confirm the current pair; dependent implementation must not start |
| In progress | Entry confirmed and analysis, design, or implementation has started |
| In acceptance | Delivery is checkable and review or evidence verification is underway |
| Rework | Findings that must be fixed exist and have been dispatched |
| Blocked | An external condition or key decision is missing, with clear recovery conditions for the blocked part |
| Completed | Goal scope, applicable checks, mandatory review, and final acceptance are all satisfied |
| Canceled | The user canceled the task; record the reason and archive, which does not mean implemented |

The main agent updates status based on actual conditions; implementation begins only after the feature document pair is approved and implementation authorized, material revisions return to awaiting confirmation, and planning approval alone does not trigger implementation. After rework, return to in acceptance; after a blocker clears, return to the corresponding stage; never bypass unmet user confirmation. DSH native plan mode or goal continuation does not change this table's status, and a subtask "completed" does not directly complete the main task.

Before completion, confirm item by item:

- The final diff matches the task scope and existing user changes are preserved; new files follow the three-area boundaries, and no installer package was generated when packaging was not requested.
- The docs/paths.md table and current actual tree are verified, including structural changes; inaccessible areas are explicitly stated and not claimed synchronized.
- Every required acceptance item has evidence or a reasonable not-applicable note; failed, not-run, or missing key evidence cannot be marked passed.
- Evidence states the working directory, check method, result, and covered version or worktree scope; conclusions affected by later changes are re-verified. Do not rerun irrelevant checks that remain valid.
- All blocking findings are fixed and rechecked, or explicitly adjudicated per confirmed requirements; unmet requirements cannot be adjudicated as passed.
- All mandatory review scopes have two independent instance reports covering specification conformance and implementation quality, both recommending pass on the same final version; creation parameters match the reply footers. Sequential review due to capacity and reused same-version evidence are recorded honestly, not presented as parallel.
- Feature specification and plan versions match the approved pair; all implementation items were independently reviewed and accepted; full-feature specification coverage, cross-item integration, regression, and final evidence passed one overall review; items affected by later changes were re-accepted.
- Profile, plugin, preset, or host environment changes are within explicit user authorization and record impact and rollback.
- The user understands the delivery, limitations, and remaining issues. Review pass does not mean release, merge, or target-machine acceptance happened.

After completion, the main agent fills in the result and moves the task record to completed; unmet tasks stay active with status noted. Keep feature specifications in specs, update status and plan links; archiving does not invalidate approval. Record code commits and necessary data versions; when uncommitted, state "uncommitted" and record the baseline, change summary, evidence, and existing-change boundaries. Raw logs, screenshots, and other validation artifacts stay in test; harness task records keep only summaries, references, and sources.

harness and project/code are versioned separately. Acceptance does not automatically authorize commit, push, merge, release, profile changes, or destructive operations; perform only what the current task explicitly authorizes and record the delivery stage actually completed.

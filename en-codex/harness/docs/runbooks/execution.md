# Execution coordinator: Execution and acceptance handbook

This handbook defines a general workflow. There is no background scheduler or native configuration. Start at [AGENTS.md](../../AGENTS.md), see the [role protocol](../../agents/README.md) for responsibilities, and consult [MODELS.md](../../agents/MODELS.md) for subagent restrictions.

## 1. Confirm the entry point and task record

This handbook starts at step 6. Find the current scope using the [task entry point](../../AGENTS.md#starting-a-task). When the user requests planning, design, or read-only review, refer it to the appropriate role without starting implementation.

Read the Harness entry point, [path table](../paths.md), and applicable rules in the target directories. Confirm the actual locations of the three areas, read and write permissions, task authorization, code state, and existing changes. If a path is not given but the workspace can establish it reliably, check it first. Mark unused areas as not applicable and ask only about missing information that affects the work.

Confirm the working directory, loaded rules, and access permissions separately. Use Harness as the management reference and choose a working directory for each task. Product commands normally run in project/code and management document work in harness. Opening several directories in one workspace does not mean they share a repository or permissions.

Use the [PLAN record](../plans/TEMPLATE.md) for feature Plans. For standalone work needing review, rework, cross-repository tracking, or cross-session handoff, create a short TASK record according to the [numbering and archiving rules](../plans/README.md). Reuse an existing record; routine Q&A needs none. When record writes are unauthorized, hand off in the reply and assign a formal ID only once saving is authorized. One session at a time maintains each Plan, file, or shared ID. Verify the previous writer has stopped or its writes are isolated before taking over. Separate sessions may handle nonoverlapping work.

On each execution turn, read the user's latest requests and corrections first. Then check the current item's resume entry for scope, user decisions, valid authorization, active writers, blockers, next step, and evidence locations. Retrieve only what the current decision needs. Search first by PLAN, TASK, AC, or BUG ID or code symbol, then expand by symptom or module only if needed. Do not load old chats, entire logs, unrelated tasks, or rejected proposals by default. If conclusions conflict, consult source text and raw evidence from the relevant version.

When decisions, assumptions, versions, or active work change, update the current state in the resume entry in place. Retain evidence of user approval and withdrawal, independent review conclusions, and raw evidence references. If the conversation grows too long, hand off first, then have the next session verify actual files, authorization, and active work. A summary does not erase the conversation or grant authorization. An unreachable implementer may still be writing. Until it is confirmed stopped or its writes are isolated, continue only authorized work outside its scope.

## 2. Define acceptance and choose roles

Define the goal, write scope, expected behavior, and check methods, and verify file placement against ARCHITECTURE.md. Resolve key requirements first. Decide implementation details within scope and record only tradeoffs that affect later decisions.

Initial releases and feature increments require approval of the current combination and implementation authorization. Use the [execution skill](../../skills/subagent-driven-execution/SKILL.md) to dispatch one numbered item at a time. Necessary read-only investigation may run concurrently. Each implementation item gets a new implementer and two read-only reviewers for specification and quality. The execution coordinator accepts the item before dispatching the next. Once implementation items in the current approved scope pass, create two fresh reviewers for overall review. For items relying on mockups, recover and verify the fixed version according to test/README.md first. Send new requirements or acceptance changes back to the relevant planning step instead of changing the criteria during execution.

Handle standalone maintenance according to its impact. Do not use a TASK to implement an unplanned feature.

| Task conditions | Dispatch and acceptance |
| --- | --- |
| Q&A or minor wording changes that do not alter rules | The conversation role replies or edits and verifies within authorization. |
| Defect fixes under an existing contract, or infrastructure such as scripts and builds | Define original behavior and baseline, have an implementer make the changes, obtain two independent reviews, then have the execution coordinator accept. If there is no feature proposal, use the existing contract and current request as the specification. |
| First activation or actual change to the technology stack | Follow [selection and handoff](../../skills/tech-stack-plan/SKILL.md#selection-and-handoff) to check user authorization, the complete proposed diff, and the current stack. After both reviews pass, write the reviewed changes as is and accept before dispatching dependent implementation. |
| Rule changes affecting future decisions | The execution coordinator or implementer makes the changes, two independent reviewers exercise the rules, and the execution coordinator accepts. |

Only independent changes in non-feature maintenance may be implemented in parallel, with exclusive write scopes and authorization. Review twice after integration. If either required review dimension is missing, mark acceptance blocked. The author's self-review or a single instance covering both cannot substitute.

## 3. Dispatch and integrate

Before changes, check that required roles can read the same version and that the runner supports explicit settings and independent contexts. Verify that mockups can be recovered and viewed when needed. Refer unresolved design decisions to the interaction planner and user. Report missing required capabilities. When the write scope overlaps the user's uncommitted changes, preserve a comparable baseline and staged boundaries in an authorized location and cite it in the handoff. Suspend overlapping writes if the changes cannot reliably be distinguished. Give paths, baseline, scope, dependencies, and acceptance in the [handoff template](../../agents/TASK_TEMPLATE.md).

Stay within concurrency limits. If capacity is insufficient, run two separate reviewer contexts sequentially and record that they did not run concurrently. Do not substitute one reviewer. Run other work sequentially as needed. Do not write the same file concurrently or allow subagents to spawn agents. The execution coordinator does not edit files while an implementer is working on them. Do not start implementation that depends on unsettled design decisions. For a new stack, verify it is in effect under [ARCHITECTURE.md](../../ARCHITECTURE.md) before assigning dependent work.

Continue independent work while waiting and avoid polling when completion notifications are available. Check actual files, scope, and evidence when reports arrive. Report meaningful progress and the next step during implementation. Ask the user to decide when scope, agreed behavior, or acceptance changes materially, more authorization is needed, or only the user can remove a blocker. On completion, explain results, evidence, and unchecked items. Write designs and prototypes only in the assigned test location. Reviewers have read-only access to reviewed material. If changes fall outside scope, identify their source before acting and preserve the user's existing work.

Keep briefs, implementer identities, dispatch baselines, delivery and review summaries, rework rounds, and next steps in the original approved Plan. Send the current item, necessary interfaces, prerequisite results, and global constraints rather than the full chat. Store raw diffs, snapshots of uncommitted baselines, and verification artifacts in test. Harness stores management summaries and references. A review of uncommitted work must include the complete task diff, which cannot be inferred from `HEAD~1` alone.

## 4. Review, rework, and blockers

Under the [reviewer protocol](../../agents/reviewer/AGENT.md), give both reviewers the same requirements, complete diff, implementation report, and evidence. Freeze the reviewed version. Record both identities, dimensions, rounds, and conclusions separately. A version change requires both to recheck. One passing report cannot cancel a finding in the other.

Provide the [bug-detect skill](../../skills/bug-detect/SKILL.md) and [project bug knowledge base](../bugs.md). Reviewers use the skill when finding or rechecking defects and return searches and proposed entries. The execution coordinator rereads the latest knowledge base before writing, deduplicates by root cause, and assigns IDs or updates entries serially. Parallel reviewers do not edit it. For recurrence, reopen the original entry and retain the verified solution's scope. Do not update an entry without new information.

Check that an existing solution applies before fixing a defect. Close the entry only when a recheck satisfies its closing conditions. For read-only work, return proposals in the reply. Report a blocker if a knowledge base write is authorized but not possible. Keep review and verification within task authorization; cite only registered BUG IDs in the task record.

The execution coordinator checks each finding against evidence and does not lower acceptance criteria. If evidence suggests a finding is invalid, send it to the original reviewer for a recheck. If disagreement persists, refer it to the user under the reviewer protocol. Prefer resuming the original implementer and both reviewers for rework. If that is impossible or settings changed, hand off using current settings. Verify affected areas again and apply the [two-review acceptance conditions](../../agents/reviewer/AGENT.md#findings-and-conclusions).

For repeated fixes, keep only the required behavior, established facts, ruled-out assumptions and when to revisit them, remaining unknowns, and the next check that can distinguish hypotheses in the defect portion of the resume entry. Cite evidence for the corresponding version rather than copying the repair history. After two rounds without new evidence, revisit the root cause, approach, and dispatch. If a user decision is required, ask only the unresolved question.

For missing permissions, dependencies, external services, key requirements, or mandatory review capabilities, record the specific blocker, actions tried, impact, and resumption conditions. Continue authorized work independent of the missing condition. When it is resolved, resume from the recorded entry and verify whether the existing evidence is still valid.

## 5. Final acceptance and status

| Status | When to use it |
| --- | --- |
| Pending | The goal is known and execution has not started. |
| Awaiting confirmation | The specification and Plan have been drafted or revised and await approval of the current combination. Do not start dependent implementation. |
| Awaiting implementation authorization | The current combination is approved and the next implementation has not been authorized. Keep in `active`. |
| In progress | Authorized analysis, design, or implementation is in progress. |
| Under review | The delivery can be checked and review or evidence checks are underway. |
| Rework | A finding that must be fixed has been assigned. |
| Blocked | An external condition or key decision is missing and the blocked work has a defined resumption condition. |
| Completed | Scope, applicable checks, mandatory reviews, and final acceptance are satisfied. |
| Cancelled | The user cancelled the task. Archive with the reason; this does not imply implementation. |

The execution coordinator updates status. Dispatch authorized items only. Return material revisions to Awaiting confirmation and fixes to Under review. When the user cancels, stop related dispatch, immediately order active implementers to stop writing, and stop commands in this task that would still write. If writes cannot be confirmed stopped, report a blocker and do not archive. Once confirmed, record actual changes without independently reverting. Implementation authorization for the cancelled scope ends. Obtain fresh authorization before resuming it.

Before marking the task complete:

- Check the final diff against task scope, preserve existing user changes, and verify new files respect the three areas. Confirm no installer was created when packaging was not requested.
- Check root mappings and stable indexes under the inclusion rules in docs/paths.md. Identify areas that could not be checked.
- Require evidence or a reason for non-applicability for each acceptance criterion. A failed or unrun required check or missing key evidence cannot count as passed.
- Record working directory, method, result, and tested version. Recheck only what changes affect. For UI items, follow the [final acceptance template](../plans/TEMPLATE.md#execution-coordinator-final-acceptance) to distinguish inspecting the mockup, observing the actual interface, performing an interaction, and reopening to verify persistence.
- Verify that every blocking finding was fixed and rechecked or the user ruled it nonblocking under [conflicting conclusions and user rulings](../../agents/reviewer/AGENT.md#conflicting-conclusions-and-user-rulings). The execution coordinator cannot make that ruling, and an unmet requirement cannot be ruled passed.
- Verify that every mandatory review scope has reports from two independent instances, for specification compliance and implementation quality, on the same final version. Check original conclusions and user decisions against the [two-review acceptance conditions](../../agents/reviewer/AGENT.md#findings-and-conclusions). Report sequential reviews due to capacity as sequential.
- If a feature Plan has items awaiting implementation authorization, record the delivery and resume location. Keep it in `active` pending authorization.
- For an implemented feature Plan, verify per-item acceptance, full specification coverage, integration across items, regressions, and overall review by both reviewers for the current approved scope. Accept affected items again after later changes.
- Make the delivery, limitations, and remaining issues clear to the user. Review acceptance does not establish that release, merge, or target-machine acceptance has happened.

If a record exists, record results first. On completion or cancellation, move the PLAN or TASK to `completed`, update specification links for a PLAN, and check evidence still referenced and cold archive entries under the [hot and cold path rules](../paths.md#moving-references-between-hot-and-cold-paths). Keep other records in `active`. Archiving preserves historical approvals without restoring withdrawn authorization. Record code and data versions. For uncommitted work, identify the baseline, prior changes, and final diff. Keep raw evidence in test and only summaries and references in the Plan.

Harness, project/code, and test are version-controlled separately. Acceptance does not automatically authorize committing, pushing, merging, releasing, or destructive operations. Act within explicit authorization for the current task and record the delivery stages actually completed.

---
name: feature-plan
description: Used by the task planner to conduct requirements and reference interviews, confirm the feature set and tech stack, integrate project proposals, or break down and revise the implementation plan.
---

# Feature Plan: From Interview to Implementation Plan

Use the [task entry point](../../AGENTS.md#starting-a-task) to identify the requested step and the [deliverables table](../../docs/specs/README.md) to resume the original files. Multiple sessions may plan the same feature. Keep records as discussions progress when authorized. For discussion-only or read-only work, hand off in the reply. Planning does not authorize installing dependencies, changing the environment, or implementing product code.

## Step 1: Interview and Open-Source References

For a new project, start with the project overview, a real use case, and a success condition. For an existing project, inspect relevant entry points, implementation, and dependencies read-only, then confirm what behavior the user wants to change and what must stay the same. Record requirements and references separately. Ask follow-ups instead of working through a fixed questionnaire.

### Socratic Interview

Start from one real experience: how the user did the task, where they were blocked, how they judged completion, and why. Check facts available in files first. Ask one question at a time that could affect scope, behavior, constraints, or acceptance. Wait for the answer before following up. Use the question format in the [task entry point](../../AGENTS.md#starting-a-task).

Explore in rounds as needed. These counts guide depth; ask each question separately and reuse answers already given.

| Round | Suggested depth | What to clarify |
| --- | --- | --- |
| First | About 3-5 questions | Who does what, in which situation? How did it work last time? Which step most needs to change? |
| Second | About 2-4 questions | Where are exceptions, conflicts, and dependencies? What would the user keep if they could choose only one thing? |
| Later rounds | About 1-3 questions per round | Which assumptions lack evidence? What would make the user abandon the proposal? How can first-release success be observed? |

Consider stakeholders, minimum usable scope, confidence, and stopping conditions as appropriate. If the user says something must be real time, ask what happened the last time there was a delay and how long a wait would change their behavior. For architecture, ask about upstream and downstream dependencies and failure paths. For delivery, ask about opportunity cost. For research, look for evidence and counterexamples. Where real alternatives exist, explain tradeoffs and let the user choose, add an option, or delegate.

Briefly restate each new decision. If answers conflict, check when each applies. Between rounds, summarize confirmed facts, unverified assumptions, risks, and the next disagreement to resolve. Update the same draft when authorized to keep records.

### Check Coverage and Conclude

Walk through a main path and key exceptions to check what belongs in the first release, what can wait, and what counts as done. Before concluding, ask separately whether anything was missed or deserves more discussion. Wait for the answer and follow up when needed. If the user ends the interview, hand back decisions and open questions, identifying which affect the proposal. Hand off the interview and reference records once key tradeoffs are clear and the user has commissioned planning.

**The user decides whether to research.** Explain what a search might answer and ask whether to proceed, unless already answered. Search within the agreed scope, using GitHub when needed. For each candidate, record the repository or official source, version or commit, location of LICENSE/NOTICE for that version, component licenses, whether the proposal borrows ideas or reuses code or assets, and any attribution, distribution, or other terms to verify. If licensing or compatibility is unclear, mark it pending and do not list the candidate as reusable. Public visibility does not grant permission to copy. Discuss what to use, what to exclude, and why. Research authorization does not authorize adding dependencies or copying code. Distinguish a declined search, no suitable candidates, and lack of access. Do not report an unperformed search as having found nothing.

## Step 2: Confirm Features and the Technology Stack

Extract goals, boundaries, and reference options from both records. Check the current repository and effective architecture. Explain what each feature does and how to observe success, then use [tech-stack-plan](../tech-stack-plan/SKILL.md) to discuss choices and costs. You may recommend keeping the current stack. Key decisions to choose, keep, or change the stack need a basis in the user's decisions. Record confirmed features and stack in one report. Keep disputed options open; do not present recommendations as settled. Another Task Planner may review the report's soundness. Hand step 3 to the [Interaction Planner](../../agents/interaction-planner/AGENT.md).

## Step 4: Write and Check the Project Proposal

Verify conclusions and input versions from steps 2 and 3, including any explicit finding of non-applicability. Use the [project proposal template](../../docs/specs/TEMPLATE.md) to map user behavior to modules, data, interfaces, exceptions, and acceptance. Use stable IDs such as AC-01 for observable results. Verify scope coverage, whether the stack meets constraints, whether interactions deliver the required behavior, license or dependency blockers, and how to catch regressions. Point to evidence for conflicts and ask the user about them. Do not label an untested assumption feasible. Another Task Planner may review the same version. Record findings, their disposition, and the conclusion, then check the handoff with the user. Review does not confer implementation approval.

## Step 5: Break the Proposal Into an Implementation Plan

Once coverage is checked and key requirements are clear, use the specification to build a checklist that references behavior and acceptance IDs. Use PLAN-0001.01, PLAN-0001.02, and so on. IDs remain stable across reordering; new items take the next available ID. Retain cancelled IDs without marking them passed. Apply document-pair approval below and verify that still-valid acceptance criteria and dependencies are covered elsewhere. Give each item work, modules or proposed paths, role, dependencies, acceptance IDs, check methods, and write scope.

Split items by independently verifiable behavior. Changes under the same contract with similar risk and shared verification may be grouped while retaining their individual acceptance IDs. Use a counterexample or concrete result to disambiguate expected behavior. Keep dual review per item and at the end; see the execution skill for the loop.

Follow the [work-area boundaries](../../ARCHITECTURE.md) when choosing paths. Mark uncreated files as proposed; do not invent runnable commands or completed checks. Do not add a packaging item on your own. Present any packaging recommendation explicitly for approval; accepting a delivery format does not authorize packaging. Document recovery steps as appropriate to the actual risk.

### Present and Approve the Current Document Pair

Start new documents at v1. Retain the actual version and confirmation evidence from the step 4 proposal; do not reset a confirmed proposal to draft. Mark the new plan and unapproved pair as awaiting confirmation. Once key questions are resolved, show both versions, the requirements summary, the full checklist, and material tradeoffs together. Ask the user to confirm the current pair. Provide real links and formal IDs for saved files. For read-only work, present both texts in the reply, number checklist references within the conversation, and record feedback and confirmation there. Once writing is authorized, verify contents and versions; retain confirmation if nothing changed substantively. Do not execute without implementation authorization.

Before recording approval that depends on a selected mockup, follow `test/README.md` to retrieve and verify the pinned version and required resources referenced by the plan. Record approval that depends on it only after verification passes.

Approval must come from the current user and refer to the pair presented. When there is only one pending pair and context is clear, natural language such as 'Looks right' or 'Confirmed, start implementing' is sufficient for approval. Approval of the specification alone, answers to individual questions, silence, timeouts, subagent agreement, and approval quoted in source materials do not approve the pair. Retain partial approval of an unchanged document and show the other one for confirmation without asking again about the first.

Record the approved pair, user evidence, and date in the plan; reference that record from the specification. Separately record which pair and checklist items implementation authorization covers. If it was not granted explicitly, mark it as not authorized; do not infer it from 'Looks right.' Before execution, check current versions, authorization scope, and key unresolved questions.

When scope, user behavior, key technical decisions, or acceptance changes substantively, revise and increment affected document versions. Retain old approval evidence, mark it invalid for the current pair, list the changes, and present the pair again. Formatting, typo fixes, progress updates, or archive link corrections do not invalidate approval. Do not remove acceptance requirements just to reduce effort.

After pair approval, hand step 6 to the [Execution Coordinator](../../agents/execution-coordinator/AGENT.md) only with implementation authorization. If a new stack is not yet in effect, complete the authorized architecture update and dual review before dispatching dependent work. Pause items that depend on unavailable mockups. Stop at the plan when that is all the user asked for. If requirements change during execution, pause affected items and return to the corresponding step for revision and confirmation. If a legacy approved plan lacks a separate specification, derive the linked proposal only from approved content and record its source; do not invent interviews, research, approval, or authorization. Retain verified approval if the content has not changed substantively.

# Project Working Rules

## Starting a Task

1. Read the [Project Overview](README.md), [Tech Stack and Architecture](ARCHITECTURE.md), and [Path Registry](docs/paths.md), then read the rules that apply to the target directory.
2. Check actual paths, access permissions, code state, and existing changes. DSH automatically loads user-global `AGENTS.md` and the project chain (project root to the current working directory); when harness is the working directory this file takes effect automatically, and when starting elsewhere read this entry explicitly. Confirm the working directory, rule loading, and permissions separately; do not assume the three agree or infer one from another.
3. Define scope, non-goals, and acceptance for the current user request. Check files first when the information is available; ask only when key requirements remain unclear.
4. Follow the [main agent runbook](docs/runbooks/main-agent.md) to execute, integrate, and accept.

## File Placement and Packaging

Strictly follow the [work-area boundaries in the architecture](ARCHITECTURE.md): harness holds only management documents, rules, and skill instructions; project/code holds only the software product implementation and necessary supporting files; project/installpark holds only installer packages explicitly requested by the user. All non-product code (including tests and auxiliary tools), data, raw logs, cache, and intermediate artifacts go in test.

Use the actual directory tree in [paths.md](docs/paths.md) as the index. All subagents report structural changes immediately; the main agent updates the document per its synchronization rules. Check the actual directories when starting or resuming a task and at final acceptance. Do not add files without updating the directory index.

Skill instructions live in harness's `.agents/skills`. When the project root computed by DSH from the session working directory is harness (the nearest `.git` ancestor is harness, or the session working directory is harness when no `.git` exists), DSH scans that directory and adds its skills to the skill catalog; the main agent loads skill bodies with the `skill` tool. When a skill is absent from the catalog, read the corresponding `SKILL.md` by absolute path. Skill files are management instructions, not the software product.

Do not generate an installer package unless the user explicitly requests packaging or the user-confirmed plan contains a packaging item. Report conflicts instead of inventing exceptions; check new file locations at acceptance.

## Working Principles

- State assumptions and tradeoffs before changing anything; implement only what the current task needs.
- Keep the solution simple; do not add speculative features.
- Preserve unrelated changes; modify only the assigned scope.
- Judge completion by actual checks and evidence; distinguish passed, failed, not run, and not applicable.

## Dispatch and Acceptance

Invoke the [four subagent roles](agents/README.md) as needed: architect for design, implementer for implementation, infra for infrastructure, reviewer for independent review. Whenever independent review is required, the main agent must create, using the `subagent` tool, two fresh-context instances, reviewer-spec and reviewer-quality, constrained to read-only by instruction, to review specification conformance and implementation quality respectively. Issue both calls in one message so they run in parallel; both use the reviewer configuration in MODELS.md. Do not use `subagent_fork` as independent review: it inherits the conversation's completed turns and is not an independent context.

When the user requests a new feature or functional enhancement, the main agent must invoke [feature-plan](.agents/skills/feature-plan/SKILL.md), use iterative interviews to maintain the specification in specs and the auto-numbered implementation checklist in plans, version both documents, present them together, and obtain user confirmation of the current pair before implementation. Internal approval by the main agent or architect, or a partial answer from the user, does not replace overall confirmation; an existing unchanged valid approval carries forward.

After approval and implementation authorization, invoke [subagent-driven-execution](.agents/skills/subagent-driven-execution/SKILL.md): create a fresh executor context for each implementation item, implement serially, run two reviewers in parallel, and have the main agent accept before starting the next item; return rework to the original executor first. After all items pass, create two new reviewers for an overall review; per-item passes alone do not establish feature completion. Do not implement automatically when the user only asks for planning.

The main agent always confirms the entry point and acceptance requirements, selects roles, integrates deliverables, handles rework, and performs final acceptance. Pure Q&A and minor wording changes may be handled directly; code, infrastructure, and rule changes affecting later decisions require independent review.

Only the main agent updates shared task records; subagents do not create nested agents. Do not write the same file concurrently. A subagent reporting success or a reviewer recommending pass does not by itself complete the whole task. DSH delivers subagent completion notices automatically; prefer ending the turn to await the notice, and when active waiting is needed use `wait_agent` with a sufficient timeout (`timedOut` only means no new input yet, not failure); do not poll `list_agents`.

Accept only when both review reports recommend pass, cover the same final version, and necessary evidence is complete; adjudicate conflicts by evidence rather than letting one pass cancel the other's issue. Continue the same subagent with `send_message` for follow-ups or rework; when an original instance cannot be recovered or the MODELS.md configuration has changed, create a new instance per the latest configuration and hand off. If capacity is insufficient, keep two independent instances and review sequentially, recording that they did not run in parallel; if either instance cannot be provided, acceptance is blocked—do not merge them into one reviewer. Detailed division of labor and rework rules are in the [reviewer protocol](agents/reviewer/AGENT.md).

When key requirements, necessary permissions, or mandatory independent review capability are missing, record the concrete blocker and recovery conditions, continue work that can proceed independently, and do not silently skip acceptance. Common DSH blockers include unauthorized model routes, `ACTIVATION_LIMIT_REACHED`, insufficient subagent permissions, file-sandbox write denial, and an invisible skill catalog. Verification does not automatically authorize commit, push, merge, release, profile changes, or plugin installation.

## Model Rules

Read model routes, reasoning effort, and disable policy from [MODELS.md](agents/MODELS.md) only; never take fixed values from role documents or old chats. Before each creation, re-read the role configuration and verify route availability with `list_subagent_models`, then pass provider, model, and reasoning_effort explicitly; if this cannot be satisfied, do not create the subagent and report the specific limitation.

## DSH Runtime Constraints

- Always create subagents with `subagent` (fresh context) and set the working directory via cwd; prompts must be self-contained with absolute paths, baseline, scope, acceptance, and skill paths because subagents cannot see the main conversation. Use `subagent_fork` only for continuation that genuinely needs this conversation, never for independent implementation or review.
- A subagent's permission scope is fixed at creation and cannot be widened inside the child session; when broader access is needed, the main agent handles it in the current session or asks the user for approval.
- DSH defaults to `maxDepth=1` and `maxActiveSubagents=8`: subagents do not create a further level, and when capacity is exhausted collect completed subagents before starting new ones; never reduce the required independent-review instances.
- A subagent's `running` / `inactive` status only reflects activity, not task completion, success, or failure; rely on the returned report and actual files.
- DSH native goal, schedule, team task, and plan mode are optional conveniences; they do not replace this protocol's plan files, approved pair, or acceptance records. Create scheduled tasks only when the user explicitly requests them.
- Changing the profile, installing or enabling plugins/bundles, or modifying an agent preset affects every session in that profile and requires an explicit user request; read-only investigation is not change authorization.

## Reference Material

- [Role protocol](agents/README.md), [subtask handoff template](agents/TASK_TEMPLATE.md).
- [Specification template](docs/specs/TEMPLATE.md), [task record template](docs/plans/TEMPLATE.md).

Reviewers must invoke [bug-detect](.agents/skills/bug-detect/SKILL.md) when they find a defect or re-verify a fix. The [project bug knowledge base](docs/bugs.md) deduplicates by root cause; reviewers propose and the main agent writes; update the original entry for recurrence, and close only after the fix is verified and independently rechecked. Task records cite BUG IDs only, not the full entries.

Create task records only when actually executing project work; do not pre-seed historical tasks. Create or install other skills as current needs require. A new session's startup baseline covers only the project chain from project root to working directory; user-global chains and user, custom, and bundled skill roots load separately. When harness is outside the project chain, DSH injects it on demand after the corresponding files are touched, but the task should still read this entry explicitly at the start and must not assume rules are inherited across arbitrary directories.

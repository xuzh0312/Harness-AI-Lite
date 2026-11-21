# Project Working Rules

## Starting a Task

1. Read the [project introduction](README.md), [technology stack and architecture](ARCHITECTURE.md), and [path table](docs/paths.md), then read the rules applicable to the target directory.
2. Check actual paths, access permissions, code state, and existing changes. Confirm the working directory, rule loading, and permissions separately; do not assume the three directories are adjacent.
3. Define scope, non-goals, and acceptance methods from the current user goal. Look up information available in files first; ask when key requirements remain unclear.
4. Execute, integrate, and accept the work according to the [main agent handbook](docs/runbooks/main-agent.md).

## File Placement and Packaging

Follow the [work-area boundaries](ARCHITECTURE.md). Use harness for management documents, rules, and skill instructions, project/code for the software and necessary supporting files, and project/installpark for explicitly authorized final installers. Reusable UIUX-design resources and curated references ship with the skill. Store project-specific designs and prototypes at their assigned location in test, along with non-product code, tests, helper tools, data, raw logs, caches, and intermediate artifacts.

Use the actual directory tree in [paths.md](docs/paths.md) as the structure index. Subagents immediately report every structural change; the main agent updates the index centrally according to its synchronization rules. Check actual directories when starting or resuming work and during final acceptance. Do not add files without updating the directory index.

Do not generate installation packages unless explicitly requested or explicitly included in the user-approved plan. Report conflicts when directory requirements cannot be met; do not make unauthorized exceptions. Check the locations of added files during acceptance.

## Working Principles

- State assumptions and tradeoffs before making changes; implement only what the current task needs.
- Keep the solution simple and avoid speculative features.
- Preserve unrelated changes and modify only the assigned scope.
- Judge completion using actual checks and evidence; distinguish passed, failed, not run, and not applicable.

## Coordination and Acceptance

Use the [three subagent roles](agents/README.md) as needed. UIdesign works with the user on interface design, implementer handles implementation and infrastructure, and reviewer handles independent review. Whenever independent review is required, the main agent creates two parallel, read-only instances with independent contexts. reviewer-spec reviews specification compliance and reviewer-quality reviews implementation quality. Both use the reviewer configuration in MODELS.md.

For a new feature or enhancement, the main agent first asks the user to choose between feature design and planning and a direct change by the main agent. Present both choices neutrally. For a direct change, proceed within the authorization and complete applicable reviews and verification. This route skips a new feature specification and implementation plan. For planning, use [feature-plan](.agents/skills/feature-plan/SKILL.md) to interview the user one question at a time, check requirements coverage, and prepare a specification in specs and an automatically numbered implementation checklist in plans. Version the documents separately and obtain the user's approval of the current pair before implementation. Internal agent agreement and answers to individual questions are insufficient. Resume directly when an unchanged approval is still valid.

For feature planning that involves an interface, use [UIUX-design](.agents/skills/UIUX-design/README.md) to clarify user tasks and necessary functionality first. After approval, refine key pages according to the user's choice. Once the design handoff is ready or design is skipped, the plan is approved, and implementation is authorized, use [subagent-driven-execution](.agents/skills/subagent-driven-execution/SKILL.md). Create a fresh executor context per item and process the items serially. Each item needs implementation, two parallel reviews, and main agent acceptance before the next one starts. Prefer returning rework to the original executor. After all items pass, create two fresh reviewers for an overall review. A planning-only request ends with planning.

For every task, the main agent confirms entry conditions and acceptance requirements, selects roles, integrates delivery, handles rework, and performs final acceptance. Pure Q&A and minor wording changes may be handled directly; code, infrastructure, and rule changes affecting later decisions require independent review.

Only the main agent updates shared task records; subagents do not create nested agents. Do not write to the same file concurrently. A subagent reporting success or a reviewer recommending acceptance does not automatically mean the entire task is complete.

The main agent may accept only when both review reports recommend approval, cover the same final version, and all necessary evidence is available. Resolve conflicts through evidence; one passing report cannot cancel issues in the other. If capacity is insufficient, retain two independent instances and review sequentially, stating that execution was not parallel. If either instance cannot be provided, acceptance is blocked; do not combine them into one reviewer. See the [reviewer protocol](agents/reviewer/AGENT.md) for responsibilities and rework rules.

When key requirements, necessary permissions, or mandatory independent review capability are missing, record the specific blocker and recovery conditions. Continue work that can be completed independently; do not silently skip acceptance. Passing verification does not automatically authorize commits, pushes, merges, publication, or destructive actions.

## Model Rules

Read model selection, reasoning effort, prohibited-model policy, and recording format exclusively from [MODELS.md](agents/MODELS.md), rather than taking fixed values from role instructions or old chats. Reread the relevant role configuration before every creation and pass parameters explicitly; if the requirements cannot be met, do not create the agent and report the specific limitation.

## Reference Materials Used as Needed

- [Role protocol](agents/README.md) and [delegation template](agents/TASK_TEMPLATE.md).
- [Requirements template](docs/specs/TEMPLATE.md) and [task record template](docs/plans/TEMPLATE.md).

Reviewers must invoke [bug-detect](.agents/skills/bug-detect/SKILL.md) when finding defects or rechecking fixes. Deduplicate the [project error knowledge base](docs/bugs.md) by root cause: reviewers propose entries and the main agent writes them centrally. Update the original record for recurrence of the same error; close it only after verified repair and independent rechecking. Task records reference BUG IDs rather than duplicating complete error entries.

Generate task records only while executing actual project tasks; do not prepopulate task history. Create or install other skills according to current needs. New sessions must explicitly load this entry point; do not assume rules automatically carry across directories.

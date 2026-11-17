# Subtask Handoff Template

This file is filled in by the main agent and sent as the prompt of the `subagent` tool; it is not automatic configuration. Remove explanatory text and fill in actual paths and configuration; do not start implementation with dependencies when input is insufficient. Subagents use a fresh context and cannot see the main conversation, so this template must be self-contained.

```text
Task ID: <main task ID / subtask ID>
Role: <architect / implementer / infra / reviewer>
Subagent name: <1-32 characters, lowercase letters, digits, and hyphens only, must start with a letter, must not be lead, unique under the same creator; e.g. reviewer-spec-plan-0001>
Review instance and dimension: <reviewer-spec / specification conformance, or reviewer-quality / implementation quality; other roles: not applicable>
Review group and round: <item or overall review identity, round, and the other instance in the group; non-review tasks: not applicable>
Goals and non-goals: <specific>
Harness absolute path: <path>
Project absolute path: <path; state if unused>
Test absolute path: <path; state if unused>
Subagent working directory (cwd): <actual absolute path; may differ from the main session cwd>
Required reading: <Harness AGENTS.md, agents/MODELS.md, role shared protocol, role description, target-directory rules, requirements and plan, relevant skill names or SKILL.md absolute paths>
Feature-task approved pair: <specification path and version, plan path and version, relevant acceptance IDs; non-functional tasks: not applicable>
Execution stage and brief: <initial implementation / rework / item review / overall review; location of this item's brief in the original plan>
Input and baseline: <code commit and existing worktree changes, or reviewed file scope; data version>
Allowed read/modify scope: <specific paths; explicitly state read-only>
Existing changes and other executors: <content to preserve, conflict boundaries>
Prerequisites: <satisfied inputs or unsatisfied conditions>
Acceptance criteria: <observable results>
Verification method and evidence location: <commands, working directory, or manual checks>
Reviewer input and output: <reviewed version shared by both instances, complete task diff and baseline, requirement sources, execution report and evidence; this instance returns its dimension's conclusion independently>
Permission boundary: <whether commit, push, profile/plugin changes are explicitly authorized; do not perform unauthorized actions; a subagent's permission is fixed at creation and cannot be widened>
Configuration source: <Harness agents/MODELS.md actual absolute path>
Creation parameters: provider=<...>; model=<...>; reasoning_effort=<...>; pass explicitly at creation, do not rely on inheritance
Configuration verification: <list_subagent_models query result or verification note>

Use a fresh subagent context for this task; do not use subagent_fork and do not inherit the main conversation.
Follow the shared protocol and return in the unified format; do not update the main task status and do not create nested agents.
If raw logs, cache, or temporary artifacts would be written, use only authorized test locations or the system temporary directory and state this in the report.
The final reply must end with the following configuration line, including blocked or failed replies.
If DSH reports a route or value different from the creation parameters, record the reported value; if the disabled-route policy is violated, stop and report.
provider/model: <actual provider/model>; reasoning effort: <actual reasoning_effort>
```

The main agent must re-read MODELS.md before sending, replace the configuration placeholders with the role's actual values, and ensure the prompt's last line is the configuration footer. A subagent name cannot be reused under the same creator; the two reviewers for one item use distinct, traceable names.

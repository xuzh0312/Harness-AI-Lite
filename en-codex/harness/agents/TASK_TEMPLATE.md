# Subtask Handoff Template

The main agent fills this file and sends it as a prompt; it is not automatic configuration. Remove explanatory text and enter actual paths and configuration. Do not initiate dependent implementation when inputs are insufficient.

```text
Task ID: <main task ID / subtask ID>
Role: <UIdesign / implementer / reviewer>
Review instance and dimension: <reviewer-spec / specification compliance, or reviewer-quality / implementation quality; mark not applicable for other roles>
Review group and round: <task item or overall review identifier, round, and the other instance in this group; mark not applicable for non-review tasks>
Goal and non-goals: <specific description>
Harness absolute path: <path>
Project absolute path: <path; explain if unused>
Test absolute path: <path; explain if unused>
Working directory: <actual absolute path>
Required reading: <Harness AGENTS.md, agents/MODELS.md, shared role protocol, role instructions, target-directory rules, requirements, and plan>
Approved document pair for feature task: <specification path and version, plan path and version, applicable acceptance IDs. During planning interviews, identify drafts and open decisions. Mark not applicable for standalone design or direct changes>
Execution phase and brief: <user-task discovery / interface refinement / initial implementation / rework / item review / overall review. Give the brief location when a plan exists>
Inputs and baseline: <code commit and existing working-tree changes or reviewed file scope, plus data version. Include approved drafts and key states for interface items>
Allowed read/modification scope: <specific paths; explicitly state read-only where applicable>
Existing changes and other executors: <content to preserve, conflict boundaries>
Prerequisites: <satisfied inputs or outstanding conditions>
Acceptance criteria: <observable results>
Verification methods and evidence locations: <commands, working directory, or manual inspection methods>
Reviewer inputs and outputs: <reviewed version shared by both instances, complete task diff and prior baseline, requirement sources, execution report, and evidence; this instance independently returns its conclusion for its assigned dimension>
Permission boundaries: <whether commits, pushes, or similar actions are explicitly authorized; do not perform unauthorized actions>
Configuration source: <actual absolute path to Harness agents/MODELS.md>
Creation parameters: model=<value read from this role's configuration>; reasoning_effort=<value read from this role's configuration>; do not rely on inheritance

Follow the shared protocol and return in its shared format; do not update main-task status or create nested agents.
The final reply must end with the configuration line below, including blocked or failed replies.
If the runtime explicitly reports different actual settings, record the reported values; if they violate the prohibited-model rule, stop and report.
模型选择：<actual model ID>；推理深度：<actual reasoning_effort>
```

Before sending, the main agent must reread MODELS.md and replace configuration placeholders with the actual values for the role, ensuring that the prompt's last line is the configuration footer.

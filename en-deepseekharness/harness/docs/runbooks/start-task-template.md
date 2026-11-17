# Cross-Directory Task Startup Template

When a new DSH session sets its working directory to harness, harness/AGENTS.md loads automatically; when the project root computed by DSH from the session working directory is harness (the nearest `.git` ancestor is harness, or the session working directory is harness when no `.git` exists), `.agents/skills` also enters the skill catalog. When starting from another directory, the project chain covers only that directory's project root through the working directory; if the session later touches harness files, DSH injects their rules on demand, but the startup baseline does not include them, so still provide the entry and skill paths explicitly. This is an explicit-loading entry, not global auto-discovery configuration; adding a directory to the workspace does not grant write permission. The three paths may span disks and need no common parent, but DSH session writes are limited by the workspace and file sandbox.

```text
Please follow the Harness protocol below for this task:

Harness absolute path: <actual location>
Project absolute path: <actual location; state if unused>
Code directory: <project/code actual location; state if unused>
Test absolute path: <actual location; state if unused>

DSH session working directory: <setting it to harness is recommended; subagent cwd is specified separately in the dispatch>
First read Harness's AGENTS.md, agents/MODELS.md, agents/README.md, docs/runbooks/main-agent.md,
then read the target-directory rules and verify actual access permissions, workspace, sandbox, and current changes.
If the skill catalog does not contain feature-plan, subagent-driven-execution, or bug-detect,
read the corresponding .agents/skills/<name>/SKILL.md by absolute path.
Treat Harness as the management basis and choose working directories by role.

Task: <goals, scope, constraints, and acceptance requirements>
Existing task record: <absolute path; note for a new task>
Required requirements or design: <path or none>
Allowed modifications: <scope>
Existing verification and data: <version, results, evidence, or none>
Additional delivery authorization: <perform only what this run explicitly states; e.g., whether commit, release, profile changes, or plugin installation are authorized>

The main agent selects roles per the fixed process and performs final acceptance.
Create subagents with a fresh context via subagent, explicitly passing cwd, provider, model, and reasoning_effort;
before each creation read Harness's agents/MODELS.md and verify routes with list_subagent_models,
follow the disable policy and actual-configuration recording rules, and do not use subagent_fork instead of independent implementation or review.
If creation capability, model routes, or mandatory independent review are unavailable, report the blocker explicitly and do not silently substitute.
```

After moving any area, update the [path registry](../paths.md) and the session workspace or permission settings. DSH's startup baseline includes only the project chain from project root to working directory; user-global chains and user, custom, and bundled skill roots load separately. When harness is outside the project chain, DSH injects it only after the corresponding files are touched, so later sessions must still provide the entry or start from harness. Whether a skill is visible also depends on the session working directory and project root; do not assume any directory auto-discovers them. This template does not guarantee global effect.

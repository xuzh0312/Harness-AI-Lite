# Cross-directory task startup template

Open the deployed template's common parent as the DSH workspace if all three areas are under it. Fill in the following and give it to the main agent in a new session so the entry is read explicitly; do not rely on discovery across roots. If paths span disks, check actual access separately. A path in the prompt or path table does not grant write permission.

```text
Execute this task under the following Harness protocol:

Harness absolute path: <actual location>
Project absolute path: <actual location; state if unused>
Code directory: <actual project/code location; state if unused>
Test absolute path: <actual location; state if unused>

First read AGENTS.md, agents/MODELS.md, agents/README.md, and docs/runbooks/main-agent.md in Harness,
then read the rules applicable to the target directory and confirm actual access permissions and current changes.
Use Harness as the management basis and choose working directories by role.

Task: <goal, scope, constraints, and acceptance requirements>
Existing task record: <absolute path; state if a new task>
Requirements or designs to read: <existing specification, selected draft, or none. When design is needed, read harness/.agents/skills/UIUX-design/README.md>
Allowed modifications: <scope>
Existing verification and data: <versions, results, evidence, or none>
Additional delivery authorization: <act only on explicit authorization here; for example, whether commits or release are authorized>

The main agent chooses roles under the fixed process and performs final acceptance.
Before creating each sub-agent, the main agent reads agents/MODELS.md in Harness,
uses local DSH Spawn without child route or effort defaults, and omits provider, model, and reasoning_effort to inherit the main agent's settings. Follow the prohibition and recording rules; report conflicting overrides instead of selecting another model.
If creation capability or mandatory independent review is unavailable, explicitly report the blocker rather than silently substituting.
```

After moving any area, update the [path register](../paths.md) and the runner's workspace or permission settings. Later sessions must be given the entry point again or use a verified runner integration method; this template does not guarantee automatic global application.

# Cross-directory task startup template

For a new session, fill in the following and give it to the main agent. This explicitly loads the entry point; it is not automatically discovered configuration. Adding a directory to the workspace does not grant write permission. The three paths may span disks and need not share a parent directory.

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
Required requirements or design reading: <paths or none>
Allowed modifications: <scope>
Existing verification and data: <versions, results, evidence, or none>
Additional delivery authorization: <act only on explicit authorization here; for example, whether commits or release are authorized>

The main agent chooses roles under the fixed process and performs final acceptance.
Before creating each sub-agent, read agents/MODELS.md in Harness,
explicitly use the model and reasoning settings for the corresponding role, and follow its prohibition policy and actual configuration recording rules.
If creation capability or mandatory independent review is unavailable, explicitly report the blocker rather than silently substituting.
```

After moving any area, update the [path register](../paths.md) and the runner's workspace or permission settings. Later sessions must be given the entry point again or use a verified runner integration method; this template does not guarantee automatic global application.

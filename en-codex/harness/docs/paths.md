# Hot paths: Work areas and current entry points

Current writer: None (see [AGENTS.md](../AGENTS.md#writing-authorization-and-acceptance) for write rules).

| Area | Actual absolute path | Purpose |
| --- | --- | --- |
| harness | @@ | Project rules, overview, plans, and roles |
| project | @@ | Area containing `installpark` and the default `code` location |
| project/code | @@ | Defaults to `code` under `project` for new projects; may point to an existing code root |
| test | @@ | Test and helper code, data, logs, caches, and verification artifacts |

All roles get actual locations here. Do not assume that the three areas share a disk or are adjacent. `project/code` is the logical code root of the project area. It does not require moving an existing repository or add another work area. Specify the working directory for commands and configure access to actual directories in the runner. Update the table when locations move. Record necessary fixed-directory exceptions confirmed by the user here: owning root, stable relative path, reason, and scope. Leave this empty if there are no exceptions.

## Current work (fill in the project copy)

| Feature ID and scope | Current entry point (area root + relative path) | Location of valid baselines or evidence still needed for this step |
| --- | --- | --- |

List only entry points that exist. Leave the table empty when there is no active work. Use one row per feature, which may point to both records needed for the current step. Use the top of each file for handoff details, versions, user approvals, and next steps. Do not keep a separate progress record here. Leave planned paths and rejected candidates out of the tree. Non-sensitive aliases can replace sensitive names.

## Moving references between hot and cold paths

- In a new session, read this table first. Use the user's target to find the current files and relevant upstream inputs. Do not recursively scan the workspace, `completed`, raw logs, or the [cold path index](paths-cold.md) to infer progress. The tree below helps locate stable entry points; it is not a reading list.
- Keep active references to proposals, design drafts used for approval, regression baselines, and test evidence that current work still depends on, even if the source feature is complete. When material is completed, cancelled, or superseded and has no active dependencies, move only its index entry from the hot table to the cold table. Record ownership, location, version, reason, and references still needed. Verify the cold entry before removing the hot one. Preserve the evidence chain and do not move or delete the underlying files. Required PLAN or TASK archiving is a separate action.
- For a specific historical lookup, recheck, recovery, or user-requested cleanup, search the cold table by ID and open only the necessary records. Before restarting an old feature, check versions, actual files, and permissions and restore references needed again to the hot table. Old approvals and withdrawn authorization do not automatically come back into effect. Before cleanup, separately check dependencies, retention requirements, recoverability, and user authorization for the specific scope.
- If interrupted archiving breaks a hot entry, check only the exact filename for the known PLAN or TASK ID in `docs/plans/active/` and `docs/plans/completed/`. Do not scan cold records. Repair proposal links and the index within authorization only when exactly one file exists and its version and final or in-progress state can be verified. If both or neither exist, or the state conflicts, ask the user first. Do not recreate the record or restore old authorization.
- Subagents only report structural changes. The responsible conversation role updates the index serially. Reread before writing and merge other features' rows. If the previous writer has not been confirmed stopped or an overwrite cannot be ruled out, hand off first. Without write permission, give actual locations and pending index changes in the reply. At startup, resumption, and acceptance, verify paths and root mappings affected by the task and identify any areas not checked. Do not scan cold archives for this.
- The tree lists only existing stable entry points in this edition's three areas. Update it when a root moves, a stable directory is added or removed, or a fixed-directory exception changes. Do not list every raw data file or temporary output. Cite evidence by area root, relative path, and version. The current role updates the tree when the structure changes; there is no background watcher.

## Stable path index for the three areas

### harness

```text
harness/
├── skills/
│   ├── bug-detect/
│   │   └── SKILL.md
│   ├── feature-plan/
│   │   └── SKILL.md
│   ├── subagent-driven-execution/
│   │   └── SKILL.md
│   ├── tech-stack-plan/
│   │   └── SKILL.md
│   ├── UIUX-design/
│   │   ├── README.md
│   │   ├── assets/
│   │   │   ├── index.md
│   │   │   └── UI技法图鉴/
│   │   └── references/
│   │       ├── interaction-motion.md
│   │       ├── tasks-navigation.md
│   │       ├── creative-direction.md
│   │       ├── copy-and-states.md
│   │       └── visual-hierarchy.md
│   └── README.md
├── agents/
│   ├── execution-coordinator/
│   │   └── AGENT.md
│   ├── implementer/
│   │   └── AGENT.md
│   ├── interaction-planner/
│   │   └── AGENT.md
│   ├── task-planner/
│   │   └── AGENT.md
│   ├── reviewer/
│   │   └── AGENT.md
│   ├── MODELS.md
│   ├── README.md
│   └── TASK_TEMPLATE.md
├── docs/
│   ├── decisions/
│   │   └── README.md
│   ├── plans/
│   │   ├── active/
│   │   │   └── .gitkeep
│   │   ├── completed/
│   │   │   └── .gitkeep
│   │   ├── README.md
│   │   └── TEMPLATE.md
│   ├── runbooks/
│   │   ├── execution.md
│   │   ├── README.md
│   │   └── start-task-template.md
│   ├── specs/
│   │   ├── README.md
│   │   └── TEMPLATE.md
│   ├── bugs.md
│   ├── paths-cold.md
│   ├── paths.md
│   └── tech-debt.md
├── AGENTS.md
├── ARCHITECTURE.md
└── README.md
```

### project

```text
project/
├── code/
│   └── README.md
├── installpark/
│   └── README.md
└── README.md
```

### test

```text
test/
├── .gitignore
└── README.md
```

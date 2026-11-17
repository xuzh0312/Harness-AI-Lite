# Work-Area Paths

| Area | Actual absolute path | Purpose |
| --- | --- | --- |
| harness | @@ | project rules, overview, plans, and roles |
| project | @@ | code and installpark |
| test | @@ | test and auxiliary code, data, logs, cache, and validation artifacts |

The main agent obtains actual locations here and does not assume the three directories share a disk or are adjacent. Commands must state the working directory; DSH's session workspace and file sandbox determine write scope. A subagent's cwd must be passed explicitly at creation; when omitted it inherits the caller's current working directory—do not assume it is isolated from the main session. Actual directories must be readable in the session; for cross-area writes beyond the workspace, first obtain user-approved permission configuration. After moving a directory, update this table and the session workspace settings.

## Directory Structure Synchronization Rules

- The tree below reflects actually existing content, including hidden files and empty directories; Git internal metadata is not listed. The three areas are shown separately; this does not mean they must be adjacent. The table remains authoritative for absolute paths.
- After adding, deleting, moving, or renaming files or directories, update this document; ordinary content updates that do not change structure need no tree rewrite. Do not list planned files as existing.
- The main agent is the only writer of this document. Subagents report path lists immediately after each batch of structural changes; the main agent updates after receiving them, no later than the next dispatch or handoff to reviewers, not at the end of the whole project.
- The main agent checks the actual structure when starting or resuming a task; when users or external tools change structure, synchronize the difference instead of relying on old chats. When moving an area root, update the path table above as well.
- Reviewers compare the tree with actual files, and the main agent checks again before final acceptance; when an area is inaccessible, state that it was not checked—do not claim synchronization.
- Maintain one current structure only; do not append a change log. This rule is carried out by executing agents; there is no background watcher. Templates must not create sample files or fill real project paths merely to update the tree.

## Actual File Structure of the Three Areas

### harness

```text
harness/
├── .agents/
│   ├── skills/
│   │   ├── bug-detect/
│   │   │   └── SKILL.md
│   │   ├── feature-plan/
│   │   │   └── SKILL.md
│   │   └── subagent-driven-execution/
│   │       └── SKILL.md
│   └── README.md
├── agents/
│   ├── architect/
│   │   └── AGENT.md
│   ├── implementer/
│   │   └── AGENT.md
│   ├── infra/
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
│   │   ├── main-agent.md
│   │   ├── README.md
│   │   └── start-task-template.md
│   ├── specs/
│   │   ├── README.md
│   │   └── TEMPLATE.md
│   ├── bugs.md
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
├── .gitignore
└── README.md
```

### test

```text
test/
├── .gitignore
└── README.md
```

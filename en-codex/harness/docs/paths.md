# Work area paths

| Area | Actual absolute path | Purpose |
| --- | --- | --- |
| harness | @@ | Project rules, overview, plans, and roles |
| project | @@ | code and installpark |
| test | @@ | Test and helper code, data, logs, caches, and verification artifacts |

The main agent obtains actual locations here; do not assume the three directories are on the same disk or adjacent. Commands must specify the working directory; the runner must provide corresponding access permissions for the actual directories. Update this table after moving directories.

## Directory structure synchronization rules

- The trees below reflect content that actually exists, including hidden files and empty directories; Git internal metadata is omitted. The three areas are shown separately, which does not require adjacency. Absolute paths remain governed by the table.
- Synchronize this document after adding, deleting, moving, or renaming files or directories; ordinary content changes with no structural changes do not require rewriting the trees. Do not list planned files as already existing.
- The main agent is the sole writer of this document. Sub-agents immediately report path lists after each batch of structural changes; the main agent updates it upon receipt, no later than the next dispatch or reviewer handoff, rather than waiting until the entire project ends.
- The main agent checks actual structure when starting or resuming a task; synchronize differences caused by the user or external tools rather than relying on old chats. Also update the path table above when moving an area root.
- Reviewers check the trees against actual files, and the main agent checks again before final acceptance; explicitly mark inaccessible areas as unchecked and do not claim synchronization is complete.
- Maintain only one current structure, without appending a chronological change log. Executing agents enforce this rule; there is no background watcher. Do not create example files or fill in real project paths merely to update the template's directory trees.

## Actual file structures of the three areas

### harness

```text
harness/
├── .agents/
│   └── skills/
│       ├── bug-detect/
│       │   └── SKILL.md
│       ├── feature-plan/
│       │   └── SKILL.md
│       ├── subagent-driven-execution/
│       │   └── SKILL.md
│       ├── tech-stack-plan/
│       │   └── SKILL.md
│       ├── UIUX-design/
│       │   ├── README.md
│       │   ├── assets/
│       │   │   ├── index.md
│       │   │   └── UI技法图鉴/
│       │   │       ├── 动效与材质图鉴.html
│       │   │       ├── 动效技法-交互空间.js
│       │   │       ├── 动效技法-材质风格.js
│       │   │       ├── 动效技法-结构数据.js
│       │   │       ├── 动效界面设计风格全景分类参考.md
│       │   │       ├── 图鉴使用说明.md
│       │   │       ├── 图鉴目录.css
│       │   │       ├── 图鉴目录.js
│       │   │       ├── 图鉴目录数据.js
│       │   │       ├── 图鉴目录生成.ps1
│       │   │       ├── 工作台样板.html
│       │   │       ├── 布局图鉴.html
│       │   │       ├── 布局技法数据.js
│       │   │       └── 页面布局设计全景分类参考.md
│       │   └── references/
│       │       ├── interaction-motion.md
│       │       ├── tasks-navigation.md
│       │       ├── creative-direction.md
│       │       ├── copy-and-states.md
│       │       └── visual-hierarchy.md
│       └── README.md
├── agents/
│   ├── UIdesign/
│   │   └── AGENT.md
│   ├── implementer/
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


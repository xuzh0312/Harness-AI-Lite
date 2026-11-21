# 工作区域路径

| 区域 | 实际绝对路径 | 用途 |
| --- | --- | --- |
| harness | @@ | 项目规则、介绍、计划与角色 |
| project | @@ | code 与 installpark |
| test | @@ | 测试及辅助代码、数据、日志、缓存与验证产物 |

主 agent 从这里获取实际位置，不假定三个目录同盘或相邻。执行命令须明确工作目录；实际目录需在运行器中提供对应访问权限。移动目录后更新本表。

## 目录结构同步规则

- 以下目录树对应实际存在的内容，包含隐藏文件与空目录；不列出 Git 内部元数据。三个区域分别展示，不表示它们必须相邻。绝对路径仍以表格为准。
- 新增、删除、移动或重命名文件及目录后，必须同步此文档；普通文件内容更新但结构未变时无需重写目录树。计划中的拟建文件不提前列为已存在。
- 主 agent 是此文档的唯一写入者。子 agent 每批结构变更后立即回报路径清单；主 agent 接收后更新，最迟在下一轮分派或交给 reviewer 前完成，不等到整个项目结束。
- 主 agent 开始或恢复任务时核对实际结构；发现用户或外部工具改变结构时同步差异，不依赖旧聊天。移动区域根目录时同时更新上方路径表。
- reviewer 核对目录树与实际文件，主 agent 最终验收前再次核对；无法访问区域时明确标注未核对，不宣称同步完成。
- 只维护一份当前结构，不追加逐次变更流水。此规则由执行 agent 落实，没有后台监听程序。模板中不得为了更新目录树创建示例文件或填写真实项目路径。

## 三个区域的实际文件结构

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
│       │   │   └── index.md
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

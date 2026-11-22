# 工作区域路径

| 区域 | 实际绝对路径 | 用途 |
| --- | --- | --- |
| harness | @@ | 项目规则、介绍、计划与角色 |
| project | @@ | code 与 installpark |
| test | @@ | 测试及辅助代码、数据、日志、缓存与验证产物 |

主 agent 从此表获取实际位置；不假定三个目录同盘或相邻。执行命令时必须指定工作目录；运行器须为实际目录提供相应的访问权限。移动目录后更新本表。

## 目录结构同步规则

- 以下目录树反映实际存在的内容，包括隐藏文件和空目录；省略 Git 内部元数据。三个区域分开展示，不要求相邻。绝对路径以表格为准。
- 新增、删除、移动或重命名文件或目录后同步本文档；仅改内容且结构不变时不必重写目录树。不把计划中的文件列为已存在。
- 主 agent 是本文档的唯一写入者。子 agent 每批结构变更后立即报告路径清单；主 agent 收到后即更新，最迟在下次分派或交接给 reviewer 前完成，不等到项目结束。
- 主 agent 在启动或续接任务时核对实际结构，发现用户或外部工具造成的差异就同步，不依赖旧对话。区域根目录移动时也更新上方路径表。
- reviewer 核对目录树与实际文件，主 agent 在最终验收前再次核对。无法访问的区域明确标为未核查，不声称同步完成。
- 只维护一份当前结构，不追加按时间排列的变更日志。执行任务的 agent 负责落实；没有后台监听程序。不要仅为更新模板的目录树而创建示例文件或填入真实项目路径。

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
│       │   ├── references/
│       │   │   ├── copy-and-states.md
│       │   │   ├── creative-direction.md
│       │   │   ├── interaction-motion.md
│       │   │   ├── tasks-navigation.md
│       │   │   └── visual-hierarchy.md
│       │   └── README.md
│       └── README.md
├── agents/
│   ├── implementer/
│   │   └── AGENT.md
│   ├── reviewer/
│   │   └── AGENT.md
│   ├── UIdesign/
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
│   │   ├── dsh-migration.md
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

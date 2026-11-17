# 跨目录任务启动模板

新会话在 DSH 中把工作目录设为 harness 时，harness/AGENTS.md 会自动加载；当 DSH 按会话工作目录计算出的项目根是 harness（最近的 `.git` 祖先是 harness；没有 `.git` 时会话工作目录就是 harness）时，`.agents/skills` 也会进入技能目录。从其他目录启动时，项目链只覆盖该目录所在的项目根到工作目录；会话随后触达 harness 文件时 DSH 会按需注入其规则，但启动基线不含，仍应显式提供入口与技能路径。它是显式加载入口，不是全局自动发现配置；目录加入工作区不等于获得写入权限。三个路径可跨磁盘，无需共同父目录，但 DSH 会话的写入受 workspace 与文件沙盒限制。

```text
请按以下 Harness 协议执行本任务：

Harness 绝对路径：<实际位置>
Project 绝对路径：<实际位置；不用则说明>
代码目录：<project/code 实际位置；不用则说明>
Test 绝对路径：<实际位置；不用则说明>

DSH 会话工作目录：<建议设为 harness；子 agent 的 cwd 由分派单独指定>
先读取 Harness 中的 AGENTS.md、agents/MODELS.md、agents/README.md、docs/runbooks/main-agent.md，
再读取目标目录适用规则，并确认实际访问权限、workspace、沙盒与当前改动。
若技能目录中没有 feature-plan、subagent-driven-execution 或 bug-detect，
直接读取对应 .agents/skills/<name>/SKILL.md 的绝对路径。
将 Harness 作为管理依据，按角色选择工作目录。

任务：<目标、范围、约束与验收要求>
已有任务记录：<绝对路径；新任务则注明>
必读需求或设计：<路径或无>
允许修改：<范围>
已有验证与数据：<版本、结果、证据或无>
额外交付授权：<仅按本次明确说明执行；例如是否授权提交、发布、修改 profile 或安装插件>

由主 agent 按固定流程选择角色并最终验收。
子 agent 使用 subagent 新上下文创建，显式指定 cwd、provider、model、reasoning_effort；
每次创建前读取 Harness 的 agents/MODELS.md，并用 list_subagent_models 核对路由，
遵守禁用策略和实际配置记录规则；不使用 subagent_fork 代替独立实现或审查。
创建能力、模型路由或强制独立审查不可用时，明确报告阻塞，不静默替代。
```

移动任一区域后更新 [路径登记](../paths.md)与会话 workspace 或权限设置。DSH 启动基线的项目链只覆盖项目根到工作目录；用户全局链与用户、自定义及 bundled 技能根另行加载。harness 在项目链之外时，触达后才会按需注入，因此后续会话仍应重新提供入口，或直接从 harness 启动。技能是否可见还取决于会话工作目录与项目根，不能假定任意目录都能自动发现。本模板不保证全局自动生效。

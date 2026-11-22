# Harness-AI-Lite · DeepSeek Harness

[DeepSeek Harness English](https://github.com/xuzh0312/Harness-AI-Lite/blob/main/README.dsh.en.md) · [Codex 中文](https://github.com/xuzh0312/Harness-AI-Lite/blob/main/README.codex.zh-CN.md) · [Codex English](https://github.com/xuzh0312/Harness-AI-Lite/blob/main/README.md)

Harness-AI-Lite 是一套可复用的 DeepSeek Harness（DSH）项目模板，将项目管理、软件本体和开发验证材料放在三个独立区域，支持跨目录、跨盘放置。2.0.0 与 Codex 版共享核心工作流程，但分派、提问和恢复任务使用 DSH 自身的工具。

## 下载

| 语言 | 模板目录 | ZIP |
| --- | --- | --- |
| 简体中文 | [zh-CN-deepseekharness](zh-CN-deepseekharness/) | [下载中文版 2.0.0 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-zh-CN-deepseekharness-2.0.0.zip) |
| English | [en-deepseekharness](https://github.com/xuzh0312/Harness-AI-Lite/tree/main/en-deepseekharness) | [Download English 2.0.0 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-en-deepseekharness-2.0.0.zip) |

每个 ZIP 包含对应模板、同语言指南和 MIT 许可证。1.0.0 的原始安装包见底部[版本记录](#版本记录)。

## 核心设计

| 约定 | 如何工作 |
| --- | --- |
| 三个独立工作区域 | `harness` 保存规则、需求、计划和决策；`project` 保存软件本体和经授权生成的最终安装包；`test` 保存测试、工具、数据、项目设计稿和中间产物。在 `harness/docs/paths.md` 关联实际位置。 |
| 两条功能处理路径 | 用户选择先做功能设计规划，或由主 agent 直接修改。直接修改不另建规格书和计划，但仍完成适用的检查与审查。 |
| 分别确认设计与实施 | 用户一起批准当前规格书和编号计划；开始实施还须获得授权。宿主的需求确认、局部回答或空回复都不等于项目批准。 |
| 三类子 agent | UIdesign 通过主会话协作设计界面，implementer 负责实现和基础设施，reviewer 负责独立审查。 |
| 两个独立审查实例 | `reviewer-spec` 检查规格符合性，`reviewer-quality` 检查实现质量。两份报告覆盖同一最终版本且必要证据齐全后，主 agent 才能验收。 |
| 可恢复的任务记录 | 主 agent 在活动计划中记录批准、派工、验证、返工和下一步，按根因统一维护错误知识库。 |

## 快速开始

1. 下载所需版本和语言，从选定模板中只复制 `harness`、`project` 和 `test` 到实际位置。已有 1.0.0 项目先核对当前计划、角色和路径，不直接覆盖原规则。
2. 在项目副本中填写 `harness/README.md`、`harness/ARCHITECTURE.md` 和 `harness/docs/paths.md`，分别记录项目介绍、技术栈和真实路径。技术栈尚未确定时，可先用 [tech-stack-plan](zh-CN-deepseekharness/harness/.agents/skills/tech-stack-plan/SKILL.md) 记录已确认的选择。
3. 条件允许时，将三个区域的共同父目录作为 DSH 工作区。分别核对各区域的实际访问权限，尤其是跨盘场景。提示或路径表中写明路径不会授予写权限；执行命令时指定正确的 `workdir`。
4. 在新的 DSH 会话中使用[启动模板](zh-CN-deepseekharness/harness/docs/runbooks/start-task-template.md)，显式加载项目副本的 `harness/AGENTS.md`、角色和模型规则以及主 agent 执行手册。说明任务、范围、现有证据和已有计划路径，不假定跨目录或跨会话自动继承规则。

## DSH 专用流程

- **派发与模型继承。** 使用本地 DSH `subagent`（Spawn），不配置子 agent 路由或推理深度覆盖，并省略 `provider`、`model`、`reasoning_effort`，以继承主 agent 的实际设置。核对当前 profile；不符合继承或禁用模型规则时报告阻塞。只记录运行时可见的实际值，不猜测隐藏设置。见 [MODELS.md](zh-CN-deepseekharness/harness/agents/MODELS.md)。
- **项目内流程。** 用 `read` 读取[项目流程索引](zh-CN-deepseekharness/harness/.agents/skills/README.md)及对应文件，不依赖原生技能注册；DSH 原生技能仍使用 `skill` 加载。
- **规划与 UI 设计。** [feature-plan](zh-CN-deepseekharness/harness/.agents/skills/feature-plan/SKILL.md) 用于澄清需求并形成规格书与实现计划。涉及界面时，[UIUX-design](zh-CN-deepseekharness/harness/.agents/skills/UIUX-design/README.md) 先梳理用户任务和必要功能。UIdesign 把问题交给主 agent，由主会话优先用 `ask_user_question` 提问，不可用时改用对话，再回传答案。
- **执行与恢复。** 计划获批且获得实施授权后，串行执行计划项。每项使用新的执行者上下文及两个独立 reviewer，整体审查再新建 reviewer。记录子 agent 的名称，使用 `list_agents` 和 `send_message` 恢复；原实例无法恢复或主 agent 设置已变更时，创建新实例并交接已核实的信息。`inactive` 不代表通过。

完整流程与部署限制见[主 agent 执行手册](zh-CN-deepseekharness/harness/docs/runbooks/main-agent.md)和 [DSH 迁移清单](zh-CN-deepseekharness/harness/docs/runbooks/dsh-migration.md)。迁移清单以 DSH Desktop `0.2.2-rc.5` 为目标环境；模板不改全局配置、不安装插件，也不代表已验证所有 DSH 版本和 profile 的端到端兼容性。

## 许可证

本项目采用 [MIT License](LICENSE)。复制或分发模板及其重要部分时，请保留版权和许可证声明。

## 版本记录

| 版本 | 日期 | 说明 | 下载 |
| --- | --- | --- | --- |
| 2.0.0 | 2026/11/22 | 调整子 Agent 的角色分工与技能（Skill），新增 UIdesign 角色和 UI 设计流程。 | [中文 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-zh-CN-deepseekharness-2.0.0.zip) · [English ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-en-deepseekharness-2.0.0.zip) |
| 1.0.0 | 2026/11/17 | 初版采用轻量化 Harness 工程模板，将管理、软件与测试分置于三个独立工作区，提供需求确认、分工实现、双重审查和基于证据的验收流程。 | [中文 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/8e42dd79b925b111b79769bdff954d39a778729d/downloads/Harness-AI-Lite-zh-CN-deepseekharness.zip) · [English ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/8e42dd79b925b111b79769bdff954d39a778729d/downloads/Harness-AI-Lite-en-deepseekharness.zip) |

# Codex → DeepSeek Harness 迁移清单

目标环境：DSH Desktop `0.2.2-rc.5`。这是项目工作流程模板，不是应用或构建任务。部署时从中文版 DSH 模板 `zh-CN-deepseekharness/` 复制 `harness`、`project` 和 `test` 三个目录；本模板不修改 DSH 全局设置，也不安装插件。

| 原有问题或部署风险 | DSH 适配 |
| --- | --- |
| 启动指南曾指向 Codex 或未随模板交付的目录。 | 使用[启动模板](start-task-template.md)显式读取 [AGENTS.md](../../AGENTS.md)。 |
| 旧分派示例使用 DSH 不支持的 `fork_turns=none`；固定 GPT 路由可能在未配置该路由时导致分派失败。 | 按 [DSH 分派流程](main-agent.md#3-分派与整合)使用本地 `subagent`。省略 `provider`、`model` 和 `reasoning_effort`，遵守[继承策略](../../agents/MODELS.md)及现有模型禁用规则。 |
| 续接子 agent、获取其报告及记录实际设置缺少 DSH 操作说明。 | 记录子 agent 名称，使用 `list_agents` 和 `send_message`。原实例无法续接，或主 agent 的模型、推理深度已变化时，新建独立实例并交接已核实的上下文。记录继承方式与运行时公开的实际值；`inactive` 不代表验收通过。 |
| `.agents/skills` 中的项目流程不一定出现在 DSH 会话的技能清单。 | 用 `read` 读取[项目流程索引](../../.agents/skills/README.md)及对应入口，不依赖注册或自动发现。原生技能仍通过 `skill` 加载。 |
| 设计子 agent 直接向用户提问可能卡住无人值守的分派。 | [UIdesign](../../agents/UIdesign/AGENT.md)将问题交回主 agent，由主 agent 在主会话提问并回传答案。 |
| 外部工作路径可能可读但不可写，目标环境的 Spawn 工具不接受 `cwd`。 | 可行时优先使用共同父目录作为工作区。按[主 agent 手册](main-agent.md#1-入口确认与任务记录)核对三个区域的实际权限，并在交接提示中写明绝对工作目录。执行命令使用 shell 工具的 `workdir`，它不会改变沙箱权限。必要时仅为确切操作申请权限；无法获得权限则报告阻塞。 |
| 规划流程曾引用目标 DSH 环境未提供的 `AskUserQuestion`。 | 功能和技术栈规划在主会话优先使用 `ask_user_question`；不可用时在对话中提问。跳过或空回复不视为确认。 |
| 宿主的需求登记不等于项目批准；仅有文档确认不能证明续接时仍有实施授权。 | 保留规格书与计划的成对确认；在[计划模板](../plans/TEMPLATE.md)中单独记录实施授权、范围与依据。两个独立审查实例均须提交完整结论，方可验收。 |

部署时填写[路径表](../paths.md)中的实际路径，确认本地 Spawn 没有子 agent 路由或推理深度覆盖。更换 DSH profile 后重查。若无法遵守继承策略，应报告阻塞，不静默改用其他模型。本模板不替部署后的项目验证构建、测试或跨盘写入权限。

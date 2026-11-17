# 项目工作规则

## 开始任务

1. 读取 [项目介绍](README.md)、[技术栈与架构](ARCHITECTURE.md)、[路径表](docs/paths.md)，再读取目标目录适用规则。
2. 检查实际路径、访问权限、代码状态和已有改动。DSH 会自动加载用户全局 `AGENTS.md` 与项目链（项目根到当前工作目录）；以 harness 为工作目录时本文件自动生效，其他目录启动时显式读取本入口。工作目录、规则加载与权限分别确认，不假定三者一致，也不相互推断。
3. 根据当前用户目标明确范围、非目标和验收方式。信息可从文件查到时先查；关键需求不明确时再询问。
4. 按 [主 agent 手册](docs/runbooks/main-agent.md)执行、整合并验收。

## 文件存放与打包

严格遵守 [架构中的工作区域边界](ARCHITECTURE.md)：harness 仅保存管理文档、规则和技能说明；project/code 仅保存软件本体实现及必要配套文件；project/installpark 仅保存明确要求生成的安装包。所有非本体代码（含测试及辅助工具）、数据、原始日志、缓存和中间产物放 test。

目录结构以 [paths.md](docs/paths.md) 的实际目录树为索引。所有结构变更由子 agent 立即回报，主 agent 按其中的同步规则统一更新；开始或恢复任务及最终验收时核对实际目录。不得只写新增文件而遗漏目录索引。

技能说明位于 harness 的 `.agents/skills`。当 DSH 按会话工作目录计算出的项目根是 harness（最近的 `.git` 祖先是 harness；没有 `.git` 时会话工作目录就是 harness）时，DSH 自动扫描该目录并把技能列入技能目录，由主 agent 用 `skill` 工具加载正文；未出现在技能目录时，直接读取对应 `SKILL.md` 的绝对路径。技能文件属于管理说明，不是软件本体。

未明确要求打包，且用户确认的计划中也没有明确打包项时，不生成安装包。目录要求无法满足时报告冲突，不擅自例外；验收时检查新增文件位置。

## 工作原则

- 修改前明确假设与取舍；只实现当前任务需要的内容。
- 保持方案简单，不扩展推测性功能。
- 保留无关改动，仅修改分配范围。
- 使用实际检查和证据判断完成，区分通过、失败、未运行与不适用。

## 调度与验收

按需调用 [四类子 agent 角色](agents/README.md)：architect 负责方案，implementer 负责实现，infra 负责基础设施，reviewer 负责独立审查。凡需独立审查，固定由主 agent 用 `subagent` 工具创建 reviewer-spec 和 reviewer-quality 两个新上下文、以只读指令约束的实例，分别审查规格符合性和实现质量。两个调用放在同一条消息中并行；两者均使用 MODELS.md 的 reviewer 配置。不得用 `subagent_fork` 充当独立审查，因为它继承当前会话，不构成独立上下文。

用户提出新功能或功能增强时，主 agent 必须调用 [feature-plan](.agents/skills/feature-plan/SKILL.md)，用逐轮访谈同步整理 specs 中的规格书及 plans 中自动编号的实现清单。两份文档各自版本化，一起展示并取得用户对当前组合的确认后再实现。主 agent 或 architect 的内部认可、用户的局部回答不替代整体确认；已有未变更的有效批准直接续接。

批准且具备实施授权后调用 [subagent-driven-execution](.agents/skills/subagent-driven-execution/SKILL.md)：每个实现项创建新的执行者上下文，串行实现、两个 reviewer 并行审查和主 agent 验收，通过后再开始下一项；返工优先交回原执行者。全部项通过后新建两个 reviewer 做整体审查，不由逐项通过直接推断功能完成。只要求规划时不自动实现。

每次都由主 agent 确认入口和验收要求、选择角色、整合交付、处理返工并最终验收。纯问答和轻微文字调整可直接处理；代码、基础设施及影响后续决策的规则变更必须独立审查。

只有主 agent 更新共享任务记录；子 agent 不嵌套创建 agent。不并发写入同一文件。子 agent 返回成功或 reviewer 建议通过，不自动代表整个任务完成。DSH 的子 agent 完成通知会自动送达；优先结束回合等待通知，需要主动等待时用 `wait_agent` 并设置足够超时（`timedOut` 只表示暂无新输入，不是失败），不轮询 `list_agents`。

两份审查报告均建议通过并覆盖同一最终版本，且必要证据齐全，主 agent 才能验收；冲突按证据裁定，不用一份通过抵消另一份问题。同一子 agent 可用 `send_message` 继续追问或返工；原实例不可恢复或 MODELS.md 配置已变化时，按最新配置新建并交接。容量不足时保留两个独立实例顺序审查并说明实际未并行；缺少任一实例能力则验收受阻，不合并为一个 reviewer。详细分工与返工规则见 [reviewer 协议](agents/reviewer/AGENT.md)。

缺少关键需求、必要权限或强制独立审查能力时，记录具体阻塞与恢复条件，继续可独立完成的工作，不静默跳过验收。DSH 常见的具体阻塞包括：模型路由未授权、`ACTIVATION_LIMIT_REACHED`、子 agent 权限不足、文件沙盒拒绝写入、技能目录不可见。验证通过不自动授权提交、推送、合并、发布、修改 profile 或安装插件等操作。

## 模型规则

模型路由、推理深度及禁用策略统一读取 [MODELS.md](agents/MODELS.md)，不从角色说明或旧聊天取固定值。每次创建前重读对应角色配置，并用 `list_subagent_models` 核对路由可用，显式传入 provider、model、reasoning_effort；无法满足时不创建并报告具体限制。

## DSH 运行约束

- 子 agent 一律用 `subagent`（新上下文）创建，通过 cwd 指定工作目录；其提示必须自包含绝对路径、基线、范围、验收与技能路径，因为子 agent 看不到主会话聊天记录。`subagent_fork` 仅用于确需继承本会话的续接，不用于独立实现或审查。
- 子 agent 的权限范围在创建时固定，不能在子会话内提升；需要更宽权限时由主 agent 在当前会话处理，或请用户批准。
- DSH 默认 `maxDepth=1`、`maxActiveSubagents=8`：子 agent 不派生下一层 agent，容量不足时先收集已完成子 agent 再启动新的，不减少独立审查实例。
- 子 agent 的 `running`／`inactive` 只表示活动状态，不代表任务完成、成功或失败；以返回报告和实际文件为准。
- DSH 原生 goal、schedule、team task、plan mode 是可选便利能力，不替代本规范的计划文件、批准组合与验收记录；定时任务只在用户明确要求时创建。
- 修改 profile、安装或启用插件/扩展包、修改 agent preset 会影响该 profile 的所有会话，必须由用户明确要求；只读调查不构成变更授权。

## 按需使用的资料

- [角色协议](agents/README.md)、[分派模板](agents/TASK_TEMPLATE.md)。
- [需求模板](docs/specs/TEMPLATE.md)、[任务记录模板](docs/plans/TEMPLATE.md)。

reviewer 发现缺陷或复验修复时必须调用 [bug-detect](.agents/skills/bug-detect/SKILL.md)。[项目错误知识库](docs/bugs.md)按根因去重，reviewer 提议、主 agent 统一写入；同类复发更新原记录，修复经验证与独立复核后才关闭。任务记录仅引用 BUG ID，不重复抄写完整错误条目。

任务记录在实际执行项目任务时生成，不预置历史任务。其他技能按当前需求创建或安装。新会话启动基线的项目链只覆盖项目根到工作目录；用户全局链与用户、自定义及 bundled 技能根另行加载。harness 在项目链之外时，DSH 在触达相应文件后按需注入，但仍应在任务开头显式读取本入口，不假定规则自动跨目录继承。

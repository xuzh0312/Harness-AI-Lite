# 子 Agent 模型统一配置

本文件是四类子 agent 角色的模型路由、推理深度及禁用策略的唯一配置来源。其他说明和模板引用本文件，不重复保存固定值。修改需要遵守项目授权；本文件不改变主 agent 自身的模型。

## 角色配置

| 角色 | provider | model | reasoning_effort |
| --- | --- | --- | --- |
| architect | deepseek-account | deepseek-flash | high |
| implementer | deepseek-account | deepseek-flash | high |
| infra | deepseek-account | deepseek-flash | high |
| reviewer | deepseek-account | deepseek-flash | high |

reviewer-spec 与 reviewer-quality 是 reviewer 的两个审查实例，均读取上方 reviewer 行，不另设模型配置；每个实例实际创建参数分别记录。

DSH 通过 `subagent` 工具的 `provider`、`model`、`reasoning_effort` 三个参数选择子 agent 模型，因此本表同时登记路由与推理深度：

- 显式模型选择依赖 DSH preset 启用 `subagent` 的模型发现与路由参数（Web／Desktop 默认启用；headless、SDK、ACP 等可能未启用）。字段不可用或请求被拒时按阻塞报告，不静默省略 reasoning_effort、换模型或继承默认值。
- 当前值取自本机 profile 的 `deepseek-account/deepseek-flash` 路由；该路由可用推理深度为 `off`、`low`、`high`、`max`，默认 `high`。
- 更换 profile 或路由后，先用 `list_subagent_models` 查询实际授权的 provider、model 与可用取值，再按用户授权更新本表；不得填写不支持的取值。
- 不同角色可以选用不同路由或深度；没有新的依据时保持上表默认值。`max` 只用于确需质量优先的审查，`off` 只用于无需推理的机械任务。

## 创建与记录规则

- 每次创建前，主 agent 重新读取本文件对应角色，并用 `list_subagent_models` 核对路由可用，显式传入 `provider`、`model`、`reasoning_effort`；不依赖省略参数时的继承默认值。
- 只使用本表登记且当前 profile 已授权的路由。未登记路由、猜测的模型 ID、已弃用别名均不得使用；用户明确禁用的路由登记在下方“禁用路由”。
- 路由未授权、取值不支持、工具拒绝创建（如 `ACTIVATION_LIMIT_REACHED`）或配置缺失时，不创建该子 agent，报告具体限制；不静默换模型、降级、忽略推理设置或减少必需的独立审查实例。容量不足时先收集或等待已有子 agent 结算再重试。
- 子任务提示必须带本次实际创建参数，并要求最终回复（含受阻、失败）最后一行重复：`provider／model：<provider/model>；推理深度：<实际 reasoning_effort>`。
- DSH 会为本地子 agent 记录创建时的 provider、model 和 reasoning_effort，冷恢复时沿用；主 agent 仍以本次分派参数和子 agent 回复页脚作为当次记录，不把描述符当作可编辑配置来源。
- 无 DSH 差异报告时，记录实际传入的创建参数，不声称核实了未暴露的运行参数。若 DSH 明确报告不同设置，按实际报告记录并说明差异；违反禁用策略时停止对应子任务并报告。
- 修改本文件后，已存在的子 agent 不会自动切换；需要切换时按新配置新建并交接，或在原实例空闲时发送新指令并要求其说明仍沿用旧配置。

## 禁用路由

当前无登记禁用路由。用户明确禁用某路由时在此列出 provider/model 或别名，并在对应角色配置中替换为已授权路由；与禁用策略冲突时不创建并报告。

## 切换配置

以后仅修改上方角色表和必要策略，不修改角色职责、任务模板或历史报告。每次新建子 agent 使用当时读取的配置；已有会话不会因修改此文件自动切换模型，需要切换时由主 agent 明确重新创建并交接。

历史任务中的模型字段记录当时实际设置，不随当前配置改写。主 agent 在分派中提供本文件绝对路径及本次采用的参数，避免子 agent 从旧聊天猜测。

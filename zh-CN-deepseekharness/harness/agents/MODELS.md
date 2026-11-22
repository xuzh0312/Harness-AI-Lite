# 子 Agent 模型继承

UIdesign、implementer、reviewer-spec 和 reviewer-quality 均继承分派时主 agent 的有效 provider、模型和推理深度，不为任何角色单独覆盖设置。本策略不改变主 agent 自身的设置。

## 分派

- 使用本地 DSH `subagent`（Spawn），**同时省略** `provider`、`model` 和 `reasoning_effort` 三个字段，不要传空值。仅传 provider/model、不传推理深度，并不等价：DSH 会解析该模型的默认推理深度，而不是保留继承的深度。
- 在未覆盖子 agent 路由或推理深度的标准本地 Spawn 配置下，省略字段会沿用父 agent 的设置。自定义 profile 可设置优先生效的子 agent 默认值。如果工具或 profile 无法遵循继承策略，或已知覆盖项会采用不同设置，应报告阻塞；不要另选模型或修改 profile。
- 所有子 agent 仍禁用 `gpt-6.2-astra`，包括其别名和变体。若有效继承路由命中禁用策略，不得分派，报告冲突。若运行器报告非预期或被禁用的路由，或报告不同的推理深度，不得把受影响的结果视为合规；停止使用该实例并报告不一致。

## 记录与恢复

- 创建方式记录为 `inherited`。若运行器提供 provider/model 或推理深度，则记录所报告的值及其来源；未公开的字段填写 `inherited (not independently verified)`，不得猜测。交接和最终回复页脚均遵守同一规则：`模型选择：<运行器报告的 provider/model 或 inherited (not independently verified)>；推理深度：<运行器报告的推理深度或 inherited (not independently verified)>`。
- 已有子 agent 可能保留创建时的设置。若主 agent 的有效模型或推理深度已变更，或无法确认已有子 agent 是按当前继承策略创建的，应创建新实例并交接已核实的上下文，不要假定续接会应用新设置。历史任务记录保持不变。

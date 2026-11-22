# UIdesign

任务需要界面设计时，主 agent 可以创建此角色。UIdesign 将设计问题交回主 agent，暂停依赖这些答案的设计决定。主 agent 在 DSH 父会话中询问用户（有 `ask_user_question` 时使用它），并尽可能使用 `send_message` 把用户原答复转交同一具名实例。不要让无人值守的子 agent 等待用户输入。原实例无法恢复时，主 agent 按当前模型配置创建替代实例，交接用户原答复、已展示的稿件和未决问题。新实例从未决事项接续，只追问仍影响设计的取舍。

读取 [UIUX-design](../../.agents/skills/UIUX-design/README.md)，按当前委托协助梳理用户任务或细化已确定的界面。访谈可在对话中完成。主 agent 已指定 test 写入范围时，可在其中制作稿件或原型。向主 agent 交回用户的取舍、可打开的成果、适用的验收编号及尚待验证的状态，规格与计划由主 agent 统一维护。

采用[共享角色协议](../README.md)和[模型配置](../MODELS.md)。

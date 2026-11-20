根据需求创建或安装skills，一个skill一个单独的文件夹。

- [bug-detect](bug-detect/SKILL.md)：reviewer 发现缺陷或复验修复时使用，查询并去重项目错误知识库。
- [feature-plan](feature-plan/SKILL.md)：用户选择功能设计规划后，逐题访谈并整理规格书，确认需求覆盖后编写编号计划，用户一次确认当前组合。
- [subagent-driven-execution](subagent-driven-execution/SKILL.md)：已批准功能计划的逐项派工、独立审查、返工复验、进度恢复和整体验收。
- [tech-stack-plan](tech-stack-plan/SKILL.md)：技术栈尚未确定时，协助用户选择并记录技术栈与架构约束。
- [UI-design](UI-design/)：界面设计子技能目录；涉及交互或动效时读取 [interaction-motion-design](UI-design/interaction-motion-design/SKILL.md)。

主 agent 按规则显式读取技能，并向对应角色提供必要技能路径。位置为 `harness/.agents/skills`（复数 .agents）。

每个技能使用独立目录。主 agent 从下列链接显式读取入口，再把本次任务需要的部分交给相应角色。

- [bug-detect](bug-detect/SKILL.md)：reviewer 发现缺陷或复验修复时使用，查询并去重项目错误知识库。
- [feature-plan](feature-plan/SKILL.md)：用户选择功能设计规划后，逐题访谈并整理规格书，确认需求覆盖后编写编号计划，用户一次确认当前组合。
- [subagent-driven-execution](subagent-driven-execution/SKILL.md)：已批准功能计划的逐项派工、独立审查、返工复验、进度恢复和整体验收。
- [tech-stack-plan](tech-stack-plan/SKILL.md)：技术栈尚未确定时，协助用户选择并记录技术栈与架构约束。
- [UIUX-design](UIUX-design/README.md) 从任务路径到关键页面、用户反馈和开发交接。入口按问题指向专项资料及精选素材。

这些是 Harness 内的任务说明。UIUX-design 使用 README.md 作为入口，部署副本后可按上述链接读取。

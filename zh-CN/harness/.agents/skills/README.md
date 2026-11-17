根据需求创建或安装skills，一个skill一个单独的文件夹。

- [bug-detect](bug-detect/SKILL.md)：reviewer 发现缺陷或复验修复时使用，查询并去重项目错误知识库。
- [feature-plan](feature-plan/SKILL.md)：新功能与功能增强先按决策依赖逐轮访谈，同步整理规格书与编号计划，用户一次确认当前组合。
- [subagent-driven-execution](subagent-driven-execution/SKILL.md)：已批准功能计划的逐项派工、独立审查、返工复验、进度恢复和整体验收。

主 agent 按规则显式读取技能，并向对应角色提供必要技能路径。位置为 `harness/.agents/skills`（复数 .agents）；无需另外安装 GrillMe 或 Superpowers，此目录不保证被运行器自动发现，也不安装为全局技能。

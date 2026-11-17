# 技能索引

根据需求创建或安装技能，一个技能一个单独的文件夹。

- [bug-detect](skills/bug-detect/SKILL.md)：reviewer 发现缺陷或复验修复时使用，查询并去重项目错误知识库。
- [feature-plan](skills/feature-plan/SKILL.md)：新功能与功能增强先按决策依赖逐轮访谈，同步整理规格书与编号计划，用户一次确认当前组合。
- [subagent-driven-execution](skills/subagent-driven-execution/SKILL.md)：已批准功能计划的逐项派工、独立审查、返工复验、进度恢复和整体验收。

DSH 从本地技能根发现技能：`<项目根>/.dsh/skills`、`<项目根>/.agents/skills`、自定义目录、`~/.dsh/skills`、`~/.agents/skills`；本目录下的 `skills/` 对应 harness 的 `.agents/skills`。技能查找以会话工作目录为准：项目根是最近的 `.git` 祖先，没有 `.git` 时取当前目录；因此只有当 DSH 按会话工作目录计算出的项目根是 harness（最近的 `.git` 祖先是 harness；没有 `.git` 时会话工作目录就是 harness）时才进入技能目录。若 harness 自身没有 `.git` 且位于更大的 Git 仓库内，按绝对路径读取对应 `SKILL.md`。

每个 `SKILL.md` 必须带 YAML frontmatter：`name` 为 kebab-case，`description` 必填，可选 `whenToUse`、`metadata` 等；正文按需加载，模型通过 `skill` 工具调用。不要把技能正文复制进任务记录。

技能未出现在当前技能目录时，主 agent 直接读取对应 `SKILL.md` 的绝对路径，并把路径传给子 agent；不依赖 GrillMe、Superpowers 或其他外部技能包，也不要求安装为全局技能。新增技能遵循同样的目录与 frontmatter 规则；本索引文件放在 `.agents/` 而不是 `.agents/skills/`，避免被 DSH 当作无 frontmatter 的扁平技能候选扫描。

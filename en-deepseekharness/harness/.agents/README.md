# Skill Index

Create or install skills as needed; one folder per skill.

- [bug-detect](skills/bug-detect/SKILL.md): used when a reviewer finds a defect or re-verifies a fix, to query and deduplicate the project bug knowledge base.
- [feature-plan](skills/feature-plan/SKILL.md): for new features and enhancements, conduct dependency-ordered interviews, maintain the specification and numbered plan, and obtain one user confirmation of the current pair.
- [subagent-driven-execution](skills/subagent-driven-execution/SKILL.md): item-by-item dispatch, independent review, rework/recheck, progress recovery, and overall acceptance for an approved feature plan.

DSH discovers skills from local skill roots: `<projectRoot>/.dsh/skills`, `<projectRoot>/.agents/skills`, custom directories, `~/.dsh/skills`, and `~/.agents/skills`; the `skills/` directory here is harness's `.agents/skills`. Skill lookup is relative to the session working directory: the project root is the nearest `.git` ancestor, or the current directory when no `.git` exists; therefore a skill enters the catalog only when the project root computed by DSH from the session working directory is harness (the nearest `.git` ancestor is harness, or the session working directory is harness when no `.git` exists). If harness has no `.git` of its own and sits inside a larger Git repository, read the corresponding `SKILL.md` by absolute path.

Every `SKILL.md` must start with YAML frontmatter: `name` in kebab-case, a required `description`, and optional `whenToUse`, `metadata`, etc. Bodies load on demand, and the model calls them through the `skill` tool. Do not copy skill bodies into task records.

When a skill is absent from the current catalog, the main agent reads the corresponding `SKILL.md` by absolute path and passes the path to the subagent; do not depend on GrillMe, Superpowers, or other external skill packages, and do not require global installation. New skills follow the same directory and frontmatter rules. This index lives under `.agents/` rather than `.agents/skills/` so DSH does not treat it as a flat skill candidate without frontmatter.

Create or install skills according to requirements, with a separate folder for each skill.

- [bug-detect](bug-detect/SKILL.md): Used when reviewers find defects or recheck fixes, to search and deduplicate the project error knowledge base.
- [feature-plan](feature-plan/SKILL.md): For new features and functional enhancements, interview in rounds according to decision dependencies, maintain the specification and numbered plan together, and obtain one user approval of the current pair.
- [subagent-driven-execution](subagent-driven-execution/SKILL.md): Item-by-item delegation, independent review, rework verification, progress recovery, and overall acceptance for approved feature plans.

The main agent explicitly reads skills according to the rules and provides necessary skill paths to relevant roles. The location is `harness/.agents/skills` (plural .agents). No separate GrillMe or Superpowers installation is needed. This directory does not guarantee automatic runtime discovery, and is not installed as global skills.

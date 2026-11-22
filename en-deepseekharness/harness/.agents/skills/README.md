Each skill has its own directory. The main agent explicitly reads its entry point below and passes the material needed for the task to the appropriate role.

- [bug-detect](bug-detect/SKILL.md): Used when reviewers find defects or recheck fixes, to search and deduplicate the project error knowledge base.
- [feature-plan](feature-plan/SKILL.md): When the user chooses feature planning, interview them one question at a time, draft the specification, and check requirements coverage before writing the numbered plan. The user approves the current pair together.
- [subagent-driven-execution](subagent-driven-execution/SKILL.md): Item-by-item delegation, independent review, rework verification, progress recovery, and overall acceptance for approved feature plans.
- [tech-stack-plan](tech-stack-plan/SKILL.md): Helps the user select and document the technology stack and architecture constraints when the stack is undecided.
- [UIUX-design](UIUX-design/README.md): Covers user task paths, key screens, user feedback, and developer handoff. The entry point links to focused references and selected materials for the decision at hand.

These are project-local Markdown procedures, not a requirement to register native DSH skills. Read the linked file with DSH `read` and follow it, even if its name is absent from the session skill catalog. When project instructions say to invoke one of these skills, they mean to read and follow its entry file. Use DSH `skill` for applicable skills listed in the session catalog. UIUX-design uses README.md as its entry point.

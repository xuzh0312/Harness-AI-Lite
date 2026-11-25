These skills live in `harness/skills/`, alongside the role instructions in `harness/agents/`. Harness loads them explicitly by path and does not rely on runner discovery. Each role reads only the entries needed for the current step.

- [bug-detect](bug-detect/SKILL.md): Reviewers use this when finding defects or rechecking fixes to search and deduplicate the project bug knowledge base.
- [feature-plan](feature-plan/SKILL.md): The Task Planner uses this in steps 1, 2, 4, and 5 for interviews and research, feature and stack selection, proposal review, or breaking down the implementation plan.
- [subagent-driven-execution](subagent-driven-execution/SKILL.md): Dispatch, review, and accept work item by item after plan approval and implementation authorization.
- [tech-stack-plan](tech-stack-plan/SKILL.md): Help the user choose and record the stack and architecture constraints when the stack is undecided.
- [UIUX-design](UIUX-design/SKILL.md): The Interaction Planner uses this as commissioned, from task flows through key screens, feedback, and development handoff. The entry points to references and selected assets for each design question.

Whether starting in Harness or the independent code repository, use the Harness entry point to read skills explicitly. Other skills must meet their own prerequisites even if the runner discovers them. Read `UIUX-design/SKILL.md` directly.

# Taking over from any session

After filling in the project overview and hot paths, use the following prompt in a new session with the actual Harness path. The user selects the conversation tool. The six steps may run in different sessions; do not assume that tools share chat history or load these rules automatically.

```text
First read AGENTS.md and docs/paths.md (hot paths) under <actual Harness path>.
Current goal: <initial project release or an increment to an existing feature; include the ID if known>.
Do only this step: <interview / features and stack / UI/UX / project proposal / implementation Plan / authorized implementation items>.
Existing material or corrections: <files or conclusions are enough; no need to repeat earlier conversations>.
Permitted writes and checks: <list separately; specify read-only work, no tests, mockups only, or other limits here>.
Use this goal and the existing files to determine the current step. Ask me first if they conflict. Tell me which file to open next.
```

| Where to resume | Prompt to use under "Do only this step" |
| --- | --- |
| 1 Start a project or add a feature | As the task planner, interview me about requirements and record them as we talk. Then decide with me whether to research open-source projects. |
| 2 Confirm the stack in a new session | Use the interview and reference records for this feature to decide its specific functionality and technology stack with me. Record major stack choices as final only after I confirm them. |
| 3 Discuss the interface | As the interaction planner, use the previous three records to agree on the UI/UX with me. Assign an implementer when I need a preview. |
| 4 Consolidate or review the proposal | Combine the confirmed features, stack, and UI/UX into the project proposal and check feasibility. If I ask only for a review, leave the draft unchanged. |
| 5 Break down the work | Break this version of the project proposal into an implementation Plan and define how each item will be reviewed. Do not start implementation. |
| 6 Start execution | As the execution coordinator, verify the proposal and Plan versions I approved. I authorize implementation of <checklist items>. Use the original Plan for dispatch, independent review by both reviewers, and acceptance. |

To fix a defect under an existing contract, say: "As the execution coordinator, resume this fix under the existing contract and prior TASK. Keep the feature and acceptance scope unchanged."

For work across directories, check the [path register](../paths.md) for the locations, permissions, and applicable rules of harness, project, the actual code root, and test. Do not assume that the directories are adjacent. When needed, include existing evidence of the subagent agreement, active writers, evidence versions, and any delivery authorization. Example text does not grant authorization. If the runner cannot create subagents under the agreement or complete required independent review, report the specific blocker.

# UIUX-design: User Experience and Interface Design

The Interaction Planner reads this entry in step 3 or when the user commissions standalone design work. Read the interview, references, and features and stack report for the same feature, and carry forward confirmed decisions. Interview the user directly, one question at a time, without asking them to repeat answers.

## Design With the User

1. **Start with a real experience.** Ask how the user last completed the task. Follow up on how they entered, what they needed to see first, and how they judged success. Focus each question on one point, then ask how they recover at the step most likely to fail.
2. **Clarify visual and feedback preferences.** Ask what matters most on the first screen and which actions need feedback. If the direction is open and motion matters, ask the user to compare strong, standard, and light motion. Hear their reason before choosing references. Keep essential feedback and respect reduced-motion preferences at every intensity. Discuss color and hierarchy separately when they affect the direction; reuse confirmed or delegated decisions.
3. **Compare directions.** Draw on the [asset index](assets/index.md) or develop an original approach based on user tasks, content, platform, and prior choices. Use the same content, state, and viewport to explain usually two or three materially different options, their tradeoffs, and why one may fit best. Wait for the user to select, combine, suggest a new direction, or delegate the choice before refining it. When carrying forward an accepted design, discuss only affected areas.
4. **Review a draft before expanding it.** Compare in writing when that is enough. When mockups are authorized and the write scope in test is assigned, the Interaction Planner dispatches an [implementer](../../agents/implementer/AGENT.md) to produce a representative screen. Ask separately what the user would keep or change, then wait for feedback before expanding. Build the smallest prototype needed when judging drag, undo, or similar behavior requires hands-on use and the assignment covers it.
5. **Hand off.** Walk through the key path and one failure recovery. Ask for evidence or exceptions when choices conflict or rely only on assumptions. Before concluding, separately ask what the user wants to add or explore and wait for an answer. Hand over the chosen direction, key states, and open checks. Use the same process for standalone design. The Interaction Planner records user tradeoffs and scenarios requiring hands-on checks in the [UI/UX proposal](../../docs/specs/README.md). Confirm new behavior or changed acceptance through planning. Store drafts, prototypes, and walkthrough evidence in test under the [path table](../../docs/paths.md). When a selected draft will support approval, pin and verify a recoverable version under `test/README.md` before handing it to the Task Planner to link to acceptance criteria. Implementation requires its own authorization.

## References by Design Decision

| Decision at hand | Reference |
| --- | --- |
| What users need to accomplish, how to organize entry points, and how to observe success | [Tasks, Navigation, and Walkthroughs](references/tasks-navigation.md) |
| How the screen can reflect the product and how references can support an original direction | [Creative Direction and Reference Materials](references/creative-direction.md) |
| How to set information hierarchy and handle Chinese text, numbers, color, and narrow screens | [Typography, Color, and Layout](references/visual-hierarchy.md) |
| When to show form feedback, what empty states should say, and where focus should go after an error | [Copy, States, and Accessibility](references/copy-and-states.md) |
| When motion helps and how gestures track input, handle interruptions, and respect reduced-motion preferences | [Interaction and Motion](references/interaction-motion.md) |

When citing an asset, explain what principle you used and what changed for the current task. Do not copy entire screens or complete styles.

# UIUX-design · User Experience and Interface Design

The Harness explicitly reads this design entry point. Identify the task's current stage and open the reference below for the decision at hand. For existing projects, follow the design the user has accepted. For a request about one screen, component, or review issue, start with the issue itself.

## Design With the User

1. **Walk through the task during planning.** Use the same interview as [feature-plan](../feature-plan/SKILL.md). State in one sentence who needs to do what, in what situation, and what counts as completion. Walk through the main path and then the step most likely to fail. Ask the user to decide which gaps to address. The main agent records those decisions in the same specification and acceptance scenarios. Skip this step for backend-only tasks.
2. **Review the first draft after approval.** When the user has commissioned interface design, [UIdesign](../../../agents/UIdesign/AGENT.md) prepares one representative screen the user can view, using real content and a typical window size. Explain one design decision grounded in the product, ask what the user would keep or adjust, and wait for their actual answer before expanding the design. If the user wants a comparison or questions remain about the draft, show different layouts or ways of interacting side by side with the same content, state, and viewport.
3. **Hand off the selected direction.** By default, deliver mockups of the key screens and implementation notes. Cover entry points, primary actions, layout and key states, recovery from failure, and verification results. Build a minimal interactive prototype when a static mockup cannot convey interactions such as dragging or undo. Label the scope when the output is a wireframe or has yet to be tested. Send added behavior or changed acceptance requirements to the main agent for revision and confirmation under the planning rules.
4. **Follow the authorization for design and implementation.** Deliver standalone design work within its commissioned scope. Follow the Harness workflow for planning approval and authorization to develop. Store project mockups, prototypes, and walkthrough evidence in test according to the [path index](../../../docs/paths.md). The main agent references the selected mockup and corresponding acceptance IDs in existing records.

## References by Design Decision

| Decision at hand | Reference |
| --- | --- |
| What the user needs to accomplish, how to organize entry points, and how to observe whether the user succeeds | [Tasks, Navigation, and Walkthroughs](references/tasks-navigation.md) |
| How the screen can reflect this product and how to draw on references to develop an original direction | [Creative Direction and Reference Materials](references/creative-direction.md) |
| How to set information hierarchy and handle Chinese text, numbers, color, and narrow screens | [Typography, Color, and Layout](references/visual-hierarchy.md) |
| When to show form feedback, what empty states should say, and where focus should return after an error | [Copy, States, and Accessibility](references/copy-and-states.md) |
| Whether an action needs motion and how gestures should track input, handle interruptions, and respect reduced-motion preferences | [Interaction and Motion](references/interaction-motion.md) |

Use the [asset index](assets/index.md) to study how a reference solves a problem, then apply that principle using the current project's content. Avoid copying entire screens, component combinations, complete palettes, or animations.

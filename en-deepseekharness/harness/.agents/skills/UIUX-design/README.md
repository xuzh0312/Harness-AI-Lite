# UIUX-design · User Experience and Interface Design

The Harness explicitly reads this design entry point. Identify the task's current stage and open the reference below for the decision at hand. For existing projects, follow the design the user has accepted. For a request about one screen, component, or review issue, start with the issue itself.

## Design With the User

1. **Walk through the task during planning.** Use the same interview as [feature-plan](../feature-plan/SKILL.md). State in one sentence who needs to do what, in what situation, and what counts as completion. Walk through the main path and then the step most likely to fail. Ask the user to decide which gaps to address. The main agent records those decisions in the same specification and acceptance scenarios. Skip this step for backend-only tasks.
2. **Review the first draft after approval.** When the user has commissioned interface design but no concrete UI design exists, follow “Choose references before drafting” below before [UIdesign](../../../agents/UIdesign/AGENT.md) prepares a representative screen using real content and a typical window size. Keep the existing direction if the user has already accepted a design. Explain one design decision grounded in the product, ask what the user would keep or adjust, and wait for their actual answer before expanding the design. If the user wants a comparison or questions remain about the draft, show different layouts or ways of interacting side by side with the same content, state, and viewport.
3. **Hand off the selected direction.** By default, deliver mockups of the key screens and implementation notes. Cover entry points, primary actions, layout and key states, recovery from failure, and verification results. Build a minimal interactive prototype when a static mockup cannot convey interactions such as dragging or undo. Label the scope when the output is a wireframe or has yet to be tested. Send added behavior or changed acceptance requirements to the main agent for revision and confirmation under the planning rules.
4. **Follow the authorization for design and implementation.** Deliver standalone design work within its commissioned scope. Follow the Harness workflow for planning approval and authorization to develop. Store project mockups, prototypes, and walkthrough evidence in test according to the [path index](../../../docs/paths.md). The main agent references the selected mockup and corresponding acceptance IDs in existing records.

## Choose references before drafting

If the project needs a UI but has no concrete design yet, identify the design problem from the core user task and target platform, then follow these steps:

1. **Ask about motion intensity before choosing references.** Let the user choose strong, standard, or light motion, with no default. Strong motion allows more pronounced spatial transitions, layering, or gesture feedback. Standard motion focuses on state feedback and everyday transitions. Light motion keeps essential feedback and minimizes movement and decorative animation. All three must retain essential feedback and account for system reduced-motion preferences. Wait for the answer before selecting references.
2. **Shortlist directions from the bundled materials.** Open the [asset index](assets/index.md) and use the task, platform, and selected motion intensity to find two or three distinct directions. If fewer than two fit, say so rather than padding the list. Explain the reference, why each direction fits, and its main trade-off. When previews are useful, compare the same task, content, state, and viewport.
3. **Let the user choose before drafting.** Wait for the user to select a direction before refining it. Do not treat a sample as the final design or the user's choice as implementation authorization.

## References by Design Decision

| Decision at hand | Reference |
| --- | --- |
| What the user needs to accomplish, how to organize entry points, and how to observe whether the user succeeds | [Tasks, Navigation, and Walkthroughs](references/tasks-navigation.md) |
| How the screen can reflect this product and how to draw on references to develop an original direction | [Creative Direction and Reference Materials](references/creative-direction.md) |
| How to set information hierarchy and handle Chinese text, numbers, color, and narrow screens | [Typography, Color, and Layout](references/visual-hierarchy.md) |
| When to show form feedback, what empty states should say, and where focus should return after an error | [Copy, States, and Accessibility](references/copy-and-states.md) |
| Whether an action needs motion and how gestures should track input, handle interruptions, and respect reduced-motion preferences | [Interaction and Motion](references/interaction-motion.md) |

Consult the [asset index](assets/index.md) on demand for concrete layout, navigation, motion, or material decisions. Apply the principle to the current project’s content rather than copying the sample. Avoid copying entire screens, component combinations, complete palettes, or animations.

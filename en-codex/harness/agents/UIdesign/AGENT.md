# UIdesign

When a task needs interface design, the main agent may create this role. UIdesign asks the user design questions and waits for answers before continuing. If the runner supports direct conversation, UIdesign asks the user directly. Otherwise, the main agent relays the questions and sends the user's original answers back to the same instance whenever possible. If the original instance cannot resume, the main agent creates a replacement using the current model configuration and hands over the user's original answers, drafts already shown, and open questions. The new instance picks up the open decisions and asks only about choices that still affect the design.

Read [UIUX-design](../../.agents/skills/UIUX-design/README.md) and help clarify user tasks or refine an agreed interface within the assignment. Interviews can take place in conversation. Create drafts or prototypes in test when the main agent has assigned a writable location there. Hand the user's decisions, accessible deliverables, applicable acceptance IDs, and states still to verify back to the main agent. The main agent maintains the specifications and plans.

Follow the [shared role protocol](../README.md) and [model configuration](../MODELS.md).

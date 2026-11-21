---
name: tech-stack-plan
description: Use when feature-plan finds that the project’s technology stack is undecided and the user chooses to work through the selection together. Ask one question at a time to guide the initial selection, then record the project requirements in README.md and the confirmed stack and architecture constraints in ARCHITECTURE.md.
---

# Tech Stack Plan for Technology and Architecture Constraints

The main agent clarifies technology needs with the user in a multi-round interview, updating the [project introduction](../../../README.md) and the [technology stack and architecture document](../../../ARCHITECTURE.md).

## Applicability and Permissions

Use this skill only when feature-plan finds that the stack is missing and the user confirms it is undecided and chooses to work through the selection together.

The main agent explicitly reads this skill from the Harness without relying on global installation or automatic discovery.

Update confirmed project details and technology choices in these two documents only. Preserve the three-area and packaging rules.

| File allowed to change | Location | Changes |
| --- | --- | --- |
| Project introduction | ../../../README.md | Project-specific details |
| Technology stack and architecture document | ../../../ARCHITECTURE.md | Technology stack |

## Establish Facts Through a Socratic Interview

The main agent uses Socratic questions and follow-ups to clarify the user's needs.

### Interview Steps

#### 1. Clarify Requirements

| Area | Example questions | What the answer affects |
| --- | --- | --- |
| **1. Users and core workflow** | “Choose a typical user. Walk through what they do from opening the software to completing one task.” “Which workflow must work end to end in the first version?” | The main interaction model and the responsibilities of the interface, computation, and storage. |
| **2. Runtime environment and deployment** | “Which device will run the software, and who installs it?” “Which step must still work offline?” “Can you obtain administrator privileges?” | Whether a web, desktop, or mobile application is feasible, and whether it needs local execution or a separate deployment. |
| **3. Data and collaboration** | “Where does the data come from, and where must it go?” “Will two people edit the same record at the same time?” “Which data must move with the user to a new computer?” | Whether files, a local database, or a server database fit, and whether synchronization and conflict handling are needed. |
| **4. Scale and performance** | “Think of the heaviest task. How much data does it process at once?” “How long can users wait? What do they need to keep doing while they wait?” | Whether background tasks, streaming, parallel computation, or hardware acceleration are needed, and which acceptance conditions can be measured. |
| **5. External dependencies and compatibility** | “Which devices, file formats, interfaces, or systems must it work with?” “Do you have a real sample or a working SDK example?” | Dependencies that directly constrain the operating system, language, runtime, or library version. |
| **6. Security, reliability, and recovery** | “Which data can leave the device? Who can view or edit it?” “If power fails during a save, how much work can be lost? Who performs the recovery?” | Permissions, storage boundaries, transactions, backups, and recovery requirements. |
| **7. Delivery and long-term maintenance** | “Who needs the first version, and by when?” “Who will fix bugs and release updates in six months? Which technologies do they know?” “Under a tight deadline, what can wait?” | Tradeoffs among learning cost, packaging and updates, operational effort, and delivery speed. |

Use follow-ups like these.

- Clarify the meaning of key terms. “By ‘local,’ do you mainly mean studying offline, or does the school require the question bank and answer history to stay on this computer?” Both can apply, with different restrictions on where data can live.
- Test the answer with a concrete scenario. If the user mainly needs offline access, ask what they must be able to do if they lose internet access the day before an exam. The answer distinguishes offline question answering from offline importing, searching, and reviewing incorrect answers.
- Look for boundaries with a counterexample. If the user says they will be the only person using it, ask whether they need to resume in their dorm after starting on a classroom computer. One user may still need to move data between devices.
- Ask the user to prioritize. If they want to work across devices, ask whether version one should prioritize automatic synchronization or letting them export, carry, and restore records, and why. The answer helps determine whether a server is worth introducing in the first release.
- Restate the conclusion for the user to check. “My understanding is that version one must support importing, answering, and reviewing incorrect answers offline on Windows, with manual migration when changing computers. What situation would still keep you from using it?”

Use the answers to record the project's specific details in the [project introduction](../../../README.md).

#### 2. Plan the Technology Stack

Use the earlier answers to identify the components the project needs. Recommend a technology for each component and confirm each choice with the user.

Once the user confirms the choices, record the stack in the [technology stack and architecture document](../../../ARCHITECTURE.md). Use it as the basis for future feature planning and implementation. Changes require authorization.

For each key technology, record what was selected, which constraint led to the choice, and what remains to be verified. For example, if the user confirms single-device offline use, no concurrent writes, and acceptance of manual migration, record those conditions alongside the SQLite choice.

### Follow-Up Format

Ask one question at a time and adjust follow-ups to the user's answers.

Prefer the runtime's user-question tool, such as AskUserQuestion. Ask one concrete question at a time. Keep scenario questions open-ended. When exploring technology tradeoffs, offer two to four options where helpful and allow free-form answers. Adapt to the tool's supported option count and interaction format. If no such tool is available, use the same format in conversation. Wait for the user to answer before continuing.

After each answer, briefly restate what was established. Check for contradictions, concerns, unverified assumptions, blockers, avoidance, or risks. Follow up first on details that affect requirements and ask dependent questions once their prerequisites are clear. Skip questions the user has already answered. Use established project conventions for routine implementation details and explain them in the plan. Keep the interview focused on tradeoffs affecting scope, user behavior, constraints, or acceptance. For decisions the user delegates, propose defaults, identify their source in the documents, and present them for review.

A full interview about one workflow may take 10–15 questions. A straightforward workflow may need only 3–5. With remaining blind spots it may take up to 20. If the user explicitly ends the interview, stop asking and retain the open questions.

### Completion

After completing the interview and updating the documents, ask the user to check whether the [project introduction](../../../README.md) and [technology stack and architecture document](../../../ARCHITECTURE.md) match their expectations. Finish the skill when the user confirms. If they identify gaps, continue the interview on those points.

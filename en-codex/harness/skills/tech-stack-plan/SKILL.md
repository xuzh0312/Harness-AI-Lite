---
name: tech-stack-plan
description: Use to choose an undecided technology stack with the user or review and apply a confirmed stack to the project architecture.
---

# Tech Stack Plan: Technology and Architecture Constraints

Start by interviewing the user about real scenarios when they want to choose an undecided stack together. If the selection is already clear, including when the user specifies a replacement, start at [Selection and Handoff](#selection-and-handoff). Reuse verified facts and existing answers.

## Establish Constraints From Real Scenarios

Check existing material first, then ask questions that could change the choice. Use this table to identify gaps rather than as a questionnaire. Ask about real experiences, test interpretations with counterexamples, or suggest an option grounded in evidence. Use [Starting a Task](../../AGENTS.md#starting-a-task) to ask one question at a time about scenarios, constraints, and reasons. Compare options and explain recommendations when there is a real tradeoff. Reuse answers already given.

| Topic | Examples | What the answer affects |
| --- | --- | --- |
| **1. Users and core workflows** | Ask a typical user to walk through one task from opening the software to completion. Which workflow must work in the first release? | The main interaction and which work belongs in the interface, computation, and storage. |
| **2. Runtime and deployment** | Which device will run the software? Who installs it? What must work offline? Are administrator rights available? | Whether web, desktop, or mobile is viable, and whether local operation or separate deployment is required. |
| **3. Data and collaboration** | Where does data come from and where must it go? Can two people edit the same record? What data must survive changing computers? | Whether files or local or server databases fit, and whether sync and conflict handling are needed. |
| **4. Scale and performance** | How much data does a worst-case task handle? How long can users wait? What must they keep doing while waiting? | Background work, streaming, parallel computation, hardware acceleration, and measurable acceptance criteria. |
| **5. Dependencies and compatibility** | Which devices, formats, interfaces, or existing systems must it support? Is there a real sample or working SDK example? | Constraints on the operating system, language, runtime, and library versions. |
| **6. Security, reliability, and recovery** | What data can leave the device, and who may read or edit it? How much work may be lost if power fails during a save? Who recovers it? | Permissions, storage boundaries, transactions, backups, and recovery. |
| **7. Delivery and maintenance** | Who needs the first release, and by when? Who fixes bugs and ships updates in six months? What technologies do they know? What can wait? | Learning costs, packaging and updates, operations, and delivery speed. |

For example, a single user might still need to resume on another computer. Ask whether manual migration is acceptable before deciding whether a sync service is needed.

## Selection and Handoff

Explain the choice, the constraint that drove it, and what still needs verification. Compare substantively different options. For delegated details, recommend an option and give reasons. Ask the user to confirm key choices, reusing existing confirmation. If the user ends early, list open decisions and do not settle them on the user's behalf.

In step 2, the Task Planner records confirmed features, the stack, reasons for alternatives, and user confirmation in the [features and stack report](../../docs/specs/README.md), or hands off in the reply for read-only work. For an existing project, check the current stack, affected modules, and compatibility; record when it can stay unchanged. **Confirming the report does not change the effective architecture.** Design and planning can use the confirmed candidate, but installing dependencies or implementing early is not authorized. Step 2 does not need a plan merely to approve a candidate stack.

For first activation or a replacement, make activation a prerequisite to the first dependent implementation item in step 6. If the user explicitly requests earlier activation, hand it to the Execution Coordinator as separate work. After confirming selection and write authorization, save the complete candidate diff for [ARCHITECTURE.md](../../ARCHITECTURE.md), including activation evidence, and record the prior effective and candidate versions in the existing PLAN or a standalone TASK. The old stack remains effective during review, or stays undecided on first activation. The specification reviewer checks user confirmation; the quality reviewer checks feasibility and compatibility. Once the same candidate meets the [dual-review acceptance conditions](../../agents/reviewer/AGENT.md#findings-and-conclusions), verify the baseline, apply the reviewed diff unchanged, check the saved result, and record activation. Only then may dependent implementation start. Resubmit if the candidate or baseline changes substantively.

If writing is interrupted, the incoming writer checks the original version, actual file, candidate, both reports, and authorization. Complete verification only if they fully match. If sent back, cancelled, or verification fails, record the last effective stack and actual diff. Do not mark the candidate active or roll back user changes on your own.

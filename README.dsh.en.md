# Harness-AI-Lite · DeepSeek Harness

[DeepSeek Harness 中文](https://github.com/xuzh0312/Harness-AI-Lite/blob/main/README.dsh.zh-CN.md) · [Codex English](https://github.com/xuzh0312/Harness-AI-Lite/blob/main/README.md) · [Codex 中文](https://github.com/xuzh0312/Harness-AI-Lite/blob/main/README.codex.zh-CN.md)

Harness-AI-Lite is a reusable DeepSeek Harness (DSH) project template. It separates project management, software, and development evidence into three independent work areas that may be on different disks. Version 2.0.0 shares the Codex edition's core workflow but uses DSH's own tools for dispatch, questions, and resumption.

## Download

| Language | Template directory | ZIP |
| --- | --- | --- |
| English | [en-deepseekharness](en-deepseekharness/) | [Download English 2.0.0 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-en-deepseekharness-2.0.0.zip) |
| 简体中文 | [zh-CN-deepseekharness](https://github.com/xuzh0312/Harness-AI-Lite/tree/main/zh-CN-deepseekharness) | [下载中文版 2.0.0 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-zh-CN-deepseekharness-2.0.0.zip) |

Each ZIP contains the selected template, a same-language guide, and the MIT license. For the original 1.0.0 packages, see [Version history](#version-history).

## Core design

| Convention | How it works |
| --- | --- |
| Three work areas | `harness` holds rules, requirements, plans, and decisions; `project` holds software and authorized final installers; `test` holds tests, tools, data, project design drafts, and intermediate output. Link their actual locations in `harness/docs/paths.md`. |
| Two routes for feature work | Choose feature design and planning, or a direct change by the main agent. The direct route does not require a new specification and plan; applicable checks and reviews still apply. |
| Separate design and implementation authorization | The user approves the current specification and numbered plan together. Implementation also needs authorization. Host intake, partial answers, or an empty response do not count as project approval. |
| Three subagent roles | UIdesign works on interface design through the main conversation; implementer handles implementation and infrastructure; reviewer performs independent review. |
| Two independent reviews | `reviewer-spec` checks specification compliance and `reviewer-quality` checks implementation quality. The main agent accepts only after both review the same final version and the required evidence is available. |
| Resumable task records | The main agent records approvals, dispatch, evidence, rework, and next steps in the active plan, and updates the root-cause defect knowledge base. |

## Quick start

1. Download the version and language you want. Copy only `harness`, `project`, and `test` from the selected template to the locations you will actually use. Do not overlay the 2.0.0 rules on an existing 1.0.0 project without reviewing its current plans, roles, and paths.
2. In the deployed copy, fill in `harness/README.md`, `harness/ARCHITECTURE.md`, and `harness/docs/paths.md` with the project overview, technology stack, and real locations. If the stack is undecided, use [tech-stack-plan](en-deepseekharness/harness/.agents/skills/tech-stack-plan/SKILL.md) to record confirmed choices first.
3. Open the common parent as the DSH workspace when practical. Check actual access to all three areas separately, especially across disks. A path in the prompt or path table is not write permission; set the appropriate `workdir` for commands.
4. In a new DSH session, use the [startup template](en-deepseekharness/harness/docs/runbooks/start-task-template.md) to explicitly load the deployed `harness/AGENTS.md`, the role and model rules, and the main agent handbook. Include the task, scope, available evidence, and existing plan path if any. Do not assume rules carry across roots or sessions automatically.

## DSH-specific workflow

- **Dispatch and model inheritance.** Use local DSH `subagent` (Spawn) without child route or effort overrides. Omit `provider`, `model`, and `reasoning_effort` so children inherit the main agent's effective settings. Check the active profile; report a blocker if inheritance or the model prohibition cannot be honored. Record actual values exposed by the runtime and do not guess hidden values. See [MODELS.md](en-deepseekharness/harness/agents/MODELS.md).
- **Project procedures.** Load the [project procedure index](en-deepseekharness/harness/.agents/skills/README.md) and the relevant files with `read`; do not rely on native skill registration. Use `skill` for native DSH skills.
- **Planning and UI design.** [feature-plan](en-deepseekharness/harness/.agents/skills/feature-plan/SKILL.md) clarifies requirements and produces the specification and implementation plan. For interface work, [UIUX-design](en-deepseekharness/harness/.agents/skills/UIUX-design/README.md) first establishes user tasks and necessary functionality. UIdesign returns questions to the main agent, which asks in the main conversation using `ask_user_question` when available, otherwise in chat, and relays the answers.
- **Execution and resumption.** After approval and implementation authorization, execute plan items serially, with a fresh executor context and two independent reviewers per item; use fresh reviewers for the overall review. Record child names and use `list_agents` and `send_message` when resuming. If the original child cannot be resumed or the main agent's settings changed, create a fresh instance with a verified handoff. `inactive` is not an approval.

See the [main agent handbook](en-deepseekharness/harness/docs/runbooks/main-agent.md) and the [DSH migration checklist](en-deepseekharness/harness/docs/runbooks/dsh-migration.md) for the full workflow and deployment caveats. The migration checklist targets DSH Desktop `0.2.2-rc.5`; this template does not modify global settings, install plugins, or establish end-to-end runtime compatibility with every DSH version or profile.

## License

The project uses the [MIT License](LICENSE). Retain the copyright and license notices when distributing the template or substantial portions of it.

## Version history

| Version | Date | Description | Downloads |
| --- | --- | --- | --- |
| 2.0.0 | 2026/11/22 | Revises subagent responsibilities and skills, and adds the UIdesign role and a UI design workflow. | [中文 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-zh-CN-deepseekharness-2.0.0.zip) · [English ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/main/downloads/Harness-AI-Lite-en-deepseekharness-2.0.0.zip) |
| 1.0.0 | 2026/11/17 | The first release introduces a lightweight Harness Engineering template with separate management, software, and test workspaces, plus a workflow for requirements approval, delegated implementation, dual review, and evidence-based acceptance. | [中文 ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/8e42dd79b925b111b79769bdff954d39a778729d/downloads/Harness-AI-Lite-zh-CN-deepseekharness.zip) · [English ZIP](https://raw.githubusercontent.com/xuzh0312/Harness-AI-Lite/8e42dd79b925b111b79769bdff954d39a778729d/downloads/Harness-AI-Lite-en-deepseekharness.zip) |

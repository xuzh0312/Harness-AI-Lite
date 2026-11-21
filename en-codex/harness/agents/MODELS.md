# Central Subagent Model Configuration

This file is the sole configuration source for model selection, reasoning effort, and prohibited-model policy for the three subagent roles. Other instructions and templates reference this file instead of storing duplicate fixed values. Changes require project authorization; this file does not change the main agent's own model.

## Role Configuration

| Role | model | reasoning_effort |
| --- | --- | --- |
| UIdesign | gpt-6.2-sol | high |
| implementer | gpt-6.2-sol | medium |
| reviewer | gpt-6.2-sol | high |

reviewer-spec and reviewer-quality are two review instances of reviewer. Both read the reviewer row above, with no separate model configuration; record the actual creation parameters for each instance separately.

## Creation and Recording Rules

- Before every creation, the main agent rereads the relevant role in this file and explicitly passes model and reasoning_effort. Do not rely on inheritance or old values in other files.
- gpt-6.2-astra, including its aliases and variants, is prohibited for all subagents. If configuration conflicts with this restriction, do not create the agent; report the conflict.
- If the tool cannot explicitly select the configuration, the configuration is missing, or target parameters are unsupported, do not create that subagent. Report the specific limitation; do not silently switch models, downgrade, or ignore reasoning settings.
- Current effort values are high and medium. When changing platforms, check its actual supported parameters and values, then update this file with user authorization; do not infer mappings from other role instructions.
- End the subtask prompt with the actual creation parameters and require the subagent to repeat that exact line at the end of its final reply, including blocked or failed replies. Use `模型选择：<actual model ID>；推理深度：<actual reasoning_effort>`.
- Without a report of runtime differences, record the creation parameters actually passed, and do not claim to have verified hidden runtime parameters. If the runtime explicitly reports different settings, record the reported values and explain the difference. If the prohibited-model policy is violated, stop the affected subtask and report it.

## Changing Configuration

For future changes, modify only the role table above and necessary policy, without changing role responsibilities, task templates, or historical reports. Each new subagent uses the configuration read at creation time; existing sessions do not automatically switch models when this file changes. When a switch is needed, the main agent explicitly recreates the agent and hands over the work.

Model fields in historical tasks record the settings actually used at the time and are not rewritten to match current configuration. The main agent provides this file's absolute path and the parameters used in each assignment so subagents do not guess from old chats.

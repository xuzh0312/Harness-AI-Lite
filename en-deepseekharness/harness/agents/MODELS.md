# Subagent Model Configuration

This file is the only source for the four subagent roles' model routes, reasoning effort, and disable policy. Other documents and templates reference this file and do not duplicate fixed values. Changes require project authorization; this file does not change the main agent's own model.

## Role Configuration

| Role | provider | model | reasoning_effort |
| --- | --- | --- | --- |
| architect | deepseek-account | deepseek-flash | high |
| implementer | deepseek-account | deepseek-flash | high |
| infra | deepseek-account | deepseek-flash | high |
| reviewer | deepseek-account | deepseek-flash | high |

reviewer-spec and reviewer-quality are the reviewer's two review instances; both use the reviewer row above and define no separate model configuration; each instance's actual creation parameters are recorded separately.

DSH selects a subagent model through the `subagent` tool's `provider`, `model`, and `reasoning_effort` parameters, so this table records both route and reasoning effort:

- Explicit model selection depends on the DSH preset enabling `subagent` model discovery and route parameters (enabled by default in Web/Desktop; may be disabled in headless, SDK, ACP, etc.). If a field is unavailable or the request is rejected, report a blocker; do not silently omit reasoning_effort, switch models, or inherit defaults.
- Current values come from this machine's profile route `deepseek-account/deepseek-flash`; available reasoning efforts are `off`, `low`, `high`, `max`, default `high`.
- After changing the profile or route, first query the actually authorized provider, model, and available values with `list_subagent_models`, then update this table under user authorization; never enter unsupported values.
- Different roles may use different routes or efforts; keep the table's defaults absent new evidence. Use `max` only for quality-first reviews and `off` only for mechanical tasks that need no reasoning.

## Creation and Recording Rules

- Before each creation, the main agent re-reads this file's corresponding role and verifies route availability with `list_subagent_models`, then passes `provider`, `model`, and `reasoning_effort` explicitly; do not rely on inherited defaults when parameters are omitted.
- Use only routes registered in this table and authorized in the current profile. Unregistered routes, guessed model IDs, and deprecated aliases are forbidden; routes the user explicitly disables are listed under "Disabled Routes" below.
- When a route is unauthorized, a value unsupported, the tool refuses creation (such as `ACTIVATION_LIMIT_REACHED`), or configuration is missing, do not create the subagent; report the specific limitation. Do not silently switch models, downgrade, ignore reasoning settings, or reduce the required independent-review instances. When capacity is insufficient, collect or wait for existing subagents to settle before retrying.
- The subtask prompt must include this run's actual creation parameters and require the final reply (including blocked or failed replies) to end with: `provider/model: <provider/model>; reasoning effort: <actual reasoning_effort>`.
- DSH records the provider, model, and reasoning_effort used when a local subagent is created and reuses them on cold resume; the main agent still uses this dispatch's parameters and the subagent's reply footer as the record for the run, and does not treat the descriptor as an editable configuration source.
- When DSH reports no difference, record the parameters actually passed and do not claim to have verified unexposed runtime parameters. If DSH explicitly reports different settings, record the reported values and explain the difference; stop the affected subtask and report when the disable policy is violated.
- After this file changes, existing subagents do not switch automatically; to switch, create a new one per the new configuration and hand off, or send a new instruction to an idle original instance and require it to state that it remains on the old configuration.

## Disabled Routes

No disabled routes are currently registered. When the user explicitly disables a route, list the provider/model or alias here and replace it with an authorized route in the corresponding role configuration; do not create and report when the disabled policy conflicts.

## Switching Configuration

Later changes should modify only the role table above and necessary policy, not role responsibilities, task templates, or historical reports. Each new subagent uses the configuration read at that time; existing sessions do not switch models because this file changed. When a switch is needed, the main agent explicitly recreates and hands off.

Model fields in historical tasks record the actual settings at that time and are not rewritten by the current configuration. The main agent provides this file's absolute path and the parameters used in the dispatch, so subagents do not guess from old chats.

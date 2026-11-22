# Subagent Model Inheritance

UIdesign, implementer, reviewer-spec, and reviewer-quality all follow the main agent's effective provider, model, and reasoning effort at dispatch. There are no per-role overrides. This policy does not change the main agent's own settings.

## Dispatch

- Use local DSH `subagent` (Spawn) and omit **all three** fields: `provider`, `model`, and `reasoning_effort`. Do not send empty values. Passing a provider/model pair without an effort is not equivalent: DSH resolves the model's default effort instead of preserving the inherited effort.
- Omission follows the parent on the standard local Spawn configuration without child route or effort overrides. Custom profiles may configure child defaults that take precedence. If the tool or profile cannot follow this policy, or a known override would select different settings, report the blocker; do not choose another model or change profile settings.
- `gpt-6.2-astra`, including its aliases and variants, remains prohibited for all subagents. If the effective inherited route is prohibited, do not dispatch; report the conflict. If the runtime reports an unexpected or prohibited route or a different effort, do not accept the affected result as compliant; stop using that instance and report the mismatch.

## Recording and Resuming

- Record `inherited` for the creation mode. Where the runtime exposes provider/model or reasoning effort, record the reported value and its source. For values not exposed, report `inherited (not independently verified)` without guessing. Use these same rules in the handoff and the final reply footer: `模型选择：<reported provider/model or inherited (not independently verified)>；推理深度：<reported effort or inherited (not independently verified)>`.
- Existing children may retain their creation settings. If the main agent's effective model or effort has changed, or the existing child is not known to have been created under the current inheritance policy, use a new child and hand over verified context rather than assuming continuation applies the new settings. Keep historical task records unchanged.

# Subtask Handoff

Give a new instance only the current item, without forwarding the whole conversation. For an existing brief, give its file, version, and section. If the path is inaccessible, provide only necessary excerpts the recipient is allowed to see. If materials are missing, identify the gap without bypassing permissions.

```text
Task: <role, current item, expected result and acceptance; include approved combination versions and authorized items if applicable>
Boundaries: <actual working directory, applicable rules, read and write scope, existing changes to preserve, allowed checks>
Basis: <baseline, relevant ACs, necessary interfaces or prerequisite results, evidence locations; reference shared paths and constraints as needed>
```

Add materials by role and omit irrelevant fields:

- Preview (implementer): the Interaction Planner supplies user tasks, states to compare, agreed tradeoffs, authorized write location under test, and how to view the result. This is not production implementation.
- Implementation: give this item's contract, inputs, and expected results. For a defect, include reproduction conditions, hypotheses ruled out, and evidence. For shared behavior or known pitfalls, provide relevant callers, existing tests, or matching BUG IDs, and state what behavior must be preserved.
- Review: identify specification or quality review, and whether the scope is per-item or overall. The two read-only instances receive the same complete diff from baseline to reviewed version, original requirements, execution results, and raw evidence. Do not share the other reviewer's conclusions. Where producing verification artifacts is authorized, assign separate output locations to each instance.

For rework with the original instance, supply only findings, changes, the current version, and recheck goals. If the instance changes or materials are stale, supply the still-valid brief in full. Report using the [shared protocol](README.md).

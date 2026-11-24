# Reviewer (`reviewer`)

Read the [shared protocol](../README.md) first. Work read-only by default, in the directory containing the subject of the review.

## Responsibilities

Use the user's goal, confirmed proposal, acceptance criteria, and final diff to check correctness, requirements compliance, regression risk, and evidence sufficiency. Review the complete task changes since the baseline. For uncommitted changes, inspect the corresponding working-tree files; do not assume the latest commit is sufficient.

For code, verify affected behavior. For rules, walk through dispatch, handoff, failure, and recovery scenarios. When needed, run checks that do not rewrite the reviewed files. Distinguish direct verification from static judgment. Report only supported findings relevant to the task and do not require unrelated refactoring.

## Two Parallel Review Instances

Whenever the project rules require independent review, the conversation role responsible for submitting the work creates two distinct reviewer instances with independent contexts. They review the same version and complete diff in parallel. This applies to both per-item and overall reviews, regardless of task size.

| Instance ID | Review dimension | What to check |
| --- | --- | --- |
| reviewer-spec | Specification compliance | Check for omissions, misinterpretation, boundary behavior, and extra scope against the user's goal, approved specification, and acceptance criteria. With no feature specification, use task requirements and existing contracts; do not require a new specification. |
| reviewer-quality | Implementation quality | Check correctness, relevant regressions, project conventions, error handling, complexity, and test effectiveness. For rules, check whether they can be followed, are internally consistent, and allow recovery from failure. |

The conversation role responsible for the review dispatches both instances; subagents do not delegate recursively. Both get the same brief, requirements, input versions, and complete diff. The specification reviewer first looks for missed behavior in the user requirements. The quality reviewer first traces potential failure paths from the diff. Both then check the execution report and evidence. Do not read the other instance's conclusion first, but report well-supported defects even if they cross the review dimensions.

The conversation role responsible for the review keeps the reviewed version unchanged until both reports return. If external changes or fixes alter that version, provide both instances with the updated complete diff and a description of what changed. Do not combine passing conclusions from different versions. When concurrency is limited, keep two independent instances, run the reviews sequentially, and record that. If two independent reports cannot be obtained, acceptance is blocked; one instance cannot cover both dimensions.

## Findings and Conclusions

Each finding includes a location, specific trigger, observable consequence, evidence, and recommended action. Distinguish findings that block acceptance from nonblocking recommendations. Use `Recommend approval`, `Rework required`, or `Insufficient evidence` as the conclusion, and state the covered scope and unverified items. Having no findings does not prove that unreviewed parts are correct.

The conversation role responsible for the review retains each conclusion by instance, dimension, and round, without substituting a single generic pass. Per-item review focuses on the item's requirements and complete diff. Overall review checks full specification coverage, cross-item interfaces, integration regressions, and validity of final evidence. Reuse valid same-version evidence; add checks when a concrete concern or subsequent change affects the conclusion.

Check mandatory acceptance conditions first: two independent reports that satisfy the [configuration limits for this review](../MODELS.md), cover specification and quality respectively, and correspond to the same final version; all applicable required checks pass; required evidence is available; and all approved acceptance criteria are met. A user ruling cannot replace a missing report, a report still marked `Insufficient evidence`, or any unmet mandatory condition. Once those conditions are met, accept when both reports say `Recommend approval` and no findings block acceptance. If an original report says `Rework required`, accept only when each finding that led to that conclusion has been ruled nonblocking for that version under the rules below, and no other blocker remains. Record original reports separately from the final acceptance decision. The conversation role responsible for the review deduplicates repeated findings while retaining both sources and their individual conclusions.

### Conflicting Conclusions and User Rulings

If the reviewers disagree or the conversation role responsible for the review has evidence against a finding, send the specific evidence back to the relevant reviewer for rechecking first. Use an updated conclusion if the reviewer revises it. If disagreement remains after rechecking, pause acceptance for that item. Give the user the disputed finding, both sides' evidence, affected ACs, options, and the consequences of each, and ask the user to decide.

- Record the user's decision, date, and reviewed version. Keep the original report intact and retain the reviewer's original conclusion, with a note that the user ruled the finding nonblocking or that rework remains required.
- The ruling applies only to that finding and version. If the version changes, the relevant reviewers must recheck it.
- A ruling that changes an approved requirement or acceptance criterion is a substantive change. Revise and confirm it through planning; do not relax it directly during execution.
- Do not replace a reviewer to bypass the original conclusion or decide on the user's behalf.

When a valid defect is found or a fix is rechecked, read and invoke [bug-detect](../../skills/bug-detect/SKILL.md). Search for similar defects and return proposed additions or updates, the basis for deduplication, and the result of rechecking the final solution. The conversation role responsible for the review writes to the knowledge base serially; reviewers remain read-only. If a concern lacks evidence, report what investigation is needed first.

Do not fix issues yourself, review your own work, overwrite task records, approve scope, or declare completion on behalf of the conversation role responsible for the review. Prefer resuming the same two reviewers for rework; hand off again when they cannot be resumed or their settings must change. Each instance rechecks original findings, the new diff, and relevant regressions. It may reference still-valid evidence, but must explicitly confirm the final version.

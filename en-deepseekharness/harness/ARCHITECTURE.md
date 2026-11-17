# Tech Stack and Architecture

## Tech Stack (follow strictly; do not change without authorization)

@@

## Project Architecture and Constraints

@@

## Work Areas

- harness: project overview, rules, requirements, plans, decisions, skills, and role instructions.
- project/code: source code for the software product, runtime resources, and necessary project description, dependency manifest, and build configuration.
- project/installpark: final installer packages generated after the user explicitly requests packaging.
- test: all non-product code, test data, raw logs, cache, temporary output, and validation materials.

See the [path registry](docs/paths.md) for actual locations. The three areas may span disks; do not assume they are adjacent. A DSH session has one working directory, and writes are also limited by the session workspace and file sandbox; when work spans areas, specify each subagent's cwd in the dispatch, and obtain user-approved permission configuration before writing outside the workspace—do not bypass the sandbox.

"Product code" means only code that implements the delivered software product's functionality, including code that enters the product after compilation or is used by the product at runtime. Source files need not enter the installer package verbatim. Necessary resources, project description, dependency manifests, and build configuration are supporting files and do not make test or tool code part of the product.

Test code, test fixtures, mock services, validation scripts, temporary experiment code, build/packaging helper scripts, and other developer-tool code all go in test, not project/code or harness. harness holds only management material such as overviews, rules, role and skill instructions, plans, decisions, the bug knowledge base, and brief log documents; it does not hold executable auxiliary code, raw runtime logs, or artifacts.

Organize test material as needed; do not pre-build a fixed tech stack. Commands must name external test or tool paths and record their correspondence to software versions. Configure cache, build intermediates, non-installer build output, screenshots/recordings, and test results into test. When a tool has a fixed directory requirement that cannot be redirected, report the conflict first and let the user decide explicitly; do not silently relax the boundary.

Execute packaging and write to project/installpark only when the user explicitly requests an installer package or an explicitly approved plan contains a packaging task. Implementation completion, passing tests, an ordinary build, or choosing a delivery form does not automatically trigger packaging; packaging does not automatically authorize release.

## Git and Execution

harness and project/code use separate Git repositories; installer packages and test data are stored independently. Link repositories across tasks by task ID and version; do not initialize, migrate, or delete a repository without task authorization.

The main agent owns dispatch and final acceptance; the four role responsibilities are in the [role protocol](agents/README.md). The main agent loads and uses role documents, AGENTS.md, and skills; they are not DSH native agent presets. If enforcement is needed, you may separately request a DSH preset or bundle, but must not modify the profile by default. When a tool such as CI requires a fixed directory, check whether it conflicts with the placement boundaries above; report any conflict instead of creating an exception.

## DSH Runtime Environment

- **Instruction loading**: DSH automatically loads the user-global chain (`$DSH_HOME/AGENTS.md`, `~/.agents/AGENTS.md` when present) and the project chain (project root to the current working directory). The project root is the nearest `.git` ancestor, or the current working directory when no `.git` exists. When a session starts with harness as its working directory, harness/AGENTS.md is part of the project chain and takes effect automatically; when starting elsewhere, read this entry explicitly; DSH also injects it on demand after the session touches harness files.
- **Skill discovery**: local skill roots in priority order are `<projectRoot>/.dsh/skills`, `<projectRoot>/.agents/skills`, custom directories, `~/.dsh/skills`, and `~/.agents/skills`; only `<root>/<name>/SKILL.md` or `<root>/<name>.md` is recognized, with no recursive scanning. Skill lookup is relative to the session working directory: the project root is the nearest `.git` ancestor, or the current directory when no `.git` exists. Therefore harness's `.agents/skills` is scanned only when the project root computed by DSH from the session working directory is harness (the nearest `.git` ancestor is harness, or the session working directory is harness when no `.git` exists). If harness has no `.git` of its own and sits inside a larger Git repository, the project root is the outer repository; in that case read `SKILL.md` by absolute path, or place skills under the outer project root's `.agents/skills`. A separate Git repository is a project convention, not a DSH discovery prerequisite.
- **Subagents**: created with the `subagent` tool, which accepts name, cwd, and provider/model/reasoning_effort; a fresh context does not inherit the conversation. `subagent_fork` inherits completed conversation and is only for continuation, not independent review. DSH defaults to `maxDepth=1` and `maxActiveSubagents=8`; a subagent's permission scope is fixed at creation and cannot be widened from inside.
- **Native capabilities**: goal, schedule, team task, and plan mode are optional conveniences; they do not replace this protocol's specs, plans, approved pair, or acceptance records. Create scheduled tasks only when the user explicitly requests them.
- **Change boundaries**: installing or enabling plugins/bundles, or changing the profile or an agent preset, affects every session in that profile and requires an explicit user request plus confirmation of impact; read-only investigation, passing acceptance, and task authorization do not automatically authorize these changes.

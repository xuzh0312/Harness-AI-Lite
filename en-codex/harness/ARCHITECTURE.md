# Technology stack and architecture

## Technology stack (strictly required; do not change without authorization)

@@

## Work areas

- harness: project overview, rules, requirements, plans, decisions, role descriptions, and skill instructions. Reusable UIUX-design references and selected assets ship with the skill.
- project/code: software implementation source, runtime resources, and necessary project descriptions, dependency manifests, and build configuration, and launch files that are part of the deliverable, such as a required launcher .exe.
- project/installpark: final installers generated after the user explicitly requests packaging.
- test: all code outside the software implementation, test data, raw logs, caches, temporary output, and verification materials. Store project design drafts, interactive prototypes, design-review screenshots, and executables from ordinary builds here.

See the [path table](docs/paths.md) for actual locations. The three areas may span disks; do not assume they are adjacent directories.

“Project code” means only code implementing the delivered software's functionality, including implementations compiled into the software or used by it at runtime. Source files need not be included unchanged in the installer. Necessary resources, project descriptions, dependency manifests, and build configuration are supporting files; this does not classify test or tool code as software implementation.

Organize materials in test as needed, without preparing a fixed technology stack in advance. Commands must specify external test or tool paths and record their correspondence to the software version. Configure caches, intermediate build artifacts, build output other than installers, screenshots, recordings, and test results to go to test. If a tool requires a fixed directory that cannot be redirected, report the conflict first and obtain an explicit user decision; do not silently relax the boundaries.

Run packaging and write to project/installpark only when the user explicitly requests an installer or an explicitly approved plan includes a packaging task. Store only final ZIP files in project/installpark. Extract archives for inspection and store intermediate files in test. Check the archive format and contents and reuse valid functional verification from the same version. Implementation completion, passing tests, an ordinary build, or selecting a delivery format does not automatically trigger packaging; packaging does not automatically authorize release.

## Git and execution

harness and project/code each use an independent Git repository; installers and test data are stored separately. Link work across repositories by task ID and version. Do not initialize, migrate, or delete repositories without task authorization.

The main agent handles dispatch and final acceptance; see the [role protocol](agents/README.md) for subagent responsibilities. Choose the working directory for the task, and confirm rule loading and directory permissions separately. Role documents are explicitly read and used by the main agent; they are not native runner configuration. When CI or other tools require fixed directories, check for conflicts with the storage boundaries above; report conflicts first rather than creating exceptions independently.

# Technology Stack and Architecture

## Technology Stack (Strictly Required; Do Not Change Without Authorization)

@@

## Work Areas

- harness: project overview, rules, requirements, plans, decisions, role descriptions, and skill instructions. Reusable UIUX-design references and selected assets ship with the skill.
- project/code: software implementation source, runtime resources, necessary project descriptions, dependency manifests and build configuration, and files used as entry points for the delivered software, such as a required launcher .exe.
- project/installpark: final installers generated after the user explicitly requests packaging.
- test: all code outside the software implementation, test data, raw logs, caches, temporary output, and verification materials. Store project design drafts, interactive prototypes, review screenshots, and executables from ordinary builds here.

See the [path table](docs/paths.md) for actual locations. The three areas may span disks; do not assume they are adjacent directories. When adopting the template for an existing project, map `project/code` to the existing software code root without moving or recreating the repository. Mapping does not change file ownership or write authorization.

"Project code" means only code implementing the delivered software's functionality, including implementation compiled into the software or used by it at runtime. Source files need not be included unchanged in the installer. Necessary resources, project descriptions, dependency manifests, and build configuration are supporting files; this does not classify test or tool code as software implementation.

Keep persistent materials separate from disposable output in test and create directories as needed. See the test README for versioned source entry points and backup rules. Preserve the locations and tracking status of existing tests. Report unavoidable fixed-directory conflicts and record exceptions in the path table after the user confirms them. New tests, helper tools, and output without a confirmed exception still go in test.

Write the final ZIP to project/installpark only when the user explicitly requests packaging or the current implementation authorization covers the packaging item. Approval of a plan containing a packaging item does not authorize running it. Extract the archive for inspection and keep intermediate files in test. Record the actual ZIP identifier, such as its checksum, and check the archive format and contents. Verify launch or installation from the extracted entry point at a test location separate from the source and build directories, without depending on the source tree or build artifacts. Same-version functional evidence does not replace checking the installer. Record checks that were not run. Packaging does not automatically authorize release.

## Git and Execution

harness, project/code, and test each use an independent Git repository. The test repository is rooted at test and uses its `.gitignore` to track only the README, `src/`, `approved-designs/`, and files explicitly allowed. Other materials are ignored by default. project/installpark is outside all repositories; installers are stored separately. Cross-repository records reference the same PLAN or TASK ID and each repository's version. See [task records](docs/plans/README.md) for numbering and archiving. Do not initialize, migrate, or delete repositories without task authorization.

The Execution Coordinator handles dispatch and final acceptance. See the [role protocol](agents/README.md) for subagent responsibilities. Choose the working directory for the task and confirm rule loading and directory permissions separately. Conversation roles explicitly read their role documents for the current step, and the dispatching role explicitly identifies each subagent role. These documents are not native runner configuration.

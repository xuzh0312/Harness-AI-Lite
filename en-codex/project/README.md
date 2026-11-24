# Project area

`code` holds the software itself, runtime resources, and necessary configuration. `installpark` holds only authorized final ZIPs. Package only when the user explicitly requests it or the current implementation authorization covers a packaging item. Tests, helper tools, and data normally belong in `test`; see the Harness ARCHITECTURE.md for the boundaries.

When integrating an existing project, map `project/code` to its actual code root in Harness `docs/paths.md`; there is no need to move the repository or rename it `code`. Preserve existing tests. Confirm and record necessary fixed-directory conflicts under the architecture rules; place new material according to the default boundaries.

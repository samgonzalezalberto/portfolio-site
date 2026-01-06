# Sprint-00 Specification (Normative)

## Scope

This document defines the required artifacts, directory structure, naming conventions, and approval gates that must exist following Sprint-00. All statements are normative: terms such as "must", "must not", "required", and "forbidden" are authoritative for the project unless amended by an approved Sprint-00 deviation.

## Required Files and Artifacts

- The following files must exist at completion of Sprint-00:
  - `docs/sprints/sprint-00/planning/planning.md`
  - `docs/sprints/sprint-00/planning/spec.md`
  - `docs/sprints/sprint-00/planning/tdd.md`
  - `docs/sprints/sprint-00/planning/data-dictionary.md`
  - `docs/project/vision.md` (must be present and referenced)
  - `docs/project/architecture.md` (must be present and referenced)
  - `docs/project/constraints.md` (must be present and referenced)

## Directory Structure Requirements

- The `docs/sprints/` hierarchy must exist and contain a directory for each sprint. For Sprint-00 specifically, the path `docs/sprints/sprint-00/planning/` must exist and contain the required files listed above.
- Sprint directories must be lower-case and use hyphenated sprint identifiers (for example, `sprint-00`).

## Naming Conventions

- All governance and planning documents must use lower-case file names with hyphen separators and the `.md` extension. Example: `data-dictionary.md`.
- Filenames must not contain spaces, underscores, camelCase, or period characters other than the `.md` extension.

## Required Sprint Artifacts

- Each sprint must produce a Planning artifact which declares intent and scope. Sprint-00's Planning artifact is the `planning.md` produced here and is normative for later sprints.
- Each sprint must produce a Specification artifact describing required files, naming, and approval gates. Sprint-00's `spec.md` is the authoritative source for Sprint-00 governance rules.
- Each sprint must produce a Test-Definition artifact (TDD) that enumerates validation criteria; for Sprint-00 this file is `tdd.md`.
- Each sprint that defines terms must include a `data-dictionary.md` that contains precise definitions of the terms used by governance artifacts.

## Approval Gates and State Transitions

- Document states: `draft`, `in-review`, `approved`, `locked`.
- All Sprint-00 artifacts must start in `draft` and progress to `in-review` before approval.
- Approval must be recorded in the sprint artifact header and must reference the approving authority (the Planning Authority defined by Sprint-00).
- An artifact must not transition to `approved` unless all items listed in `spec.md` are satisfied and cross-references to `docs/project/vision.md`, `docs/project/architecture.md`, and `docs/project/constraints.md` are present and consistent.
- Once an artifact is `approved`, it must be allowed to transition to `locked` only after an explicit record of approval is added and the TDD validation criteria are satisfied.

## Deviations

- Deviations from the requirements in this `spec.md` are forbidden except where a formal deviation request is issued and approved by the Planning Authority as defined in `data-dictionary.md`.
- A deviation request must be recorded within the sprint artifacts and must include the rationale, scope, and approval outcome. Deviation approval constitutes an amendment to Sprint-00 governance.

## Forbidden Actions

- Sprint-00 must not define implementation tooling, CI scripts, or repository hooks. Those items are out of scope for Sprint-00 governance.

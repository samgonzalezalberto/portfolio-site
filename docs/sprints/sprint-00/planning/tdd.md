# Sprint-00 Validation Criteria (TDD)

## Completion Criteria

Sprint-00 is considered complete when all of the following conditions are satisfied:

1. All files required by `spec.md` are present in `docs/sprints/sprint-00/planning/`.
2. Each Sprint-00 artifact contains an explicit reference to `docs/project/vision.md`, `docs/project/architecture.md`, and `docs/project/constraints.md` where requirements or constraints are asserted.
3. Each artifact's declared approval state follows the state transition rules in `spec.md` and has recorded approvals as specified by the Planning Authority.
4. `data-dictionary.md` contains canonical definitions for all governance terms referenced by the Sprint-00 artifacts.
5. No statements within Sprint-00 artifacts contradict `docs/project/vision.md`, `docs/project/architecture.md`, or `docs/project/constraints.md`.

## Failure Conditions

Sprint-00 is considered failed if any of the following conditions occur:

- Any required file listed in `spec.md` is missing or misnamed.
- A Sprint-00 artifact contains language that conflicts with `docs/project/vision.md`, `docs/project/architecture.md`, or `docs/project/constraints.md`.
- Approval gates were not followed: an artifact is marked `approved` without satisfying the `spec.md` requirements or without Planning Authority sign-off.
- A deviation was applied without a recorded, approved deviation request as defined in `spec.md`.

## Documentation Agent Verification Responsibilities

The documentation agent responsible for Sprint-00 must verify the following before recommending approval:

- Presence: Confirm all required files are present and correctly named in `docs/sprints/sprint-00/planning/`.
- Reference consistency: Confirm each artifact references `docs/project/vision.md`, `docs/project/architecture.md`, and `docs/project/constraints.md` and that referenced statements do not conflict.
- Structural conformity: Confirm directory and naming conventions conform to `spec.md`.
- Approval records: Confirm that approvals are recorded and attributed to the Planning Authority as defined in `data-dictionary.md`.
- Definitions: Confirm `data-dictionary.md` defines every governance term used in Sprint-00 artifacts and that definitions are non-overlapping.

## Expected Future CI Checks (Conceptual)

Future automation and CI must be expected to enforce the following checks conceptually (these are validation requirements, not implementation instructions):

- Existence checks for required files and correct paths.
- Filename and directory naming convention checks.
- Cross-document reference checks to ensure that Sprint-00 artifacts reference the required project-level documents.
- Approval-state consistency checks to ensure artifacts do not declare `approved` or `locked` without recorded approvals.
- Deviation audit checks to ensure any allowed deviations include recorded requests and approvals.

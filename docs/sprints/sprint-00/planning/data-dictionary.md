# Sprint-00 Data Dictionary

All definitions are canonical for Sprint-00 and must be used without modification in Sprint-00 artifacts unless an approved deviation is recorded.

Definitions

- Sprint
  - A time-boxed planning and delivery period for project work. For Sprint-00, the sprint exists solely to define governance artifacts; it must not contain implementation or user-visible deliverables.

- Authority
  - The recognized entity or role that has the power to approve, amend, or lock governance artifacts. For Sprint-00 the Authority is the Planning Authority as defined by Sprint-00 artifacts.

- Spec
  - A normative document that enumerates required artifacts, naming conventions, directory structures, approval gates, and forbidden actions. A Spec is declarative and authoritative when approved.

- Lock
  - A state applied to an artifact indicating that the artifact is immutable except through an approved deviation or re-approval process. Locked artifacts require explicit Authority action to change state.

- Approval
  - A recorded affirmation by the Authority that an artifact satisfies the Spec and TDD validation criteria. Approval transitions an artifact from `in-review` to `approved` and enables subsequent `locked` transition when required.

- Deviation
  - A formally recorded and approved exception to a requirement in a Spec. A Deviation must include scope, rationale, and approval metadata. Deviations amend the governance for the scope recorded and must be auditable.

- Planning document
  - Any artifact that declares governance intent, scope, or ordering for sprint work. Examples: `planning.md` and similar documents. Planning documents are normative for intent but may be subordinate to approved Specs.

- Implementation artifact
  - Any file, code, or configuration that implements user-visible functionality or runtime behavior. Implementation artifacts are out of scope for Sprint-00 governance definitions and must not be produced by Sprint-00.

- Governance document
  - Any artifact that defines rules, approval gates, naming conventions, or enforcement mechanisms. Governance documents include Specs, Planning documents, TDDs, and the Data Dictionary.

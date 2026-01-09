## Sprint Goal
Finalize the portfolio's governance, safety, and visual integrity to reach "Public-Ready" status. This sprint locks down the Swiss International Design System (typography, grid, hierarchy), strictly enforces quality baselines via CI/CD (Lighthouse, Accessibility), and establishes enforceable governance policies. No functional features or backend changes are permitted.

## Non-Goals
- New features or functional pages.
- Backend logic, API, or architecture changes.
- Dynamic data fetching or third-party analytics.
- "Creative" or experimental design deviations outside the Swiss system.

## Invariants
- **Deterministic Quality**: CI must fail if quality metrics (Lighthouse, Type Check, Lint) drop below baselines.
- **Static Integrity**: All design and content refinements must be static, preserving the server-first architecture.
- **Auditability**: Every policy change or design decision must be traceable to a specific requirement in `docs/project/`.

## Definition of Done
- **Governance Ratified**: `planning.md`, `spec.md`, `tdd.md`, and `data-dictionary.md` are finalized and committed.
- **Swiss Design System Applied**: Typography uses a fixed modular scale (1.250), spacing uses strictly defined Tailwind tokens, and all layout containers align to the 12-column grid.
- **Quality Gates Enforced**: CI pipeline blocks merges on regression, accessibility (WCAG AA), or Lighthouse (<95) failures.
- **Regression Suite Passing**: All E2E, Unit, and Visual tests pass on `main`.
- **Public-Ready**: The repository is clean, documented, and safe for public auditing.

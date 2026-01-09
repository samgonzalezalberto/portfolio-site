## Entities / Objects

### Design Token
An atomic unit of UI design stored in `tailwind.config.ts` (e.g., `font-sans`, `spacing-4`, `color-neutral-900`). These are the "variables" of the Swiss Design System.

### Quality Gate
A check in the CI/CD pipeline (GitHub Actions) that produces a binary Pass/Fail result based on a numeric threshold (e.g., "Lighthouse Accessibility Score < 95" = Fail).

### Governance Rule
A prose constraint defined in documentation that prescribes interaction with the repository (e.g., "No new dependencies without audit").

### Audit Log
The implicit record of changes provided by Git history, enforced by atomic commit requirements.

### Baseline
The recorded "known good" state of the application (snapshots, test results) against which PRs are measured.

### Public-Ready
A comprehensive state validation where all CI checks pass, no `TODO` comments remain in the codebase, and the `README` is complete.

## Fields / Attributes

### `font-family`
**Type**: CSS Property
**Value**: `Inter, Helvetica, Arial, sans-serif` (Neo-Grotesque stack).
**Meaning**: The primary carrier of the Swiss visual style.

### `grid-cols`
**Type**: Tailwind Class
**Value**: `12`
**Meaning**: The fundamental denominator for layout width decisions.

### `tracking` (Letter Spacing)
**Type**: CSS Property
**Value**: `tight` or `tighter` for large headings, `normal` for body.
**Meaning**: Swiss typography tightly packs large type for graphical impact.

## Relationships

- **Design Token 1:N Components**: A single token change propagates to all UI components.
- **Quality Gate 1:1 PR**: Every Pull Request must pass every Quality Gate.
- **Governance Rule 1:N Commits**: Every commit must adhere to Governance Rules (e.g., Conventional Commits).

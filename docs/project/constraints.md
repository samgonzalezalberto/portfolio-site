# Constraints

## Design constraints

- Visual system: Swiss grid discipline with a 12-column responsive baseline and strict typographic hierarchy.
- Styling: Tailwind CSS only; all design tokens (colors, spacing, typography) defined centrally and immutable without explicit revision.
- Component behavior: server-first rendering by default; client-side interactivity allowed only when necessary and documented at sprint-level.
- Motion: minimal and functional; must not impair readability or accessibility.

## Dependency rules

- Introduce dependencies only with concrete justification and a security review.
- All dependencies must be version-pinned; run periodic dependency audits.
- No additional client-side UI frameworks beyond the locked stack.
- Third-party scripts are disallowed unless explicitly approved; analytics that collect personal data are forbidden without review.

## Performance budgets

- Target TTI ≤ 2.0s on a modern mobile 4G baseline.
- Target LCP ≤ 1.5s on a modern mobile 4G baseline.
- Client-side JS per route should not exceed 150 KB gzipped without documented justification.

## Accessibility requirements

- Conformance: minimum WCAG 2.1 AA for all public pages.
- Full keyboard navigation for interactive components.
- Contrast: 4.5:1 for normal text, 3:1 for large text.
- Use semantic HTML; ARIA only when necessary.
- Include automated accessibility checks in CI and targeted manual audits.

## Security rules

- Least-privilege for secrets; secrets must live in CI/infra secret stores and never in the repository.
- Strict input validation and output encoding for all public endpoints.
- Implement rate limiting and spam mitigation on public endpoints.
- Automated dependency scans must run; high/critical CVEs require immediate remediation.
- Deploy a restrictive Content Security Policy; avoid inline scripts and styles.

## CI/CD enforcement rules

- Required checks on all PRs: lint, type-check, unit tests, Playwright e2e, accessibility smoke.
- PR merges require all checks passing and at least one technical reviewer approval.
- Only merges to `main` trigger production deploys; workflows must support rollback.
- Preserve build artifacts and test reports for auditing per retention policy.

## Forbidden sprint actions

- Replacing the locked stack (Next.js, Tailwind, file-based content, DigitalOcean, Playwright, GitHub Actions, serverless functions) without an explicit architectural revision.
- Introducing heavy client-side frameworks that alter delivery model.
- Adding third-party trackers that collect personal data without approval.
- Committing secrets to the repository.
- Bypassing CI gates for merges or releases.

## What requires explicit architectural revision

- Any change to the core stack or hosting model.
- Migration from file-based content to a database-driven model.
- Significant infra changes that alter deployment, observability, or security posture.
- Any relaxation of constraints defined in this document.

## Enforcement and exceptions

- Exceptions require a documented architectural revision stored in `/docs/project/architecture.md` and `/docs/project/constraints.md` and approval before implementation.
- Sprint documentation must reference these constraints and note planned exceptions for review.

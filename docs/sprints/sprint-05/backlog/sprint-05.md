# Sprint-05 Backlog

## Deferred Features

- **Contribution Guidelines Document**: Detailed prose instructions on how to update content without breaking the build were not created. Deferred as CI enforcement and existing documentation provide sufficient guardrails for current needs.

- **Maintenance Policy Document**: Formal rules for dependency updates and security patches were not documented beyond existing `package.json` engine requirements. Deferred to avoid premature process documentation before establishing operational patterns.

- **Dependency Vulnerability Remediation**: `npm audit` reported vulnerabilities during implementation, but remediation was explicitly excluded from Sprint-05 scope. Deferred to maintain focus on governance and standardization; requires separate security-focused sprint.

## Known Limitations

- **ESLint Inline Suppression Prohibition**: ESLint is configured with `noInlineConfig: true`, preventing all inline `eslint-disable` directives in the codebase. This enforces strict code quality but may require configuration changes for legitimate edge cases. Trade-off prioritizes consistency over flexibility.

- **Tailwind Plugin for Utilities**: `.focus-ring` and `.interactive-transition` utilities were migrated from `globals.css` to a Tailwind plugin to satisfy the "no component classes in globals.css" constraint. This adds plugin configuration complexity but maintains the Tailwind-only styling requirement.

- **Node Version Enforcement**: Project requires Node 20.11.0 and npm 10.2.4 per `package.json` engines. Local environment mismatches produce `EBADENGINE` warnings. CI uses correct versions, but local development requires version management tooling (nvm, volta).

- **Visual Regression Snapshot Coupling**: Visual regression tests are tightly coupled to exact HTML structure and Tailwind class names. Any design token changes require snapshot updates. Trade-off prioritizes visual stability detection over test maintenance convenience.

## Explicitly Postponed Ideas

- **Automated Design Token Validation**: Programmatic validation that all components use only approved design tokens (no ad-hoc values) was discussed but postponed. Current visual regression tests provide sufficient coverage without additional tooling complexity.

- **Lighthouse Performance Budget Automation**: Configuring strict performance budgets (TTI ≤2.0s, LCP ≤1.5s) as separate CI gates beyond Lighthouse scores was postponed. Current Lighthouse Performance scores (99-100) exceed requirements without additional budget enforcement.

- **Typography Reference Page**: Creating a dedicated reference page demonstrating all typography scale steps (H1-H6, body, small) was discussed for visual validation but postponed. Current visual regression tests on existing pages provide sufficient typography coverage.

- **Automated Accessibility Reporting**: Generating and archiving detailed Axe accessibility reports as CI artifacts was postponed. Current zero-violation validation is sufficient; detailed reporting deferred until accessibility issues require deeper investigation.

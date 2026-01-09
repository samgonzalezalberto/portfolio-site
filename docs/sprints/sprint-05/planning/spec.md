## High-Level Model
Sprint-05 establishes the **Governance & Standardization Layer**. Unlike previous sprints that built features, this sprint wraps the application in a protective shell of strict design rules (Swiss Style) and automated quality controls. It treats the codebase as a "Managed Artifact" where consistency and auditability are paramount. Behaving as the "clean-up and lock-down" phase, it ensures the visual language is mathematically consistent and the repo is safe for dormancy or long-term maintenance.

## Component Definitions

### Swiss Design System
A strict, token-based definition of visual hierarchy implemented via Tailwind.
- **Typography**: Primary font set to a Neo-Grotesque sans-serif (Inter/Helvetica). Type scale uses a fixed Major Third (1.250) modular ratio.
- **Grid**: Strict 12-column utilization with consistent gutters. All major content blocks (headers, sections, images) must align to grid column boundaries.
- **Whitespace**: Spacing is standardized; "air" is used as a functional element to group content.

### Governance Policy
The set of written and automated rules that dictate valid repository states.
- **Contribution Guide**: Instructions on how to update content without breaking the build.
- **Maintenance Policy**: Rules for dependency updates and security patches.

### Quality Baseline
The numeric thresholds configured in CI tools.
- **Lighthouse**: Performance, SEO, Accessibility, Best Practices scores must be ≥ 95.
- **Test Coverage**: Critical paths (Routing, SEO, Contact) must have E2E coverage.

### Regression Safety
The guarantee that existing features work as designed.
- **Visual Regression**: Snapshots ensuring standard components don't drift visually.
- **Functional Regression**: E2E tests ensuring navigation and form submission details remain unchanged.

## Behavior / Semantics

### Standardized Rendering
All existing pages must re-render using the refined Swiss Design tokens. Refinements to alignment and typography to strictly adhere to the defined grid and type scale are permitted. Layout composition (ordering of sections) must remain unchanged.

### Gatekeeping
The CI pipeline acts as the absolute gatekeeper. A "Red" build allows ZERO merges. Governance rules are enforced by code (linters, tests) where possible, and by policy (docs) where not.

### Zero-Config Maintenance
The project requires no manual steps to "keep running" other than standard dependency updates. It is "safe to leave."

## Constraints

- **No Logic Changes**: Do not touch `src/lib` or `src/app` logic files unless strictly for design class updates.
- **Tailwind Only**: Application of design tokens must primarily occur via Tailwind utility classes. `globals.css` is restricted to reset (e.g., box-sizing) and base styles (e.g., font family defaults). No component classes.
- **Strict Linting**: No `eslint-disable` allowed in `src/` directory.

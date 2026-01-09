# Sprint-05 Implementation Plan

## PHASE 1 — System Baseline & Configuration

### Purpose
To transform the codebase state from "functional prototype with ad-hoc styling" to "configured Swiss Design System foundation" by establishing strict design tokens, typography scale, and linting rules defined in spec.md.

### Authorized Inputs
Solely `docs/sprints/sprint-05/implementation/task-engine/*`.

### Tasks to Perform
- Update `tailwind.config.ts` to define the Swiss Design System tokens:
  - Configure typography with Neo-Grotesque font stack (Inter/Helvetica)
  - Implement Major Third (1.250) modular type scale
  - Define standardized spacing tokens
  - Configure 12-column grid system with consistent gutters
- Audit `globals.css` and restrict to reset styles (e.g., `box-sizing`) and base styles (e.g., font family defaults) only
- Remove any component-specific classes from `globals.css`
- Update ESLint configuration to enforce strict linting rules
- Verify build succeeds with new configuration

### Explicit Non-Goals
- No visual refactoring of components yet (Phase 2)
- No logic changes in `src/lib` or `src/app`
- No new functional components
- No "creative" design interpretations outside defined tokens

### Notes Requirement
Log in `notes.md`:
- Exact modular scale values configured
- Any existing `globals.css` rules that were removed
- ESLint configuration changes made
- Any build issues encountered and resolved

### Completion Criteria
- Build succeeds (`npm run build` or equivalent)
- `tailwind.config.ts` contains all required Design Tokens per data-dictionary.md
- `globals.css` contains only reset and base styles
- No regression in existing functionality (application still runs)

---

## PHASE 2 — Visual Standardization (The "Sweep")

### Purpose
To transform the codebase state from "configured design system" to "visually standardized application" by systematically refactoring all components and pages to use the Swiss Design tokens established in Phase 1.

### Authorized Inputs
Solely `docs/sprints/sprint-05/implementation/task-engine/*`.

### Tasks to Perform
- Iterate through all components in `src/components`:
  - Refactor className attributes to use new Tailwind tokens
  - Ensure typography uses the 1.250 modular scale
  - Apply standardized spacing tokens
  - Verify letter-spacing (`tracking`) follows Swiss conventions (tight/tighter for headings, normal for body)
- Iterate through all pages in `src/app`:
  - Update layout containers to align to 12-column grid
  - Ensure all major content blocks (headers, sections, images) align to grid column boundaries
  - Apply Swiss typography tokens to all text elements
  - Preserve layout composition (ordering of sections must remain unchanged)
- Remove any `eslint-disable` directives found in `src/` directory
- Update visual regression test snapshots if refinements are intentional
- Verify mobile viewport behavior (grid collapses gracefully, no horizontal scroll)
- Verify text reflow on small screens (headings don't overflow)
- Verify WCAG AA contrast requirements are maintained

### Explicit Non-Goals
- No changes to layout composition (section ordering)
- No logic changes in `src/lib` or `src/app` beyond design class updates
- No new functional components
- No performance optimizations beyond what design changes naturally provide

### Notes Requirement
Log in `notes.md`:
- List of components refactored
- List of pages updated
- Any `eslint-disable` directives removed (file and line number)
- Any design tokens that were difficult to map or required compromise
- Any visual snapshot updates and rationale
- Mobile viewport testing results
- Contrast verification results

### Completion Criteria
- V-01 (Swiss Typography Enforcement) test passes
- V-02 (Grid Alignment) test passes
- G-02 (Lint Strictness) test passes (no `eslint-disable` in `src/`)
- R-01 (Regression Suite) test passes (100% E2E pass rate)
- Build succeeds
- Mobile viewports render correctly (Edge Cases validated)
- Text reflow works on small screens (Edge Cases validated)
- WCAG AA contrast maintained (Edge Cases validated)

---

## PHASE 3 — Governance & Certification

### Purpose
To transform the codebase state from "visually standardized application" to "Public-Ready managed artifact" by enforcing quality gates, completing documentation, and achieving certification thresholds defined in spec.md.

### Authorized Inputs
Solely `docs/sprints/sprint-05/implementation/task-engine/*`.

### Tasks to Perform
- Update CI/CD workflows (`.github/workflows/`) to enforce Quality Baselines:
  - Configure Lighthouse audit gates (Performance, SEO, Accessibility, Best Practices ≥ 95)
  - Ensure type-check, lint, and test gates are blocking
  - Configure workflow to fail on any regression
- Run full Lighthouse audit on `/`, `/about`, `/projects` routes
- Verify all Lighthouse scores meet ≥ 95 threshold
- Search codebase for `TODO` comments and resolve or remove them
- Update `README.md` to include Governance section with link to `docs/sprints/sprint-05/planning/planning.md`
- Verify all Sprint-05 documentation exists and is complete (G-01 test)
- Run complete test suite and verify 100% pass rate
- Verify repository is "Public-Ready" per data-dictionary.md definition

### Explicit Non-Goals
- No new features or functional pages
- No backend logic changes
- No dynamic data fetching or third-party analytics
- No creative design deviations

### Notes Requirement
Log in `notes.md`:
- CI/CD workflow changes made
- Lighthouse audit results (all routes, all metrics)
- List of `TODO` comments found and how they were resolved
- README.md changes made
- Any blockers encountered during certification
- Final verification checklist results

### Completion Criteria
- L-01 (Lighthouse Quality Baseline) test passes (all metrics ≥ 95)
- G-01 (Governance Documentation) test passes
- G-02 (Lint Strictness) test passes
- R-01 (Regression Suite) test passes
- V-01 (Swiss Typography) test passes
- V-02 (Grid Alignment) test passes
- CI pipeline is green (all gates passing)
- No `TODO` comments remain in codebase
- `README.md` contains Governance section
- Repository meets "Public-Ready" definition from data-dictionary.md

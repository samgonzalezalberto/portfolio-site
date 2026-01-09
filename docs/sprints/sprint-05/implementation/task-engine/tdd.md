## Tests

### G-01: Governance Documentation limits
**Test**: Governance files govern the repo
- **Scenario**: Verify `docs` folder structure and content.
- **Expected**: All Sprint-05 docs exist. `README.md` contains a 'Governance' section with links to `docs/sprints/sprint-05/planning/planning.md`.
- **Validates**: Documentation completeness.

### V-01: Swiss Typography Enforcement
**Test**: Visual Snapshots of Typography
- **Scenario**: Render Reference page (Typography).
- **Expected**: H1-H6, p, and small text render with correct Swiss font-family, weights, and modular spacing.
- **Validates**: Visual design system integrity.

### V-02: Grid Alignment
**Test**: Visual Snapshots of Layouts
- **Scenario**: Render Home, Project, About pages.
- **Expected**: Containers and text align to the 12-column grid. Margins are consistent.
- **Validates**: Swiss grid adherence.

### L-01: Lighthouse Quality Baseline
**Test**: Lighthouse Audit (Mobile & Desktop)
- **Scenario**: Run Lighthouse on `/`, `/about`, `/projects`.
- **Expected**: Performance >= 95, Accessibility >= 95, Best Practices >= 95, SEO >= 95.
- **Validates**: Public quality standard.

### G-02: Lint Strictness
**Test**: No ESLint Disables
**Scenario**: Grep `src/` directory for `eslint-disable`.
**Expected**: No occurrences found.
**Validates**: Code quality strictness.

### R-01: Regression Suite
**Test**: Full E2E Run
- **Scenario**: Run complete Playwright suite.
- **Expected**: 100% pass rate. No flakes.
- **Validates**: no functional regression during design cleanup.

## Edge Cases

- **Mobile Viewports**: Swiss grid must collapse gracefully to single column without breaking horizontal scroll.
- **Text Reflow**: Large headings must not overflow on small screens (typography fluid scaling).
- **High Contrast**: Swiss restraint must still meet WCAG AA contrast (e.g., light gray text must be dark enough).

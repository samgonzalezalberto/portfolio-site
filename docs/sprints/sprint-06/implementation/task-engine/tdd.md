## Tests

### Visual Regression Tests (Playwright)
*   **Snapshot Updates**: `tests/e2e/visual.spec.ts` must be updated to capture the new "Swiss Style" baselines.
*   **Coverage**: Snapshots for:
    *   Home Page (Hero scaling)
    *   Project Index (List layout vs Cards)
    *   Project Details (Typographic measure and reading rhythm)
    *   About Page (Text density and column usage)
*   **Validation**: automated diffs must be zero against new baselines.

### Accessibility Tests (Automated + Manual)
*   **Contrast**: `tests/e2e/a11y.spec.ts` must pass.
    *   *Check*: Verify that large typographic elements maintain strictly passing contrast ratios against backgrounds.
*   **Zoom/Reflow**: Manual test ensuring 200% zoom does not cause overlap of "poster" typography.
    *   *Documentation*: Test procedure and results must be recorded in `docs/sprints/sprint-06/summary/a11y-manual-report.md`.
    *   *Passing Criteria*: No content overlap, no truncation, and all navigation remains clickable at 200% browser zoom.

### Unit Tests (Component Rendering)
*   **Typographic Components**: Verify that `Typography` components render correct HTML tags (`h1`, `h2`, etc.) regardless of visual style class.
*   **Grid Structure**: Verify `Grid` and `Container` components correctly apply appropriate Tailwind grid classes.

## Edge Cases

*   **Long Titles**: Test behavior of "Poster Scale" typography when titles exceed the viewport width.
    *   *Expectation*: Titles must wrap at word boundaries using `overflow-wrap: break-word` (verified via snapshot).
*   **Missing Metadata**: How the "Index List" renders when an optional field (e.g., specific date range) is missing (ensure alignment holds).
*   **Mobile Landscape**: Ensure extreme typographic dominance doesn't obscure navigation on short, wide viewports.
*   **Fold Line**: Ensure critical introductions aren't pushed below the fold solely by massive headlines.

## Success Criteria

*   **100% Pass Rate**: All CI gates (Lint, Build, Unit, E2E) pass.
*   **Visual Verification**: Playwright snapshots match the approved high-fidelity design mocks (stored in `tests/e2e/visual.spec.ts-snapshots/`).
*   **Zero A11y Violations**: Axe scans report 0 violations.
*   **Deterministic Snapshots**: The visual tests are stable and do not flake due to layout shifts.


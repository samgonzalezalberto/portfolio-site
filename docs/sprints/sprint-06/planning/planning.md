## Sprint Goal

Systematically replace card-based layouts with typographic index lists; increase headline scale to minimum 4rem (mobile) / 6rem (desktop); remove visible container borders in favor of alignment; enforce 12-column grid compliance.

**Specific Goals:**
*   Replace UI-neutral layouts with **Swiss International compositional logic**.
*   Reframe pages as **typographic compositions**, not component assemblies.
*   Establish **asymmetry with tension** using strong anchors and intentional negative space.
*   Elevate headlines to **poster-scale typographic dominance**.
*   Reduce visible framing (cards, boxes) in favor of **implied structure**.
*   Drive hierarchy through **contrast and scale**, not container density.
*   Present projects as **typographic indices or statements**, not cards.
*   Achieve immediate visual recognition as **International Typographic Style**.
*   Lock visual composition rules as **binding design governance** for all future work.

## Non-Goals

*   **No new features**: No functional additions, new routes, or new content types.
*   **No architectural changes**: Architecture, routing, and data models remain frozen.
*   **No weakening of guarantees**: Determinism, accessibility (WCAG 2.1 AA), and type safety must be preserved.
*   **No new data fields**: Content model is fixed; design must work with existing content.
*   **No uncontrolled experimentation**: All design choices must ground in the authoritative references.

## Invariants (Optional)

*   **Swiss Grid Discipline**: All layouts must adhere strictly to the 12-column responsive grid defined in `constraints.md`.
*   **Typographic Hierarchy**: Type scale is the primary tool for differentiation.
*   **Accessibility**: All color contrast and navigation must meet WCAG 2.1 AA standards; design expression cannot compromise usability.
*   **Performance**: Visual changes must not regress Core Web Vitals (LCP, CLS) or bundle size budgets.
*   **Determinism**: Visual output must be reproducible and testable via snapshots.

## Definition of Done

1.  **Visual Overhaul Complete**: All pages (Home, About, Projects, Contact, Project Detail) reflect the new Swiss International composition rules.
2.  **Snapshot Verification**: Playwright visual regression tests (snapshots) are updated and passing, confirming the new design state.
3.  **Accessibility Compliance**: `a11y.spec.ts` passes with no violations; manual review confirms contrast and semantic structure.
4.  **Documentation Updated**: `docs/sprints/sprint-06/planning/` files are complete and reviewed.
5.  **No Regressions**: Existing functional tests (routing, contact form, interactions) pass without modification.
6.  **Design Governance**: The new visual state is accepted as the binding standard for future sprints.

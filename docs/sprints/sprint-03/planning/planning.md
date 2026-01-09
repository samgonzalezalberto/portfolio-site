## Sprint Goal

Refine the portfolio's User Experience (UX) by introducing lightweight, standard-compliant interactivity and ensuring strict accessibility adherence. The focus is on making the static content feel "alive" and professional through responsive feedback (hover, focus, active states), improved mobile navigation, and visual hierarchy adjustments, without altering the underlying content architecture.

## Non-Goals

-   Introduction of any new pages or content routes.
-   Backend integration or database schema changes.
-   Framework upgrades or new heavy dependencies (e.g., Framer Motion).
-   Complex animations or non-standard UI patterns.

## Invariants (Optional)

-   **Interaction Cost**: All interactions must use CSS transitions where possible; JavaScript is a fallback only for state management (e.g., menu toggles).
-   **Performance**: CLS (Cumulative Layout Shift) must remain at 0.
-   **Design Consistency**: New interactive states must use existing token interactions (e.g., `accent` color) and not introduce new colors.
-   **Keyboard First**: Every mouse interaction must have an equivalent keyboard interaction.

## Definition of Done

-   **Navigation**: Mobile menu functions correctly (open/close) with trap-focus. Active route is visually distinct.
-   **Interactivity**: All clickable elements (`<a>`, `<button>`) have clear `:hover` and `:focus-visible` states.
-   **Accessibility**: `axe-core` scan returns 0 violations (including "Moderate"). Semantic structure is verified.
-   **Responsiveness**: Layouts verified on mobile, tablet, and desktop viewports without horizontal scroll or overlap.
-   **Code Quality**: All new interactive components have accompanying unit tests for state logic.

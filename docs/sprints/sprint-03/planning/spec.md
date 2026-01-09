## High-Level Model

Sprint-03 layers behavior onto the existing structural foundation. The model shifts from "Static Display" to "Interactive Presentation". This involves converting specific "dumb" Server Components into Client Components (where necessary, like Navigation) to handle transient UI state, while keeping the majority of the content tree static. Interaction feedback is handled primarily through CSS pseudo-classes utilizing the design tokens.

## Component Definitions

### Navigation Updates
-   **`Header`**: Convert to Client Component (if not already for active state). Implement mobile hamburger menu interaction.
-   **`MobileMenu`**: The overlay container for navigation links on mobile viewports. Handles open/closed state visibility and focus trapping.
-   **`NavLink`**: New primitive. Wraps `NextLink` to handle `active` state styling (e.g., text color change or underline interactively).

### Interaction Primitives
-   **`Button` / `Link`**: Standardize generic interactive elements.
    -   `variant="primary"`: Solid accent background (if used).
    -   `variant="text"`: Underline decoration on hover.
-   **`FocusRing`**: A standardized Tailwind utility class set (e.g., `ring-2 ring-accent ring-offset-2`) applied globally to interactive elements via `globals.css` or component composition.

### Content Enhancements
-   **`ProjectCard`**: Add `:hover` state - distinct border color change (`border-neutral-500` -> `border-accent`) and slight scale or shadow elevation.
-   **`ThemeToggle`** (Optional): If scoped, prepare infrastructure for dark/light mode toggle behavior (UI only).

## Behavior / Semantics

### Motion Guidelines
-   **Duration**: Fast. 100ms - 200ms.
-   **Timing Function**: `ease-out` (deceleration) for entering/highlighting.
-   **Properties**: Animate `opacity`, `transform`, `color`, `background-color`, `border-color`. Avoid animating layout properties (`width`, `height`, `margin`).
-   **Reduced Motion**: All transitions must be wrapped in `@media (prefers-reduced-motion: no-preference)`.

### Accessibility Rules
-   **Focus Management**: Opening the Mobile Menu must trap focus within the menu container. Closing the menu must restore focus to the trigger.
-   **Semantic Patterns**:
    -   Hamburger Menu Trigger: `<button aria-expanded="true/false" aria-controls="menu-id">`.
    -   External Links: `aria-label` should indicate "opens in new tab" if not visually obvious.
    -   Skip Link: Add "Skip to Main Content" link as the first focusable element.

## Constraints

-   **State Localization**: State must be pushed as far down the component tree as possible (e.g., `MobileMenu` component holds its own open state).
-   **CSS-in-JS**: Forbidden. Continue using Tailwind classes.
-   **Dependencies**: No new interaction libraries. Use React primitive `useState` and `useEffect`.

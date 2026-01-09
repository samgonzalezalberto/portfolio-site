## Tests

-   **Interaction (E2E)**:
    -   **Mobile Menu**: Verify clicking the hamburger button reveals the menu and clicking close/overlay hides it.
    -   **Focus Navigation**: Tab through the `Header` and `Footer` to verify order.
    -   **Skip Link**: Verify "Skip to Content" becomes visible on focus and scrolls to `<main>`.
-   **Accessibility (Automated)**:
    -   `axe-playwright` scan on all pages with mobile viewport simulation (to trigger mobile menu).
    -   Verify standard contrast ratio on `:hover` and `:active` states for text links.
-   **Component Unit Tests**:
    -   **`NavLink`**:
        -   Applies `active` class when `pathname` matches.
        -   Does not apply `active` class when `pathname` differs.
    -   **`Button` / `Link`**:
        -   Applies correct classes for `variant` props (primary vs text).
        -   Forwards ref and other HTML attributes correctly.
    -   **`MobileMenu`**:
        -   Renders `aria-expanded="true"` when open.
        -   Renders `aria-expanded="false"` when closed.

## Edge Cases

-   **No JS Fallback**: Ensure essential navigation remains usable if JS fails (basic anchor links).
-   **Zoom 200%**: Layout must not break or obscure navigation elements when browser zoom is active.
-   **Keyboard Trap**: Ensure focus cannot leave the mobile menu when it is open.
-   **Fast Clicking**: Rapid toggling of the mobile menu should not desync state.

## Success Criteria

-   **100% Pass Rate** on all new interaction tests.
-   **Zero "Focusable element not visible"** errors in manual audit.
-   **Lighthouse Accessibility Score**: 100/100.
-   **Visual Consistency**: Transitions feel uniform across all components (same timing tokens).

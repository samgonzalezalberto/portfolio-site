# Sprint-03 Implementation Phases

## PHASE 1 — Implement Interaction Primitives

**Purpose**
Establish basic interactive "atoms" (`Button`, `Link`, `NavLink`) and global focus/transition tokens. This creates the foundation for a consistent interactive experience without state leakage.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-03/implementation/task-engine/spec.md`
- `docs/sprints/sprint-03/implementation/task-engine/tdd.md`

**Tasks to Perform**
1.  Read `spec.md` "Interaction Primitives" section.
2.  Update `src/app/globals.css` to add the `@layer utilities` class for `.focus-ring` (or similar standard focus token).
3.  Create `src/components/ui/Button.tsx`.
4.  Create `src/components/ui/Link.tsx` (wrapping `next/link` or `a` tag).
5.  Create `src/components/ui/NavLink.tsx` (using `usePathname` for active state logic).
6.  Create unit tests for these components in `__tests__` or adjacent files as per `tdd.md` "Component Unit Tests".
    -   Verify `Button` variants (primary/text).
    -   Verify `NavLink` active class application.

**Explicit Non-Goals**
-   Do NOT implement the `MobileMenu` yet.
-   Do NOT refactor existing pages yet.

**Notes Requirement**
-   Log the exact Tailwind tokens selected for the `FocusRing`.
-   Document how `NavLink` handles strict vs partial path matching.

**Completion Criteria**
-   `Button`, `Link`, `NavLink` exist and passed unit tests.
-   Interactive elements are keyboard accessible (tabbable with visual indicator).

---

## PHASE 2 — Implement Navigation System

**Purpose**
Build the robust, mobile-responsive navigation system (`Header`, `MobileMenu`) using the primitives from Phase 1. This involves client-side state for the hamburger menu.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-03/implementation/task-engine/spec.md`
- `docs/sprints/sprint-03/implementation/task-engine/tdd.md`
- `docs/sprints/sprint-03/implementation/task-engine/data-dictionary.md`

**Tasks to Perform**
1.  Convert `Header` to a Client Component (if not already) or separate the interactive parts into a `NavBar` client component.
2.  Create `src/components/layout/MobileMenu.tsx` which:
    -   Accepts `isOpen` prop.
    -   Renders as a portal or overlay.
    -   Traps focus when open (using a hook or primitive logic).
3.  Update `Header` to include the `state` (isOpen) and the Hamburger Trigger button.
4.  Write/Update unit tests for `Header` and `MobileMenu`:
    -   Verify ARIA attributes (`aria-expanded`, `aria-controls`).
    -   Verify focus trap logic (mocking focus events if needed).

**Explicit Non-Goals**
-   Do NOT change the footer yet.

**Notes Requirement**
-   Explain the state lifting strategy (where does `isOpen` live?).
-   Detail the focus trap implementation (custom hook vs library, if authorized).

**Completion Criteria**
-   Mobile menu opens/closes.
-   Focus is trapped within menu when open.
-   `Esc` key closes the menu.

---

## PHASE 3 — Content Refinement & Integration

**Purpose**
Apply the new interaction patterns to the main content areas (`ProjectCard`, `ExperienceItem`) and update the application shell to use the new Navigation.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-03/implementation/task-engine/spec.md`

**Tasks to Perform**
1.  Update `src/components/content/ProjectCard.tsx` to add `:hover` styles (border color, scale, shadow) as defined in Spec.
2.  Update `src/components/content/ExperienceItem.tsx` to ensure any links inside it use the new `Link` primitive.
3.  Update `src/app/layout.tsx` (and `Header`/`Footer` integration) to ensure the new Client-side navigation is functioning correctly on all pages.
4.  Add a "Skip to Content" link in `src/app/layout.tsx` (visually hidden until focused).

**Explicit Non-Goals**
-   Do NOT add new content data.

**Notes Requirement**
-   Log any visual regression risks surfacing from the hover states (e.g., layout shift).

**Completion Criteria**
-   Cards have hover states.
-   Skip link is present and functional.
-   Navigation allows moving between pages with active state updates.

---

## PHASE 4 — Accessibility & Final Verification

**Purpose**
Rigorous testing of the interactive enhancements. Execute the "Accessibility Sweep" and final E2E battery.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-03/implementation/task-engine/tdd.md`

**Tasks to Perform**
1.  Run `npx playwright test` (ensure existing behaviors didn't break).
2.  Run the specific new interaction tests defined in `tdd.md` (Mobile Menu E2E).
3.  Perform a manual (or scripted) accessibility audit:
    -   Check tab order on all pages.
    -   Check 400% zoom behavior (simulated via CSS or Playwright).
4.  Fix any contrast issues or label missing errors found.

**Explicit Non-Goals**
-   No new feature dev.

**Notes Requirement**
-   Summarize `axe-core` findings.
-   Confirm "Keyboard First" invariant is met.

**Completion Criteria**
-   All E2E tests pass.
-   0 Accessibility violations.
-   Sprint ready for review.

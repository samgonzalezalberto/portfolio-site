
## Phase 1 — Interaction Primitives

### FocusRing tokens

Standardized focus styling is provided via the `.focus-ring` utility in `src/app/globals.css`.

Tailwind tokens used:

- `focus:outline-none`
- `focus-visible:ring-2`
- `focus-visible:ring-accent`
- `focus-visible:ring-offset-2`
- `focus-visible:ring-offset-canvas`

### Transition tokens

`.interactive-transition` applies the following only when `prefers-reduced-motion: no-preference`:

- `transition-colors transition-opacity transition-transform`
- `duration-150 ease-out`

### NavLink path matching

`NavLink` is active when:

- Root (`href='/'`): strict match (`pathname === '/'`).
- Non-root: `pathname === href` OR `pathname` starts with `${href}/` (segment-prefix matching).

This avoids false positives like `/project` matching `/projects`.

An `exact` prop is available to force strict matching on non-root paths.

## Phase 2 — Navigation System

### State lifting strategy

`NavigationState.isOpen` lives in `Header` (client component) as local `useState`.

- `Header` owns `isOpen` and the trigger button ref.
- `MobileMenu` is a controlled component via `isOpen` and `onClose`.
- Focus restoration is handled in `Header.onClose` by focusing the trigger button.

### Focus trap implementation

Implemented as a small custom trap in `MobileMenu` (no external libraries):

- On open, focus moves to the first focusable element inside the menu (or the menu container).
- `Tab` / `Shift+Tab` are intercepted to cycle focus between first/last focusable elements.
- `Escape` closes the menu via `onClose`.

The core tab-cycling logic is factored into `trapFocusOnTab(...)` for unit testing.

## Phase 3 — Content Refinement & Integration

### ProjectCard hover states

Applied on the card container:

- Base: `border-muted`
- Hover: `hover:border-accent hover:shadow-md`
- Motion token: `interactive-transition` (gated by `prefers-reduced-motion: no-preference`)

### Visual regression risks

- `shadow-md` can change perceived spacing/weight; it should not cause layout shift, but it may clip if a parent has `overflow-hidden`.

## Phase 4 — Accessibility & Final Verification

### Automated a11y (axe-core)

- `tests/e2e/a11y.spec.ts` runs with a mobile viewport and opens the Mobile Menu dialog.
- Result: **0 axe violations** across `/`, `/about`, `/projects`, `/contact`.

Note: `/projects` initially triggered an `axe` `heading-order` violation (h1 → h3). Fixed by inserting an `sr-only` h2 "Project list" before the card grid.

### Keyboard First invariant

Verified via Playwright:

- Skip link is the first focusable element, becomes visible on focus, and moves focus to `#page-root`.
- Mobile menu: focus moves into the dialog on open, `Tab` cycles within the dialog, `Esc` closes, and focus returns to the trigger.

### Zoom sanity check

Simulated “400% zoom” via CSS (`html { zoom: 4; }`) in `tests/e2e/interactions.spec.ts` to ensure the menu trigger remains visible and functional.

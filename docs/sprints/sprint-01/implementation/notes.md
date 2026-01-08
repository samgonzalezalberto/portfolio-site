
## Phase 1 — Configure Design System & Tokens (2026-01-07)

### Authoritative sources reviewed

- `docs/sprints/sprint-01/implementation/task-engine/spec.md`
- `docs/sprints/sprint-01/implementation/task-engine/tdd.md`

### What was found

- The implementation `spec.md` references a Swiss grid and a `DesignTokens` concept, but does not define concrete token values (no color palette hex values, no font families, no font-size scale, no spacing scale values, and no numeric breakpoint definitions).
- The `tdd.md` asserts that Tailwind config should match Swiss design tokens, but it also does not provide the token values.

### Decisions / mappings made

- Grid: The only concrete value present in the authoritative inputs is that the layout is a 12-column grid (“12-column grid defined in DesignTokens”).
	- Implemented a Tailwind grid template `grid-cols-swiss` equivalent via `theme.extend.gridTemplateColumns.swiss = repeat(12, minmax(0, 1fr))` in `tailwind.config.ts`.
	- Added a CSS variable `--swiss-grid-columns: 12` in `src/app/globals.css` to reflect the “CSS variables” mention in the spec, but did not wire it into the Tailwind config because the spec does not define a complete variable-based grid token set.
- Colors / typography / spacing / breakpoints:
	- Not overridden in Tailwind config because the authoritative spec does not provide explicit token values to map.
	- Tailwind defaults remain in effect as a temporary baseline.

### Repo discrepancies / blockers

- `npm run build` did not exist in `package.json`, but Phase 1 requires a build verification step.
	- Added a minimal `build` script that typechecks and runs the Tailwind CLI to validate `tailwind.config.ts` syntax.
- Tailwind was not present in dependencies.
	- Added `tailwindcss` as a devDependency to enable the build check.

### Follow-up needed (blocked on missing token values)

- Provide the actual Swiss design token values in the authoritative spec (palette, type scale, spacing scale, breakpoints, and font families) so `tailwind.config.ts` can be updated to match them exactly.

## Phase 2 — Implement Global Layout Components (2026-01-07)

### What was implemented

- Persistent shell via `RootLayout` in `src/app/layout.tsx`.
- Atomic layout components:
	- `src/components/layout/Header.tsx` (uses semantic `<nav>` inside `<header>`)
	- `src/components/layout/Footer.tsx` (uses semantic `<footer>`)
	- `src/components/ui/GridContainer.tsx` (max-width + horizontal padding)

### Grid implementation decision

- Implemented the “Swiss grid” as CSS Grid using Tailwind classes:
	- Grid structure: `display: grid` + `grid-template-columns: repeat(12, minmax(0, 1fr))` via `grid-cols-swiss` (from `tailwind.config.ts`).
	- Rationale: Spec explicitly calls out a 12-column grid and Tailwind is the required styling mechanism.

### Accessibility / semantics decisions

- `Header` uses `<header>` + `<nav aria-label="Primary">`.
- Main content uses `<main>` via `GridContainer as="main"`.
- `Footer` uses `<footer>`.

### Testing approach (spec mismatch)

- The sprint `tdd.md` references Playwright-style “visual regression/snapshot” tests, but the repository currently has no Playwright setup.
- Implemented an equivalent snapshot-like assertion using Node’s built-in test runner + server-side rendering (`react-dom/server`) to validate that:
	- The `grid-cols-swiss` class is present in the shell (grid persistence).
	- Semantic elements like `<nav>` and `<footer>` appear.

### Test runner adjustment

- Passing a directory to `node --test` while using the `tsx` loader caused a resolution attempt for `tests/unit/index.json` (module-not-found).
- Resolved by switching the `package.json` test scripts to pass explicit file globs instead of directories.

## Phase 3 — Implement Static Page Shells (2026-01-07)

### What was implemented

- Page shells:
	- `src/app/page.tsx` (Home)
	- `src/app/about/page.tsx`
	- `src/app/projects/page.tsx`
	- `src/app/contact/page.tsx`
- Each page contains a distinct `<h1>` placeholder (no final copy).

### Layout inheritance confirmation

- Pages are rendered inside `RootLayout` via server-side rendering, so they automatically include Header/Footer and the Swiss grid wrapper (`grid-cols-swiss`).

### Routing implementation (spec mismatch)

- The authoritative docs describe Next.js App Router routes, but the repo is not currently a Next.js project.
- Implemented an equivalent minimal Node HTTP server (`src/server/server.ts`) that:
	- Serves 200 for `/`, `/about`, `/projects`, `/contact`.
	- Serves 404 for unknown routes.
	- Renders the shell via `react-dom/server` using `RootLayout` + the route page component.

### Client-side navigation test approach (spec mismatch)

- The `tdd.md` references Playwright-based navigation verification, but Playwright is not set up in this repo.
- Implemented a lightweight module script (`src/client/app.mjs`) that intercepts internal `<a href="/...">` clicks and swaps the `#page-root` content without a full reload.
- Verified navigation behavior in a unit test using `linkedom` (DOM emulation) rather than a real browser.

### Correction (Architecture/Constraints compliance)

- The above “equivalent” server + DOM-emulated navigation approach is **not permitted** under the locked stack constraints.
- Per `docs/project/architecture.md` and `docs/project/constraints.md`, the stack is server-first **Next.js App Router** with **Playwright** e2e as CI gates.

Actions taken:

- Removed the custom Node HTTP server and manual `react-dom/server` routing implementation.
- Removed the `linkedom`-based navigation tests and the `tsx`-loader based test harness substitutions.
- Migrated to a minimal Next.js App Router setup (using the existing `src/app/*` routes and `src/app/layout.tsx`).
- Implemented the routing/navigation/404 + snapshot requirements using Playwright tests.

### Verification

- `npm run lint` passes using `next lint`.
- `npm test` passes and runs Playwright against a Next production build (`next build` + `next start`).

### Security / dependency notes

- Upgraded `next` within the 14.2 line to a patched version (pinned) after the initial install reported a security advisory.
- Upgraded Playwright to a patched version (pinned) after `npm audit --omit=dev` reported a high-severity advisory.
- Remaining `npm audit` high-severity items are dev-tooling-only and originate from `eslint-config-next` → `@next/eslint-plugin-next` → `glob`.
	- `npm audit fix --force` would require a major upgrade (Next 16+).
	- Logged for follow-up review since it impacts tooling, not runtime bundles.

### Tooling changes needed for TSX

- Updated TypeScript config to include TSX + DOM libs.
- Updated ESLint config to lint TSX.
- Updated test scripts to run with `tsx` so `.ts/.tsx` tests can execute.



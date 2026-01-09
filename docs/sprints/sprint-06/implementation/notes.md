
## Phase 1 — Foundation Notes

### Grid component
- Kept existing `Grid` implementation intact because it is already used by multiple pages.
- The 12-column compositional grid is represented by `grid-cols-swiss` (Tailwind `gridTemplateColumns.swiss`).
- Gutters use the existing spacing token `gutter` via `gap-gutter` to avoid introducing new spacing scales.

### GridItem API decisions
- Added `GridItem` as a lightweight companion to `Grid` (no layout behavior changes until it is adopted by pages).
- `GridItem` supports asymmetric spanning via `span={5}` / `span={7}` → `col-span-5` / `col-span-7`.
- `span` and `start` accept either a single value or a breakpoint map (`{ base, sm, md, lg, xl }`) to allow responsive column control later without changing the API.
- Implementation note: `GridItem` now uses explicit class maps (e.g. `md:col-span-5`) instead of string interpolation so Tailwind can include the required utilities in the production CSS bundle.

### Typography variants
- Preserved the existing `Typography` component API (currently used in multiple routes and content components).
- Added new poster-scale variants:
	- `TypographicHero` (default semantic tag `h1`)
	- `TypographicHeading` (default semantic tag `h2`)
	- `TypographicBody` (default semantic tag `p`)
- All variants accept an `as` prop so semantic HTML is controlled independently from the visual scale.
- `TypographicHero` includes `break-words` to satisfy `overflow-wrap: break-word` long-title handling.

### Tailwind utility limitations
- Tailwind’s configured font scale currently tops out at `text-4xl`.
- Poster scale is implemented with Tailwind-only utilities using `text-[clamp(...)]`, but importantly the values are **defined centrally** in [src/components/ui/Typography.tsx](src/components/ui/Typography.tsx) (the “typography token surface”) and then consumed via `TypographicHero/TypographicHeading/TypographicBody`.
- This keeps typography immutable and centralized (per `docs/project/constraints.md`) while respecting Sprint-06’s “no custom CSS” rule.

### Unit test coverage
- Added new unit tests under `src/components/ui/__tests__/`:
	- Grid: asserts `grid`, `grid-cols-swiss`, `gap-gutter`, and `GridItem` span application.
	- Typography: asserts semantic tag rendering via `as` and asserts `break-words` on hero.
- Updated the `test:unit` script to include `src/components/ui/__tests__/*.test.*` in addition to existing `tests/unit/*.test.*`.

## Phase 2 — Structural Refactor Notes

### IndexList component
- Implemented as a compound component: `IndexList` + `IndexList.Item` in [src/components/ui/IndexList.tsx](src/components/ui/IndexList.tsx).
- Parent layout: vertical stack with separator rules using Tailwind border utilities (`border-t` + `divide-y`) so the list reads as aligned rows, not cards.
- Item layout: 12-column Swiss grid inside each row with a consistent metadata column (`md:col-span-3`) and content column (`md:col-span-9`), collapsing to a single column on mobile.

### Pages refactored (cards → typographic lists)
- Projects page: replaced `ProjectCard` grid with `IndexList` rows and surfaced `Project.date` as the aligned metadata column.
- About page: replaced bordered `ExperienceItem` cards with `IndexList` rows using date range as metadata and role/company/location as aligned text.

### Grid usage updates
- Wrapped the Projects/About page content in `Grid` + `GridItem` with asymmetric spans (`md:8` content / `md:4` negative space) while keeping mobile as a single-column flow.

### Visual snapshots + mobile checks
- Updated Playwright visual snapshots to match the new structural DOM (cards removed in Projects/About).
- Added Playwright mobile overflow assertions for About/Projects/Contact to guard against horizontal scroll regressions.
- Mobile behavior: metadata column stacks above content and `min-w-0` prevents grid children from forcing horizontal overflow.

## Phase 3 — Visual Application Notes

### Poster-scale typography (exact values)
- Updated poster-scale utilities in [src/components/ui/Typography.tsx](src/components/ui/Typography.tsx):
	- `TypographicHero`:
		- Base: `text-[clamp(4rem,10vw,6rem)]`
		- Desktop (`md+`): `md:text-[clamp(6rem,8vw,7rem)]`
		- Preserves long-title handling via `break-words` (Tailwind’s `overflow-wrap: break-word`).
	- `TypographicHeading`:
		- Base: `text-[clamp(4rem,8vw,5rem)]`
		- Desktop (`md+`): `md:text-[clamp(6rem,6vw,6rem)]`

### Asymmetric grid spans + negative space measurements
- Home hero area ([src/app/page.tsx](src/app/page.tsx)):
	- `md:col-span-5` content + `md:col-span-7` empty column.
	- Desktop negative space allocation: $\frac{7}{12} \approx 58.3\%$ of the grid width (meets the “minimum 40% negative space on desktop” requirement).
- Projects/About/Contact page layouts:
	- Standardized on the same `md:5/7` split to keep a consistent “poster + void” tension on desktop viewports.
	- Mobile collapses to a single column (`base:12`) so vertical rhythm replaces horizontal tension.

### Typographic measure (45–75ch)
- Applied `max-w-[65ch]` to key supporting copy on:
	- Home hero lead
	- Projects page intro
	- About page intro
	- Contact page intro
	- Project detail description
- Rationale: keep the primary reading measure in the middle of the 45–75 character target range without introducing new Tailwind config.

### Project detail marginalia
- Project detail page ([src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx)):
	- Title uses `TypographicHero` (dominant element).
	- Date + outbound links (Code/Demo) rendered in a dedicated aligned column as marginalia (small mono text and link scale).
	- Technologies rendered as small “Tags” to match the data dictionary’s “functional texture” role.

### Contrast verification (WCAG 2.1 AA)
- No new colors were introduced; large type uses existing `text-foreground` / `text-muted` tokens.
- Automated verification: `tests/e2e/a11y.spec.ts` passes with zero Axe violations after Phase 3 changes.

### Visual regression snapshots
- Updated baselines in `tests/e2e/visual.spec.ts-snapshots/` to reflect poster-scale typography + new layouts.
- Added a new snapshot for project detail (`project-detail.html`) and a mobile no-horizontal-scroll guard for `/projects/portfolio-site`.

## Phase 4 — Polish & Verify Notes

### Edge cases verified (automated)
- Long titles: added an edge-case project and verified `break-words` + no horizontal scroll on its detail page via `tests/e2e/polish.spec.ts`.
- Missing metadata:
	- Made `Project.date`, `Experience.endDate`, and `Experience.location` optional in [src/lib/mdx.ts](src/lib/mdx.ts).
	- Added fixtures omitting these fields and verified list/detail pages render without overflow.
- Mobile landscape (667×375): verified the Menu trigger remains visible and the dialog opens.
- Fold line (1920×1080): verified the Home intro lead remains within the initial viewport.

### Structural anchors
- Pinned navigation + footer to the viewport edges with fixed positioning:
	- [src/components/layout/Header.tsx](src/components/layout/Header.tsx)
	- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)
- Added main padding offsets in [src/app/layout.tsx](src/app/layout.tsx) to prevent overlap.

### Responsive scaling + overflow
- Verified poster type scales up from mobile to desktop via computed font-size check.
- Verified no horizontal scroll for:
	- Mobile portrait (existing visual spec)
	- Mobile landscape (new Phase 4 spec)
	- Edge-case long title (new Phase 4 spec)

### Negative space audit
- Increased grid container max width in [src/components/ui/GridContainer.tsx](src/components/ui/GridContainer.tsx) to support ≥ 40% negative space allocation on large viewports.
- Automated measurement: `tests/e2e/polish.spec.ts` measures the primary content column width (the `md:col-span-5` column containing the H1) and asserts inferred negative space ≥ 40% of viewport width at 1920×1080.

### Visual stability
- Confirmed visual snapshots match updated baselines and are stable across repeated runs (see Phase 4 verification commands).

### Phase 4 verification (Jan 9, 2026)
- `npx playwright test tests/e2e/polish.spec.ts`: pass (8/8)
- `npx playwright test tests/e2e/a11y.spec.ts`: pass (4/4)
- `npx playwright test tests/e2e/visual.spec.ts` (3 consecutive runs): pass (12/12 each run, no diffs)
- `npx playwright test tests/e2e/routing.spec.ts tests/e2e/interactions.spec.ts`: pass (10/10)

### Manual accessibility verification (required)
- Zoom/Reflow @ 200% browser zoom is a **manual requirement** in `tdd.md`.
- Procedure + results must be recorded in [docs/sprints/sprint-06/summary/a11y-manual-report.md](docs/sprints/sprint-06/summary/a11y-manual-report.md).
- Status: the report artifact is present and updated with automated proxy results, but still requires a human-run 200% browser zoom pass/fail per route.



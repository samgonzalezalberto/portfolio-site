# Sprint-05 — Phase 1 Notes (System Baseline & Configuration)

## Modular Scale (Major Third, 1.250)
Configured in [tailwind.config.ts](../../../../../tailwind.config.ts):
- `xs`: `0.8rem`
- `sm`: `1rem`
- `base`: `1rem`
- `lg`: `1.25rem`
- `xl`: `1.5625rem`
- `2xl`: `1.953125rem`
- `3xl`: `2.44140625rem`
- `4xl`: `3.0517578125rem`

## globals.css removals
Updated [src/app/globals.css](../../../../../src/app/globals.css) to contain only reset + base styles.
Removed:
- `@layer utilities` block defining `.focus-ring` and `.interactive-transition`
- `@media (prefers-reduced-motion: no-preference)` block that applied transitions

Note: `.focus-ring` and `.interactive-transition` were migrated into a Tailwind plugin (still available as classnames, but no longer defined in `globals.css`).

## ESLint changes
Updated [.eslintrc.json](../../../../../.eslintrc.json):
- Set `noInlineConfig: true` (disallows `eslint-disable` / inline ESLint directives)
- Set `reportUnusedDisableDirectives: true`

## Build verification
- `npm run build`: success (no issues encountered)

---

# Phase 2 — Visual Standardization (Sweep)

## Components refactored
- [src/components/ui/Grid.tsx](../../../../../src/components/ui/Grid.tsx): standardized grid gaps to `gap-gutter`.
- [src/components/ui/GridContainer.tsx](../../../../../src/components/ui/GridContainer.tsx): standardized horizontal padding to `px-gutter`.
- [src/components/ui/Container.tsx](../../../../../src/components/ui/Container.tsx): standardized horizontal padding to `px-gutter`.
- [src/components/ui/Typography.tsx](../../../../../src/components/ui/Typography.tsx): enforced Swiss tracking conventions (`tracking-tighter` for h1/h2).
- [src/components/layout/Header.tsx](../../../../../src/components/layout/Header.tsx): replaced ad-hoc spacing with `py-gutter` and `gap-gutter`.
- [src/components/layout/MobileMenu.tsx](../../../../../src/components/layout/MobileMenu.tsx): replaced `px-6/py-6` and `gap-6` with `px-gutter/py-gutter` and `gap-gutter`.
- [src/components/layout/Footer.tsx](../../../../../src/components/layout/Footer.tsx): standardized spacing to `gap-gutter`; standardized link focus to `focus-ring interactive-transition`.
- [src/components/content/ProjectCard.tsx](../../../../../src/components/content/ProjectCard.tsx): standardized link focus to `focus-ring interactive-transition` and aligned small link text to `text-xs`.

## Pages updated
- [src/app/page.tsx](../../../../../src/app/page.tsx): removed ad-hoc grid gap usage (now uses Grid default `gap-gutter`); standardized link focus.
- [src/app/about/page.tsx](../../../../../src/app/about/page.tsx): standardized external link focus and small link text.
- [src/app/projects/page.tsx](../../../../../src/app/projects/page.tsx): removed ad-hoc grid gap usage (now uses Grid default `gap-gutter`).
- [src/app/projects/[slug]/page.tsx](../../../../../src/app/projects/%5Bslug%5D/page.tsx): removed ad-hoc grid gap usage; standardized link focus.
- [src/app/contact/page.tsx](../../../../../src/app/contact/page.tsx): standardized link focus and aligned small text to `text-xs`.
- [src/app/not-found.tsx](../../../../../src/app/not-found.tsx): standardized link focus and aligned small text to `text-xs`.

## eslint-disable removals
- None found in `src/` (no removals required).

## Visual snapshot updates
- Updated Playwright HTML snapshots in [tests/e2e/visual.spec.ts-snapshots](../../../../../tests/e2e/visual.spec.ts-snapshots) to reflect intentional spacing + typography class standardization.

## Mobile viewport testing
- Added explicit no-horizontal-scroll and h1-width assertions in [tests/e2e/visual.spec.ts](../../../../../tests/e2e/visual.spec.ts).
- Full E2E run passed (mobile menu behavior, focus trap, and routing unchanged).

## Contrast / a11y verification
- Axe checks passed with zero violations on `/`, `/about`, `/projects`, `/contact` (mobile viewport).

---

# Phase 3 — Governance & Certification

## CI/CD workflow changes
- Updated [.github/workflows/ci.yml](../../../../../.github/workflows/ci.yml)
    - Kept Docker image build as a deterministic environment check.
    - Added `quality` job (Node 20.11.0) that runs: typecheck, lint, unit tests, E2E tests, and a governance docs check (G-01).
    - Added `lighthouse` job (Node 20.11.0) that runs Lighthouse CI gates (mobile + desktop) with thresholds ≥ 95.
    - Uploaded Lighthouse reports as workflow artifacts.

## Lighthouse audit results (L-01)
Generated reports under [test-results/lighthouse](../../../../../test-results/lighthouse).

- **Mobile** (representative runs)
    - `/`: Performance 99, Accessibility 100, Best Practices 96, SEO 100
    - `/about`: Performance 99, Accessibility 100, Best Practices 96, SEO 100
    - `/projects`: Performance 99, Accessibility 100, Best Practices 96, SEO 100

- **Desktop** (representative runs)
    - `/`: Performance 100, Accessibility 100, Best Practices 96, SEO 100
    - `/about`: Performance 100, Accessibility 100, Best Practices 96, SEO 100
    - `/projects`: Performance 100, Accessibility 100, Best Practices 96, SEO 100

## TODO scan
- No `TODO`/`FIXME` comments found in `src/`.

## README governance update
- Added required Governance section and link in [README.md](../../../../../README.md).

## Sprint-05 docs completeness (G-01)
- Verified presence of `docs/sprints/sprint-05/planning/planning.md`.
- CI includes a docs check that asserts README contains a Governance header and the planning link.

## Final verification checklist
- Build: `npm run build` (pass)
- Typecheck: `npm run typecheck` (pass)
- Lint: `npm run lint` (pass)
- Unit: `npm run test:unit` (pass)
- E2E: `npm run test:e2e` (pass)
- Lighthouse: `npm run lighthouse:ci` (pass; ≥95 all categories)

## Issues encountered
- Local environment Node/NPM mismatch produced `EBADENGINE` warnings (project engines require Node 20.11.0 + npm 10.2.4). CI uses Node 20.11.0.
- `npm install` reported vulnerabilities via `npm audit`; not addressed as part of Sprint-05 scope.

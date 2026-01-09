# Sprint-06 Implementation Plan

## PHASE 1 — Foundation

### Purpose
Implement the `Compositional Grid` wrapper and `Typographic` scale component logic without changing page layouts. This phase establishes the structural foundation for Swiss International composition while maintaining existing visual appearance, allowing isolated verification of grid mechanics and typography component rendering before applying visual transformations.

### Authorized Inputs
The coding agent's sole authoritative inputs are:

docs/sprints/sprint-06/implementation/task-engine/
- spec.md
- tdd.md
- data-dictionary.md

The coding agent may not reference planning documents or project-level documents.

### Tasks to Perform
- Create `src/components/ui/Grid.tsx` component implementing the 12-column Compositional Grid per data-dictionary.md entity definition
  - Support asymmetric column spanning (e.g., `col-span-5`, `col-span-7`)
  - Enforce responsive gutter behavior using existing Tailwind tokens
  - Export `Grid` and `GridItem` components with TypeScript props for column span configuration
- Create `src/components/ui/Typography.tsx` component for poster-scale typographic elements
  - Implement semantic HTML tag rendering (`h1`, `h2`, `p`, etc.) independent of visual scale
  - Support `overflow-wrap: break-word` for long title handling per spec.md line 18
  - Export `TypographicHero`, `TypographicHeading`, and `TypographicBody` variants
- Write unit tests in `src/components/ui/__tests__/Grid.test.tsx`:
  - Verify `Grid` component applies correct Tailwind grid classes
  - Verify `GridItem` component accepts and applies column span props
- Write unit tests in `src/components/ui/__tests__/Typography.test.tsx`:
  - Verify `Typography` components render correct HTML tags regardless of visual style class
  - Verify `overflow-wrap: break-word` is applied to hero variants
- Verify build succeeds with new components

### Explicit Non-Goals
- No changes to existing page layouts or component usage
- No visual styling changes to existing components
- No modifications to `next.config.mjs`, `tailwind.config.ts`, or server-side logic
- No custom CSS files or `<style>` blocks

### Notes Requirement
`notes.md` must capture:
- Grid component implementation decisions (column span API design, responsive breakpoint handling)
- Typography component variant structure and semantic HTML mapping
- Any Tailwind utility limitations encountered
- Unit test coverage decisions

### Completion Criteria
- Build succeeds (`npm run build`)
- Unit tests pass for `Grid` and `Typography` components
- `a11y.spec.ts` passes (no regressions)
- New components exist but are not yet used in pages (no visual changes)

---

## PHASE 2 — Structural Refactor

### Purpose
Replace container-based card components with the `IndexList` pattern and remove visible borders, transforming the structural composition from "box-based groupings" to "typographic alignment." This phase isolates structural DOM changes from visual styling changes, allowing verification of layout mechanics and accessibility before applying poster-scale typography.

### Authorized Inputs
The coding agent's sole authoritative inputs are:

docs/sprints/sprint-06/implementation/task-engine/
- spec.md
- tdd.md
- data-dictionary.md

The coding agent may not reference planning documents or project-level documents.

### Tasks to Perform
- Create `src/components/ui/IndexList.tsx` component per data-dictionary.md entity definition:
  - Implement parent `IndexList` container with vertical stack layout
  - Implement `IndexList.Item` child component with columnar metadata alignment
  - Support horizontal separator lines (using Tailwind border utilities)
  - Export `IndexList` and `IndexList.Item` as compound component
- Refactor `src/app/projects/page.tsx`:
  - Replace existing card-based project listing with `IndexList` component
  - Map project metadata (title, date, description) to `IndexList.Item` columnar structure
  - Remove container borders and background fills
  - Maintain existing content order and routing behavior
- Refactor `src/app/about/page.tsx` (if experience/timeline exists):
  - Replace card-based experience listing with `IndexList` component
  - Map experience metadata to chronological tabular alignment per spec.md line 23
- Update `src/components/ui/Grid.tsx` usage in page layouts:
  - Wrap main content areas in `Grid` component
  - Apply asymmetric column spanning (e.g., 8-column content, 4-column negative space)
- Remove visible container borders from all refactored components (no `border`, `rounded`, `shadow` classes on content containers)
- Verify mobile responsiveness (grid collapses to single column, no horizontal scroll)
- Update visual regression snapshots in `tests/e2e/visual.spec.ts` to reflect new structural layout

### Explicit Non-Goals
- No poster-scale typography application yet (Phase 3)
- No changes to headline font sizes or scale tokens
- No modifications to navigation or footer components
- No new routes or data model changes

### Notes Requirement
`notes.md` must capture:
- `IndexList` component implementation decisions (separator line styling, metadata column widths)
- List of pages refactored and specific card components replaced
- Visual snapshot updates and rationale
- Mobile viewport testing results
- Any alignment challenges with existing content structure

### Completion Criteria
- Build succeeds (`npm run build`)
- `a11y.spec.ts` passes (WCAG 2.1 AA maintained)
- Visual regression snapshots updated and passing (structural changes documented)
- Mobile viewports render correctly (no horizontal scroll, readable text)
- Projects and experience content render as typographic lists, not cards
- No visible container borders remain on refactored components

---

## PHASE 3 — Visual Application

### Purpose
Apply poster-scale typography and asymmetric alignment rules to page layouts using the new `Grid` and `Typography` components established in Phases 1-2. This phase transforms the visual expression from "neutral UI" to "Swiss International Typographic Style" while maintaining the structural foundation and accessibility guarantees.

### Authorized Inputs
The coding agent's sole authoritative inputs are:

docs/sprints/sprint-06/implementation/task-engine/
- spec.md
- tdd.md
- data-dictionary.md

The coding agent may not reference planning documents or project-level documents.

### Tasks to Perform
- Update `src/app/page.tsx` (Home):
  - Replace standard header with `TypographicHero` component at poster scale (6rem+ per spec.md line 17)
  - Apply asymmetric grid layout (e.g., 5-column text, 7-column negative space per spec.md line 13)
  - Ensure minimum 40% viewport width allocated to negative space on desktop per spec.md line 6
  - Verify tight leading and intentional line breaks for graphic shape per spec.md line 18
- Update `src/app/projects/page.tsx`:
  - Apply `TypographicHeading` to page title at poster scale (minimum 4rem mobile, 6rem desktop per planning.md line 3)
  - Ensure `IndexList` items use typographic hierarchy (large title, smaller metadata)
  - Verify horizontal rules and column alignment create visual rhythm
- Update `src/app/projects/[slug]/page.tsx` (Project Detail):
  - Apply `TypographicHero` to project title
  - Control typographic measure for body text (45-75 characters per data-dictionary.md line 24)
  - Ensure metadata (date, tags) rendered as marginalia (small scale, aligned columns per data-dictionary.md line 25-26)
- Update `src/app/about/page.tsx`:
  - Apply poster-scale typography to page heading
  - Verify text density and column usage align to 12-column grid
  - Ensure experience list uses tabular alignment with clear visual rhythm
- Update `src/app/contact/page.tsx`:
  - Apply `TypographicHeading` to page title
  - Maintain form accessibility while applying typographic styling
- Verify all pages meet WCAG 2.1 AA contrast requirements (4.5:1 normal text, 3:1 large text per constraints.md line 27)
- Update visual regression snapshots in `tests/e2e/visual.spec.ts` for all pages:
  - Home Page (Hero scaling)
  - Project Index (List layout with poster typography)
  - Project Details (Typographic measure and reading rhythm)
  - About Page (Text density and column usage)
  - Contact Page (Form with typographic styling)

### Explicit Non-Goals
- No changes to routing or navigation behavior
- No new content fields or data model changes
- No modifications to contact form logic
- No performance optimizations beyond natural CSS improvements

### Notes Requirement
`notes.md` must capture:
- Poster-scale typography decisions (exact `rem` values chosen for each page/component)
- Asymmetric grid column span choices and rationale (e.g., "Chose `col-span-8` for hero title based on spec.md asymmetry requirement")
- Negative space allocation measurements (viewport width percentages)
- Contrast verification results for all large typographic elements
- Visual snapshot updates and before/after comparison notes
- Any typographic adjustments required for mobile viewports

### Completion Criteria
- Build succeeds (`npm run build`)
- `a11y.spec.ts` passes (WCAG 2.1 AA contrast maintained)
- Visual regression snapshots updated and passing for all pages
- All pages use poster-scale typography (minimum 4rem mobile, 6rem desktop for primary headings)
- Asymmetric layouts with minimum 40% negative space on desktop viewports
- Typographic measure controlled for body text (45-75 characters)
- Mobile viewports scale typography appropriately (vertical rhythm replaces horizontal tension per spec.md line 31)

---

## PHASE 4 — Polish & Verify

### Purpose
Final adjustments for negative space distribution, responsive edge cases, long title handling, and comprehensive snapshot verification. This phase ensures the visual composition is deterministic, accessible, and production-ready across all viewport sizes and content variations.

### Authorized Inputs
The coding agent's sole authoritative inputs are:

docs/sprints/sprint-06/implementation/task-engine/
- spec.md
- tdd.md
- data-dictionary.md

The coding agent may not reference planning documents or project-level documents.

### Tasks to Perform
- Test and verify edge cases per tdd.md lines 23-29:
  - **Long Titles**: Create test project with title exceeding viewport width, verify `overflow-wrap: break-word` behavior via snapshot
  - **Missing Metadata**: Test `IndexList` rendering when optional fields (date range) are missing, ensure alignment holds
  - **Mobile Landscape**: Test on short, wide viewports (e.g., 667x375), ensure navigation remains accessible and typography doesn't obscure content
  - **Fold Line**: Verify critical introductions aren't pushed below the fold by massive headlines on standard desktop viewport (1920x1080)
- Verify structural anchors per spec.md lines 25-27:
  - Ensure navigation and footer elements pin to viewport corners/edges
  - Verify tension across empty center of screen on desktop viewports
  - Test sticky/fixed positioning behavior on scroll
- Run comprehensive accessibility verification:
  - Execute `tests/e2e/a11y.spec.ts` and verify zero violations
  - Perform manual 200% zoom test per tdd.md lines 15-17:
    - Document test procedure and results in `docs/sprints/sprint-06/summary/a11y-manual-report.md`
    - Verify no content overlap, no truncation, all navigation clickable at 200% zoom
    - Verify passing criteria: poster typography reflows without breaking layout
- Verify responsive scaling per spec.md line 31:
  - Test typography scale transitions across breakpoints (mobile, tablet, desktop)
  - Verify vertical rhythm on mobile replaces horizontal tension
  - Ensure no horizontal scroll on any viewport size
- Run full visual regression suite:
  - Verify all snapshots in `tests/e2e/visual.spec.ts` pass with zero diffs
  - Confirm snapshots are deterministic (run tests 3 times, verify no flakes)
- Verify existing functional tests pass without modification per planning.md line 38:
  - Run routing tests
  - Run contact form interaction tests
  - Verify no regressions in navigation or page transitions
- Final negative space audit:
  - Measure negative space allocation on Home, Projects, About pages at 1920x1080 viewport
  - Verify minimum 40% viewport width allocated to negative space per spec.md line 6
  - Document measurements in `notes.md`

### Explicit Non-Goals
- No new features or functional additions
- No changes to test infrastructure or CI configuration
- No performance optimizations
- No content changes or new data fields

### Notes Requirement
`notes.md` must capture:
- Edge case test results (long titles, missing metadata, mobile landscape, fold line)
- Structural anchor positioning decisions and behavior
- Manual accessibility test results (200% zoom test procedure and outcomes)
- Responsive scaling verification results across breakpoints
- Visual regression test stability results (flake detection)
- Negative space measurements for each page
- Any final adjustments made to typography or layout
- Any deviations from spec.md forced by technical constraints

### Completion Criteria
- Build succeeds (`npm run build`)
- All CI gates pass (Lint, Build, Unit, E2E)
- `a11y.spec.ts` passes with zero violations
- Manual 200% zoom test documented and passing in `docs/sprints/sprint-06/summary/a11y-manual-report.md`
- All edge cases tested and verified per tdd.md
- Visual regression snapshots deterministic (zero flakes across 3 test runs)
- Existing functional tests pass without modification
- Negative space allocation meets minimum 40% requirement on desktop viewports
- All pages render correctly across mobile, tablet, and desktop breakpoints
- Sprint-06 Definition of Done satisfied (planning.md lines 32-39)

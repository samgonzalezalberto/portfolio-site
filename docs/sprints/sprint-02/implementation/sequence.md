# Sprint-02 Implementation Phases

## PHASE 1 — Configure Design System (Tailwind)

**Purpose**
Establish the "Swiss" visual foundation (colors, typography, grid) by extending the Tailwind configuration. This unlocks the creation of consistent UI components in strictly enforcing the design system invariants.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-02/implementation/task-engine/spec.md`
- `docs/sprints/sprint-02/implementation/task-engine/tdd.md`
- `docs/sprints/sprint-02/implementation/task-engine/data-dictionary.md`

The coding agent may not reference planning documents or project-level documents.

**Tasks to Perform**
1.  Read `spec.md` "Design Primitives" and "Constraints" sections.
2.  Update `tailwind.config.ts` (or create if missing) to extend the theme:
    -   Define colors: `canvas`, `foreground`, `muted`, `accent`.
    -   Define font families and type scale (e.g., `text-sm`, `text-base`, `text-lg` etc. mapped to modular scale).
    -   Define spacing tokens if custom ones are specified.
3.  Ensure `globals.css` (or equivalent) includes the necessary Tailwind directives and resets.
4.  Create a visual test page or verify via a script that the config is valid and variables are resolved.

**Explicit Non-Goals**
-   Do NOT implement any React components yet.
-   Do NOT change `layout.tsx` or pages.

**Notes Requirement**
-   Log exactly which hex codes/values were used for each token in `notes.md`.
-   Document how the type scale was calculated.

**Completion Criteria**
-   `tailwind.config.ts` matches the `spec.md` token definitions.
-   Running `npx tailwindcss -o build.css` (or equivalent build check) succeeds without errors.

---

## PHASE 2 — Implement Layout & Typography Primitives

**Purpose**
Build the "dumb" structural components (`Container`, `Grid`, `Section`) and the base `Typography` component. These key primitives enforce alignment and vertical rhythm for all future content.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-02/implementation/task-engine/spec.md`
- `docs/sprints/sprint-02/implementation/task-engine/tdd.md`

**Tasks to Perform**
1.  Create `src/components/ui/Container.tsx`.
2.  Create `src/components/ui/Grid.tsx`.
3.  Create `src/components/ui/Section.tsx`.
4.  Create `src/components/ui/Typography.tsx`.
5.  Create `src/components/ui/ids.ts` or similar to manage test IDs if needed (optional).
6.  Create unit tests for each component in `__tests__` or adjacent `.test.tsx` files as per `tdd.md` "Component Unit Tests".
    -   Verify `Container` applies max-width/padding.
    -   Verify `Grid` applies columns based on props.
    -   Verify `Typography` renders correct tags (`h1` vs `p`).
    -   Verify `Section` applies vertical padding.

**Explicit Non-Goals**
-   Do NOT implement complex cards or business logic components.
-   Do NOT use `useEffect` or client-side logic; keep them Server Components (stateless).

**Notes Requirement**
-   Record component API signatures (props) in `notes.md`.
-   Note any prop-to-classname mappings used.

**Completion Criteria**
-   All 4 components depend ONLY on Tailwind classes (no inline styles).
-   Unit tests for `Container`, `Grid`, `Section`, and `Typography` pass.

---

## PHASE 3 — Implement Content Modules

**Purpose**
Create the specific display components (`ProjectCard`, `ExperienceItem`, `SkillBadge`) that will visualize the portfolio data. These depend on the primitives from Phase 2.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-02/implementation/task-engine/spec.md`
- `docs/sprints/sprint-02/implementation/task-engine/tdd.md`

**Tasks to Perform**
1.  Create `src/components/content/ProjectCard.tsx` (using `Typography` and `SkillBadge` inside).
2.  Create `src/components/content/ExperienceItem.tsx` (using `Typography` inside).
3.  Create `src/components/content/SkillBadge.tsx`.
4.  Create unit tests for each component as per `tdd.md`.
    -   `ProjectCard`: Test title, description, links rendering.
    -   `ExperienceItem`: Test role, date, description rendering.
    -   `SkillBadge`: Test text rendering.

**Explicit Non-Goals**
-   Do NOT fetch data yet; use hardcoded props in tests.
-   Do NOT implement the main pages yet.

**Notes Requirement**
-   Log decision on how optional fields (e.g., `repoUrl`) are handled (conditional rendering logic) in `notes.md`.

**Completion Criteria**
-   Components visually resemble the "Swiss" description (via usage of tokens).
-   Unit tests for `ProjectCard`, `ExperienceItem`, and `SkillBadge` pass.

---

## PHASE 4 — Implement Data Layer

**Purpose**
Set up the file-based content source using MDX. This ensures content is separated from presentation and satisfies the auditability architectural requirement.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-02/implementation/task-engine/spec.md`
- `docs/sprints/sprint-02/implementation/task-engine/data-dictionary.md`

**Tasks to Perform**
1.  Create `src/content/projects/` and `src/content/experience/` directories.
2.  Create MDX files for the portfolio content (real data) in these directories, adhering to Frontmatter schemas in `data-dictionary.md`.
3.  Install necessary MDX parsing libraries (e.g., `gray-matter`, `next-mdx-remote` or similar lightweight solution) if not present.
4.  Create `src/lib/mdx.ts` (or similar utility) to read/parse files and return typed objects (`Project`, `Experience`).
5.  Create a unit test for `src/lib/mdx.ts` to verify it correctly parses a sample MDX file.

**Explicit Non-Goals**
-   Do NOT build the UI pages that consume this data yet.

**Notes Requirement**
-   Document the chosen MDX parsing library and why in `notes.md`.
-   List the count of projects and experience items added.

**Completion Criteria**
-   `src/lib/mdx.ts` can successfully load and type-check data from `src/content/`.
-   Unit test for data loading passes.

---

## PHASE 5 — Assembly & Page Integration

**Purpose**
bring it all together. Populate the primary routes (`/`, `/about`, `/projects`, `/contact`) using the Layouts (Phase 2), Components (Phase 3), and Data (Phase 4).

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-02/implementation/task-engine/spec.md`
- `docs/sprints/sprint-02/implementation/task-engine/tdd.md`

**Tasks to Perform**
1.  Update `src/app/page.tsx` (Home): Add Hero section, featured ProjectCards.
2.  Update `src/app/about/page.tsx`: Add Biography, Experience list (using `ExperienceItem`).
3.  Update `src/app/projects/page.tsx`: Add full `Grid` of `ProjectCard`s.
4.  Update `src/app/contact/page.tsx`: Add contact methods.
5.  Update `src/components/layout/Header.tsx` and `Footer.tsx` (if they exist, or create/update `src/app/layout.tsx`) to match new Navigation specs and active states.

**Explicit Non-Goals**
-   Do NOT add complex animations.

**Notes Requirement**
-   Log any deviations in page structure required by Next.js App Router constraints in `notes.md`.

**Completion Criteria**
-   All 4 routes render without runtime errors.
-   Content matches the MDX files.
-   Navigation works correctly.

---

## PHASE 6 — Final Verification

**Purpose**
Execute the comprehensive test suite to ensure the "Definition of Done" is met, specifically covering Accessibility and E2E flows.

**Authorized Inputs**
The coding agent’s sole authoritative inputs are:
- `docs/sprints/sprint-02/implementation/task-engine/tdd.md`

**Tasks to Perform**
1.  Ensure all server processes are running (dev server).
2.  Run `npx playwright test` (or existing E2E command).
3.  If tests fail, debug and fix the *code*, do not lower the test standards.
4.  Run accessibility audit (if integrated into E2E or separate script).
5.  Verify console is clean (no hydration errors).

**Explicit Non-Goals**
-   New feature development.

**Notes Requirement**
-   Summarize test results in `notes.md`.
-   List any fixed bugs discovered during verification.

**Completion Criteria**
-   All E2E tests pass.
-   Accessibility checks pass.
-   Sprint is ready for review.

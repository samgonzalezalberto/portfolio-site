## Sprint Goal

Populate all primary portfolio pages (`/`, `/about`, `/projects`, `/contact`) with definitive, structured content. Implement a foundational "Swiss-inspired" design system (tokens for typography, spacing, color) and a library of reusable, composable UI components to replace initial shells. Ensure all implementations adhere to strict accessibility (WCAG AA) and architectural determinism.

## Non-Goals

-   Backend integration or database setup (content remains file-based/hardcoded for now).
-   CMS integration or dynamic content fetching logic.
-   Analytics or third-party tracking implementation.
-   Deployment infrastructure changes.
-   Visual experimentation outside the strict limits of the defined design tokens.

## Invariants (Optional)

-   **Swiss Design Discipline**: Strict adherence to the 12-column grid and modular type scale. No arbitrary values.
-   **Server-First**: Components are Server Components by default; Client Components used only for interactivity.
-   **Token-Driven**: All styling must use Tailwind utility classes defined in the configuration; no hardcoded hex values.
-   **Accessibility**: Semantic HTML is mandatory; interaction patterns must support keyboard navigation.

## Definition of Done

-   **Design System**: Tailwind config updated with fonts, colors, and specific spacing intervals.
-   **Components**: Core set (`Container`, `Grid`, `Section`, `Typography`, `ProjectCard`, `ExperienceItem`, `SkillBadge`) implemented and unit tested.
-   **Pages**: All four primary routes populated with content sourced from `src/content/*.mdx` (not TS constants).
-   **Validation**: E2E tests (`content.spec.ts`, `navigation.spec.ts`) pass. Accessibility audit (`axe-playwright`) passes with zero critical/serious issues. Documented in `summary/`.

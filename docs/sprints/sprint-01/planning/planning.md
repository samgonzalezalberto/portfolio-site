## Sprint Goal

Establish the static front-end foundation of the portfolio website by defining the HTML/CSS skeleton, implementing the Swiss-style grid and typography system using Tailwind CSS, and creating the initial static structure for Home, About, Projects, and Contact pages with placeholder content.

## Non-Goals

- Implementation of backend logic, API routes, or database connections.
- Dynamic data fetching or content rendering from external sources.
- Interactive JavaScript behavior beyond basic navigation.
- Final content authoring or copywriting.
- Production deployment configuration (preview environment only).
- Third-party integrations (forms, analytics).

## Determinism / Invariants (Optional)

- All pages must strictly adhere to the defined Swiss grid layout and typography tokens.
- No ad-hoc CSS; all styling must use configured Tailwind utility classes.
- Navigation links must lead to valid routes, even if content is placeholder.
- The build process must run successfully without errors or linting warnings.

## Definition of Done

- Tailwind CSS is configured with the Swiss design system tokens (colors, fonts, grid).
- Global layout component (header, footer, main grid) is implemented.
- Static page shells for Home, About, Projects, and Contact are created and routable.
- Visual regression tests (snapshot or manual verification steps) for key layouts are defined.
- Project builds successfully locally and passes all linting/type checks.
- A local live preview environment is documented and functional.

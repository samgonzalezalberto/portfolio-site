## High-Level Model

The sprint implements the fundamental layout structure of the application using Next.js App Router and Tailwind CSS. It establishes the "Swiss Grid" system as the visual backbone, defined via CSS variables and Tailwind configuration tokens. Four static routes (`/`, `/about`, `/projects`, `/contact`) are established as server-rendered pages using a shared `Layout` component that enforces the grid and typographic hierarchy.

## Component Definitions

- **DesignTokens**: Centralized configuration (Tailwind theme) for colors, spacing, typography, and grid definitions.
- **RootLayout**: The precise wrapper component (`layout.tsx`) ensuring the Swiss grid, header, and footer persist across all pages.
- **Header**: Navigation component containing the site title and links to main routes.
- **Footer**: Semantic footer containing copyright and social links (placeholder).
- **PageShell**: The structural template for individual pages (`page.tsx` for each route) accepting children content.
- **SwissGridContainer**: A utility component or CSS class set that enforces the 12-column grid and strict alignment.

## Behavior / Semantics

- **Routing**: Users navigating to `/`, `/about`, `/projects`, or `/contact` receive a 200 OK response with the respective static HTML.
- **Grid Alignment**: All content block elements align to the 12-column grid defined in `DesignTokens`. Margins and padding strictly follow the spacing scale.
- **Typography**: Text elements render using the primary font family and type scale defined in `DesignTokens`. Hierarchies (H1-H6, p) are visually distinct via class utilities.
- **Responsiveness**: The grid adapts to viewport changes (e.g., collapsing columns on mobile) according to breakpoints defined in `DesignTokens`.

## Constraints

- **Tailwind Only**: All styling must be achieved via Tailwind utility classes or custom arbitrary values in the config; no external CSS files unless for global resets.
- **Server Components**: All page shells and layout components are React Server Components (RSC) by default.
- **No Client Logic**: `use client` directive is forbidden for this sprint unless strictly necessary for navigation primitives.
- **Asset Placement**: Placeholder images and assets must be placed in the `/public` directory or imported as static assets.

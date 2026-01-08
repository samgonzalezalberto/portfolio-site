## High-Level Model

Sprint-02 transforms the application from a skeletal routing shell into a component-driven content system. The architecture acts as a pipeline where data flows from **local MDX files** (via `fs` and frontmatter parsing) into "dumb" display components (`ProjectCard`, `ExperienceItem`), which are organized by "smart" layout components (`Container`, `Grid`, `Section`). The visual layer is strictly controlled by a central configuration of design tokens (Tailwind theme extension), ensuring the "Swiss" aesthetic is systemic rather than ad-hoc.

## Component Definitions

### Design Primitives
-   **Typography**: Polymorphic component handling `h1` through `h6`, `p`, and `mono` styles. Enforces the modular type scale.
-   **Layout**:
    -   `Container`: Centralizes content with max-width and horizontal padding constraints.
    -   `Section`: Manages vertical rhythm (padding-y) to separate content blocks.
    -   `Grid`: A 12-column responsive grid wrapper for organizing child elements.

### Content Modules
-   **ProjectCard**: A summarized view of a portfolio project. Includes title, description, tech stack tags, and links.
-   **ExperienceItem**: A chronological entry for work history. Displays role, company, date range, and description in a structured layout.
-   **SkillBadge**: A minimal, text-based indicator for technologies/skills.

### Navigation
-   **Header**: Updated with semantic `<nav>` and active state styling using new tokens.
-   **Footer**: Contains social links and copyright, aligned to the grid.

## Behavior / Semantics

-   **Data Strategy**: Content is authored in MDX files within `src/content/`. Keys defined in `data-dictionary.md` correspond to Frontmatter fields. Use a lightweight utility (e.g., `lib/mdx.ts`) to read and parse these files server-side.
-   **Responsiveness**: Layouts default to single-column (mobile), expanding to multi-column grids (tablet/desktop) strictly via the `Grid` component.
-   **Interactivity**: Hover states on interactive elements (links, cards) use the `accent` color token. Primary navigation indicates the current active route.
-   **Accessibility**: All interactive elements have focus rings. Images (if any) have `alt` text. Headings follow a strict `h1 > h2 > h3` hierarchy.

## Constraints

-   **Style Integrity**: Absolutely no inline styles (`style={{ ... }}`). All styling via Tailwind classes.
-   **Color Usage**: Colors are restricted to the defined palette (`canvas`, `foreground`, `muted`, `accent`).
-   **Semantic HTML**: Layouts must use semantic tags (`<article>`, `<aside>`, `<main>`) where appropriate, not nested `<div>` soup.
-   **Filesystem**: New components must reside in `src/components/ui` (primitives) or `src/components/content` (modules).

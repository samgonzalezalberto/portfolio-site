## High-Level Model

The **Typographic Composition Engine** is the conceptual model for this sprint. It reinterprets the application's Next.js pages not as responsive trees of nested containers, but as **editorial posters** governed by a strict Swiss International grid. The page is a canvas where type, negative space, and alignment are the primary structural forces.

*   **From:** Neutral containment, card-based groupings, implicit hierarchy.
*   **To:** Strong asymmetry, scale-based hierarchy, typographic alignment anchors, and minimum 40% viewport width allocated to negative space on desktop viewports.

## Component Definitions

### 1. The Compositional Grid (Layout)
*   **Definition**: A dominant 12-column recursive grid that enforces alignment.
*   **Role**: All elements must align to grid tracks. Elements rarely fill just "available space"—they occupy intentional coordinate systems.
*   **Key Behavior**: Supports asymmetric column spanning (e.g., 5-col text vs 7-col space).

### 2. Typographic Hero
*   **Definition**: Primary page entry point using poster-scale typography.
*   **New Role**: Breaks out of standard "header" containers. Uses massive scale contrast (e.g., 6rem+) to act as the primary graphic image of the page.
*   **Properties**: Tight leading, kerning for display, intentional line breaks for graphic shape, must wrap at word boundaries with overflow-wrap: break-word.

### 3. The Index List (Replaces Cards)
*   **Definition**: A typographic listing component for Projects and Experience.
*   **New Role**: replaces "container-based card components" with structured, aligned text rows.
*   **Visuals**: Strong horizontal rules (lines), clear column alignment of metadata (Date, Role, Title), heavy reliance on indentation and tabs.

### 4. Structural Anchors
*   **Definition**: Fixed or sticky elements that define the frame.
*   **Role**: Navigation and footer elements that pin the corners or edges, creating tension across the empty center of the screen.

## Behavior / Semantics

*   **Responsive Scaling**: Typography does not just "wrap"—it changes scale rules. On mobile, clear vertical rhythm replaces horizontal tension.
*   **Interaction**: Hover states are typographic (underlines, indent shifts, color inversions) rather than geometric (background fills, shadow lifts).
*   **Z-Index / Layering**: Text is the topmost layer. No purely decorative elements ideally obscure text.

## Constraints

*   **Frozen Architecture**: No new React context providers or state management libraries.
*   **CSS Framework**: Must use existing Tailwind configuration. Custom CSS is strictly forbidden per `constraints.md`.
*   **Content Model**: Must display existing Markdown fields (Title, Date, Description, Tags) without requiring new frontmatter properties.
*   **a11y**: High visual contrast must be maintained. Large text must remain legible and not break layout on zoom.


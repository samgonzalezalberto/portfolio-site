## Entities / Objects

**Note:** No new data models are introduced in Sprint-06. This dictionary focuses on the *visual mapping* of existing content entities.

### 1. Compositional Grid (Visual Entity)
*   **Definition**: The fundamental governing structure for all layout, composed of 12 responsive columns with fixed gutters.
*   **Properties**:
    *   `columns`: 12 (fixed)
    *   `gutter`: Responsive (defined in CSS tokens)
    *   `role`: Enforces alignment and negative space distribution.

### 2. IndexList (Visual Entity)
*   **Definition**: A parent container component that renders a collection of `IndexList.Item` entities.
*   **Properties**:
    *   `layout`: Vertical stack with strict horizontal separator lines.
    *   `alignment`: Enforces columnar alignment of child item metadata.
    *   `role`: Replaces grid-of-cards layouts for `Project` and `Experience` collections.

### 3. Project (Content Entity)
*   **Existing Source**: Markdown/frontmatter in `content/projects/`.
*   **Visual Mapping**: Mapped to `IndexList.Item` for the directory and `ProjectLayout` for details.
*   **Key Concept**: "The Project as a Statement" — reduced metadata display, focused on Title + Summary.

### 4. Experience (Content Entity)
*   **Existing Source**: Markdown/frontmatter in `content/experience/`.
*   **Visual Mapping**: Mapped to `ExperienceList.Item` (Chronological, tabular alignment).

### 5. Navigation Anchor (Visual Entity)
*   **Definition**: A logical entity representing the four corners/edges of the viewport.
*   **Usage**: Maps the main menu links (`/projects`, `/about`, `/contact`) to specific Cartesian coordinates in the layout.

## Fields / Attributes

### Project Metadata Visual Roles
| Field | Type | Visual Role |
| :--- | :--- | :--- |
| `title` | `string` | **Dominant Element**: Rendered at poster scales. Determines the "weight" of the page. |
| `description` | `string` | **Supporting Lead**: High-readability serif or grotesk, measures controlled for optimal reading speed (45-75 chars). |
| `date` | `string` | **Marginalia**: Relegated to structured alignment columns or small-scale metadata groupings. |
| `tags` | `string[]` | **Functional Texture**: Small scale, purely functional lists, often serving as visual rhythm dividers. |

## Relationships

*   **Grid <> Content**: Content flow is subordinate to the **Grid**. If content is too long for the optimal typographic measure, it wraps or scrolls, but the grid columns do not expand to fit content.
*   **Scale <> Hierarchy**: Semantics (`h1`, `h2`) dictate **Scale Token**, not screen position. An `h1` is always the largest element, defining the visual center of gravity.


## Tests

-   **Content Presence (E2E)**: Verify critical content blocks exist on each page.
    -   Home: Hero text, featured links.
    -   About: Biography paragraph, Experience list (> 0 items).
    -   Projects: Project grid container, at least 3 project cards.
    -   Contact: Contact methods displayed.
-   **Navigation Integrity**: Verify all links in Header/Footer and internal page links (e.g., "See all projects") navigate to the correct URL.
-   **Accessibility Scan**: Run `axe-core` analysis against all 4 primary routes to ensure contrast ratios and semantic structure meet WCAG 2.1 AA.
-   **Component Unit Tests**:
    -   **`Container`**:
        -   Renders children correctly.
        -   Applies `mx-auto`, `max-w-screen-xl`, and default padding classes.
    -   **`Grid`**: Renders correct class names based on `cols` prop.
    -   **`Typography`**: Renders correct HTML tag based on `as` prop.
    -   **`ProjectCard`**:
        -   Renders title, description, and technology tags from props.
        -   Renders "Code" and "Demo" links if URLs are provided.
    -   **`ExperienceItem`**:
        -   Renders role, company, and formatted date range.
        -   Renders description as markdown/text.
    -   **`Section`**:
        -   Renders as a semantic `<section>` element.
        -   Applies vertical padding guidelines.
    -   **`SkillBadge`**:
        -   Renders text content correctly.

## Edge Cases Only

-   **Text Overflow**: Long project titles or descriptions should truncate or wrap gracefully without breaking layout.
-   **Empty Data**: Components should handle missing optional fields (e.g., a project without a live link) by not rendering that specific sub-element.
-   **Mobile Scaling**: Grid collapses to 1 column on small screens; padding adjusts to maintain safe area.
-   **Active States**: Navigation links correctly reflect the active sub-path (e.g., `/projects/foo` highlights Projects).

## Success Criteria

-   **100% Pass Rate** on all E2E and Unit tests.
-   **Zero Accessibility Violations** (Critical/Serious level) reported by Axe.
-   **Visual Confirmation**: Manual review confirms alignment to the 4px/8px grid system and correct type scale usage.
-   **Clean Console**: No React unique key warnings or hydration mismatch errors.

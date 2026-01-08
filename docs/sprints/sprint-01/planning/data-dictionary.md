## Entities / Objects

- **Route**: A distinct URL path serving a page.
- **NavEntry**: A data object representing a navigation link.
- **DesignToken**: An atomic styling variable (color, spacing, font).
- **GridConfig**: Configuration object defining the layout grid.

## Fields / Attributes

### Route
- `path`: String (e.g., "/about") - The URL path.
- `component`: ReactComponent - The page component to render.
- `metadata`: Object - SEO title and description.

### NavEntry
- `label`: String - Display text for the link.
- `href`: String - Target URL path.
- `order`: Integer - Visual sequence in the navigation bar.

### DesignToken
- `name`: String - Token identifier (e.g., "colors.primary").
- `value`: String - CSS value (e.g., "#FF0000").
- `scale`: String - Category (spacing, color, typography).

### GridConfig
- `columns`: Integer - Number of grid columns (default 12).
- `gutter`: String - Spacing between columns (from DesignToken spacing).
- `margin`: String - Outer container spacing (from DesignToken spacing).

## Relationships

- **Layout contains NavEntry**: The RootLayout renders a list of NavEntries in the Header.
- **Page uses GridConfig**: Each Page component's content is contained within boundaries defined by GridConfig.
- **GridConfig uses DesignToken**: Grid measurements reference Spacing DesignTokens.
- **Route maps to Page**: The filesystem path structure maps 1:1 to the Page entity.

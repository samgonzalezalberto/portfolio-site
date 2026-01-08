## Tests

### Structure & Routing
- **GET / returns 200**: Verify Home page loads.
- **GET /about returns 200**: Verify About page loads.
- **GET /projects returns 200**: Verify Projects page loads.
- **GET /contact returns 200**: Verify Contact page loads.
- **Navigation Links**: Verify clicking nav links navigates to correct routes without full reload (client-side navigation).

### Visual Regression / Snapshot
- **Grid Layout**: Snapshot test of `RootLayout` confirms presence of grid container classes.
- **Typography**: Snapshot test verifies H1, H2, and body text use correct font-family and sizing classes.
- **Mobile View**: Snapshot test at mobile viewport width confirms layout adapts (e.g., stack vs row).

### Accessibility (Static)
- **HTML Validation**: Pages contain valid semantic HTML (main, header, footer, nav).
- **Heading Hierarchy**: H1 exists on each page and hierarchy is sequential.
- **Color Contrast**: Automated check confirms placeholder text meets WCAG AA standards.

## Edge Cases

- **404 Page**: Accessing a non-existent route (e.g., `/unknown`) returns a 404 status and a basic Not Found UI.
- **Long Content**: A page with content exceeding viewport height scrolls correctly within the grid.
- **Missing Assets**: Referenced placeholder images fail gracefully (alt text displayed).

## Success Criteria

- All standard routes (`/`, `/about`, `/projects`, `/contact`) render with the shared layout.
- The Tailwind configuration file content matches the specified Swiss design tokens.
- `npm run lint` and `npm run build` execute without errors.
- Visual inspection confirms alignment of elements to the grid overlay (if implemented) or specification.

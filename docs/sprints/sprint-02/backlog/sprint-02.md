# Sprint-02 Backlog & Limitatioms

## Deferred Features
- **Complex Animations**: Motion was explicitly deprioritized to focus on the static "Swiss" layout and performance budget. A motion system will be considered in a future refinement sprint.
- **Dynamic Data/CMS**: Backend integration remains a non-goal. The architecture freezes content as file-based MDX to ensure auditability and reduce infrastructure verification surface area.

## Known Limitations
- **Client-Side Navigation State**: The `Header` component was forced to be a 'Client Component' to access `usePathname()` for active link styling. This breaks the "server-components-only" purity for the navigation tree but is a necessary trade-off for user feedback.
- **Static Content Rebuilds**: Content updates require a full application rebuild and deployment. This is an intentional decision to maintain content as version-controlled code.

## Explicitly Postponed Ideas
- **Tag Filtering**: Filtering projects by technology tag was discussed but postponed to keep the initial `Grid` implementation successfully "dumb" and declarative.
- **Dark Mode Toggle**: While the tokens support theming, a user-facing toggle was out of scope for the initial content sprint.

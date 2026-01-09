# Sprint-03 Backlog & Limitations

## Deferred Features
- **ThemeToggle (Dark Mode)**: Infrastructure for theme switching was scoped as optional and deferred to preserve sprint focus on core interactivity and accessibility. A future sprint can implement the toggle UI and persistence layer.
- **Advanced Animations**: Complex page transitions and micro-animations were explicitly excluded to maintain performance budgets and avoid motion complexity that could impair accessibility.

## Known Limitations
- **Custom Focus Trap**: The mobile menu uses a lightweight custom focus trap implementation rather than a third-party library. This satisfies the "no new dependencies" constraint but requires manual maintenance if focus management patterns evolve.
- **State Localization Trade-off**: `NavigationState.isOpen` lives in the `Header` component rather than a global context. This keeps state local but means the menu cannot be controlled from outside the header tree.

## Explicitly Postponed Ideas
- **Gesture-Based Menu Dismissal**: Swipe-to-close for the mobile menu was discussed but postponed to avoid introducing touch event complexity and potential conflicts with browser scroll behavior.
- **Animation Choreography**: Staggered entrance animations for menu items were considered but shelved to maintain the "minimal and functional" motion constraint.

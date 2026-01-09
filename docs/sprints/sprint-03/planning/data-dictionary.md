## Entities / Objects

Sprint-03 adheres to the Immutable Data Model policy. The core content entities (`Project`, `Experience`) defined in Sprint-02 remain unchanged. This section tracks **Transient UI State** objects introduced for interaction.

-   **`NavigationState`**: Represents the current status of the global navigation.
-   **`TransitionToken`**: Abstract representation of a design token for motion (e.g., duration, easing).

## Fields / Attributes

### NavigationState (Client Memory)
-   `isOpen` (boolean): Whether the mobile menu overlay is active.
-   `activePath` (string): The current route path for highlighting.

### TransitionToken (Classes)
-   `duration-fast`: `150ms`.
-   `ease-standard`: `ease-out`.
-   `transition-all`: Applies to transform/opacity/colors.

## Relationships

-   **State-Component**: `NavigationState` is owned by the `Header` (or a dedicated `NavigationContext`) and consumed by `MobileMenu` and `HamburgerTrigger`.
-   **No Persistence**: None of the entities in this sprint are persisted to disk or backend; they exist only during the user session.

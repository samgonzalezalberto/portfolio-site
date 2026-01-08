# Sprint-01 Backlog

## Deferred Features

- **Concrete Design Tokens**: Implementation of specific Swiss Design hex codes, font families, and precise spacing values was deferred because the authoritative `spec.md` did not provide the values. The configuration structure is in place but uses defaults.

## Known Limitations

- **Visual Fidelity**: The application currently renders using Tailwind default typography and colors until the Design Tokens are concretely defined in a future sprint.
- **Dev Tooling Upgrades**: High-severity security advisories in `eslint-config-next` dev dependencies (caused by `glob` via `rimraf`) remain unresolved. `npm audit fix --force` would require a potentially destabilizing upgrade to Next.js 16+, which was deemed out of scope for this foundation sprint.

## Explicitly Postponed Ideas

- **Lightweight Test Stack**: An attempt to use `linkedom` and `node --test` for faster, browser-less testing was explored but explicitly rejected and removed to strictly adhere to the project's Playwright mandate.

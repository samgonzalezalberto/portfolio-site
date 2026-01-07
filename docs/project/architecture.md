# Architecture

## Overview

Server-first Next.js application using the App Router, file-based content (Markdown/MDX), Tailwind CSS with centralized design tokens, minimal serverless functions for form and utility endpoints, deployed to a DigitalOcean Droplet via GitHub Actions. Playwright end-to-end tests enforce CI gates.

## Separation of concerns

- Content: file-based Markdown/MDX stored in the repository; frontmatter supplies metadata and provenance.
- UI: component-driven React with server components by default; presentation uses Tailwind driven by fixed tokens.
- Logic: small, well-scoped modules for business logic; serverless functions implement thin server-side responsibilities.
- Infrastructure: hosting, secrets, and deployment managed by CI workflows and deployment scripts.

## Data flow

1. Authoring: content is authored as Markdown/MDX in the repository.
2. Build: GitHub Actions builds the Next.js app; content compiles into static and server-rendered pages.
3. Runtime: the Droplet serves the Next.js build; serverless functions run as isolated handlers.
4. Observability: CI artifacts and test reports provide primary observability; runtime logs are minimal and retained per policy.

## Build and deployment flow

- Pull requests: GitHub Actions run install, typecheck, lint, unit tests, and Playwright e2e where applicable; merges require all checks passing.
- Production: merge to `main` triggers production workflow that builds, runs full e2e, packages assets, and deploys to the Droplet with atomic, reversible steps and release tagging.

## Serverless functions integration

- Functions are thin, stateless endpoints for contact submissions and small utilities.
- Functions must perform input validation, rate limiting, and minimal logging consistent with security policies.

## Testing and CI gate placement

- Mandatory CI checks on pull requests: type checks, linters, unit tests, and Playwright e2e covering critical flows and accessibility smoke.
- Production deploys are permitted only if all CI gates pass.
- Test artifacts and coverage reports are published as CI artifacts for audit.

## Sprint-level integration

- Sprint work must reference `/docs/project/*` and include necessary tests and artifacts.
- Sprint changes must not alter locked technical decisions; proposed changes that would must open an explicit architectural revision.

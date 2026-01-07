# Sprint-00 Backlog & Trade-offs

## Deferred Features
- **Production Deployment**
  - Reason: Sprint-00 focused exclusively on Validation (CI); Delivery (CD) logic requires a verified application to deploy, which does not yet exist.
- **CI Caching & Optimization**
  - Reason: Premature optimization. The priority was establishing a correct, deterministic baseline. Caching layers will be added only after stable performance metrics are baseline.
- **Parallel CI Stages**
  - Reason: Sequential execution provides the clearest failure causality for the initial skeleton. Parallelism increases complexity and will be introduced when build times demand it.

## Known Limitations
- **No Application Logic**
  - Constraint: The repository contains only scaffolding/stubs. This is a deliberate "walking skeleton" to prove infrastructure before implementation.
- **Single-Stage Docker Build**
  - Constraint: The current Dockerfile is optimized for build correctness, not image size. Multi-stage builds are reserved for the future production optimization sprint.
- **No Database Integration**
  - Constraint: The execution environment is currently stateless and file-based, aligning with the "server-first" and "content-driven" architecture constraints.

## Explicitly Postponed Ideas
- **Matrix Testing**
  - Considered running tests across multiple Node versions, but postponed as the architecture specifies a single pinned runtime version for strict determinism.
- **Automated Dependency Auditing (Dependabot)**
  - Postponed to a future security-focused sprint to ensure noise levels can be tuned correctly from the start.
- **GitHub Environments**
  - Setup of formal GitHub Environments deferred until deployment targets are provisioned in the next sprint.

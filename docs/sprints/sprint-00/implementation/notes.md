
# Sprint-00 — Implementation Notes

## Phase 1 — Environment Definition (Docker & Dependency Manifests)

Date: 2026-01-07

### Node.js / npm

- Node.js (pinned): v20.11.0
- npm (pinned): 10.2.4

### Docker base image

- Base image tag: node:20.11.0-alpine
- Base image digest (linux/amd64): sha256:9b61ed13fef9ca689326f40c0c0b4da70e37a18712f200b4c66d3b44fd59d98e
- Pinned reference used in Dockerfile: node:20.11.0-alpine@sha256:9b61ed13fef9ca689326f40c0c0b4da70e37a18712f200b4c66d3b44fd59d98e

Digest source (no local Docker available):

- Docker Hub tag metadata endpoint: https://hub.docker.com/v2/repositories/library/node/tags/20.11.0-alpine?page_size=100

### Lock file

- package-lock.json lockfileVersion: 3

### Docker build verification

Command:

- docker build . -t portfolio-site:test

Result:

- Exit code: 0

Build output (abridged):

- [+] Building 25.7s (11/11) FINISHED
- naming to docker.io/library/portfolio-site:test

Observed base image digest during build:

- node:20.11.0-alpine@sha256:9b61ed13fef9ca689326f40c0c0b4da70e37a18712f200b4c66d3b44fd59d98e

## Phase 2 — Local Execution Verification (Validation Logic)

Date: 2026-01-07

### Minimal configs and stubs added

- TypeScript config: tsconfig.json
- ESLint config: .eslintrc.json
- Source stub: src/index.ts
- Unit test stub: tests/unit/example.test.js
- E2E test stub: tests/e2e/example.e2e.test.js

### package.json validation scripts

- typecheck: tsc -p tsconfig.json --noEmit
- lint: eslint . --max-warnings=0
- test: node --test tests/unit
- test:e2e: node --test tests/e2e

### Required Docker execution commands (per spec)

Intended commands:

- docker run --rm portfolio-site:test npm run typecheck
- docker run --rm portfolio-site:test npm run lint
- docker run --rm portfolio-site:test npm test
- docker run --rm portfolio-site:test npm run test:e2e

Executed commands and exit codes:

- docker run --rm portfolio-site:test npm run typecheck -> exit code 0
- docker run --rm portfolio-site:test npm run lint -> exit code 0
- docker run --rm portfolio-site:test npm test -> exit code 0
- docker run --rm portfolio-site:test npm run test:e2e -> exit code 0

Entrypoint/CMD verification:

- docker run --rm portfolio-site:test -> exit code 0

Node/npm inside container:

- node v20.11.0
- npm 10.2.4

### Local sanity-check results (outside Docker)

Ran with pinned toolchain:

- node v20.11.0
- npm 10.2.4

Commands and exit codes:

- npm run typecheck -> exit code 0
- npm run lint -> exit code 0
- npm test -> exit code 0
- npm run test:e2e -> exit code 0

## Phase 3 — CI Pipeline Definition (GitHub Actions Workflow)

Date: 2026-01-07

Workflow file:

- .github/workflows/ci.yml

Stage-to-job mapping (per spec CI Pipeline Execution Flow):

- Job: validate
	- Stage 1: Dependency Installation: npm ci
	- Stage 2: Type Checking: npm run typecheck
	- Stage 3: Linting: npm run lint
	- Stage 4: Unit Testing: npm test
	- Stage 5: E2E Testing: npm run test:e2e

Docker environment usage:

- The workflow builds the repo Dockerfile and runs all validation stages inside that container image.

Fail-fast implementation method:

- Implemented by sequential execution in a single shell step with `set -euo pipefail`.
- Any non-zero exit code stops subsequent stages and fails the job.

Artifact preservation:

- Implemented via actions/upload-artifact with `if: always()`.
- Paths are tolerant of missing outputs (`if-no-files-found: ignore`).

Secrets / variables assumed:

- None required for Sprint-00 skeleton.


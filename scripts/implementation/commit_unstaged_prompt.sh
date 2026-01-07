#!/usr/bin/env bash
set -e

SPRINT_NUM="$1"

if [ -z "$SPRINT_NUM" ]; then
  echo "Usage: $0 <sprint-number>"
  exit 1
fi

cat <<EOF
## CODING AGENT PROMPT — FINAL GIT COMMITS (SPRINT-${SPRINT_NUM})

You are the **coding agent** for **Sprint-${SPRINT_NUM}**. Sprint implementation has been **approved**.

Your task is to commit all work to git using **atomic commits**.

---

## Preparation

Before committing:

1. Review your **full context history** for Sprint-${SPRINT_NUM}.
2. Re-read:
   - docs/sprints/sprint-${SPRINT_NUM}/implementation/notes.md
3. Identify all logical units of change introduced during this sprint:
   - New features
   - Refactors
   - Test additions
   - Documentation updates
   - CI / Docker / tooling changes
   - Chores or cleanup

Each logical unit must map to **one atomic commit**.

---

## Commit Rules

- Use **multiple commits**, not one large commit.
- Each commit must:
  - Represent a single coherent change
  - Build cleanly on its own
- Do **not** squash commits unless changes are inseparable by design.

---

## Commit Message Format

Use **one-line Conventional Commit–style messages**:

- \`feat: add <clear feature description>\`
- \`fix: correct <specific issue>\`
- \`test: add <test scope>\`
- \`refactor: restructure <component>\`
- \`docs: update <documentation scope>\`
- \`chore: <non-functional maintenance>\`
- \`ci: <ci-related change>\`
- \`build: <docker/build system change>\`

Examples:
- \`feat: add deterministic task execution engine\`
- \`test: add validation for cyclic DAG detection\`
- \`docs: document sprint-${SPRINT_NUM} architecture decisions\`
- \`ci: add initial GitHub Actions workflow skeleton\`
- \`build: add Dockerfile bootstrap for local testing\`

---

## Execution Instructions

- Perform commits **directly in the terminal** using git.
- Ensure commit order reflects logical dependency.
- Do not modify code or documentation at this stage.
- Do not add new files.
- Only commit what already exists.

When all changes are committed, stop.

Begin.
EOF

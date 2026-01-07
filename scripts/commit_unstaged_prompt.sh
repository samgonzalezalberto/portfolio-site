#!/usr/bin/env bash

cat <<'EOF'
## CODING AGENT PROMPT — FINALIZATION & GIT COMMITS

You are the **coding agent** for the current sprint.

Implementation has been **approved**.

Your task now is to **commit all work to git** in a clean, reviewable, and atomic manner.

---

## Pre-Commit Review (Mandatory)

Before committing anything, you must:

- Review your **full context history** for this sprint
- Review your **implementation notes** (`notes.md`)
- Ensure all implemented changes are intentional, complete, and approved
- Ensure there are no uncommitted debug artifacts, temporary files, or accidental changes

You are committing **only what was approved**.

---

## Commit Strategy (Strict)

You must use **atomic commits**.

Each commit must:
- Represent a single logical change
- Be independently understandable
- Avoid mixing unrelated concerns

Do **not** squash unrelated work into a single commit.

---

## Commit Message Conventions (Required)

Use **one-line conventional commit messages**.

Choose the appropriate prefix based on the change type:

- `feat:` — New functionality
- `fix:` — Bug fixes
- `refactor:` — Code changes that do not alter behavior
- `test:` — Adding or modifying tests
- `docs:` — Documentation-only changes
- `chore:` — Tooling, CI, config, or maintenance changes

Examples:
- `feat: add task execution pipeline`
- `fix: handle empty DAG edge case`
- `test: add coverage for cyclic dependency detection`
- `docs: document task-engine lifecycle`
- `chore: add CI workflow skeleton`

Keep messages concise and descriptive.

---

## Execution Requirements

- Use the git CLI in the terminal
- Stage files deliberately (avoid blanket `git add .` unless justified)
- Commit incrementally following the logical order of changes
- Do not amend or rewrite history unless explicitly required

---

## Completion Criteria

This task is complete when:

- All approved changes are committed
- Commit history is clean, atomic, and readable
- No uncommitted changes remain in the working tree

Proceed.
EOF

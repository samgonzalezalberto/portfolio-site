#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: create_sprint.sh <sprint-number (e.g. 00, 01)>"
  exit 1
fi

SPRINT_NUM="$1"
SPRINT_DIR="docs/sprints/sprint-${SPRINT_NUM}"

if [ -d "$SPRINT_DIR" ]; then
  echo "Error: ${SPRINT_DIR} already exists."
  exit 1
fi

mkdir -p \
  "${SPRINT_DIR}/backlog" \
  "${SPRINT_DIR}/implementation/task-engine" \
  "${SPRINT_DIR}/planning" \
  "${SPRINT_DIR}/summary"

touch \
  "${SPRINT_DIR}/backlog/sprint-${SPRINT_NUM}.md" \
  "${SPRINT_DIR}/implementation/notes.md" \
  "${SPRINT_DIR}/implementation/sequence.md" \
  "${SPRINT_DIR}/implementation/task-engine/spec.md" \
  "${SPRINT_DIR}/implementation/task-engine/tdd.md" \
  "${SPRINT_DIR}/implementation/task-engine/data-dictionary.md" \
  "${SPRINT_DIR}/planning/planning.md" \
  "${SPRINT_DIR}/planning/spec.md" \
  "${SPRINT_DIR}/planning/tdd.md" \
  "${SPRINT_DIR}/planning/data-dictionary.md" \
  "${SPRINT_DIR}/summary/sprint-${SPRINT_NUM}-summary.md"

echo "Sprint sprint-${SPRINT_NUM} created."

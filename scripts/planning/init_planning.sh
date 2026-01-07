#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: init_planning.sh <sprint-number (e.g. 00, 01)>"
  exit 1
fi

SPRINT_NUM="$1"
PLANNING_DIR="docs/sprints/sprint-${SPRINT_NUM}/planning"

if [ ! -d "$PLANNING_DIR" ]; then
  echo "Error: Sprint directory ${PLANNING_DIR} does not exist. Run create_sprint.sh first."
  exit 1
fi

# -------------------------------
# planning.md template
# -------------------------------
cat > "${PLANNING_DIR}/planning.md" << EOL
## Sprint Goal

[Describe the specific goal of this sprint here.]

## Non-Goals

[List what is explicitly out of scope for this sprint.]

## Invariants (Optional)

[List any general principles, invariants, or constraints to follow.]

## Definition of Done

[List criteria that define when the sprint is complete.]
EOL

# -------------------------------
# spec.md template
# -------------------------------
cat > "${PLANNING_DIR}/spec.md" << EOL
## High-Level Model

[Describe the system, module, or feature this sprint is implementing.]

## Component Definitions

[List and define components, objects, or entities relevant to the sprint.]

## Behavior / Semantics

[Describe rules, interactions, and expected behaviors.]

## Constraints

[List technical or business constraints relevant to this sprint.]
EOL

# -------------------------------
# tdd.md template
# -------------------------------
cat > "${PLANNING_DIR}/tdd.md" << EOL
## Tests

[List high-level tests and scenarios that will validate this sprint.]

## Edge Cases

[Include any special cases to test.]

## Success Criteria

[Define what constitutes passing these tests.]
EOL

# -------------------------------
# data-dictionary.md template
# -------------------------------
cat > "${PLANNING_DIR}/data-dictionary.md" << EOL
## Entities / Objects

[Define key data structures or objects.]

## Fields / Attributes

[List fields, types, and meanings.]

## Relationships

[Describe relationships between entities or objects.]
EOL

echo "Initialized barebones planning templates for sprint-${SPRINT_NUM}."

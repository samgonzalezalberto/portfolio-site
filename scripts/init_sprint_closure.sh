#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: init_sprint_closure.sh <sprint-number (e.g. 00, 01)>"
  exit 1
fi

SPRINT_NUM="$1"
BACKLOG_FILE="docs/sprints/sprint-${SPRINT_NUM}/backlog/sprint-${SPRINT_NUM}.md"
SUMMARY_FILE="docs/sprints/sprint-${SPRINT_NUM}/summary/sprint-${SPRINT_NUM}-summary.md"

mkdir -p "docs/sprints/sprint-${SPRINT_NUM}/backlog"
mkdir -p "docs/sprints/sprint-${SPRINT_NUM}/summary"

# Write backlog template
cat > "$BACKLOG_FILE" << EOL
# Sprint-${SPRINT_NUM} Backlog

## Deferred Features

[List deferred features identified during planning or implementation that were explicitly scoped out of this sprint. Include brief descriptions of why each feature was postponed.]

## Known Limitations

[List deliberate trade-offs or design limitations adopted in this sprint to enforce correctness, determinism, or other principles.]

## Explicitly Postponed Ideas

[List any ideas, concepts, or enhancements discussed but shelved for future consideration. Include short rationale if helpful.]
EOL

# Write summary template
cat > "$SUMMARY_FILE" << EOL
# Sprint-${SPRINT_NUM} Summary: [Provide descriptive sprint title]

## What Was Built

[List the key deliverables, designs, or plans completed in this sprint. Include highlights such as architectures, specifications, or major planning documents.]

## New Capabilities

[List any new capabilities, structures, or patterns established by this sprint, focusing on what is now possible or enforceable.]

## Why the Sprint is Complete

[Explain why the sprint meets its Definition of Done, including how ambiguity was resolved, trade-offs were documented, and all planning/implementation artifacts required were finalized.]
EOL

echo "Sprint-${SPRINT_NUM} backlog and summary templates created at:"
echo "  $BACKLOG_FILE"
echo "  $SUMMARY_FILE"

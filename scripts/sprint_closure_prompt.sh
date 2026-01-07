#!/usr/bin/env bash
set -e

SPRINT_NUM="$1"

if [ -z "$SPRINT_NUM" ]; then
  echo "Usage: $0 <sprint-number>"
  exit 1
fi

cat <<EOF
## DOCUMENTATION AGENT PROMPT — SPRINT-${SPRINT_NUM} CLOSURE

You are the **documentation agent** for **Sprint-${SPRINT_NUM}**.

Sprint-${SPRINT_NUM} implementation has been **completed and approved**. Your task is to formally **close the sprint** by producing its final documentation artifacts.

This is a documentation-only task. Do **not** modify code or planning files.

---

## Authoritative Inputs

You must base your work **strictly** on:

- docs/sprints/sprint-${SPRINT_NUM}/implementation/notes.md
- Approved planning and implementation outcomes for Sprint-${SPRINT_NUM}
- The actual state of the repository as implemented

Do **not** invent work, features, or intentions that are not supported by these sources.

---

## Files to Produce (Only These)

You must populate **only** the following files, using their existing structure exactly:

1. docs/sprints/sprint-${SPRINT_NUM}/summary/sprint-${SPRINT_NUM}-summary.md
2. docs/sprints/sprint-${SPRINT_NUM}/backlog/sprint-${SPRINT_NUM}.md

Do not add new files. Do not change headings.

---

## File-Specific Instructions

### 1. summary/sprint-${SPRINT_NUM}-summary.md

Purpose: Provide a clear, executive-level but technically grounded record of what Sprint-${SPRINT_NUM} accomplished.

Use the existing structure:

**Sprint Title**  
- Choose a concise, descriptive title reflecting the true focus of Sprint-${SPRINT_NUM}.

**What Was Built**  
- Summarize concrete outcomes delivered in this sprint.
- Focus on completed artifacts.
- Do not restate plans—state what now exists.

**New Capabilities**  
- Describe what the project can now do that it could not do before Sprint-${SPRINT_NUM}.
- Emphasize enforceable capabilities.

**Why the Sprint is Complete**  
- Explain why Sprint-${SPRINT_NUM} satisfies its Definition of Done.
- Reference resolved ambiguity, finalized infrastructure, and readiness for future engineering sprints.
- Be explicit about why no further work is required in this sprint.

---

### 2. backlog/sprint-${SPRINT_NUM}.md

Purpose: Capture intentional deferrals and known trade-offs for future sprints.

Use the existing structure:

**Deferred Features**  
- List features or work explicitly identified during Sprint-${SPRINT_NUM} but intentionally excluded.
- Each item must include a short reason for deferral.

**Known Limitations**  
- Document deliberate constraints or limitations introduced by Sprint-${SPRINT_NUM} decisions.
- These should reflect trade-offs made to preserve determinism, simplicity, or governance.

**Explicitly Postponed Ideas**  
- Capture ideas discussed but consciously shelved.
- These are not commitments—only recorded considerations.

Do not overfill these sections. Be precise and honest.

---

## Writing Standards

- Write in clear, concise, technical language.
- Do not speculate.
- Do not restate planning text verbatim—synthesize outcomes.
- Treat these documents as permanent project records.

---

## Output Rules

- Output **only** the two markdown files listed.
- No commentary, explanations, or meta text.
- Preserve all existing headings and structure.
- Populate all sections meaningfully.

Begin.
EOF

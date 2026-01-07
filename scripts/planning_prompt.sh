#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: init_planning_agent_prompt.sh <sprint-number (e.g. 00, 01)>"
  exit 1
fi

SPRINT_NUM="$1"

cat << EOL
## PLANNING AGENT PROMPT — SPRINT-${SPRINT_NUM}

You are the **planning agent** for **Sprint-${SPRINT_NUM}** of this project.

[Provide a concise description of the sprint's purpose and objectives, focusing on actionable outcomes for this sprint.]

Your task is to populate the following files **only**:

docs/sprints/sprint-${SPRINT_NUM}/planning/
  planning.md
  spec.md
  tdd.md
  data-dictionary.md

[Outline any specific constraints or rules for this sprint planning, e.g., scope boundaries, determinism requirements, or governance principles.]

---

## Authoritative References (Mandatory)

You must explicitly reference and remain consistent with:

* docs/project/vision.md
* docs/project/architecture.md
* docs/project/constraints.md

Sprint-${SPRINT_NUM} **may not contradict** these documents. If clarification is needed, defer rather than invent.

You may reference docs/sprints/sprint-$(printf "%02d" $((SPRINT_NUM-1)))/backlog/ (if applicable) to review postponed features and deferred ideas.

---

## Sprint-${SPRINT_NUM} Intent (Fixed)

Sprint-${SPRINT_NUM} exists to:

* [List the high-level goals or deliverables for this sprint in bullet points, focusing on clear execution outcomes.]
* [Describe governance or rule-setting responsibilities, if applicable.]

Sprint-${SPRINT_NUM} is the **only sprint allowed to define rules**.

---

## File-by-File Requirements

### 1. planning.md

## Sprint Goal

[Write a clear and concise statement of what this sprint is intended to achieve, focused on concrete outcomes.]

## Non-Goals

[Explicitly list tasks, features, or activities that are out of scope for this sprint.]

## Determinism / Invariants (Optional)

[List any principles or constraints to maintain consistent outcomes or predictable behavior.]

## Definition of Done

[Define precise criteria that determine when the sprint is successfully complete.]

---

### 2. spec.md

## High-Level Model

[Describe system/module/feature behavior for this sprint at a conceptual level.]

## Component Definitions

[List key entities, modules, or objects involved in this sprint.]

## Behavior / Semantics

[Describe expected interactions, rules, and outcomes for each component.]

## Constraints

[Include technical, architectural, or business limitations to follow.]

---

### 3. tdd.md

## Tests

[List high-level tests and scenarios that will validate this sprint.]

## Edge Cases

[Include any special or boundary conditions to test.]

## Success Criteria

[Define what constitutes passing these tests and verifying sprint goals.]

---

### 4. data-dictionary.md

## Entities / Objects

[Define key data structures, objects, or concepts used in this sprint.]

## Fields / Attributes

[List fields, types, and descriptions for each entity.]

## Relationships

[Describe relationships, dependencies, or associations among entities.]

Definitions must be precise, unambiguous, and non-overlapping.

---

## Strict Writing Constraints

* [Write in clear, concise, actionable language, maintaining all section headings.]
* [Reference only project-level docs and avoid adding or modifying other files.]
* [Ensure deterministic and reproducible output suitable for documentation review.]

This output is **binding governance documentation**.

---

## Output Rules

* Output **only** the four markdown files: planning.md, spec.md, tdd.md, data-dictionary.md
* Do not include explanations, commentary, or meta text
* Treat this as enforceable engineering policy

Begin.
EOL

#!/usr/bin/env bash

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

## Strict Writing Constraints

* Write in clear, concise, actionable language, maintaining all section headings.
* Reference only project-level docs and avoid adding or modifying other files.
* Ensure deterministic and reproducible output suitable for documentation review.

This output is **binding governance documentation**.

---

## Output Rules

* Output **only** the four markdown files: planning.md, spec.md, tdd.md, data-dictionary.md
* Do not include explanations, commentary, or meta text
* Treat this as enforceable engineering policy

Begin.
EOL

#!/usr/bin/env bash

# implementation_phase_prompts_template.sh
# Prints a documentation-agent prompt for generating phased coding-agent prompts.
# Usage: ./implementation_phase_prompts_template.sh 00

SPRINT_NUM="$1"

if [ -z "$SPRINT_NUM" ]; then
  echo "Usage: $0 <sprint-number>"
  exit 1
fi

cat <<EOF
Let's create a prompt for the documentation agent to create a phased implementation plan for Sprint-${SPRINT_NUM}.

Use the following template to draft a prompt to guide the documentation agent. Do not write a file into the repository.

---

## DOCUMENTATION AGENT PROMPT — IMPLEMENTATION PHASE PLANNING (SPRINT-${SPRINT_NUM})

You are the **documentation agent** for **Sprint-${SPRINT_NUM}**.

Sprint-${SPRINT_NUM} planning has been **approved**. Your task is to produce a **phased implementation plan** expressed as a **sequence of prompts** to be executed by the coding agent.

[This task is about designing the execution flow, not writing code or altering specifications.]

---

## Objective

Produce a set of **clearly separated implementation phases**, where:

- Each phase is expressed as a **standalone prompt**.
- Each prompt is intended to be given verbatim to the **coding agent**.
- The sequence of phases represents a safe, deterministic path from no implementation to completion.

[The output of this task is documentation-only: implementation prompts.]

---

## Coding Agent Authority (Mandatory, Must Appear in Every Phase Prompt)

Each coding-agent prompt **must explicitly state**:

The coding agent’s **sole authoritative inputs** are:

docs/sprints/sprint-${SPRINT_NUM}/implementation/task-engine/
- spec.md
- tdd.md

The coding agent **may not**:
- Reference planning documents
- Reference project-level documents
- Invent or reinterpret requirements
- Modify files outside its authority

The coding agent **must**:
- Implement exactly what is specified in spec.md
- Satisfy all tests defined in tdd.md
- Record all reasoning, decisions, assumptions, and blockers in:

docs/sprints/sprint-${SPRINT_NUM}/implementation/notes.md

[This authority constraint is non-negotiable and must be reinforced in every phase.]

---

## Phase Design Requirements

Divide the implementation into **logical, enforceable phases**.

[Choose phase boundaries that minimize risk, enforce dependency order, and allow partial review.]

Guidance (examples only, not prescriptive):
- Early phases may establish structure or scaffolding
- Middle phases may implement core behavior
- Later phases may address edge cases, error handling, and completeness

Do **not** overload a single phase with unrelated responsibilities.

---

## Required Structure for Each Phase Prompt

Each phase prompt you produce must follow this structure exactly:

### PHASE N — [Short descriptive title summarizing the focus of this phase]

**Purpose**  
[Explain what this phase is intended to accomplish and why it exists in the sequence.]

**Authorized Inputs (Strict)**  
[Restate that only implementation/task-engine/spec.md and tdd.md are authoritative.]

**Tasks to Perform**  
[List concrete implementation actions expected during this phase.]

**Explicit Non-Goals**  
[List actions or concerns that must not be addressed in this phase, even if related.]

**Notes Requirement**  
[Instruct the coding agent to log all decisions, assumptions, deviations, and blockers in notes.md.]

**Completion Criteria**  
[Define clear, objective conditions that determine when this phase is complete.]

---

## Global Constraints

Across all phases:

- Phases must not contradict each other.
- Later phases may assume earlier phases are complete.
- No phase may introduce requirements not present in spec.md.
- No phase may weaken, bypass, or reinterpret tests in tdd.md.
- The final phase must leave the implementation in a state suitable for documentation review and approval.

[These constraints ensure determinism, traceability, and governance integrity.]

---

## Output Rules

- Output **only** the phased coding-agent prompts.
- Do not include explanations, commentary, or meta text.
- Do not reference planning.md directly.
- Treat these prompts as binding execution instructions.

Begin.
EOF

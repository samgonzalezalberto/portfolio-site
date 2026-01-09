#!/usr/bin/env bash

SPRINT_NUM="$1"

if [ -z "$SPRINT_NUM" ]; then
  echo "Usage: $0 <sprint-number>"
  exit 1
fi

cat <<EOF
## PLANNING AGENT PROMPT — IMPLEMENTATION PHASE PROMPT AUTHORING (SPRINT-${SPRINT_NUM})

You are the **planning agent** for **Sprint-${SPRINT_NUM}**.

Your task is to produce a **fully specialized, finalized prompt** that will later be given to the **documentation agent**.

This is a prompt-authoring task.

---

## Your Objective

You must generate a **complete documentation-agent prompt** that instructs the documentation agent to create a **phased implementation plan** (multiple coding-agent prompts).

You are not designing phases yet.
You are designing the **instructions that will cause those phases to be designed correctly**.

---

## Mandatory Instruction

You must take the template below and:

- Replace **every bracketed section** with Sprint-${SPRINT_NUM}-specific content
- Remove all brackets entirely
- Ensure the resulting prompt reads as authoritative, final instructions

If any \`[ ... ]\` remains in your output, the task is considered failed.

---

## Template to Specialize (You Must Fill All Brackets)

### DOCUMENTATION AGENT PROMPT — IMPLEMENTATION PHASE PLANNING (SPRINT-${SPRINT_NUM})

You are the **documentation agent** for **Sprint-${SPRINT_NUM}**.

Sprint-${SPRINT_NUM} planning has been approved. Your task is to produce a **phased implementation plan** expressed as a **sequence of prompts** to be executed by the coding agent.

[Explain what Sprint-${SPRINT_NUM} is about and what kind of implementation work is expected.]

---

### Objective

Produce a set of **clearly separated implementation phases**, where:

- Each phase is expressed as a standalone coding-agent prompt
- Each prompt can be executed independently
- The full sequence deterministically leads to sprint completion

[Clarify why phased execution is necessary for this sprint.]

---

### Coding Agent Authority (Mandatory)

Each coding-agent prompt must explicitly state:

The coding agent’s sole authoritative inputs are:

docs/sprints/sprint-${SPRINT_NUM}/implementation/task-engine/
- spec.md
- tdd.md
- data-dictionary.md

The coding agent may not reference planning documents or project-level documents.

The coding agent must record all reasoning, decisions, and blockers in:

docs/sprints/sprint-${SPRINT_NUM}/implementation/notes.md

[Add any sprint-specific authority clarifications or prohibitions.]

---

### Phase Design Requirements

[Define how phases should be divided for this sprint (risk boundaries, sequencing logic, invariants).]

---

### Required Structure for Each Phase Prompt

Each phase prompt must include:

PHASE N — [Describe how phase titles should be named]

Purpose  
[Explain what each phase must justify.]

Authorized Inputs  
[Restate authority rules concisely.]

Tasks to Perform  
[Describe the expected level of granularity.]

Explicit Non-Goals  
[Explain why non-goals are critical for phase isolation.]

Notes Requirement  
[Explain what kind of information is expected in notes.md.]

Completion Criteria  
[Define what “done” means at the phase level.]

---

### Global Constraints

[State sprint-specific global constraints that apply across all phases.]

---

### Output Rules

- Output only the phased coding-agent prompts into the `docs/sprints/sprint-${SPRINT_NUM}/implementation/sequence.md` file
- Do not include commentary or explanations
- Treat the output as binding execution instructions

Begin.

---

## Output Rules for You (Planning Agent)

- Output only the finalized documentation-agent prompt
- Do not explain your changes
- Do not include this instruction block
- Do not include brackets

Begin.
EOF

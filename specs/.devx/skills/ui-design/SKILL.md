---
name: ui-design
description: Design and implement production-ready UI from specs, with explicit states, accessibility, design consistency, and validation checklists.
user-invocable: true
argument-hint: "[feature-slug]"
allowed-tools: Read, Grep, Glob, Edit, Write
---

# /ui-design — Implement UI Design From Specs

> Translate feature specs into intentional, accessible, and verifiable UI implementation.

## Inputs

- Required: `specs/.devx/features.json`
- Required: `specs/<slug>/specs.md`
- Required: `specs/<slug>/requirements.md`
- Optional: `specs/<slug>/tdd-tests.md` when TDD is enabled

## Design Objectives

- Preserve the product hierarchy and user flow described in the spec.
- Ensure UI states are complete: loading, empty, error, success, and partial-data states where relevant.
- Keep component behavior deterministic and testable from acceptance criteria.
- Maintain consistency with existing tokens, spacing, typography, and interaction patterns.

## Workflow

1. Read the feature context:
  - Open `specs/.devx/features.json` and locate the target slug
  - Read `specs/<slug>/specs.md` and `specs/<slug>/requirements.md`
  - Extract user scenarios and acceptance criteria before writing code

2. Extract UI obligations from the spec:
  - Capture required user flows and states (empty/loading/error/success)
  - Identify accessibility requirements, labels, and keyboard interactions
  - Identify UI-observable acceptance criteria and edge cases
  - Map each requirement to concrete UI sections/components

3. Plan implementation:
  - Identify which existing shared components should be reused
  - Identify where new components are justified and keep them small/single-purpose
  - Define interaction contracts (inputs, outputs, events, disabled/loading states)
  - Define responsive behavior at mobile, tablet, and desktop breakpoints

4. Implement with existing project patterns:
  - Reuse established component primitives and layout conventions
  - Keep token usage, spacing, and typography consistent with project style
  - Avoid introducing behavior not described in specs or requirements
  - Keep labels, helper text, and empty/error copy clear and action-oriented

5. Accessibility pass:
  - Ensure semantic landmarks and control labels are present
  - Verify keyboard navigation and focus visibility for all interactive elements
  - Ensure status/error messages are announced appropriately
  - Verify color contrast and non-color state indicators

6. Validate outcomes:
  - Cross-check each UI requirement in `requirements.md`
  - Confirm responsive behavior and readable hierarchy
  - Confirm form semantics, focus order, and accessible naming
  - Confirm no orphan interactions (buttons/links with no valid action path)

## Acceptance Mapping Checklist

For each requirement in `requirements.md`, record:

- Requirement reference
- Implemented UI location (component/screen/section)
- Expected interaction/state
- Validation note (how you confirmed behavior)

## Output Format

After implementation, provide a concise report:

1. Components changed/added
2. Requirements covered (requirement-to-UI mapping)
3. Accessibility checks completed
4. Responsive checks completed
5. Known gaps (if any) requiring clarification

## Rules

- Follow the spec strictly; do not invent extra UI workflows.
- Keep UI states explicit and testable.
- Prefer project-standard components over custom one-off patterns.
- When uncertain, prioritize acceptance criteria over stylistic preference.
- If spec and existing UI patterns conflict, flag the conflict and ask before deviating.

---
name: autopilot
description: Automatically implement all remaining features end-to-end. Picks the next feature, implements it, validates, marks done, and repeats until all features are complete.
user-invocable: true
argument-hint: "[max-features]"
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# /autopilot — Implement All Features Automatically

> Chains the full SDD workflow in a loop: pick next → implement → validate → mark done → repeat.

## Arguments

- `$ARGUMENTS` — optional max number of features to implement in this session (default: all remaining)

## Workflow

For each unimplemented feature, execute these phases in sequence:

### Phase 0 — Tracking Preflight
1. Run `bash specs/.devx/validate-tracking.sh`
2. If it reports uncommitted or unpushed changes, stop and ask the user to commit/push or stash first
3. If it repaired tracking files, stop and ask the user to review and commit the repair

### Phase 1 — Pick Next Feature
1. Read `specs/.devx/features.json` and `specs/.devx/tracker.json`
2. Find the first feature whose tracker entry has `"status": "PENDING"`
3. If no features remain, report completion and stop
4. Announce: "Starting feature: <title> (<N> of <total> remaining)"

### Phase 2 — Read Specs
1. Read `specs/<slug>/specs.md` — understand what to build
2. Read `specs/<slug>/requirements.md` — the acceptance checklist

### Phase 3 — Implement
Implement each requirement from requirements.md one at a time:

1. Read the requirement
2. Write the code to satisfy it
3. Verify it works
4. Move to the next requirement

### Phase 4 — Validate
1. Go through every item in `specs/<slug>/requirements.md`
2. Verify each acceptance criterion is satisfied in the code
3. Check edge cases from specs.md

If validation fails:
- Fix the failing criteria
- Re-validate
- Do not proceed until all criteria pass

### Phase 5 — Mark Done
1. Read `specs/.devx/features.json` and `specs/.devx/tracker.json`
2. Update this feature's `"status"` from `"not-started"` to `"done"` in features.json
3. Update this feature's tracker status from `"PENDING"` to `"COMPLETED"`, refresh `updatedAt`, and increment `trackerVersion`
4. Write both files back
5. Announce: "Completed: <title> ✓"

### Phase 6 — Continue or Stop
1. Check if max features limit reached (from `$ARGUMENTS`)
2. If more features remain and limit not reached → go to Phase 1
3. If all features done → announce completion summary
4. If limit reached → announce progress and remaining count

## Output Between Features

After each feature, show a brief status:
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Completed: <Feature Title>
  Requirements: 8/8 passed
  Next: <Next Feature Title> (N remaining)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Final Summary

When all features are done (or limit reached), show:
```
══════════════════════════════════════
  Autopilot Complete
  Features implemented: X / Y
  Total requirements satisfied: N
  Remaining: Z features
══════════════════════════════════════
```

## Rules

- **Never skip validation.** Every feature must pass all requirements before moving on.
- **Stop on repeated failure.** If a feature fails validation 3 times, stop and report the issue.
- **Do not modify specs.** If a spec seems wrong, stop and ask the user.
- **Commit after each feature.** Keep changes atomic and reviewable.
- **No gold-plating.** Implement exactly what the spec describes, nothing more.

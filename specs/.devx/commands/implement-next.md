# DevX Command: implement-next

Resolve the first feature in `specs/.devx/tracker.json` with status `PENDING`, then implement only that feature from `specs/.devx/features.json`.

Guardrails:
- Run `bash specs/.devx/validate-tracking.sh` before selecting or implementing a feature.
- Do not use the currently open editor tab to infer the feature.
- Do not implement DevX tooling, init scripts, generators, or unrelated specs unless the selected feature slug points there.
- Read workspace context, feature specs, requirements, and prompt before changing code.
- Implement one requirement at a time and validate against `requirements.md`.
- Mark only the selected feature as `done` after validation passes.

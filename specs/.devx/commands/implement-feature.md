# DevX Command: implement-feature

Implement the explicitly selected feature slug.

Required input:
- `feature-slug`

Guardrails:
- Run `bash specs/.devx/validate-tracking.sh` before implementation.
- Only work inside the selected feature scope.
- Do not modify unrelated specs or DevX tooling.
- Create an implementation plan first.
- Validate every requirement before marking the feature done.

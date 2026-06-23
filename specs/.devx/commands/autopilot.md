# DevX Command: autopilot

Implement remaining features in sequence, stopping when the optional max feature count is reached.

Optional input:
- `max-features`

Guardrails:
- Run `bash specs/.devx/validate-tracking.sh` before selecting each feature.
- Stop when code, specs, or tracking files are uncommitted or unpushed.
- Implement and validate one feature at a time.
- Mark a feature `done` only after all requirements pass.
- Commit completed code and `.devx` tracking updates before continuing to the next batch.

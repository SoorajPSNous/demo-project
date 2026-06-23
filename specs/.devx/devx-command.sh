#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FEATURES_FILE="$SCRIPT_DIR/features.json"
TRACKER_FILE="$SCRIPT_DIR/tracker.json"
TRACKING_VALIDATOR="$SCRIPT_DIR/validate-tracking.sh"

usage() {
  cat <<'USAGE'
Usage:
  bash specs/.devx/devx-command.sh autopilot [max-features]
  bash specs/.devx/devx-command.sh implement-next
  bash specs/.devx/devx-command.sh implement-feature <feature-slug>
  bash specs/.devx/devx-command.sh validate-feature <feature-slug>
USAGE
}

ensure_features_file() {
  if [ ! -f "$FEATURES_FILE" ]; then
    echo "features.json not found at $FEATURES_FILE" >&2
    exit 1
  fi
}

run_tracking_preflight() {
  if [ -f "$TRACKING_VALIDATOR" ]; then
    bash "$TRACKING_VALIDATOR"
  else
    echo "Tracking validator not found at $TRACKING_VALIDATOR" >&2
    exit 1
  fi
}

feature_field() {
  local slug="$1"
  local field="$2"
  node - "$FEATURES_FILE" "$slug" "$field" <<'NODE'
const fs = require("fs");
const [file, slug, field] = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(file, "utf8"));
const feature = (data.features || []).find((item) => item.slug === slug);
if (!feature) process.exit(2);
const value = field.split(".").reduce((acc, key) => acc && acc[key], feature);
if (value !== undefined && value !== null) process.stdout.write(String(value));
NODE
}

resolve_next_slug() {
  ensure_features_file
  node - "$FEATURES_FILE" "$TRACKER_FILE" <<'NODE'
const fs = require("fs");
const [featuresFile, trackerFile] = process.argv.slice(2);
const data = JSON.parse(fs.readFileSync(featuresFile, "utf8"));
const tracker = fs.existsSync(trackerFile)
  ? JSON.parse(fs.readFileSync(trackerFile, "utf8"))
  : { tasks: {} };
const feature = (data.features || []).find((item) => {
  const taskId = item.taskId || `FEATURE-${item.id}`;
  const taskStatus = tracker.tasks?.[taskId]?.status;
  return taskStatus ? taskStatus === "PENDING" : item.status === "not-started";
});
if (!feature) {
  console.error("No feature with tracker status PENDING was found.");
  process.exit(1);
}
process.stdout.write(feature.slug);
NODE
}

assert_feature_exists() {
  local slug="$1"
  if ! feature_field "$slug" "title" >/dev/null 2>&1; then
    echo "Feature not found in features.json: $slug" >&2
    exit 1
  fi
}

emit_implementation_prompt() {
  local slug="$1"
  assert_feature_exists "$slug"
  local title specs_path requirements_path prompt_path tdd_path
  title="$(feature_field "$slug" "title")"
  specs_path="$(feature_field "$slug" "files.specs")"
  requirements_path="$(feature_field "$slug" "files.requirements")"
  prompt_path="$(feature_field "$slug" "files.prompt")"
  tdd_path="$(feature_field "$slug" "files.tddTests" || true)"

  cat <<PROMPT
Read AGENTS.md and specs/.devx/workspace-context.md first.

Selected feature slug: $slug
Selected feature title: $title

You must only implement this selected feature:
- Specs: $specs_path
- Requirements: $requirements_path
- Prompt: $prompt_path


Strict guardrails:
- Do not infer the feature from the currently open editor tab.
- Do not implement DevX tooling, init.sh, specs generation, workspace bootstrap, or unrelated specs unless this selected feature explicitly requires it.
- Do not modify other feature folders except when a shared implementation file must change to satisfy this feature.
- Create an implementation plan first.
- Implement one requirement at a time.
- Validate the implementation against every item in $requirements_path.

- If all requirements pass, update only this feature's status in specs/.devx/features.json to "done" and its entry in specs/.devx/tracker.json to "COMPLETED" with a fresh updatedAt timestamp.

Now read the selected feature files and begin with the implementation plan.
PROMPT
}

emit_validation_prompt() {
  local slug="$1"
  assert_feature_exists "$slug"
  local title specs_path requirements_path
  title="$(feature_field "$slug" "title")"
  specs_path="$(feature_field "$slug" "files.specs")"
  requirements_path="$(feature_field "$slug" "files.requirements")"

  cat <<PROMPT
Read AGENTS.md and specs/.devx/workspace-context.md first.

Validate this selected feature only:
- Slug: $slug
- Title: $title
- Specs: $specs_path
- Requirements: $requirements_path

Validation rules:
- Check every requirement in $requirements_path.
- Verify behavior in actual implementation code, not just file existence.
- Report PASS/FAIL for each requirement.
- Do not mark the feature done unless every requirement passes.
- Do not validate unrelated features.
PROMPT
}

emit_autopilot_prompt() {
  local max_features="${1:-all}"
  cat <<PROMPT
Read AGENTS.md and specs/.devx/workspace-context.md first.

Run DevX autopilot code generation.

Scope:
- Maximum features this session: $max_features
- Source of truth: specs/.devx/features.json, specs/.devx/tracker.json, and each specs/<slug>/ folder

Mandatory loop:
1. Pick the first feature whose tracker status is "PENDING".
2. Read its specs.md, requirements.md, prompt.md, and tdd-tests.md when present.
3. Implement only that feature, one requirement at a time.
4. Validate every requirement against actual implementation code.
5. If all requirements pass, mark only that feature as "done" in specs/.devx/features.json and "COMPLETED" in specs/.devx/tracker.json.
6. Stop if tracking becomes dirty, validation fails repeatedly, or the max feature limit is reached.

Do not start new work while uncommitted or unpushed code or tracking changes exist.
PROMPT
}

main() {
  local command="${1:-}"
  local slug="${2:-}"
  case "$command" in
    autopilot|implement-next|implement-feature|validate-feature) run_tracking_preflight ;;
    *) ;;
  esac
  case "$command" in
    autopilot)
      emit_autopilot_prompt "${slug:-all}"
      ;;
    implement-next)
      slug="$(resolve_next_slug)"
      emit_implementation_prompt "$slug"
      ;;
    implement-feature)
      if [ -z "$slug" ]; then
        echo "Missing feature slug." >&2
        usage
        exit 1
      fi
      emit_implementation_prompt "$slug"
      ;;
    validate-feature)
      if [ -z "$slug" ]; then
        echo "Missing feature slug." >&2
        usage
        exit 1
      fi
      emit_validation_prompt "$slug"
      ;;
    *)
      usage
      exit 1
      ;;
  esac
}

main "$@"

#!/usr/bin/env bash
# Simple verifier: writes all outputs to a report file without fancy redirection.
# Usage:
#   bash scripts/verify_cloud_run_env_simple.sh [SECRET_NAME] [REGION] [SERVICE] [OUTFILE]
# Defaults:
#   SECRET_NAME=OPENAI_API_KEY
#   REGION=europe-west4
#   SERVICE=ergo-platform-frontend
#   OUTFILE=cloud_run_env_report.txt

set -euo pipefail

SECRET="${1:-OPENAI_API_KEY}"
REGION="${2:-europe-west4}"
SERVICE="${3:-ergo-platform-frontend}"
OUT="${4:-cloud_run_env_report.txt}"

# Start fresh report
: > "$OUT"

log() { echo "$*" | tee -a "$OUT" >/dev/null; }
append_cmd() {
  echo "" >> "$OUT"
  echo "\$ $*" >> "$OUT"
  "$@" >> "$OUT" 2>&1 || {
    echo "Command failed: $*" >> "$OUT"
    exit 1
  }
}

log "=== Cloud Run Env Verification (simple) ==="
date | tee -a "$OUT" >/dev/null

log ""
log "Step 1) Project"
PROJECT_ID="$(gcloud config get-value project --quiet || true)"
if [[ -z "${PROJECT_ID}" ]]; then
  log "ERROR: No default project set (run: gcloud config set project YOUR_PROJECT_ID)"
  exit 1
fi
log "  Project ID: ${PROJECT_ID}"

log ""
log "Step 2) Secret versions (${SECRET})"
if gcloud secrets describe "${SECRET}" >/dev/null 2>&1; then
  append_cmd gcloud secrets versions list "${SECRET}" --format="table(name,state,createTime)"
else
  log "  Secret ${SECRET} does NOT exist."
fi

log ""
log "Step 3) Cloud Run service description (${SERVICE}, ${REGION})"
if ! gcloud run services describe "${SERVICE}" --region="${REGION}" >/dev/null 2>&1; then
  log "ERROR: Cloud Run service '${SERVICE}' not found in region '${REGION}'."
  exit 1
fi

append_cmd gcloud run services describe "${SERVICE}" --region="${REGION}" \
  --format="yaml(status.latestReadyRevisionName, status.latestCreatedRevisionName, spec.template.spec.serviceAccountName, spec.template.spec.containers[0].env)"

LATEST_CREATED="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(status.latestCreatedRevisionName)' || true)"
LATEST_READY="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(status.latestReadyRevisionName)' || true)"

log ""
log "  Latest Created Revision: ${LATEST_CREATED:-<none>}"
log "  Latest Ready Revision:   ${LATEST_READY:-<none>}"

if [[ -n "${LATEST_CREATED:-}" ]]; then
  log ""
  log "Step 4) Revision env for ${LATEST_CREATED}"
  append_cmd gcloud run revisions describe "${LATEST_CREATED}" --region="${REGION}" --format="yaml(spec.containers[0].env)"
fi

log ""
log "Step 5) Check for OPENAI_API_KEY in service env"
# Print raw env list and also a boolean check
append_cmd gcloud run services describe "${SERVICE}" --region="${REGION}" --format="yaml(spec.template.spec.containers[0].env)"
HAS_OPENAI="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(spec.template.spec.containers[0].env.list().extract(name, OPENAI_API_KEY))' || true)"
if [[ -z "${HAS_OPENAI}" ]]; then
  log "  Result: OPENAI_API_KEY NOT present in service env"
else
  log "  Result: OPENAI_API_KEY PRESENT in service env"
fi

log ""
log "Verification complete. Report saved to: ${OUT}"

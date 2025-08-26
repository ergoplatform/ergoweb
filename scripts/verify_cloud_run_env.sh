#!/usr/bin/env bash
# Verifies that OPENAI_API_KEY is configured on Cloud Run and captures all output to a report file.
# Usage:
#   ./scripts/verify_cloud_run_env.sh [SECRET_NAME] [REGION] [SERVICE] [OUTFILE]
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

# Tee all stdout/stderr to file and console
exec > >(tee "$OUT") 2>&1

echo "=== Cloud Run Env Verification ==="
date

echo
echo "Step 1) Project"
PROJECT_ID="$(gcloud config get-value project --quiet || true)"
if [[ -z "${PROJECT_ID}" ]]; then
  echo "ERROR: No default project set (run: gcloud config set project YOUR_PROJECT_ID)"
  exit 1
fi
echo "  Project ID: ${PROJECT_ID}"

echo
echo "Step 2) Secret versions (${SECRET})"
if gcloud secrets describe "${SECRET}" >/dev/null 2>&1; then
  gcloud secrets versions list "${SECRET}" --format="table(name,state,createTime)"
else
  echo "  Secret ${SECRET} does NOT exist."
fi

echo
echo "Step 3) Cloud Run service description (${SERVICE}, ${REGION})"
if ! gcloud run services describe "${SERVICE}" --region="${REGION}" >/dev/null 2>&1; then
  echo "ERROR: Cloud Run service '${SERVICE}' not found in region '${REGION}'."
  exit 1
fi

gcloud run services describe "${SERVICE}" --region="${REGION}" \
  --format="yaml(status.latestReadyRevisionName, status.latestCreatedRevisionName, spec.template.spec.serviceAccountName, spec.template.spec.containers[0].env)"

LATEST_CREATED="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(status.latestCreatedRevisionName)' || true)"
LATEST_READY="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(status.latestReadyRevisionName)' || true)"

echo
echo "  Latest Created Revision: ${LATEST_CREATED:-<none>}"
echo "  Latest Ready Revision:   ${LATEST_READY:-<none>}"

if [[ -n "${LATEST_CREATED:-}" ]]; then
  echo
  echo "Step 4) Revision env for ${LATEST_CREATED}"
  gcloud run revisions describe "${LATEST_CREATED}" --region="${REGION}" --format="yaml(spec.containers[0].env)"
fi

echo
echo "Step 5) Check for OPENAI_API_KEY in service env"
HAS_OPENAI="$(gcloud run services describe "${SERVICE}" --region="${REGION}" --format='value(spec.template.spec.containers[0].env.list().extract(name, OPENAI_API_KEY))' || true)"
if [[ -z "${HAS_OPENAI}" ]]; then
  echo "  Result: OPENAI_API_KEY NOT present in service env"
else
  echo "  Result: OPENAI_API_KEY PRESENT in service env"
fi

echo
echo "Verification complete. Report saved to: ${OUT}"

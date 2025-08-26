#!/usr/bin/env bash
# Setup OPENAI_API_KEY in Google Secret Manager and inject into a Cloud Run service.
# Captures all output into scripts/reports and produces LATEST_*.yaml files for easy viewing.
#
# Usage:
#   bash scripts/setup_openai_secret_and_inject.sh [SECRET_NAME] [REGION] [SERVICE]
# Defaults:
#   SECRET_NAME=OPENAI_API_KEY
#   REGION=europe-west4
#   SERVICE=ergo-platform-frontend

set -euo pipefail

# Inputs
SECRET="${1:-OPENAI_API_KEY}"
REGION="${2:-europe-west4}"
SERVICE="${3:-ergo-platform-frontend}"

# Resolve repo root (this script lives in scripts/)
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REPORT_DIR="$REPO_ROOT/scripts/reports"
mkdir -p "$REPORT_DIR"

TS="$(date +%Y%m%d-%H%M%S)"
LOG="$REPORT_DIR/setup_${SECRET}_${TS}.log"

# Log everything to file and console
exec > >(tee -a "$LOG") 2>&1

echo "=== Setup Secret and Inject into Cloud Run ==="
echo "Secret  : $SECRET"
echo "Region  : $REGION"
echo "Service : $SERVICE"
echo "Reports : $REPORT_DIR"
date

# Step 1: Validate project and .env
PROJECT_ID="$(gcloud config get-value project --quiet || true)"
if [[ -z "${PROJECT_ID}" || "${PROJECT_ID}" == "(unset)" ]]; then
  echo "ERROR: No default project set. Run: gcloud config set project YOUR_PROJECT_ID"
  exit 1
fi
echo "Project: $PROJECT_ID"

ENV_FILE="$REPO_ROOT/.env"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: .env not found at $ENV_FILE"
  exit 1
fi

# Extract key without printing it
KEY="$(sed -nE 's/^[[:space:]]*'"$SECRET"'[[:space:]]*=[[:space:]]*\"?([^\"#]+)\"?.*$/\1/p' "$ENV_FILE" | tail -n1 || true)"
if [[ -z "${KEY}" ]]; then
  # Fallback to OPENAI_API_KEY if SECRET is not named that
  if [[ "$SECRET" != "OPENAI_API_KEY" ]]; then
    KEY="$(sed -nE 's/^[[:space:]]*OPENAI_API_KEY[[:space:]]*=[[:space:]]*\"?([^\"#]+)\"?.*$/\1/p' "$ENV_FILE" | tail -n1 || true)"
  fi
fi
if [[ -z "${KEY}" ]]; then
  echo "ERROR: $SECRET (or OPENAI_API_KEY) not found or empty in .env"
  exit 1
fi
echo "Found secret value in .env (not printing)."

# Step 2: Enable Secret Manager API and ensure secret exists
echo "Enabling Secret Manager API (idempotent)..."
gcloud services enable secretmanager.googleapis.com --quiet || true

if gcloud secrets describe "$SECRET" >/dev/null 2>&1; then
  echo "Secret '$SECRET' already exists."
else
  echo "Creating Secret Manager secret: $SECRET"
  gcloud secrets create "$SECRET" --replication-policy="automatic"
fi

# Step 3: Add a new secret version from .env using a secure temp file
TMP="$(mktemp)"
umask 077
printf %s "$KEY" > "$TMP"
unset KEY
echo "Adding new secret version to '$SECRET'..."
gcloud secrets versions add "$SECRET" --data-file="$TMP" >/dev/null
rm -f "$TMP"

# Step 4: Resolve Cloud Run Service Account (fallback to default Compute SA)
echo "Resolving Cloud Run Service Account for $SERVICE..."
SA="$(gcloud run services describe "$SERVICE" --region="$REGION" --format='value(spec.template.spec.serviceAccountName)' 2>/dev/null || true)"
if [[ -z "${SA:-}" || "$SA" == "null" ]]; then
  PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
  SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
fi
echo "Using service account: $SA"

# Step 5: Grant accessor to Secret
echo "Granting roles/secretmanager.secretAccessor to $SA (idempotent)..."
gcloud secrets add-iam-policy-binding "$SECRET" \
  --member="serviceAccount:${SA}" \
  --role="roles/secretmanager.secretAccessor" \
  --quiet >/dev/null || true

# Step 6: Update Cloud Run service to inject the secret (fully-qualified path)
echo "Updating Cloud Run service to inject secret env var..."
gcloud run services update "$SERVICE" \
  --region="$REGION" \
  --set-secrets "${SECRET}=${SECRET}:latest" \
  --quiet

# Step 7: Verify and write outputs
SERVICE_ENV="$REPORT_DIR/service_env_${TS}.yaml"
REV_FILE="$REPORT_DIR/revision_${TS}.txt"
REV_ENV="$REPORT_DIR/revision_env_${TS}.yaml"

echo "Describing Cloud Run service env..."
gcloud run services describe "$SERVICE" --region="$REGION" \
  --format="yaml(status.latestReadyRevisionName, status.latestCreatedRevisionName, spec.template.spec.serviceAccountName, spec.template.spec.containers[0].env)" \
  > "$SERVICE_ENV" 2>&1 || true

LATEST_CREATED="$(gcloud run services describe "$SERVICE" --region="$REGION" --format='value(status.latestCreatedRevisionName)' || true)"
echo "${LATEST_CREATED:-}" > "$REV_FILE"

if [[ -n "${LATEST_CREATED:-}" ]]; then
  echo "Describing revision env for ${LATEST_CREATED}..."
  gcloud run revisions describe "$LATEST_CREATED" --region="$REGION" \
    --format="yaml(spec.containers[0].env)" \
    > "$REV_ENV" 2>&1 || true
else
  echo "No latestCreatedRevisionName found."
fi

# Convenience "latest" symlinks/copies for quick read
cp -f "$SERVICE_ENV" "$REPORT_DIR/LATEST_service_env.yaml" || true
cp -f "$REV_ENV" "$REPORT_DIR/LATEST_revision_env.yaml" 2>/dev/null || true

echo
echo "Setup complete."
echo "Reports written:"
echo "  $SERVICE_ENV"
echo "  $REV_FILE"
if [[ -f "$REV_ENV" ]]; then
  echo "  $REV_ENV"
fi
echo "  $REPORT_DIR/LATEST_service_env.yaml"
if [[ -f "$REPORT_DIR/LATEST_revision_env.yaml" ]]; then
  echo "  $REPORT_DIR/LATEST_revision_env.yaml"
fi

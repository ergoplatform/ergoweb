#!/usr/bin/env bash
set -euo pipefail

# inputs with safe defaults
PROJECT_ID="${PROJECT_ID:-ergo-341017}"
REGION="${REGION:-europe-west4}"
REPO="${REPO:-ergo-frontend}"
SERVICE="${SERVICE:-}"
SERVICES="${SERVICES:-}"

# derive services list
if [ -z "${SERVICES}" ]; then
  if [ -n "${SERVICE}" ]; then
    SERVICES="${SERVICE}"
  else
    SERVICES="ergo-platform-frontend"
  fi
fi

echo "Project: ${PROJECT_ID}"
echo "Region:  ${REGION}"
echo "Repo:    ${REPO}"
echo "Services: ${SERVICES}"
echo

# enable apis
gcloud services enable artifactregistry.googleapis.com run.googleapis.com --project "${PROJECT_ID}"

# identities
PROJECT_NUMBER="$(gcloud projects describe "${PROJECT_ID}" --format="value(projectNumber)")"
CLOUD_BUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"
DEFAULT_RUNTIME_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

echo "Cloud Build SA: ${CLOUD_BUILD_SA}"
echo "Default Runtime SA: ${DEFAULT_RUNTIME_SA}"
echo

# writer for Cloud Build on the repo
gcloud artifacts repositories add-iam-policy-binding "${REPO}" \
  --location="${REGION}" \
  --project="${PROJECT_ID}" \
  --member="serviceAccount:${CLOUD_BUILD_SA}" \
  --role="roles/artifactregistry.writer"

# reader for each runtime service account
for SVC in ${SERVICES}; do
  echo "Resolving runtime SA for service: ${SVC}"
  set +e
  RUNTIME_SA="$(gcloud run services describe "${SVC}" \
    --region="${REGION}" \
    --project="${PROJECT_ID}" \
    --format="value(spec.template.spec.serviceAccountName)")"
  DESCRIBE_RC=$?
  set -e

  if [ ${DESCRIBE_RC} -ne 0 ] || [ -z "${RUNTIME_SA}" ]; then
    echo "Service not found or has no explicit SA, using default runtime SA"
    RUNTIME_SA="${DEFAULT_RUNTIME_SA}"
  fi

  echo "Granting reader to: ${RUNTIME_SA}"
  gcloud artifacts repositories add-iam-policy-binding "${REPO}" \
    --location="${REGION}" \
    --project="${PROJECT_ID}" \
    --member="serviceAccount:${RUNTIME_SA}" \
    --role="roles/artifactregistry.reader"
  echo
done

# show final policy
echo "Current IAM bindings on repo ${REPO}:"
gcloud artifacts repositories get-iam-policy "${REPO}" \
  --location="${REGION}" \
  --project="${PROJECT_ID}" \
  --format="table(bindings.role, bindings.members)"

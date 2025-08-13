Grant Artifact Registry access

Prereqs
• gcloud installed and authenticated
• Project id, region, repo created
• Cloud Run service exists or you know the runtime service account

Run
export PROJECT_ID=ergo-341017
export REGION=europe-west4
export REPO=ergo-frontend
export SERVICE=ergo-platform
bash scripts/grant_ar_access.sh

The script enables required APIs, grants writer to the Cloud Build service account, grants reader to the Cloud Run runtime service account, then prints the repo IAM policy.

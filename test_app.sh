#!/bin/bash
set -e

echo "Building the app..."
npm run build

echo "Checking for processes on port 3000 and killing them if found..."
# Kill any process listening on port 3000
lsof -ti tcp:3000 | xargs kill -9 || true

echo "Starting the app in the background..."
npm start &
APP_PID=$!
echo "App started with PID: $APP_PID"

echo "Waiting for the app to boot (max 30 seconds)..."
TIMEOUT=30
INTERVAL=2
ELAPSED=0
while ! nc -z localhost 3000; do
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "App did not start within $TIMEOUT seconds. Exiting."
    kill $APP_PID || true # Attempt to kill even if it's already gone
    exit 1
  fi
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
  echo "Waiting... ($ELAPSED/$TIMEOUT s)"
done
echo "App is running on http://localhost:3000"

echo "Running Lighthouse audit..."
npx lighthouse http://localhost:3000 --quiet --chrome-flags="--headless" --output=json --output-path=./lighthouse-report.json

echo "Killing the background app (PID: $APP_PID)..."
kill $APP_PID || true # Use || true to prevent script from exiting if process is already gone

echo "Parsing Lighthouse report..."
node -e '
const fs = require("fs");
const reportPath = "./lighthouse-report.json";

try {
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));

  const getScore = (category) => (report.categories[category] ? Math.round(report.categories[category].score * 100) : "N/A");
  const getMetric = (audit) => (report.audits[audit] ? report.audits[audit].displayValue : "N/A");

  const performanceScore = getScore("performance");
  const accessibilityScore = getScore("accessibility");
  const bestPracticesScore = getScore("best-practices");
  const seoScore = getScore("seo");

  const fcp = getMetric("first-contentful-paint");
  const tti = getMetric("interactive");

  let failedAudits = [];
  for (const auditKey in report.audits) {
    const audit = report.audits[auditKey];
    // Consider an audit "failed" if its score is less than 1 (100%) and not null
    if (audit.score !== null && audit.score < 1) {
      failedAudits.push(`${audit.title} (Score: ${Math.round(audit.score * 100)}%)`);
    }
  }

  console.log("\n--- Lighthouse Audit Summary ---");
  console.log(`Performance: ${performanceScore}`);
  console.log(`Accessibility: ${accessibilityScore}`);
  console.log(`Best Practices: ${bestPracticesScore}`);
  console.log(`SEO: ${seoScore}`);
  console.log(`First Contentful Paint: ${fcp}`);
  console.log(`Time to Interactive: ${tti}`);

  if (failedAudits.length > 0) {
    console.log("\nFailed Audits:");
    failedAudits.forEach(audit => console.log(`- ${audit}`));
  } else {
    console.log("\nNo failed audits found. Great job!");
  }
  console.log("------------------------------\n");

} catch (error) {
  console.error(`Error parsing Lighthouse report: ${error.message}`);
  process.exit(1);
}
'

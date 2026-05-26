#!/bin/zsh

echo "Killing any existing npm start processes..."
pkill -f "npm start"

echo "Running npm run build..."
npm run build

echo "Running npm start..."
npm start &

# Give the server some time to start
echo "Waiting for the server to start (10 seconds)..."
sleep 10

echo "Launching browser to http://localhost:3000/"

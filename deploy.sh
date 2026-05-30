#!/usr/bin/env bash
set -euo pipefail

SERVER="ubuntu@ec2-3-212-235-147.compute-1.amazonaws.com"
SITE_DIR="/var/www/lawn-care"
SITE_URL="https://yycxpert.ca"

echo "→ Pulling latest on EC2..."
ssh "$SERVER" "cd $SITE_DIR && git pull --ff-only origin main && git log --oneline -1"

echo
echo "→ Verifying live site..."
status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "$SITE_URL")
if [ "$status" = "200" ]; then
  echo "✓ $SITE_URL responded $status"
else
  echo "✗ $SITE_URL responded $status — check the server"
  exit 1
fi

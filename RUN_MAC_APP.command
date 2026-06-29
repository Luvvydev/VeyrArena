#!/bin/bash
cd "$(dirname "$0")"
if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js is required. Install the LTS version from https://nodejs.org/"
  read -n 1 -s -r -p "Press any key to close"
  exit 1
fi
if [ ! -d "node_modules" ]; then
  echo "Installing desktop app dependencies..."
  npm install || { read -n 1 -s -r -p "Press any key to close"; exit 1; }
fi
npm run app:mac

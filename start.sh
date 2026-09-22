#!/bin/bash
# CrickPulse - start backend API and frontend dev server

# Start backend API on port 3001
node "$(dirname "$0")/backend/server.js" &
BACKEND_PID=$!

# Start frontend dev server on port 5173 (exposed preview port)
npm --prefix "$(dirname "$0")/frontend" run dev

# Stop backend when frontend exits
trap "kill $BACKEND_PID" EXIT

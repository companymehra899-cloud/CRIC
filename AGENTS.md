# CrickPulse — Base44 Dev Environment

## Overview
CrickPulse is a live cricket scores app: Express backend (`backend/server.js`, port 3001) + Vite/React frontend (`frontend/`, port 5173, proxied to 3000). No database — data comes from cricapi.com or bundled mock data.

## Architecture
- **Two compose services**: `backend` (Express API) and `web` (Vite dev server). The frontend proxies `/api` requests to the backend via Vite's dev-server proxy (`VITE_API_PROXY_TARGET` env var).
- **Single origin**: only port 3000 is public. All API calls go through the Vite proxy.
- No database, no cache service, no workers.

## Running
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
- Frontend: http://localhost:3000 (Vite dev server with HMR)
- Backend: internal only (port 3001, not exposed to host)

## Secrets
- `CRICKET_API_KEY` (optional): cricapi.com API key for live data. Without it, the app serves bundled mock data. Set via the Base44 dashboard; delivered to `/run/base44/app.env`.

## Verification
- `curl http://localhost:3000` → HTML page (CrickPulse frontend)
- `curl http://localhost:3000/api/health` → `{"ok":true,...}`
- `curl http://localhost:3000/api/home` → match/series/news data

## Notes
- Vite `allowedHosts` is set to `true` to accept the preview's dynamic hostname.
- The proxy target defaults to `http://127.0.0.1:3001` (local dev) and is overridden to `http://backend:3001` in compose.
- Backend has no file watcher; restart the `backend` service after backend code changes.
- Frontend has Vite HMR; changes hot-reload automatically.

# Discovery Frontend

Vite + React + shadcn + Tailwind SPA for the Discovery experience. It lets users upload discovery call recordings, view processing jobs, and consume the generated prep/plan outputs from the backend.

## Run locally
- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`

## API configuration
- `src/lib/api.ts` uses `VITE_API_BASE_URL`; the default `/api` matches the current VPS routing. If that routing changes, set it accordingly.

## VPS deployment
- Build locally/CI, then serve the `dist/` output via nginx (or similar).
- Serve the SPA at `/discovery/` (alias to your static path).
- Proxy `/api/` to the Discovery backend (default backend port `3001`); avoid hardcoded public IPs.
- Example nginx locations:
  ```
  location /discovery/ {
    alias /usr/share/nginx/discovery-welcome/;
    index index.html;
    try_files $uri $uri/ /index.html;
  }
  location /api/ {
    proxy_pass http://127.0.0.1:3001/;
  }
  ```

## Guardrails
- No secrets in the repo; use a local `.env`/`.env.example` for variable names only.
- Do not commit build output.
- Keep edits small and reversible; take care with config changes.

# Discovery Frontend

Vite + React + shadcn + Tailwind SPA for the Discovery experience. It lets users upload discovery call recordings, view processing jobs, and consume the generated prep/plan outputs from the backend.

## Run locally
- Install deps: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`

## API configuration
- `src/lib/api.ts` uses `VITE_API_BASE_URL` if set; otherwise defaults to `/api`.

## VPS deployment
- Build locally/CI, then serve the `dist/` output via nginx (or similar).
- Proxy `/api` to the Discovery backend (default backend port `3001`); avoid hardcoded IPs and prefer domain-based proxying.

## Guardrails
- No secrets in the repo; use a local `.env`/`.env.example` for variable names only.
- Do not commit build output.
- Keep edits small and reversible; take care with config changes.

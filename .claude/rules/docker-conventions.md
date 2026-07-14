# Docker Conventions

## API Dockerfile (apps/api/Dockerfile) — 3 stages

### Stage 1: builder (oven/bun:1)
- Copy workspace manifests first for layer caching
- `bun install --frozen-lockfile` (includes devDeps for nest build)
- `prisma generate` with placeholder DATABASE_URL/DIRECT_URL (no real DB)
- `bun run build` → compiles TypeScript to dist/
- Clear placeholder env vars after build

### Stage 2: deps (oven/bun:1)
- Standalone `bun install` outside monorepo workspace
- Produces flat node_modules without Bun monorepo symlinks
- Required because Docker COPY cannot follow directory symlinks

### Stage 3: runner (oven/bun:1-slim)
- `NODE_ENV=production`
- COPY: dist, package.json, prisma/, docker-entrypoint.sh, node_modules
- `USER bun` (uid 1000, non-root)
- HEALTHCHECK: `wget -qO- http://localhost:3000/health` (30s interval, 15s start-period)
- ENTRYPOINT: `docker-entrypoint.sh` → runs `prisma migrate deploy` then `exec "$@"`
- CMD: `node dist/src/main` — NOT bun (NestJS decorator compat)

## docker-compose.yml

```
Services:
  redis : redis:7-alpine, port 6379, healthcheck, volume redis_data
  api   : port 8080, depends_on redis (healthy), networks [default, supabase]
  web   : port 3000, depends_on api

Networks:
  supabase : external "supabase_network_nutricert" (PostgreSQL, Kong)
```

## docker-entrypoint.sh (pattern 2025)

```bash
#!/bin/sh
set -e
bunx prisma migrate deploy --config prisma/prisma.config.ts
exec "$@"    # exec remplace le process shell → PID 1 = node (signaux propres)
```

- `set -e` : echouer immediatement si une commande fail (pas de migration silencieuse)
- `exec "$@"` : remplace le shell par le CMD (node) → PID 1 recoit SIGTERM proprement
- Migrations AVANT le serveur — si la migration fail, le container ne demarre pas

## depends_on avec healthcheck (pattern 2025)

```yaml
depends_on:
  redis:
    condition: service_healthy   # Attend que Redis soit HEALTHY, pas juste started
```

Toujours utiliser `condition: service_healthy` (pas `service_started`) pour les dependances critiques.

## Rules

- Always use `bun install --frozen-lockfile` (never bare `bun install` in CI/Docker)
- Runtime API is `node` not `bun` — do not change without thorough NestJS testing
- Never put real secrets in Dockerfile ENV — use placeholder for build, inject at runtime
- Always run as non-root user in production images (`USER bun`, uid 1000)
- HEALTHCHECK mandatory on every service Dockerfile
- Use `.dockerignore` to exclude: node_modules, .git, .next, dist, .env*, coverage, e2e
- Pin base images with version tags (oven/bun:1, redis:7-alpine) — jamais `:latest`
- Layer caching: COPY lockfiles → install → COPY source (cet ordre)
- `exec "$@"` dans entrypoint — PID 1 doit etre le process principal (pas sh)
- `depends_on` avec `condition: service_healthy` — pas `service_started`
- `set -e` dans tous les scripts shell — fail-fast
- Prisma `migrate deploy` en entrypoint (pas en Dockerfile) — les migrations s'executent au runtime avec la vraie DB
- Ne pas repeter `prisma generate` dans le runner stage — genere uniquement dans le builder

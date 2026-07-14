# Monitoring Conventions

## Health Checks (`/health` — public, @nestjs/terminus)

Checks: Database (Prisma SELECT 1), Redis (PING), Disk (threshold %), Memory (heap limit)
Configured via env: `HEALTH_DISK_PATH`, `HEALTH_DISK_THRESHOLD_PERCENT`, `HEALTH_MEMORY_HEAP_MB`
Docker HEALTHCHECK uses this endpoint.

## Admin Monitoring (`/admin/monitoring` — SuperAdminGuard)

| Endpoint | Service | Description |
|----------|---------|-------------|
| `GET /overview` | All | Aggregated health: API + PostgreSQL + Redis + BullMQ |
| `GET /api` | ApiMonitoringService | Latency P50/P95/P99, error rate, req/min |
| `GET /database` | DatabaseMonitoringService | Connections, slow queries, DB size |
| `GET /database/explain?q=` | DatabaseMonitoringService | EXPLAIN ANALYZE (SELECT only) |
| `GET /redis` | RedisMonitoringService | Memory, hit rate, keys, commands/sec |
| `GET /queues` | QueueMonitoringService | BullMQ job counts per queue |
| `GET /sentry` | SentryMonitoringService | Sentry errors (API or SystemMetric fallback) |
| `GET /infra` | InfraMonitoringService | CPU, RAM, Node.js process, uptime |
| `SSE /logs/stream` | LogBufferService | Real-time log stream |
| `GET /logs/recent` | LogBufferService | Buffered logs (max 500) |

Valid BullMQ queues: `email`, `audit`, `webhook`, `gdpr`, `analytics-events`

## Sentry Backend — @sentry/nestjs (conventions 2025)

### Setup (3 etapes obligatoires)

**1. `instrument.ts`** — init Sentry AVANT tout import NestJS :
```typescript
// apps/api/src/instrument.ts — DOIT etre importe en PREMIER dans main.ts
import * as Sentry from '@sentry/nestjs';
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,  // PAS profilesSampleRate (deprecie)
  enableLogs: true,
  sendDefaultPii: true,
});
```

**2. `SentryModule.forRoot()`** — dans `app.module.ts` imports :
```typescript
import { SentryModule } from '@sentry/nestjs/setup';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

@Module({
  imports: [SentryModule.forRoot(), /* ... */],
  providers: [{ provide: APP_FILTER, useClass: SentryGlobalFilter }],
})
```

**3. `@SentryExceptionCaptured()`** — sur tout custom exception filter :
```typescript
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  @SentryExceptionCaptured()   // OBLIGATOIRE — sinon Sentry ne capture pas
  catch(exception: unknown, host: ArgumentsHost) { /* ... */ }
}
```

### Points critiques backend
- `instrument.ts` DOIT etre le premier import dans `main.ts` (avant NestJS, avant OTel)
- `@sentry/profiling-node` fonctionne uniquement sous Node.js (desactive sous Bun)
- `profileSessionSampleRate` remplace `profilesSampleRate` (ancien nom deprecie)
- `SentryModule.forRoot()` est obligatoire — sans lui, le tracing NestJS ne fonctionne pas
- `SentryGlobalFilter` capture les exceptions non-gerees automatiquement
- `@SentryExceptionCaptured()` est obligatoire sur les custom filters — sinon les exceptions ne remontent pas
- Env vars : `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`

## Sentry Frontend — @sentry/nextjs (conventions 2025)

### Setup (4 fichiers)

**1. `sentry.client.config.ts`** — client-side :
```typescript
import * as Sentry from '@sentry/nextjs';
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sendDefaultPii: true,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({ /* ... */ }),
  ],
});
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
```

**2. `sentry.server.config.ts`** + **3. `sentry.edge.config.ts`** — server/edge traces

**4. `instrumentation.ts`** — Next.js instrumentation hook :
```typescript
import * as Sentry from '@sentry/nextjs';
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') await import('./sentry.server.config');
  if (process.env.NEXT_RUNTIME === 'edge') await import('./sentry.edge.config');
}
export const onRequestError = Sentry.captureRequestError;  // Capture les erreurs de requete
```

**5. `next.config.ts`** — `withSentryConfig()` obligatoire :
```typescript
import { withSentryConfig } from '@sentry/nextjs';
export default withSentryConfig(nextConfig, {
  org: '...',
  project: '...',
  silent: !process.env.CI,
  sourcemaps: { deleteSourcemapsAfterUpload: true },
  bundleSizeOptimizations: {
    excludeDebugStatements: true,     // Tree-shake les logs Sentry en prod
    excludeReplayIframe: true,        // Reduire le bundle replay
    excludeReplayShadowDom: true,     // Reduire le bundle replay
  },
});
```

### Points critiques frontend
- `withSentryConfig()` est OBLIGATOIRE dans `next.config.ts` — sans lui, pas de source maps ni de tree-shaking
- `onRequestError = Sentry.captureRequestError` dans `instrumentation.ts` — capture les erreurs de requete server-side
- `onRouterTransitionStart` exporte depuis `sentry.client.config.ts` — tracking des transitions de route
- `bundleSizeOptimizations` : toujours activer `excludeDebugStatements` en prod
- `sourcemaps.deleteSourcemapsAfterUpload: true` — ne pas exposer les source maps en prod

### Server Actions (si utilise)
```typescript
'use server';
import * as Sentry from '@sentry/nextjs';
import { headers } from 'next/headers';

export async function myAction(formData: FormData) {
  return Sentry.withServerActionInstrumentation('myAction', {
    headers: await headers(),
    formData,
    recordResponse: true,
  }, async () => { /* ... */ });
}
```

## Sentry — Rules globales

- Ne JAMAIS hardcoder les DSN — toujours via env vars
- `Sentry.captureException()` pour les erreurs manuelles
- `Sentry.logger.*` pour le structured logging (`enableLogs: true`)
- Ne jamais logger tokens, passwords, PII dans les breadcrumbs
- `sendDefaultPii: true` = verifier que les inputs sensibles (password, card) sont masques dans le replay
- `profileSessionSampleRate` (PAS `profilesSampleRate`) — nom officiel 2025
- Source maps : upload via `withSentryConfig()` en frontend, `SENTRY_AUTH_TOKEN` en CI

## OpenTelemetry (`apps/api/src/telemetry/otel-sdk.ts`)

- NodeSDK + OTLP HTTP exporter (`OTEL_EXPORTER_OTLP_ENDPOINT`, default localhost:4318)
- Service name: `OTEL_SERVICE_NAME`
- Auto-instrumentations (fs disabled for performance)
- Graceful shutdown on SIGTERM/SIGINT

## Logging (Pino)

- `nestjs-pino` + `pino-http` middleware
- Pretty-print in dev, structured JSON in prod
- Log level: `LOG_LEVEL` env var
- In-memory ring buffer (LogBufferService) for real-time SSE streaming (max 500 entries)

## Rules generales

- All monitoring endpoints require SuperAdminGuard — never make them public
- Health check endpoint must stay public (used by Docker, load balancers, uptime monitors)
- Cache monitoring responses (1min) to avoid performance impact
- Log structured JSON in production — never pretty-print
- Never log sensitive data (passwords, tokens, session secrets, PII)
- Sentry `sendDefaultPii: true` means be extra careful with breadcrumbs and replay

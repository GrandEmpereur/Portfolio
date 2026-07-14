---
paths:
  - "apps/api/**/*.ts"
---

# API Conventions

- Use Zod for validation, never class-validator
- DTOs go in `[module]/dto/[module].dto.ts` as Zod schemas
- Use NestJS built-in exceptions (NotFoundException, ConflictException, etc.)
- DI via constructor: `constructor(private readonly service: ServiceName)`
- Decorate public routes with `@Public()`, everything else requires auth
- Use `@Audit('action')` on mutations that need audit trail
- Use `@RequirePermissions('action', 'subject')` for RBAC
- Use `@RequireFeature('flag')` for feature-gated endpoints
- Background work goes to BullMQ queues, never block the request
- Always paginate list endpoints
- Use Prisma `select` to limit fetched fields
- Response format is `{ data, meta }` via TransformInterceptor
- Run `bun run prisma:generate` after any schema change
- Run `bun run test -- --testPathPattern=<module>` after changes

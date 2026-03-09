---
paths:
  - "apps/api/**/*.ts"
  - "src/api/**/*.ts"
  - "src/server/**/*.ts"
---

# API Conventions — NestJS / Express / Backend

## Architecture
- 1 module = 1 feature : controller + service + DTOs + tests
- DI par constructeur : `constructor(private readonly service: ServiceName)`
- Services stateless : aucun state mutable
- `forwardRef()` seulement si dependance circulaire unavoidable

## Controllers
- Decorateurs : `@Get()`, `@Post()`, `@Patch()`, `@Delete()` (pas PUT)
- Parametres types : `@Param('id')`, `@Query()`, `@Body()`
- Pas de logique metier dans les controllers — deleguer aux services
- Swagger/OpenAPI sur chaque endpoint

## Validation & DTOs
- Zod uniquement — jamais class-validator
- DTOs dans `[module]/dto/` : `z.object({...})`
- Infer les types : `type CreateDto = z.infer<typeof schema>`

## Securite
- Tout est protege par defaut — routes publiques explicites
- RBAC avec guards sur les mutations
- CSRF sur toute mutation
- Validation Zod sur TOUTE entree utilisateur
- Pas de secrets en dur

## Error handling
- Utiliser les exceptions built-in du framework
- Ne JAMAIS catch + ignore silencieusement
- Pas de stack traces en production

## Performance
- Jobs async pour tout traitement > 100ms
- Pagination obligatoire sur toutes les listes
- `select` pour limiter les champs charges
- Eviter N+1 : `include` ou `in` filters

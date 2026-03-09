---
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# Architecture Patterns

Consulter `CLAUDE.md` pour l'architecture specifique du projet.

## Principes directeurs

1. **YAGNI** — Ne pas anticiper des besoins non valides
2. **KISS** — La solution la plus simple qui repond au besoin
3. **DRY** — 3 occurrences avant d'abstraire (pas avant)
4. **Separation of Concerns** — 1 module = 1 responsabilite
5. **Dependency Inversion** — Dependre des abstractions via DI
6. **Fail Fast** — Validation au plus tot (schemas, guards, pipes)
7. **Convention over Configuration** — Suivre les patterns du framework

## Patterns backend
- 1 module = 1 feature complete (controller + service + DTOs + guards)
- Request pipeline : Guards → Pipes → Controller → Service → DB → Interceptors → Filters
- Chaque couche a une responsabilite unique

## Patterns frontend
- Server Components pour data fetching et layout
- Client Components pour interactivite (formulaires, modals)
- Pousser le `"use client"` le plus bas possible dans l'arbre
- Pas de prop drilling excessif — Context si necessaire

## Patterns partages
- Schemas Zod definis une fois, utilises partout
- Types inferes avec `z.infer<typeof schema>`
- Error handling : try/catch + toast.error() pour les mutations

## Quand changer de pattern

| Signal | Evolution possible |
|--------|-------------------|
| Module trop gros (> 20 fichiers) | Sous-modules |
| Latence inter-modules | Event-driven |
| Scale independant necessaire | Extract microservice |
| Queries analytiques lentes | Materialized views, CQRS |

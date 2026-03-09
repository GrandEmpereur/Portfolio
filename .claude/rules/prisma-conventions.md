---
paths:
  - "**/prisma/**"
  - "**/src/prisma/**"
---

# Prisma & Database Conventions

## Schema Design
- UUIDs : `@id @default(dbgenerated("gen_random_uuid()")) @db.Uuid`
- Timestamps : `createdAt DateTime @default(now())` + `updatedAt DateTime @updatedAt`
- Relations : toujours definir `onDelete` explicitement (CASCADE, SET NULL, RESTRICT)
- Enums Prisma pour les valeurs fixes (< 10 valeurs stables)
- Champs optionnels (`?`) uniquement si NULL a un sens metier
- Normalisation 3NF minimum

## Indexes (critique)
- `@@index` sur chaque foreign key utilisee dans WHERE/JOIN/ORDER BY
- `@@index` sur les champs filtres frequemment (status, slug, email, active)
- `@@unique` pour les contraintes d'unicite metier
- Index composite : champ le plus selectif en premier
- Pas d'index excessif — ralentit les ecritures

## Queries
- Jamais `findMany()` sans pagination
- `select` pour limiter les champs
- `include` pour les relations (eviter N+1)
- `relationLoadStrategy: "join"` pour les relations critiques
- Batch queries avec `in` filter
- `$transaction` pour les operations atomiques

## Migrations
- Generer via la CLI Prisma — jamais modifier manuellement
- Nommer clairement : `add_field_to_model`, `create_table_name`
- Data migrations separees des schema migrations
- Zero-downtime : colonne nullable d'abord, migration, puis contrainte
- Tester sur dev avant commit

## Securite
- Pas de donnees sensibles en clair (passwords = hash)
- Validation Zod AVANT Prisma
- `$queryRaw` : jamais d'interpolation de variables

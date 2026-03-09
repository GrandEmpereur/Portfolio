# QA Tester - Memory (NutriCert)

## Commandes de test

- Tests API : `cd apps/api && pnpm test -- --passWithNoTests` (noter le `--` avant le flag Jest)
- Lint racine : `bun run lint` (via Turborepo)
- Types racine : `bun run check-types` (via Turborepo)
- Build racine : `bun run build` (via Turborepo)

## Bugs structurels connus (pre-existants, non liés au CI)

### BUG-STRUCT-1 : @repo/ui lint - eslint introuvable dans .bin
- `packages/ui/node_modules/eslint` existe mais `.bin/eslint` absent
- Bun workspaces hisse les binaires au niveau racine uniquement
- `bun run lint` depuis la racine échoue sur `@repo/ui#lint` (exit 127)
- Statut : bug pre-existant, pas lié au ticket CI/CD

### BUG-STRUCT-2 : @repo/ui check-types - rootDir ambigu
- `packages/ui/tsconfig.json` n'a pas de `rootDir` défini
- `tsc --noEmit` produit TS2209 sur toutes les export map entries
- `bun run check-types` depuis la racine échoue sur `@repo/ui#check-types`
- Statut : bug pre-existant, pas lié au ticket CI/CD

## Comportement CI Github Actions vs local

- En CI, `bun install --frozen-lockfile` installe tout proprement dans un environnement vierge
- Le problème `.bin/eslint` absent est probablement lié à l'état local des node_modules (installation partielle ou hoisting Bun)
- A surveiller : si le CI échoue aussi sur lint/check-types pour @repo/ui, c'est un bug bloquant

## Observations sur la syntaxe du CI

- Le CI utilise `pnpm test --passWithNoTests` (sans `--` séparateur)
- En local, pnpm interprète `--passWithNoTests` comme une option pnpm (pas Jest) et échoue
- En CI GitHub Actions, la commande `run:` exécute directement `pnpm test --passWithNoTests` via shell
- pnpm forward les args inconnus à Jest dans certaines versions : à vérifier selon version pnpm en CI

## Lockfile

- Le fichier s'appelle `bun.lock` (pas `bun.lockb`)
- Le CI référence `hashFiles('bun.lock')` : CORRECT pour la version actuelle de Bun

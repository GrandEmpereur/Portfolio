---
paths:
  - "**/*.spec.ts"
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/test/**"
  - "**/__tests__/**"
---

# Testing Best Practices

## Pyramide de test
- **Base** : Static analysis (TypeScript strict, ESLint) — tout le code
- **Unitaires** : Jest/Vitest + mocks — chaque service (> 80% couverture)
- **Integration** : Pipeline request complet avec DB test
- **E2E** : Scenarios metier critiques (Playwright ou Supertest)

## Tests unitaires

### Convention fichiers
- 1 fichier test par service : `auth.service.spec.ts`
- Colocalise avec le fichier teste

### Structure obligatoire (AAA)
```typescript
describe('ServiceName', () => {
  describe('methodName', () => {
    it('should [comportement] when [condition]', async () => {
      // Arrange — setup
      // Act — appel
      // Assert — verification
    })
  })
})
```

### Mocking
- Mocker : DB, Redis, services externes, APIs tierces
- Ne PAS mocker : logique metier interne, utils purs
- Mocker `Date.now()`, `Math.random()`, UUIDs pour le determinisme

### Ce qu'il faut tester
- Happy path, cas d'erreur, edge cases
- Permissions et auth
- Isolation multi-tenant si applicable

### Ce qu'il NE faut PAS tester
- Getters/setters triviaux
- Wrappers transparents sans logique
- Le framework lui-meme

## Validation frontend
- TypeScript strict — 0 erreur
- Build — sans erreur
- Lint — 0 warning

## Regles
- Tests deterministes : mocker tout le non-deterministe
- Pas de `it.skip()` sans commentaire
- Pas de `console.log` dans les tests
- Tests independants : pas de dependance d'ordre
- Noms descriptifs

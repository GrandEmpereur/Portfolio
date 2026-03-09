---
paths:
  - "**/*.{ts,tsx,js,jsx}"
  - ".claude/**"
---

# Validation multi-agents — Cycle TESTING / EN REVUE

Quand une tache passe en **TESTING** dans ClickUp, les agents suivants interviennent dans l'ordre. La tache ne peut passer en **TERMINE** qu'apres validation complete.

## Workflow de validation

```
TESTING
  │
  ▼
1. qa-tester (tests, build, lint)
  │
  ├── FAIL → EN REVUE → dev corrige → retour TESTING
  └── PASS ↓
      ▼
2. ciso (si tache securite)
  │
  ├── REJECT → EN REVUE → dev corrige → retour TESTING
  └── APPROVE ↓
      ▼
3. business-analyst (criteres d'acceptation)
  │
  ├── ECARTS → EN REVUE → dev corrige → retour TESTING
  └── OK ↓
      ▼
4. scrum-po (decision finale) → TERMINE
```

## 1. QA Tester (`qa-tester`)
- Executer les tests, build, type check, lint
- Produire un QA Report : PASS/FAIL par critere
- Si FAIL : statut EN REVUE + commentaire bugs
- Si PASS : continuer

## 2. CISO (`ciso`) — si securite
- Audit OWASP sur les fichiers modifies
- Si REJECT : statut EN REVUE + vulnerabilites
- Si APPROVE : continuer

## 3. Business Analyst (`business-analyst`)
- Verifier les criteres d'acceptation
- Si ECARTS : statut EN REVUE + ecarts
- Si OK : continuer

## 4. Scrum PO (`scrum-po`)
- Decision finale → TERMINE si tout est vert
- Commentaire de cloture

## Validation par batch

1. L'agent specialise implemente tous les tickets du batch
2. qa-tester valide le batch entier
3. ciso audite si securite concernee
4. business-analyst verifie les criteres
5. scrum-po decision finale

**IMPORTANT** : Tout le cycle doit se terminer dans le meme contexte.

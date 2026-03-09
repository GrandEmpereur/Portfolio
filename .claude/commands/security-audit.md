---
description: "Audit de securite du projet — OWASP, deps, headers, API"
argument-hint: "[scope: full|api|deps|headers]"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Agent"]
---

# Audit de securite

Lance un audit de securite sur le projet. Utilise l'agent `ciso` et le plugin `security-guidance`.

## Scope

- `$ARGUMENTS` peut etre : `full`, `api`, `deps`, `headers` (defaut: `full`)

## Workflow

1. **Audit des dependances** :
   ```bash
   bun audit 2>/dev/null || npx audit-ci --moderate 2>/dev/null || echo "Manual dep check needed"
   ```
   - Verifier les packages obsoletes ou avec vulnerabilites connues

2. **Audit du code** via l'agent `ciso` :
   - L'agent utilisera le plugin `security-guidance` pour des recommandations avancees
   - Rechercher les patterns dangereux dans le code source
   - Verifier la sanitization des entrees
   - Verifier les API routes (CORS, rate limiting, validation)
   - Verifier les headers de securite (CSP, X-Frame-Options, etc.)
   - Verifier les variables d'environnement (pas de secrets exposes)

3. **Rapport** au format :
   ```markdown
   ## Audit de securite — [date]

   ### Critiques (X)
   - Description + fichier:ligne + remediation

   ### Warnings (X)
   - Description + fichier:ligne + suggestion

   ### Passe (X checks)
   - Liste des verifications reussies
   ```

---
paths:
  - "**/auth/**"
  - "**/guards/**"
  - "**/middlewares/**"
  - "**/middleware/**"
  - "**/billing/**"
  - "**/webhooks/**"
  - "**/storage/**"
---

# Security Best Practices

## Authentication
- Sessions securisees (httpOnly + secure + sameSite) — ou JWT si justifie
- Regeneration de session ID apres login
- Logout invalide la session cote serveur
- 2FA si applicable (TOTP, backup codes)
- Tokens : hashes, expires, usage unique
- Bcrypt cost >= 10 pour le hashing

## Authorization
- Tout protege par defaut — exceptions explicites
- RBAC granulaire sur les mutations
- Toujours verifier l'appartenance de l'utilisateur a la ressource
- Tester IDOR : user ne peut pas acceder aux ressources d'un autre

## Input Validation
- Zod sur TOUTE entree utilisateur
- Schemas stricts (`.strict()` ou `.strip()`)
- Sanitization des strings si necessaire

## CSRF
- Protection sur toutes les mutations (POST, PATCH, DELETE)

## Rate Limiting
- Endpoints sensibles : login, register, reset password
- Plan-aware si SaaS multi-tier

## SSRF Prevention
- Webhook URLs : validation + blocage IPs privees/localhost
- Pas de fetch serveur avec URL utilisateur non validee

## Headers
- Security headers actifs (HSTS, X-Frame-Options, CSP)
- CORS restrictif (pas `*`)

## Secrets
- Jamais de secrets en dur dans le code
- Env vars validees au demarrage
- Pas de secrets dans les logs
- `timingSafeEqual()` pour comparer les tokens

## Error Handling
- Pas de leak d'info DB en production
- Pas de stack traces en production
- Messages d'erreur generiques pour l'utilisateur

## Audit
- Audit trail sur les actions sensibles
- IP + User-Agent enregistres
- Request ID dans chaque log

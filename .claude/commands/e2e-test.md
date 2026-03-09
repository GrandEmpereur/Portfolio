---
description: "Lance des tests E2E avec Playwright sur le site"
argument-hint: "[url-ou-page]"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Write", "Edit"]
---

# Tests E2E Playwright

Lance des tests end-to-end via le plugin Playwright.

## Workflow

1. **Determiner la cible** :
   - Si `$ARGUMENTS` fourni : tester cette page/URL
   - Sinon : tester la homepage (http://localhost:3000)

2. **Verifier que le serveur tourne** :
   Tester la connectivite au serveur de dev. Si non demarre, suggerer de lancer `bun dev`.

3. **Tests a effectuer** (utiliser le plugin **Playwright** pour les interactions navigateur) :
   - Navigation et liens fonctionnels
   - Formulaire de contact (validation, soumission)
   - Responsive (mobile, tablet, desktop)
   - i18n (switch entre les locales disponibles)
   - Accessibilite basique (headings, alt text, focus)
   - Performance (LCP, CLS via Lighthouse)

4. **Rapport** avec captures d'ecran si erreurs trouvees

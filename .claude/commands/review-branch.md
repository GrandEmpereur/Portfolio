---
description: "Review une branche avant PR — lance le github-reviewer agent sur le diff"
argument-hint: "[branch-name]"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Agent"]
---

# Review de branche avant PR

Review de code approfondie de la branche `$ARGUMENTS` contre la branche de base.

## Workflow

1. **Identifier la branche** : si `$ARGUMENTS` est vide, utiliser la branche courante

2. **Identifier la branche de base** : `develop` si elle existe, sinon `main`

3. **Lancer l'agent `github-reviewer`** sur la branche pour une review multi-dimensionnelle.
   L'agent doit utiliser les plugins `code-review` et `pr-review-toolkit` pour enrichir son analyse.

4. L'agent doit :
   - Executer `git diff <base>...$ARGUMENTS --stat` puis `git diff <base>...$ARGUMENTS`
   - Analyser chaque fichier modifie selon les 6 dimensions (bugs, securite, archi, perf, a11y, SEO)
   - Utiliser le plugin `security-guidance` pour les fichiers touchant l'auth/securite
   - Retourner un verdict APPROVE ou REQUEST_CHANGES avec les issues classees par priorite

5. Afficher le rapport de review au user

---
description: "Cree une PR depuis la branche courante vers develop avec review auto"
argument-hint: "[titre-pr]"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Agent"]
---

# Creation de PR avec review automatique

Cree une Pull Request depuis la branche courante vers la branche de base, avec generation automatique du titre et du body.

## Workflow

1. **Identifier la branche de base** : `develop` si elle existe, sinon `main`

2. **Analyser les changements** :
   ```bash
   git log <base>..HEAD --oneline
   git diff <base>...HEAD --stat
   ```

3. **Generer le titre et body** :
   - Si `$ARGUMENTS` est fourni, l'utiliser comme titre
   - Sinon, generer un titre concis basee sur les commits
   - Body au format :
     ```
     ## Summary
     - bullet points des changements

     ## Test plan
     - [ ] checklist de tests

     🤖 Generated with [Claude Code](https://claude.com/claude-code)
     ```

4. **Push et creer la PR** :
   ```bash
   git push origin HEAD -u
   gh pr create --base <base> --head <branch> --title "..." --body "..."
   ```

5. **Lancer une review** via l'agent `github-reviewer` sur la PR creee.
   L'agent utilisera les plugins `code-review` et `pr-review-toolkit` pour une review approfondie.

6. **Afficher** le lien de la PR et le resultat de la review

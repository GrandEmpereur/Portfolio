---
description: "Merge une PR apres verification — review + merge + cleanup"
argument-hint: "<pr-number>"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Agent"]
---

# Merge de PR avec verification

Merge la PR #`$ARGUMENTS` apres review et verification.

## Workflow

1. **Verifier la PR** :
   ```bash
   gh pr view $ARGUMENTS --json state,mergeable,mergeStateStatus,title,headRefName,baseRefName
   ```

2. **Lancer une review rapide** via l'agent `github-reviewer` si pas deja reviewee.
   Utiliser les plugins `code-review` et `pr-review-toolkit` pour une analyse complete.

3. **Si APPROVE** :
   ```bash
   gh pr merge $ARGUMENTS --merge
   ```

4. **Nettoyer** :
   - Supprimer la branche locale si elle existe
   - Supprimer le worktree si applicable

5. **Mettre a jour ClickUp** si un ticket est reference dans le titre de la PR

6. **Pull la branche de base** :
   ```bash
   git checkout <base> && git pull origin <base>
   ```

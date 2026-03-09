---
description: "Cree un sprint, priorise les taches ClickUp, et dispatche aux agents specialises"
argument-hint: "[sprint-number]"
allowed-tools: ["Bash", "Glob", "Grep", "Read", "Agent"]
---

# Sprint Dispatch

Organise les taches backlog ClickUp en sprint, les priorise, et les dispatche aux agents specialises en parallele.

## Workflow

1. **Recuperer les taches backlog** depuis ClickUp
   - Filtrer par status "backlog"
   - Exclure les taches deja "complete" ou "in progress"

2. **Prioriser les taches** :
   - P1 : Securite / Bugs critiques
   - P2 : SEO / Performance impactante
   - P3 : Architecture / Code quality
   - P4 : UX / Accessibilite
   - P5 : Nice-to-have

3. **Grouper en batches** sans conflit de fichiers :
   - Chaque batch touche des fichiers differents
   - Maximum 5 agents en parallele
   - Estimer les risques de conflits de merge

4. **Mettre a jour ClickUp** :
   - Passer les taches selectionnees en "in progress"

5. **Lancer les agents** en parallele avec isolation worktree :
   - `frontend-dev` pour les taches UI/components
   - `backend-dev` pour les taches API
   - `seo-expert` pour les taches SEO
   - `ciso` pour les taches securite
   - `github-reviewer` pour la review post-implementation

6. **Post-completion** :
   - Mettre a jour ClickUp en "complete"
   - Creer les PRs vers la branche de base
   - Lancer les reviews via `github-reviewer` avec les plugins `code-review` et `pr-review-toolkit`
   - Merger si APPROVE

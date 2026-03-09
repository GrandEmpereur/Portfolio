---
paths:
  - "**/*.{ts,tsx,js,jsx}"
  - ".claude/**"
---

# Workflow ClickUp

Assignee par defaut : **Patrick Bartosik**

## 0. Regroupement par domaine (OBLIGATOIRE)

**Avant toute implementation**, regrouper les tickets du backlog par domaine/agent :

| Domaine | Agent |
|---------|-------|
| DevOps | devops |
| Frontend | frontend-dev |
| Backend | backend-dev |
| Database | database-analyst |
| Security | ciso |

**Regles** :
- Scanner tout le backlog et regrouper les tickets du meme domaine en un seul batch
- Un batch = un contexte : implementation + validation dans la meme conversation
- Ne JAMAIS traiter les tickets un par un quand plusieurs du meme domaine existent

## 1. Cycle de vie (statuts)

```
BACKLOG → EN COURS → TESTING → EN REVUE (si echec) → TESTING (apres fix) → TERMINE
```

| Etape | Statut | Qui |
|-------|--------|-----|
| Planifie | **BACKLOG** | scrum-po |
| Debut dev | **EN COURS** | dev agent |
| Dev termine | **TESTING** | dev agent |
| Tests echoues | **EN REVUE** | qa-tester |
| Corrections | **TESTING** | dev agent |
| Tout OK | **TERMINE** | scrum-po |

## 2. Tags obligatoires

| Tag | Quand |
|-----|-------|
| `frontend`, `backend`, `database`, `security`, `devops` | Domaine |
| `feature`, `bug`, `refactor`, `testing`, `documentation` | Type |
| `P0-critique`, `P1-haute`, `P2-moyenne`, `P3-basse` | Priorite |
| `sprint-[N]` | Sprint |

## 3. Sprints (1 mois)

- Sprint planning au debut de chaque mois
- Nommer : `Sprint [N] - [Mois YYYY]`
- Estimer : S (< 30min) | M (30min-2h) | L (2h-4h) | XL (> 4h)
- Sprint review en fin de mois

## 4. Outils MCP ClickUp

| Action | Outil |
|--------|-------|
| Changer statut | `clickup_update_task` |
| Assigner | `clickup_update_task` avec `assignees` |
| Tags | `clickup_update_task` avec `tags` |
| Commentaire | `clickup_create_task_comment` |
| Temps | `clickup_add_time_entry` |
| Creer tache | `clickup_create_task` |
| Chercher | `clickup_search` |

## 5. Bonnes pratiques

- Toujours assigner a **Patrick Bartosik**
- Toujours ajouter les tags pertinents
- Commentaire a chaque changement de statut
- Temps arrondi a 5-15 min

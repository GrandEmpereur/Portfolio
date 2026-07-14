---
paths:
  - ".claude/agents/**"
---

# ClickUp Workflow Conventions

## MCP Integration

Le projet utilise ClickUp via un serveur MCP. Les outils disponibles sont prefixes `mcp__clickup__clickup_*`.

## Workflow de gestion de projet

### Structure workspace
- Utiliser `clickup_get_workspace_hierarchy` pour decouvrir spaces, folders, lists
- Ne jamais hardcoder d'IDs — toujours rechercher dynamiquement

### Creation de taches
- Utiliser `clickup_create_task` avec tous les champs requis
- Format priorite ClickUp : 1=Urgent, 2=High, 3=Normal, 4=Low
- Toujours ajouter des tags pertinents (backend, frontend, security, database, devops)
- Inclure les criteres d'acceptation dans la description

### Suivi et mise a jour
- Mettre a jour les statuts via `clickup_update_task` apres chaque phase
- Ajouter des commentaires via `clickup_create_task_comment` pour tracer les decisions
- Utiliser le time tracking (`clickup_start_time_tracking`, `clickup_stop_time_tracking`) si demande

### Format de decomposition (JSON)
Pour les audits et decompositions en batch, produire un JSON array :
```json
[
  {
    "title": "Titre court et descriptif",
    "description": "Description avec contexte et details techniques",
    "priority": 2,
    "tags": ["domain-tag"],
    "story_points": 3,
    "acceptance_criteria": ["GIVEN x WHEN y THEN z"],
    "technical_notes": "Fichiers impactes, patterns a suivre",
    "files_impacted": ["chemin/vers/fichier.ts"],
    "depends_on": ["ID ou titre de la dependance"]
  }
]
```

### Recherche
- `clickup_search` pour retrouver des taches existantes avant d'en creer de nouvelles
- Toujours verifier qu'une tache n'existe pas deja avant de la creer (eviter les doublons)

## Agents concernes
- **scrum-master** : orchestrateur principal, cree/met a jour/suit les taches ClickUp
- **product-owner** : formate les user stories en JSON pour import ClickUp
- Tous les agents peuvent lire les taches ClickUp pour comprendre le contexte

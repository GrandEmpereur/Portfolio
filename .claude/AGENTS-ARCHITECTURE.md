# Architecture des agents — NutriCert

> Référence unique de l'organisation des subagents. Mise à jour : 2026-06-27.
> Point d'entrée de TOUTE demande : **`scrum-master`**.

## Hiérarchie à 2 niveaux : poles → leads → spécialistes

Le `scrum-master` (seul orchestrateur, possède l'outil `Agent`) dispatche vers le **LEAD** d'un pôle pour cadrer, ou directement vers un **spécialiste** pour une tâche pointue. **Les leads ne lancent pas d'agents eux-mêmes** (contrainte Claude Code : pas de dispatch imbriqué) — ils implémentent le générique et indiquent au scrum-master quel spécialiste mobiliser.

| Pole                             | LEAD (entrée + impl. générique + routage) | Spécialistes                                                                                                                                          |
| -------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FRONTEND**                     | `frontend-dev`                            | `nextjs-specialist` · `web-motion-designer` · `frontend-optimizer`                                                                                    |
| **BACKEND**                      | `backend-dev`                             | `api-architect` · `auth-iam-specialist` · `queue-jobs-engineer` · `integrations-specialist` · `observability-engineer` · `analytics-backend-engineer` |
| **DATA/DBA**                     | `database-analyst`                        | `data-architect` · `dba-operations` · `data-governance`                                                                                               |
| **DEVOPS**                       | `devops`                                  | `ci-cd-engineer` · `iac-engineer` · `sre-reliability-engineer` · `platform-cost-engineer` · `release-manager`                                         |
| **SECURITE**                     | `ciso`                                    | `appsec-engineer` · `red-team-operator` · `detection-engineer` · `incident-responder` · `compliance-privacy-officer`                                  |
| **TRANSVERSE** (dispatch direct) | —                                         | `scrum-master` · `rodin` · `product-owner` · `business-analyst` · `cfo` · `qa-tester`                                                                 |

### Frontières clés (qui fait quoi)
- **frontend-optimizer** = quality gate APRÈS chaque feature UI (a11y/WCAG, CWV, SEO). N'implémente pas la feature.
- **nextjs-specialist** = features Next 16/React 19 pointues + migrations de version. Le `frontend-dev` fait l'UI générique.
- **api-architect** fige le contrat AVANT que `backend-dev` (ou un spécialiste) code l'endpoint.
- **data-architect** fige le modèle AVANT que `database-analyst` écrive la migration.
- **ciso** audite et rend le verdict ; **appsec-engineer** corrige (SAST/DAST/CVE). Le ciso ne code pas les correctifs.
- **incident-responder** = incident de SÉCURITÉ (compromission/fuite). **sre-reliability-engineer** = incident de DISPO (panne). Ne pas confondre.
- **observability-engineer** = partagé backend↔devops (expose les métriques). **sre-reliability-engineer** agit dessus (SLO/alerting).

## Rapport de santé (audit 2026-06-27)

### ✅ Corrigé dans cette passe
- 🔴 **`scrum-po` supprimé** — doublon franc de `scrum-master` (même rôle d'orchestrateur/point d'entrée). CLAUDE.md ne référençait que `scrum-master`.
- 🟠 **5 god-agents reconvertis en leads de pôle** (`frontend-dev`, `backend-dev`, `database-analyst`, `devops`, `ciso`) : ils chevauchaient les spécialistes Gén-2 créés le 27/06. Ils gardent l'implémentation générique + reçoivent une carte de routage.
- 🐛 **Référence morte `load-tester`** retirée de `scrum-master.md` et `CLAUDE.md` (aucun fichier `load-tester.md` n'existe). Rôle de test de charge réaffecté : `sre-reliability-engineer` (+ skill `perf`) et `qa-tester` (JMeter).
- **`scrum-master` + `CLAUDE.md`** mis à jour avec la hiérarchie en pôles.

### ✅ Corrigé (passe 2)
1. **Chevauchement RGPD résolu par délimitation** : `data-governance` (pôle data) = IMPLÉMENTATION technique (PII en base, anonymisation, rétention DB, droit à l'oubli, data quality). `compliance-privacy-officer` (pôle sécurité) = GOUVERNANCE/GRC (frameworks ISO 27001/SOC 2/PCI-DSS, registre de traitement, DPA, DPIA, notification de violation). Descriptions mises à jour avec renvoi mutuel.
2. **`memory:` uniformisé** : les 33 agents sont en `memory: project`.
3. **`rodin` homogénéisé** : frontmatter complété (`tools` read-only, `model`, `memory`, `maxTurns`, nom non quoté) ; description recentrée sur le rôle de sparring projet.

### ⚠️ À surveiller
- **`frontend-dev` vs `nextjs-specialist`** : chevauchement résiduel sur Next/React. Frontière posée (générique vs pointu) — vérifier que le scrum-master route correctement.

## Règle d'or pour le scrum-master
1. Identifier le(s) pôle(s) concerné(s).
2. Entrer par le LEAD pour cadrer, OU dispatch direct au spécialiste si tâche pointue.
3. Le lead renvoie un plan de pôle + le routage → c'est le scrum-master qui lance les spécialistes.
4. Appliquer les quality gates de pôle (front→optimizer, backend sensible→auth+ciso, data→architect avant migration).

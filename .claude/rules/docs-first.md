# Docs-First — Règle STRICTE (vérifier la doc à jour AVANT de coder)

> **Pourquoi cette règle existe** : la stack est récente (Next.js 16, React 19, Tailwind v4,
> NestJS 11, Prisma 7). Coder de mémoire produit du code Next 14/15, des APIs dépréciées,
> des bugs et de la dette technique. Cette règle est **non négociable**.

## Règle

**AVANT d'écrire ou de modifier du code qui touche une librairie, un framework, un SDK, une
API, un outil CLI ou un service cloud — TOUJOURS vérifier la doc officielle à jour.** Même si
tu « connais » l'API : ta donnée d'entraînement peut être périmée par rapport à la version du
projet.

Deux sources, dans cet ordre :

1. **Context7 MCP** — `resolve-library-id` puis `query-docs` avec la question complète.
2. **Skills de stack** — quand un skill couvre la techno (voir mapping ci-dessous), l'invoquer
   en plus de Context7.

Ne JAMAIS coder une feature stack-spécifique sans avoir fait au moins l'une des deux.

## Versions de référence (figées par le projet)

| Techno | Version | Pièges fréquents (ne PAS régresser) |
|--------|---------|-------------------------------------|
| Next.js | **16** (App Router) | Pas de code Next 14/15 : `params`/`searchParams` sont async, Cache Components / `use cache`, PPR, Server Actions, `<Suspense>` streaming |
| React | **19** | `use()`, Actions, `useActionState`, ref as prop (pas `forwardRef`), React Compiler |
| Tailwind | **v4** | Config CSS-first (`@theme`), pas de `tailwind.config.js` legacy |
| NestJS | **11** | — |
| Prisma | **7** | `prisma.config.ts`, driver adapters |
| PostgreSQL | **17** | — |
| Redis / BullMQ | **7** | — |
| Bun | **1.3.4** | jamais npm/yarn/pnpm |

## Mapping stack → doc / skill à consulter

| Tu touches… | Context7 (`resolve-library-id`) | Skill(s) à invoquer |
|-------------|--------------------------------|---------------------|
| Next.js / App Router / routing | `next.js` | `vercel:nextjs`, `vercel:next-cache-components`, `vercel:routing-middleware` |
| React (hooks, RSC, perf) | `react` | `vercel:react-best-practices` |
| Tailwind v4 / UI | `tailwindcss` | `frontend-design:frontend-design` |
| Prisma (schéma, migrations, client) | `prisma` | `prisma-client-api`, `prisma-cli`, `prisma-postgres` |
| NestJS (controllers, modules, guards) | `nestjs` | — |
| Supabase (storage, auth, SQL) | `supabase` | `supabase:supabase` |
| Sentry / monitoring | `@sentry/nextjs` ou `@sentry/nestjs` | `sentry:sentry-sdk-setup` |
| Resend / emails | `resend` | `resend:react-email`, `resend:resend` |
| Stripe / billing | `stripe` | — |
| Vercel (deploy, env, runtime) | — | `vercel:deployments-cicd`, `vercel:env-vars` |

> Liste non exhaustive — pour toute autre lib, passer par Context7 systématiquement.

## Exceptions (où la règle ne s'applique PAS)

Pas besoin de Context7/skill pour : refactoring sans changement d'API, debug de logique
métier pure, scripts maison, revue de code, concepts de programmation généraux.

## Auto-vérification avant de soumettre du code

- [ ] Ai-je consulté Context7 et/ou le skill pour chaque lib touchée ?
- [ ] Le code respecte-t-il les versions de référence (Next 16, React 19, Tailwind v4…) ?
- [ ] Aucune API dépréciée ni pattern d'une version antérieure ?

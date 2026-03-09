---
paths:
  - "src/**/*.{ts,tsx}"
  - "app/**/*.{ts,tsx}"
  - "apps/web/**/*.{ts,tsx}"
---

# Web App Conventions — Next.js / React / Tailwind

Consulter `CLAUDE.md` pour les conventions specifiques du projet.

## Rendering
- Server Components par defaut — `"use client"` uniquement si events, hooks, ou browser APIs
- Data fetching dans les Server Components (async) — jamais useEffect pour fetch
- `'use cache'` + `cacheLife()` pour le cache cote serveur
- `<Suspense>` avec fallback pour tout contenu dynamique
- Parallel data fetching : `Promise.all()` — jamais de waterfall

## Pages & Routes
- `generateMetadata()` pour SEO sur chaque page
- `loading.tsx` pour les loading states par route
- `error.tsx` pour le error handling par route

## Images & Media
- `next/image` avec `sizes` et `priority` pour le LCP
- `next/link` pour la navigation
- `next/font` pour les fonts

## Formulaires
- Schemas Zod pour validation
- Toasts : `toast.success()` / `toast.error()` via sonner
- Error display inline pres des champs

## Styling
- Tailwind CSS utility-first — pas de CSS custom
- Mobile-first responsive : `sm:`, `md:`, `lg:`, `xl:`
- Dark mode : `dark:` variant
- `cn()` pour merger les classes conditionnellement

## TypeScript
- Pas de `any` — typer tout
- Types Zod inferred ou interfaces explicites

## Anti-patterns INTERDITS
- useEffect pour du data fetching
- `"use client"` sur un composant sans interactivite
- Fetch dans un layout sans Suspense
- State pour des donnees derivees (calculer directement)
- Inline styles ou CSS modules (Tailwind uniquement)
- `any` type

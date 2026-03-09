# Patrick Bartosik - Portfolio v2

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

> Portfolio moderne de Patrick Bartosik, developpeur Full-Stack. Construit avec Next.js 16, React 19, Tailwind CSS v4, des animations GSAP premium et un design dark mode elegant.

[Voir le Portfolio](https://patrick.bartosik.fr) | [GitHub](https://github.com/GrandEmpereur) | [LinkedIn](https://linkedin.com/in/patrick-bartosik)

---

## Stack Technique

### Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 16 | App Router, Turbopack, Server Components |
| React | 19 | UI framework |
| TypeScript | 5.9 | Typage strict |
| Tailwind CSS | 4 | Styling utility-first |
| GSAP | 3.14 | Animations premium (ScrollTrigger, SplitText, Flip, ScrambleText...) |
| Lenis | 1.3 | Smooth scrolling |
| shadcn/ui | - | Composants UI (New York style) |
| Lucide React | - | Icones |
| Embla Carousel | 8 | Carousel testimonials |

### Formulaires & Email

| Technologie | Usage |
|-------------|-------|
| react-hook-form + Zod v4 | Validation formulaires |
| react-email + Resend | Templates email & envoi |
| libphonenumber-js | Validation telephone |
| isomorphic-dompurify | Sanitization XSS |

### Tooling & Deploy

| Outil | Usage |
|-------|-------|
| Bun | Package manager |
| Vercel | Deployment + Analytics + Speed Insights |
| Google Analytics 4 | Analytics |
| Google Tag Manager | Tag management |

---

## Fonctionnalites

### Design & UX
- **Dark mode** elegant (classe hardcoded)
- **Animations GSAP** premium (scroll triggers, stagger, parallax, text scramble)
- **Smooth scrolling** avec Lenis
- **Responsive** mobile-first

### SEO
- **Internationalisation** (FR, EN, PL) avec `next-international`
- **Metadata dynamique** par page et par locale
- **Structured data** JSON-LD (Person schema)
- **Sitemap**, **robots.txt**, **manifest**
- **llms.txt** pour l'optimisation AI search
- **OG images** et Twitter Cards
- **Vercel Analytics** + **Speed Insights**

### Sections (Homepage)
- **Hero** - Presentation dynamique avec animations GSAP
- **About** - Animation mot par mot avec blur reveal
- **Services** - Cartes avec hover effects
- **Latest Projects** - Grid avec badges de categorie (freelance, alternance, scolaire)
- **Stats** - Compteurs animes GSAP
- **Knowledge** - Competences techniques
- **Testimonials** - Carousel automatique Embla
- **FAQ** - Accordion avec sanitization XSS
- **Contact** - Formulaire avec lead scoring et validation Zod

### Pages
- Homepage avec 9 sections
- Projects
- Contact (formulaire complet + formulaire simple)
- Mentions legales
- Politique de confidentialite

---

## Installation

### Prerequis
- Bun (recommande) ou Node.js 18+

### Setup

```bash
# Cloner le repository
git clone https://github.com/GrandEmpereur/portfolio-v2.git
cd portfolio-v2

# Installer les dependances
bun install
```

### Variables d'environnement

Creer `.env.local` :

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_SITE_URL=https://patrick.bartosik.fr

RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=contact@patrick.bartosik.fr
RESEND_ADMIN_EMAIL=admin@patrick.bartosik.fr
```

### Commandes

```bash
bun dev          # Serveur de developpement (Turbopack)
bun run build    # Build production
bun start        # Serveur production
bun email        # Dev templates email
```

---

## Structure du Projet

```
portfolio-v2/
├── .claude/                      # Systeme multi-agents Claude Code
│   ├── agents/                   # 12 agents specialises
│   ├── commands/                 # 6 workflows automatises
│   ├── rules/                    # 8 conventions enforced
│   ├── agent-memory/             # Memoire persistante agents
│   ├── settings.json             # Config principale
│   └── settings.local.json       # Overrides locaux
├── public/
│   ├── images/                   # Assets images
│   ├── og/                       # OG images
│   └── llms.txt                  # AI search optimization
├── src/
│   ├── app/
│   │   ├── [locale]/             # Routes internationalisees
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── contact/          # Page contact
│   │   │   ├── projects/         # Page projets
│   │   │   ├── mentions-legales/
│   │   │   └── politique-confidentialite/
│   │   ├── api/                  # API routes (contact forms)
│   │   ├── robots.ts             # Robots config
│   │   ├── sitemap.ts            # Sitemap dynamique
│   │   └── manifest.ts           # Web manifest
│   ├── components/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── LatestProjectsSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── KnowledgeSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── ui/                   # shadcn/ui components
│   ├── emails/                   # Templates react-email
│   ├── lib/
│   │   ├── data/                 # Donnees statiques (*.data.ts)
│   │   ├── gsap-config.ts        # Config GSAP (importer depuis ici)
│   │   ├── seo-config.ts         # Config SEO centralisee
│   │   ├── structured-data.ts    # JSON-LD schemas
│   │   ├── contact-schema.ts     # Schema Zod formulaire complet
│   │   ├── simple-contact-schema.ts
│   │   └── utils.ts              # cn() utility
│   ├── locales/
│   │   ├── en.ts / fr.ts / pl.ts # Traductions
│   │   ├── serveur.ts            # i18n server-side
│   │   └── client.ts             # i18n client-side
│   └── types/                    # Types TypeScript
└── CLAUDE.md                     # Instructions Claude Code
```

---

## Systeme Multi-Agents Claude Code

Ce projet integre un systeme d'orchestration multi-agents via `.claude/` :

**12 agents** specialises : scrum-po, architect, business-analyst, frontend-dev, backend-dev, database-analyst, devops, qa-tester, ciso, github-reviewer, ui-ux-designer, seo-expert.

**6 commandes** : `/review-branch`, `/pr-create`, `/pr-merge`, `/security-audit`, `/sprint-dispatch`, `/e2e-test`.

**8 regles** enforcees : conventions API, architecture, ClickUp workflow, Prisma, securite, testing, validation multi-agents, conventions web.

**Chaine de validation** : qa-tester → ciso → business-analyst → scrum-po.

---

## Internationalisation

3 langues supportees :
- Francais (defaut)
- Anglais
- Polonais

Gere par `next-international` avec segment dynamique `[locale]`.

---

## Auteur

**Patrick Bartosik** — Developpeur Full-Stack

- Web : [patrick.bartosik.fr](https://patrick.bartosik.fr)
- GitHub : [@GrandEmpereur](https://github.com/GrandEmpereur)
- LinkedIn : [patrick-bartosik](https://linkedin.com/in/patrick-bartosik)

---

## Licence

MIT

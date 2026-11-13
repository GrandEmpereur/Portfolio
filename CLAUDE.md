# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development (uses Turbopack)
bun dev

# Production build
bun run build

# Start production server
bun start

# Unit tests (env files are not loaded)
bun --no-env-file test

# SEO smoke check against a running server (dev or production)
bun --no-env-file scripts/seo-smoke.ts <url>

# Email template development
bun email
```

This project uses **Bun** as the package manager.

## Architecture Overview

### Next.js 16 App Router with Internationalization

The app uses `next-international` with a `[locale]` dynamic segment. French is the default language and lives at the root (`/`); English and Polish are prefixed (`/en`, `/pl`). `src/proxy.ts` rewrites unprefixed URLs to `/fr/*` and redirects `/fr/*` to the unprefixed path.

- **Server-side**: `src/locales/serveur.ts` exports `getI18n`, `getScopedI18n`, `getStaticParams`, `getCurrentLocale`
- **Client-side**: `src/locales/client.ts` exports `useI18n`, `useScopedI18n`, `useCurrentLocale`, `useChangeLocale`, `I18nProviderClient`
- **Translation files**: `src/locales/{fr,en,pl}.ts` assemble one file per domain from `src/locales/<lang>/` (`common`, `home-hero`, `home-projects`, `home-services`, `home-end`, `contact-page`, `legal-pages`). The three languages must expose the same keys (`src/locales/parity.test.ts`). `nav`, `projectDetail`, `footer`, `meta`, `notFound` still live inline in `fr.ts`, `en.ts`, `pl.ts`.
- **Links**: internal links go through `localePath(locale, path)` (`src/lib/locale-path.ts`) so a visitor stays in their language
- **Provider wrapper**: `src/app/[locale]/providers.tsx` wraps children with `I18nProviderClient`
- All visible text is rendered server-side. Hidden initial states come from GSAP or from the `js`, `enter`, `pinned` classes that only JavaScript sets, never from CSS at rest.

### Design System

- **Fonts**: Archivo (variable, `--font-archivo`) for text and titles, Geist Mono (`--font-geist-mono`) for labels
- **Tokens** in `src/app/[locale]/globals.css`: `ink` `#0B0B0A`, `bone` `#ECE7DE`, `accent` `#EC2A45`, `ok` `#22C55E`. This is the only place hexadecimal codes live; components use the tokens.
- **Themes**: `.theme-dark` (default, on `<body>`) and `.theme-light`, set per section. They resolve `--bg`, `--fg`, `--acc`, `--mut`, `--fnt`, `--ln`, `--surface`, exposed as the classes `text-fg`, `text-mut`, `text-fnt`, `border-ln`, `bg-surface`, `text-acc`. The `dark` class stays on `<html>` for shadcn; there is no next-themes.
- **Utilities**: `display` (titles), `mono-label` (labels), `pad-x` (page gutter); components `.btn` and `.btn-ghost`
- The fixed header takes about 84px at the top of every page
- Section styles live in co-located CSS files with a prefix: `hh-` hero, `hp-` projects, `hs-` services, `he-` end, `cx-` contact, `lg-` legal, `pj-`/`pd-` projects pages, `nf-` 404

### Components

- `src/components/site/` - shell: `SiteHeader`, `SiteFooter`, `SiteCursor`, `RouteTransition`, `TransitionLink` (page fade, smooth same-page anchors)
- `src/components/home/` - homepage chapters: hero and profile, projects, services, blog teaser, FAQ and contact call
- `src/components/contact/` - contact screen: guided five-question flow, direct message, confirmation, dossier recap
- `src/components/legal/` - `LegalPage` layout for the four legal pages
- `src/components/consent/` - consent banner and analytics gate
- `src/components/ProjectCard.tsx`, `ProjectDetailContent.tsx`, `ProjectAnchor.tsx`, `NotFoundView.tsx` - `/projects`, `/projects/[slug]` and the 404 pages
- `src/components/ui/` - shadcn/ui (New York style), only `sonner` is left. Add components with `bunx --bun shadcn@latest add <component-name>`
- Icon library: `lucide-react`

### GSAP Animation System

All GSAP plugins (including premium plugins) are configured in `src/lib/gsap-config.ts`. Import from there instead of directly from `gsap`:

```typescript
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap-config';
```

Pinning, custom cursor, magnetic effects and parallax run only from 900px up, with a mouse, and without "reduced motion" (`src/lib/motion.ts`).

### Smooth Scrolling

Uses **Lenis** for smooth scroll (package `lenis`, NOT `@studio-freight/lenis` which is deprecated). `src/lib/scroll.ts` wraps programmatic scrolling.

### Contact System

- Request schema, lead score (`scoreLead`, based on need, stage, timing and budget status, never an amount) and sanitizing helpers: `src/lib/contact-request.ts`
- Three routes: `src/app/api/contact/route.ts` (guided request), `src/app/api/contact-simple/route.ts` (direct message, schema in `src/lib/simple-contact-schema.ts`), `src/app/api/contact-source/route.ts` (how the visitor found the site)
- A honeypot field (`src/components/form/Honeypot.tsx`) silences bots: no e-mail is sent
- Send limits in `src/lib/rate-limit.ts`: 5 sends per hour per IP, and confirmation e-mails to the visitor capped at 2 per address and 30 overall per hour. The client IP is read from platform headers only.
- E-mail templates in `src/emails/` with `react-email`, sent through **Resend**
- Booking link per language: `src/lib/booking.ts` (`NEXT_PUBLIC_CAL_URL_*`)
- Forms use react-hook-form, `@hookform/resolvers` and Zod v4

### Consent and Analytics

`src/lib/consent.ts` stores the choice (`granted` or `denied`, valid six months) in localStorage. Google Analytics and Google Tag Manager load only after "accept" (`AnalyticsGate`). `src/lib/track.ts` pushes the `contact_*` events to `dataLayer` once consent is granted. A "manage cookies" button in `SiteFooter` reopens the banner.

### Data Files

Static data is stored in `src/lib/data/`:
- `lastwork.data.ts` - Projects. `published: false` keeps a project out of the HTML, the sitemap and the structured data; `featured` and `featuredOrder` drive the homepage. Use `getPublishedProjects`, `getFeaturedProjects`, `getAgencyProjects`; `hasDetailPage` is true only for a project with no external link and a long description
- `services.data.ts` - Service offerings (no prices anywhere on the site)
- `blog.data.ts` - Blog posts; the homepage teaser shows once there are three
- `testimonials.data.ts` - Project testimonials

### SEO & Structured Data

- Centralized SEO config in `src/lib/seo-config.ts` (base URL, author, social links, OG image, locales)
- JSON-LD structured data in `src/lib/structured-data.ts` (`getFreelancerPersonSchema()` uses Person, not Organization)
- Page titles are 60 characters at most, template included (`%s | Patrick Bartosik` comes from the layout, so a page title never repeats the name)
- `robots.ts`, `sitemap.ts`, `manifest.ts` in `src/app/`
- `llms.txt` in `public/` for AI search engine optimization

### Path Aliases

The `@/*` alias maps to `./src/*` (configured in `tsconfig.json`).

## Pages

- `/[locale]` - Homepage (hero and profile, projects, services, blog teaser, FAQ and contact call)
- `/[locale]/projects` - Projects page
- `/[locale]/projects/[slug]` - Project detail (only projects with `hasDetailPage`)
- `/[locale]/contact` - Contact page
- `/[locale]/mentions-legales` - Legal notice
- `/[locale]/politique-confidentialite` - Privacy policy
- `/[locale]/politique-cookies` - Cookies policy
- `/[locale]/conditions-utilisation` - Terms of use

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager
- `NEXT_PUBLIC_SITE_URL` - Public site URL
- `NEXT_PUBLIC_CAL_URL_FR`, `NEXT_PUBLIC_CAL_URL_EN`, `NEXT_PUBLIC_CAL_URL_PL` - Cal.com booking link per language (a language without a link shows no booking button)
- `RESEND_API_KEY` - Resend email service
- `RESEND_FROM_EMAIL` - Sender email address
- `RESEND_ADMIN_EMAIL` - Admin notification recipient

## Claude Code Agent System

The `.claude/` directory contains a multi-agent orchestration system:

### Agents (12)

| Agent | Role |
|-------|------|
| `scrum-po` | Scrum Master/PO — orchestrates tasks, decomposes features into tickets |
| `architect` | Software architect — designs architecture, evaluates patterns, ADRs |
| `business-analyst` | Translates business needs into specs and user stories |
| `frontend-dev` | Next.js/React/Tailwind expert — UI development |
| `backend-dev` | NestJS/Prisma expert — API development |
| `database-analyst` | Prisma schema, migrations, PostgreSQL optimization |
| `devops` | Infrastructure, CI/CD, Docker, monitoring |
| `qa-tester` | Testing pyramid (unit, integration, E2E), quality validation |
| `ciso` | Security audits, OWASP Top 10, vulnerability analysis |
| `github-reviewer` | Code review, PR management, quality gates |
| `ui-ux-designer` | Design reviews, accessibility audits, WCAG compliance |
| `seo-expert` | SEO/GEO optimization, structured data, analytics |

### Commands (6)

| Command | Description |
|---------|-------------|
| `/review-branch [branch]` | Code review before PR |
| `/pr-create [title]` | Create PR with auto-review |
| `/pr-merge <pr-number>` | Verify, merge, and cleanup |
| `/security-audit [scope]` | OWASP security audit (full/api/deps/headers) |
| `/sprint-dispatch [sprint]` | Sprint planning with ClickUp + parallel agent dispatch |
| `/e2e-test [url]` | Playwright E2E tests |

### Rules (8)

Enforced conventions in `.claude/rules/`: `api-conventions`, `architecture-patterns`, `clickup-workflow`, `prisma-conventions`, `security-best-practices`, `testing-best-practices`, `validation-multi-agents`, `web-conventions`.

### Validation Chain

QA workflow: `qa-tester` → `ciso` (if security) → `business-analyst` → `scrum-po` (final decision).

### Hooks

- **PreCompact**: Context reminder for agents
- **PostToolUse** (Edit/Write): Auto Prettier formatting on `.ts/.tsx/.js/.jsx/.json/.css/.md`
- **Notification**: macOS notification on agent completion

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

# Email template development
bun email
```

This project uses **Bun** as the package manager.

## Architecture Overview

### Next.js 16 App Router with Internationalization

The app uses `next-international` for i18n with a `[locale]` dynamic segment:

- **Server-side**: `src/locales/serveur.ts` exports `getI18n`, `getScopedI18n`, `getStaticParams`
- **Client-side**: `src/locales/client.ts` exports `useI18n`, `useScopedI18n`, `useCurrentLocale`, `useChangeLocale`, `I18nProviderClient`
- **Translation files**: `src/locales/{en,fr,pl}.ts` (French is the default locale)
- **Provider wrapper**: `src/app/[locale]/providers.tsx` wraps children with `I18nProviderClient`

### GSAP Animation System

All GSAP plugins (including premium plugins) are configured in `src/lib/gsap-config.ts`. Import from there instead of directly from `gsap`:

```typescript
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap-config';
```

Available plugins: ScrollTrigger, ScrollSmoother, SplitText, Flip, Draggable, Observer, MorphSVGPlugin, DrawSVGPlugin, TextPlugin, ScrambleTextPlugin, and more.

### Smooth Scrolling

Uses **Lenis** for smooth scroll (package `lenis`, NOT `@studio-freight/lenis` which is deprecated).

### Dark Mode

Dark mode is hardcoded via `"dark"` class on HTML element (no next-themes).

### UI Components

Uses **shadcn/ui** with New York style:
- Components in `src/components/ui/`
- Add new components with: `bunx --bun shadcn@latest add <component-name>`
- Icon library: `lucide-react`

### Contact Form System

Two contact forms with different complexity levels:
- **Full form**: `src/app/api/contact/route.ts` - includes lead scoring, budget sliders, service type selection
- **Simple form**: `src/app/api/contact-simple/route.ts` - basic contact form
- Email templates in `src/emails/` using `react-email`
- Emails sent via **Resend** API
- Form validation with **Zod v4** schemas in `src/lib/contact-schema.ts` and `src/lib/simple-contact-schema.ts`
- Forms built with **react-hook-form** + `@hookform/resolvers`

### Data Files

Static data is stored in `src/lib/data/`:
- `lastwork.data.ts` - Projects with type badges (freelance, internship, school)
- `services.data.ts` - Service offerings
- `testimonials.data.ts` - Client testimonials
- `knowlege.data.ts` - Skills/knowledge items
- `certifications.data.ts` - Certifications

### SEO & Structured Data

- Centralized SEO config in `src/lib/seo-config.ts` (base URL, author, social links, OG image, locales)
- JSON-LD structured data in `src/lib/structured-data.ts` (`getFreelancerPersonSchema()` — uses Person, not Organization)
- `robots.ts`, `sitemap.ts`, `manifest.ts` in `src/app/`
- `llms.txt` in `public/` for AI search engine optimization
- XSS sanitization with `isomorphic-dompurify` (e.g., FAQSection)

### Path Aliases

The `@/*` alias maps to `./src/*` (configured in `tsconfig.json`).

## Pages

- `/[locale]` - Homepage (Hero, About, Services, Projects, Stats, Knowledge, Testimonials, FAQ, Contact sections)
- `/[locale]/projects` - Projects page
- `/[locale]/contact` - Contact page
- `/[locale]/mentions-legales` - Legal mentions
- `/[locale]/politique-confidentialite` - Privacy policy

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_GA_ID` - Google Analytics
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager
- `NEXT_PUBLIC_SITE_URL` - Public site URL
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

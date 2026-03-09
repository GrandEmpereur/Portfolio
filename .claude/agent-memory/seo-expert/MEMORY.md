# SEO Expert Agent Memory -- portfolio-v2

## Architecture SEO
- SEO config: `src/lib/seo-config.ts` (baseUrl, author, social, OG, icons, locales)
- Structured data: `src/lib/structured-data.ts` (Person, WebSite, ItemList, ProfessionalService, FAQPage, BreadcrumbList, Organization)
- robots.ts: `src/app/robots.ts`
- sitemap.ts: `src/app/sitemap.ts` (11 URLs, hreflang alternates for main pages)
- manifest.ts: `src/app/manifest.ts`
- llms.txt: `public/llms.txt`
- i18n middleware: `src/proxy.ts` (not `middleware.ts` -- uses createI18nMiddleware with urlMappingStrategy: 'rewriteDefault')
- favicon.ico: `src/app/favicon.ico` (NOT in public/)

## Known Issues (audit 2026-03-09)
- robots.txt blocks ALL AI bots (GPTBot, anthropic-ai, Google-Extended) -- needs fix
- llms.txt returns 404 in prod -- middleware captures it, add to matcher exclusion
- manifest.webmanifest returns 404 -- icon-192.png, icon-512.png, apple-icon.png don't exist
- /en page renders French meta tags instead of English -- i18n generateMetadata issue
- Contact page has no H1 tag
- Footer has hardcoded English text "Available for projects" (not localized)
- Legal pages have hardcoded French text and FR-only canonical
- Sitemap lastmod dates hardcoded to Nov 2025 -- stale
- hero.jpg used in navbar/contact but hero.webp exists (should use webp)
- Copyright hardcoded "2025" in all locale files
- No cookie consent banner despite GA/GTM loading
- Instagram link inconsistent between seoConfig and page.tsx

## Meta Tag Patterns
- Layout generateMetadata: `src/app/[locale]/layout.tsx` -- sets defaults with template
- Each page has its own generateMetadata with title, description, keywords, canonical, OG, twitter
- Pages define alternates.canonical but NOT alternates.languages (only layout does)
- OG locale set to bare "fr"/"en" instead of "fr_FR"/"en_US"

## Page Inventory
- Homepage: `src/app/[locale]/page.tsx` (6 JSON-LD schemas, sections: Hero, About, Projects, Knowledge, Services, Contact, FAQ, Footer)
- Projects: `src/app/[locale]/projects/page.tsx` (2 JSON-LD: ItemList, Breadcrumb)
- Contact: `src/app/[locale]/contact/page.tsx` (1 JSON-LD: Breadcrumb, SimpleContactForm component)
- Mentions legales: `src/app/[locale]/mentions-legales/page.tsx`
- Politique confidentialite: `src/app/[locale]/politique-confidentialite/page.tsx`
- 404: `src/app/[locale]/not-found.tsx` (bare minimum, not using locale translations)

## Files Needing Middleware Exclusion
Current matcher: `/((?!api|_next/static|_next/image|favicon.ico|images|icons|svg|og|sitemap.xml|robots.txt|cv.pdf|CV.pdf|not-found).*)`
Missing: `llms.txt`, `llms-full.txt`

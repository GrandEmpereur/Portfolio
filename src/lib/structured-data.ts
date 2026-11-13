import { seoConfig } from './seo-config';
import { type Project, hasDetailPage } from './data/lastwork.data';
import { services } from './data/services.data';
import { LOCALES, localePath, type Locale } from './locale-path';

const toLocale = (locale: string): Locale => (LOCALES as readonly string[]).includes(locale) ? (locale as Locale) : 'en';

/** Absolute URL of a path in the given language (French has no prefix). */
const absoluteUrl = (locale: string, path = '/'): string => {
    const localized = localePath(toLocale(locale), path);
    return `${seoConfig.baseUrl}${localized === '/' ? '' : localized}`;
};

/**
 * Serializes a JSON-LD object for a <script type="application/ld+json"> tag.
 * Escapes "<" (and the line separators) so a value can never close the tag.
 */
export const serializeJsonLd = (data: unknown): string =>
    JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .split(String.fromCharCode(0x2028)).join('\\u2028')
        .split(String.fromCharCode(0x2029)).join('\\u2029');

const PERSON_IMAGE = `${seoConfig.baseUrl}/images/portrait-studio.jpg`;

const POSITIONING: Record<Locale, string> = {
    fr: 'AI Engineer & développeur Full Stack freelance à Paris',
    en: 'Freelance AI Engineer & Full Stack Developer in Paris',
    pl: 'Freelance AI Engineer i programista Full Stack w Paryżu',
};

const KNOWS_ABOUT = [
    'Artificial Intelligence',
    'LLM integration',
    'AI agents',
    'Retrieval-augmented generation',
    'Full Stack Development',
    'SaaS Development',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'Tailwind CSS',
    'GSAP',
];

/** Person Schema (the author of the site). */
export function getPersonSchema(locale: string) {
    const l = toLocale(locale);
    const descriptions: Record<Locale, string> = {
        fr: 'AI Engineer et développeur Full Stack freelance à Paris : intégration de LLM, agents IA, RAG, SaaS, création et refonte de sites.',
        en: 'Freelance AI Engineer and Full Stack developer in Paris: LLM integration, AI agents, RAG, SaaS, website creation and redesign.',
        pl: 'Freelance AI Engineer i programista Full Stack w Paryżu: integracja LLM, agenci AI, RAG, SaaS, tworzenie i przebudowa stron.',
    };

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${seoConfig.baseUrl}/#person`,
        name: seoConfig.author.name,
        url: absoluteUrl(l),
        jobTitle: POSITIONING[l],
        description: descriptions[l],
        email: `mailto:${seoConfig.author.email}`,
        image: PERSON_IMAGE,
        knowsLanguage: ['fr', 'en', 'pl'],
        sameAs: [seoConfig.social.github, seoConfig.social.linkedin, seoConfig.social.instagram],
        knowsAbout: KNOWS_ABOUT,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressCountry: 'FR',
        },
    };
}

/** WebSite Schema. */
export function getWebsiteSchema(locale: string) {
    const l = toLocale(locale);
    const descriptions: Record<Locale, string> = {
        fr: 'Site de Patrick Bartosik, AI Engineer et développeur Full Stack freelance à Paris.',
        en: 'Website of Patrick Bartosik, freelance AI Engineer and Full Stack developer in Paris.',
        pl: 'Strona Patricka Bartosika, freelance AI Engineera i programisty Full Stack w Paryżu.',
    };

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${seoConfig.baseUrl}/#website`,
        name: seoConfig.siteName,
        url: absoluteUrl(l),
        description: descriptions[l],
        inLanguage: l,
        author: {
            '@type': 'Person',
            name: seoConfig.author.name,
            url: seoConfig.author.url,
        },
    };
}

/** The public URL of a project: its external link, or its detail page when it has one. */
const projectUrl = (project: Project, locale: string): string | null => {
    if (project.link) return project.link;
    if (hasDetailPage(project)) return absoluteUrl(locale, `/projects/${project.slug}`);
    return null;
};

/** ItemList Schema for projects. Projects with no public URL are left out. */
export function getProjectsListSchema(projects: Project[], locale: string) {
    const listed = projects
        .map((project) => ({ project, url: projectUrl(project, locale) }))
        .filter((entry): entry is { project: Project; url: string } => entry.url !== null);

    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: listed.map(({ project, url }, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url,
            item: {
                '@type': 'CreativeWork',
                name: project.title,
                url,
                ...(project.description ? { description: project.description } : {}),
                ...(project.technologies.length > 0 ? { keywords: project.technologies.join(', ') } : {}),
                ...(project.image ? { image: `${seoConfig.baseUrl}${project.image}` } : {}),
                creator: { '@type': 'Person', name: seoConfig.author.name, url: seoConfig.author.url },
            },
        })),
    };
}

/** CreativeWork Schema for an individual project detail page. */
export function getProjectDetailSchema(project: Project, locale: string) {
    const url = projectUrl(project, locale) ?? absoluteUrl(locale, `/projects/${project.slug}`);
    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.longDescription || project.description,
        url,
        keywords: project.technologies.join(', '),
        author: {
            '@type': 'Person',
            name: seoConfig.author.name,
            url: seoConfig.author.url,
        },
        ...(project.year && { dateCreated: project.year }),
        ...(project.image && {
            image: `${seoConfig.baseUrl}${project.image}`,
        }),
    };
}

/** BreadcrumbList Schema. `url` is a path that already carries the language prefix. */
export function getBreadcrumbSchema(
    items: Array<{ name: string; url: string }>,
    _locale?: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${seoConfig.baseUrl}${item.url === '/' ? '' : item.url}`,
        })),
    };
}

/** Person Schema, language independent. */
export function getFreelancerPersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: seoConfig.author.name,
        url: seoConfig.baseUrl,
        image: PERSON_IMAGE,
        email: `mailto:${seoConfig.author.email}`,
        jobTitle: seoConfig.author.jobTitle,
        sameAs: [seoConfig.social.github, seoConfig.social.linkedin, seoConfig.social.instagram],
    };
}

/** ProfessionalService Schema. No price information of any kind. */
export function getProfessionalServiceSchema(locale: string) {
    const l = toLocale(locale);
    const names: Record<Locale, string> = {
        fr: 'Patrick Bartosik, AI Engineer & développeur Full Stack freelance',
        en: 'Patrick Bartosik, freelance AI Engineer & Full Stack developer',
        pl: 'Patrick Bartosik, freelance AI Engineer i programista Full Stack',
    };
    const descriptions: Record<Locale, string> = {
        fr: 'Services d\'AI engineering (intégration de LLM, agents IA, RAG) et de développement Full Stack (SaaS, création et refonte de site), en freelance depuis Paris.',
        en: 'AI engineering (LLM integration, AI agents, RAG) and Full Stack development (SaaS, website creation and redesign) services, freelance from Paris.',
        pl: 'Usługi AI engineeringu (integracja LLM, agenci AI, RAG) i rozwoju Full Stack (SaaS, tworzenie i przebudowa stron), freelance z Paryża.',
    };

    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${seoConfig.baseUrl}/#service`,
        name: names[l],
        url: absoluteUrl(l),
        image: PERSON_IMAGE,
        description: descriptions[l],
        email: `mailto:${seoConfig.author.email}`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Paris',
            addressCountry: 'FR',
        },
        provider: {
            '@type': 'Person',
            name: seoConfig.author.name,
            url: seoConfig.author.url,
        },
        areaServed: [
            { '@type': 'Country', name: 'France' },
            { '@type': 'Place', name: 'Europe' },
        ],
        availableLanguage: ['fr', 'en', 'pl'],
        serviceType: ['AI engineering', 'Full Stack development'],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: names[l],
            itemListElement: services.map((service) => ({
                '@type': 'Service',
                name: service.title[l],
                description: service.description[l],
            })),
        },
    };
}

/** FAQPage Schema. */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

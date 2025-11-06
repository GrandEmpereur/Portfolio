import { seoConfig } from './seo-config';
import { Project } from './data/lastwork.data';

/**
 * Person Schema for Profile
 * Génère le schéma JSON-LD pour le profil personnel
 * @param locale - Locale actuelle (en, fr, pl)
 * @returns Schema.org Person object
 */
export function getPersonSchema(locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: seoConfig.author.name,
        url: seoConfig.author.url,
        jobTitle: seoConfig.author.jobTitle,
        email: seoConfig.author.email,
        image: `${seoConfig.baseUrl}/images/hero.jpg`,
        sameAs: [
            seoConfig.social.github,
            seoConfig.social.linkedin,
            seoConfig.social.instagram,
        ],
        knowsAbout: [
            'Web Development',
            'Full Stack Development',
            'Next.js',
            'React',
            'Angular',
            'TypeScript',
            'Node.js',
            'AdonisJS',
            'NestJS',
            'Shopify Plus',
            'E-commerce',
            'SaaS Development',
            'API Development',
            'MongoDB',
            'Supabase',
            'Tailwind CSS',
            'GSAP',
        ],
        worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'FR',
        },
    };
}

// Website Schema
export function getWebsiteSchema(locale: string) {
    const translations = {
        en: 'Search',
        fr: 'Rechercher',
        pl: 'Szukaj',
    } as const;

    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: seoConfig.siteName,
        url: seoConfig.baseUrl,
        description: 'Full Stack Developer specializing in web and mobile applications',
        inLanguage: locale,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${seoConfig.baseUrl}/${locale}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

// ItemList Schema for Projects
export function getProjectsListSchema(projects: Project[], locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'CreativeWork',
                name: project.title,
                description: project.description,
                url: project.link || `${seoConfig.baseUrl}/${locale}/projects/${project.slug}`,
                keywords: project.technologies.join(', '),
            },
        })),
    };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(
    items: Array<{ name: string; url: string }>,
    locale: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${seoConfig.baseUrl}${item.url}`,
        })),
    };
}

// Organization Schema
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: seoConfig.siteName,
        url: seoConfig.baseUrl,
        logo: `${seoConfig.baseUrl}/images/logo.png`,
        contactPoint: {
            '@type': 'ContactPoint',
            email: seoConfig.author.email,
            contactType: 'Customer Service',
        },
        sameAs: [
            seoConfig.social.github,
            seoConfig.social.linkedin,
        ],
    };
}

// ProfessionalService Schema for Freelance Services
export function getProfessionalServiceSchema(locale: string) {
    const descriptions = {
        en: 'Professional freelance full stack development services specializing in React, Next.js, TypeScript, Node.js, and Shopify Plus. SaaS development, e-commerce solutions, and custom web applications.',
        fr: 'Services professionnels de développement full stack freelance spécialisés en React, Next.js, TypeScript, Node.js et Shopify Plus. Développement SaaS, solutions e-commerce et applications web sur mesure.',
        pl: 'Profesjonalne usługi freelance full stack developer specjalizujące się w React, Next.js, TypeScript, Node.js i Shopify Plus. Rozwój SaaS, rozwiązania e-commerce i niestandardowe aplikacje webowe.',
    } as const;

    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        name: 'Patrick Bartosik - Full Stack Development Services',
        url: seoConfig.baseUrl,
        description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
        provider: {
            '@type': 'Person',
            name: seoConfig.author.name,
            jobTitle: seoConfig.author.jobTitle,
            email: seoConfig.author.email,
        },
        areaServed: [
            {
                '@type': 'Country',
                name: 'France',
            },
            {
                '@type': 'Country',
                name: 'Europe',
            },
        ],
        serviceType: [
            'Web Development',
            'Full Stack Development',
            'React Development',
            'Next.js Development',
            'Backend Development',
            'Shopify Plus Development',
            'E-commerce Development',
            'SaaS Development',
            'TypeScript Development',
            'Node.js Development',
        ],
        priceRange: '$$-$$$',
    };
}

// FAQ Schema
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


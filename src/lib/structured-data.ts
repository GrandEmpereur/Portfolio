import { seoConfig } from './seo-config';
import { Project } from './data/lastwork.data';

// Person Schema for Profile
export function getPersonSchema(locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: seoConfig.author.name,
        url: seoConfig.author.url,
        jobTitle: seoConfig.author.jobTitle,
        email: seoConfig.author.email,
        sameAs: [
            seoConfig.social.github,
            seoConfig.social.linkedin,
        ],
        knowsAbout: [
            'Web Development',
            'Full Stack Development',
            'Next.js',
            'React',
            'TypeScript',
            'Shopify Plus',
            'E-commerce',
            'UX/UI Design',
        ],
        worksFor: {
            '@type': 'Organization',
            name: seoConfig.siteName,
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


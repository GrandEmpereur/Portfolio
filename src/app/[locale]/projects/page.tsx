import React from 'react'
import { lastwork } from '@/lib/data/lastwork.data'
import { ProjectCard } from '@/components/ProjectCard'
import { getI18n } from '@/locales/serveur'
import { setStaticParamsLocale } from 'next-international/server'
import { Metadata } from 'next'
import { seoConfig } from '@/lib/seo-config'
import { getProjectsListSchema, getBreadcrumbSchema } from '@/lib/structured-data'

const ogLocaleMap: Record<string, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    pl: 'pl_PL',
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    setStaticParamsLocale(locale);
    const t = await getI18n();

    const title = t('meta.projects.title');
    const description = t('meta.projects.description');

    return {
        title,
        description,
        keywords: t('meta.projects.keywords'),
        alternates: {
            canonical: locale === seoConfig.defaultLocale
                ? `${seoConfig.baseUrl}/projects`
                : `${seoConfig.baseUrl}/${locale}/projects`,
            languages: {
                'fr': `${seoConfig.baseUrl}/projects`,
                'en': `${seoConfig.baseUrl}/en/projects`,
                'pl': `${seoConfig.baseUrl}/pl/projects`,
                'x-default': `${seoConfig.baseUrl}/projects`,
            },
        },
        openGraph: {
            title,
            description,
            url: locale === seoConfig.defaultLocale
                ? `${seoConfig.baseUrl}/projects`
                : `${seoConfig.baseUrl}/${locale}/projects`,
            siteName: seoConfig.siteName,
            locale: ogLocaleMap[locale] ?? locale,
            type: 'website',
            images: [
                {
                    url: `${seoConfig.baseUrl}${seoConfig.openGraph.image}`,
                    width: seoConfig.openGraph.imageWidth,
                    height: seoConfig.openGraph.imageHeight,
                    alt: title,
                    type: 'image/png',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [`${seoConfig.baseUrl}${seoConfig.openGraph.image}`],
            creator: '@patrickbartosik',
        },
    };
}

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getI18n();

    // Generate structured data for projects
    const projectsSchema = getProjectsListSchema(lastwork, locale);
    const breadcrumbSchema = getBreadcrumbSchema(
        [
            { name: t('nav.home'), url: locale === seoConfig.defaultLocale ? '/' : `/${locale}` },
            { name: t('nav.projects'), url: locale === seoConfig.defaultLocale ? '/projects' : `/${locale}/projects` },
        ],
        locale
    );

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
                suppressHydrationWarning
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                suppressHydrationWarning
            />

            <main className="relative min-h-screen w-full pt-20 pb-16">
                {/* Header Section */}
                <section className="px-8 md:px-16 lg:px-24 py-16">
                    <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-[140px] leading-tight uppercase font-bold">
                        {t('work.title')}.
                    </h1>
                </section>

                {/* Projects Grid */}
                <section className="px-8 md:px-16 lg:px-24 pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-[2200px] mx-auto">
                        {lastwork.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}
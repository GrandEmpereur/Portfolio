import { getPublishedProjects, hasDetailPage } from '@/lib/data/lastwork.data'
import { ProjectCard } from '@/components/ProjectCard'
import { getI18n } from '@/locales/serveur'
import { SiteFooter } from '@/components/site/SiteFooter'
import { LOCALES, type Locale } from '@/lib/locale-path'
import { setStaticParamsLocale } from 'next-international/server'
import { Metadata } from 'next'
import { seoConfig, ogLocaleMap } from '@/lib/seo-config'
import { getProjectsListSchema, getBreadcrumbSchema, serializeJsonLd } from '@/lib/structured-data'

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
                'fr-FR': `${seoConfig.baseUrl}/projects`,
                'en-US': `${seoConfig.baseUrl}/en/projects`,
                'pl-PL': `${seoConfig.baseUrl}/pl/projects`,
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
        },
    };
}

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale: Locale = LOCALES.find((l) => l === rawLocale) ?? 'fr';
    setStaticParamsLocale(locale);
    const t = await getI18n();

    const projects = getPublishedProjects();
    // The structured data only lists projects that have a real URL (external link or detail page)
    const projectsSchema = getProjectsListSchema(
        projects.filter((project) => project.link || hasDetailPage(project)),
        locale
    );
    const breadcrumbSchema = getBreadcrumbSchema(
        [
            { name: t('common.nav.chapters.accueil'), url: locale === seoConfig.defaultLocale ? '/' : `/${locale}` },
            { name: t('common.nav.chapters.projets'), url: locale === seoConfig.defaultLocale ? '/projects' : `/${locale}/projects` },
        ],
        locale
    );

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(projectsSchema) }}
                suppressHydrationWarning
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
                suppressHydrationWarning
            />

            <main id="main-content" className="pj pad-x text-fg">
                <div className="pj-inner">
                    <header className="pj-head">
                        <h1 className="display pj-title">{t('homeProjects.title')}</h1>
                    </header>
                    <ul className="pj-grid">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} locale={locale} priority={index < 2} />
                        ))}
                    </ul>
                </div>
            </main>
            <SiteFooter />
        </>
    )
}

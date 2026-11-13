import { getPublishedProjects, hasDetailPage } from '@/lib/data/lastwork.data';
import { getI18n } from '@/locales/serveur';
import { setStaticParamsLocale } from 'next-international/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoConfig, ogLocaleMap } from '@/lib/seo-config';
import { getProjectDetailSchema, getBreadcrumbSchema, serializeJsonLd } from '@/lib/structured-data';
import { ProjectDetailContent } from '@/components/ProjectDetailContent';
import { SiteFooter } from '@/components/site/SiteFooter';
import { LOCALES, type Locale } from '@/lib/locale-path';

// Detail pages exist only for published projects without external link that carry a long description
export function generateStaticParams() {
    return getPublishedProjects()
        .filter(hasDetailPage)
        .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    setStaticParamsLocale(locale);

    const project = getPublishedProjects().find((p) => p.slug === slug);
    if (!project) return {};

    // The layout title template already appends the site name
    const title = project.title;
    const description = project.longDescription || project.description || '';
    const projectUrl =
        locale === seoConfig.defaultLocale
            ? `${seoConfig.baseUrl}/projects/${slug}`
            : `${seoConfig.baseUrl}/${locale}/projects/${slug}`;

    return {
        title,
        description,
        alternates: {
            canonical: projectUrl,
            languages: {
                'fr-FR': `${seoConfig.baseUrl}/projects/${slug}`,
                'en-US': `${seoConfig.baseUrl}/en/projects/${slug}`,
                'pl-PL': `${seoConfig.baseUrl}/pl/projects/${slug}`,
                'x-default': `${seoConfig.baseUrl}/projects/${slug}`,
            },
        },
        openGraph: {
            title,
            description,
            url: projectUrl,
            siteName: seoConfig.siteName,
            locale: ogLocaleMap[locale] ?? locale,
            type: 'article',
            images: project.image
                ? [
                      {
                          url: `${seoConfig.baseUrl}${project.image}`,
                          width: 1200,
                          height: 630,
                          alt: project.title,
                      },
                  ]
                : [
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
            images: project.image
                ? [`${seoConfig.baseUrl}${project.image}`]
                : [`${seoConfig.baseUrl}${seoConfig.openGraph.image}`],
        },
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale: rawLocale, slug } = await params;
    const locale: Locale = LOCALES.find((l) => l === rawLocale) ?? 'fr';
    setStaticParamsLocale(locale);
    const t = await getI18n();

    const published = getPublishedProjects();
    const project = published.find((p) => p.slug === slug);
    if (!project) notFound();

    // If project has an external link, redirect (safety net)
    if (project.link) {
        const { redirect } = await import('next/navigation');
        redirect(project.link);
    }

    // A project that is neither linked nor documented has no page: 404
    if (!project.link && !hasDetailPage(project)) notFound();

    // Find prev/next projects among the ones that lead somewhere (external link or detail page)
    const reachable = published.filter((p) => p.link || hasDetailPage(p));
    const currentIndex = reachable.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? reachable[currentIndex - 1] : null;
    const nextProject =
        currentIndex < reachable.length - 1 ? reachable[currentIndex + 1] : null;

    const projectSchema = getProjectDetailSchema(project, locale);
    const breadcrumbSchema = getBreadcrumbSchema(
        [
            {
                name: t('common.nav.chapters.accueil'),
                url:
                    locale === seoConfig.defaultLocale
                        ? '/'
                        : `/${locale}`,
            },
            {
                name: t('common.nav.chapters.projets'),
                url:
                    locale === seoConfig.defaultLocale
                        ? '/projects'
                        : `/${locale}/projects`,
            },
            {
                name: project.title,
                url:
                    locale === seoConfig.defaultLocale
                        ? `/projects/${slug}`
                        : `/${locale}/projects/${slug}`,
            },
        ],
        locale,
    );

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(projectSchema),
                }}
                suppressHydrationWarning
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: serializeJsonLd(breadcrumbSchema),
                }}
                suppressHydrationWarning
            />
            <ProjectDetailContent
                project={project}
                prevProject={prevProject}
                nextProject={nextProject}
                locale={locale}
                translations={{
                    role: t('projectDetail.role'),
                    technologies: t('projectDetail.technologies'),
                    features: t('projectDetail.features'),
                    year: t('projectDetail.year'),
                    viewGithub: t('projectDetail.viewGithub'),
                    backToProjects: t('projectDetail.backToProjects'),
                    nextProjectLabel: t('projectDetail.nextProject'),
                    prevProjectLabel: t('projectDetail.prevProject'),
                }}
            />
            <SiteFooter />
        </>
    );
}

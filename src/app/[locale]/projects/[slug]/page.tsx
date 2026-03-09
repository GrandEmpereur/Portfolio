import { lastwork } from '@/lib/data/lastwork.data';
import { getI18n } from '@/locales/serveur';
import { setStaticParamsLocale } from 'next-international/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoConfig, ogLocaleMap } from '@/lib/seo-config';
import { getProjectDetailSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { ProjectDetailContent } from '@/components/ProjectDetailContent';

// Generate static paths for all projects without external links
export function generateStaticParams() {
    return lastwork
        .filter((p) => !p.link)
        .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    setStaticParamsLocale(locale);

    const project = lastwork.find((p) => p.slug === slug);
    if (!project) return {};

    const title = `${project.title} | Portfolio Patrick Bartosik`;
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
                fr: `${seoConfig.baseUrl}/projects/${slug}`,
                en: `${seoConfig.baseUrl}/en/projects/${slug}`,
                pl: `${seoConfig.baseUrl}/pl/projects/${slug}`,
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
    const { locale, slug } = await params;
    setStaticParamsLocale(locale);
    const t = await getI18n();

    const project = lastwork.find((p) => p.slug === slug);
    if (!project) notFound();

    // If project has an external link, redirect (safety net)
    if (project.link) {
        const { redirect } = await import('next/navigation');
        redirect(project.link);
    }

    // Find prev/next projects (among all projects)
    const currentIndex = lastwork.findIndex((p) => p.slug === slug);
    const prevProject = currentIndex > 0 ? lastwork[currentIndex - 1] : null;
    const nextProject =
        currentIndex < lastwork.length - 1 ? lastwork[currentIndex + 1] : null;

    const projectSchema = getProjectDetailSchema(project, locale);
    const breadcrumbSchema = getBreadcrumbSchema(
        [
            {
                name: t('nav.home'),
                url:
                    locale === seoConfig.defaultLocale
                        ? '/'
                        : `/${locale}`,
            },
            {
                name: t('nav.projects'),
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
                    __html: JSON.stringify(projectSchema),
                }}
                suppressHydrationWarning
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
                suppressHydrationWarning
            />
            <ProjectDetailContent
                project={project}
                prevProject={prevProject}
                nextProject={nextProject}
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
        </>
    );
}

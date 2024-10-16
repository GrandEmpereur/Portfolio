import ServerSideProject from "@/components/serveur/ServerSideProject";
import { Locale } from "@/i18nConfig";
import { projects } from '@/lib/data/portfolio';
import { getDictionary } from '@/get-dictionary';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string, lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(params.lang);
    const project = projects.find(project => project.links.slug === `/${params.slug}`);

    if (!project) {
        return {
            title: 'Projet non trouvé',
            description: 'Le projet que vous recherchez n\'existe pas.',
        };
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${dict.TemplatePortfolio.metadata.title} - ${project.title[params.lang]}`,
        description: project.overview[params.lang],
        url: `https://patrick.bartosik.fr${params.lang === 'fr' ? `/portfolio/${params.slug}` : `/${params.lang}`}/portfolio/${params.slug}`,
        image: project.media.placeholder,
        author: {
            '@type': 'Person',
            name: 'Patrick Bartosik',
        },
        datePublished: project.dates.createdAt,
        creator: 'Patrick Bartosik',
        publisher: {
            '@type': 'Organization',
            name: 'Patrick Bartosik - Développeur Full Stack',
            logo: {
                '@type': 'ImageObject',
                url: 'https://patrick.bartosik.fr/logo.png'
            }
        },
    };

    return {
        title: `${dict.TemplatePortfolio.metadata.title} - ${project.title[params.lang]}`,
        description: project.overview[params.lang],
        keywords: `${project.keySkills.skillsList.join(', ')}, Patrick Bartosik, Portfolio, Projet Web`,
        openGraph: {
            title: `${dict.TemplatePortfolio.metadata.title} - ${project.title[params.lang]}`,
            description: project.overview[params.lang],
            url: `https://patrick.bartosik.fr${params.lang === 'fr' ? `/portfolio/${params.slug}` : `/${params.lang}`}/portfolio/${params.slug}`,
            type: 'website',
            images: [
                {
                    url: project.media.placeholder,
                    width: 1200,
                    height: 630,
                    alt: `${project.title[params.lang]} - Project Image`,
                },
            ],
            locale: params.lang,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dict.TemplatePortfolio.metadata.title} - ${project.title[params.lang]}`,
            description: project.overview[params.lang],
            images: [project.media.placeholder],
            creator: '@patrick_bartosik',
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr${params.lang === 'fr' ? `/portfolio/${params.slug}` : `/${params.lang}`}/portfolio/${params.slug}`,
            languages: {
                'fr': `https://patrick.bartosik.fr/portfolio/${params.slug}`,
                'en': `https://patrick.bartosik.fr/en/portfolio/${params.slug}`,
            },
        },
        other: {
            'application/ld+json': JSON.stringify(jsonLd),
        },
    };
}

export default function Page({
    params: { lang, slug },
}: {
    params: { lang: Locale, slug: string };
}) {
    return <ServerSideProject params={{ lang, slug }} />;
}

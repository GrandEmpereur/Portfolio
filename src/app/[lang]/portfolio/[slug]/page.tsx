import ServerSideProject from "@/components/serveur/ServerSideProject";
import { Locale } from "@/i18nConfig";
import { projects } from '@/lib/data/portfolio';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params }: { params: { slug: string, lang: Locale } }) {
    const dict = await getDictionary(params.lang);
    console.log('params.slug', params.slug);
    const project = projects.find(project => project.links.slug === `/${params.slug}`);

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${dict.TemplatePortfolio.metadata.title} - ${project?.title[params.lang]}`,
        description: project?.overview[params.lang],
        url: `https://patrick.bartosik.fr/${params.lang}/portfolio/${params.slug}`,
    };

    return {
        title: `${dict.TemplatePortfolio.metadata.title} - ${project?.title[params.lang]}`,
        description: project?.overview[params.lang],
        openGraph: {
            title: `${dict.TemplatePortfolio.metadata.title} - ${project?.title[params.lang]}`,
            description: project?.overview[params.lang],
            url: `https://patrick.bartosik.fr/${params.lang}/portfolio/${params.slug}`,
            type: 'website',
            images: [
                {
                    url: project?.media.placeholder,
                    width: 1200,
                    height: 630,
                    alt: `${project?.title[params.lang]} - Project Image`,
                },
            ],
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

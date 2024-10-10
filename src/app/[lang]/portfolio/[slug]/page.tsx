import ServerSideProject from "@/components/serveur/ServerSideProject";
import { Locale } from "@/i18nConfig";
import { projects } from '@/lib/data/portfolio';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params }: { params: { slug: string, lang: Locale } }) {
    const dict = await getDictionary(params.lang);
    console.log('params.slug', params.slug);
    const project = projects.find(project => project.links.slug === `/${params.slug}`);

    return {
        title: project ? `${dict.TemplatePortfolio.metadata.title} - ${project.title[params.lang]}` : dict.TemplatePortfolio.metadata.title,
        description: project ? project.overview[params.lang] : dict.TemplatePortfolio.metadata.description,
    };
}

export default function Page({
    params: { lang, slug },
}: {
    params: { lang: Locale, slug: string };
}) {
    return <ServerSideProject params={{ lang, slug }} />;
}

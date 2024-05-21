import ServerSideProject from "@/components/ServerSideProject";
import { Locale } from "@/i18nConfig";
import { projects } from '@/lib/data/portfolio';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params }: { params: { slug: string, lang: Locale } }) {
    const dict = await getDictionary(params.lang);
    const project = projects.find(project => project.slug === `/${params.slug}`);

    return {
        title: project ? `${dict.TemplatePortfolio.metadata.title} - ${project.title}` : dict.TemplatePortfolio.metadata.title,
        description: project ? project.description : dict.TemplatePortfolio.metadata.description,
    };
}

export default function Page({
    params: { lang, slug },
}: {
    params: { lang: Locale, slug: string };
}) {
    return <ServerSideProject params={{ lang, slug }} />;
}

import { Locale } from "@/i18nConfig";
import { getDictionary } from "@/get-dictionary";
import ProjectClient from "@/components/clients/ProjectClient";
import { projects } from '@/lib/data/portfolio';

export default async function ServerSideProject({
    params: { lang, slug },
}: {
    params: { lang: Locale, slug: string };
}) {
    const dictionary = await getDictionary(lang);
    const project = projects.find(project => project.links.slug === `/${slug}`);

    //@ts-ignore
    return <ProjectClient lang={lang} dictionary={dictionary} project={project} />;
}

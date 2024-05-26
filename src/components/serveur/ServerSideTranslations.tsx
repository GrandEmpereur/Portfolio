// components/ServerSideTranslations.tsx
import { Locale } from "@/i18nConfig";
import { getDictionary } from "@/get-dictionary";
import HomeClient from "@/components/clients/HomeClient";

export default async function ServerSideTranslations({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return <HomeClient lang={lang} dictionary={dictionary} />;
}

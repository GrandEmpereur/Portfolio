import { Locale } from "@/i18nConfig";
import { getDictionary } from "@/get-dictionary";
import MobileNavClient from "@/components/clients/MobileNavClient";

export default async function MobileNavServer({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dictionary = await getDictionary(lang);

    return <MobileNavClient lang={lang} dictionary={dictionary} />;
}

// pages/index.tsx ou src/app/page.tsx
import ServerSideTranslations from '@/components/ServerSideTranslations';
import { Locale } from '@/i18nConfig';

export default function Home({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    return <ServerSideTranslations params={{ lang }} />;
}

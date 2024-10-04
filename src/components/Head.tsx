import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MyPage({ params }: { params: { lang: string } }) {
    const { asPath } = useRouter();
    const currentPath = asPath.split('?')[0]; // Pour enlever les paramètres de requête

    const baseUrl = 'https://patrick.bartosik.fr';

    return (
        <Head>
            <link rel="alternate" hrefLang="fr" href={`${baseUrl}${currentPath}`} />
            <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${currentPath}`} />
            <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${currentPath}`} />
        </Head>
    );
}

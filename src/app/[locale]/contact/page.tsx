import { SimpleContactForm } from "@/components/SimpleContactForm";
import { getI18n } from "@/locales/serveur";
import { setStaticParamsLocale } from "next-international/server";
import { Metadata } from "next";
import { seoConfig, ogLocaleMap } from "@/lib/seo-config";
import { getBreadcrumbSchema } from "@/lib/structured-data";

/**
 * Generate metadata for contact page
 * @see .cursor/rules/seo.md for SEO best practices
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    setStaticParamsLocale(locale);
    const t = await getI18n();

    const title = t('meta.contact.title');
    const description = t('meta.contact.description');

    return {
        title,
        description,
        keywords: t('meta.contact.keywords'),
        alternates: {
            canonical: locale === seoConfig.defaultLocale
                ? `${seoConfig.baseUrl}/contact`
                : `${seoConfig.baseUrl}/${locale}/contact`,
            languages: {
                'fr': `${seoConfig.baseUrl}/contact`,
                'en': `${seoConfig.baseUrl}/en/contact`,
                'pl': `${seoConfig.baseUrl}/pl/contact`,
                'x-default': `${seoConfig.baseUrl}/contact`,
            },
        },
        openGraph: {
            title,
            description,
            url: locale === seoConfig.defaultLocale
                ? `${seoConfig.baseUrl}/contact`
                : `${seoConfig.baseUrl}/${locale}/contact`,
            siteName: seoConfig.siteName,
            locale: ogLocaleMap[locale] ?? locale,
            type: 'website',
            images: [
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
            images: [`${seoConfig.baseUrl}${seoConfig.openGraph.image}`],
            creator: '@patrickbartosik',
        },
    };
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getI18n();

    // Generate breadcrumb structured data
    const breadcrumbSchema = getBreadcrumbSchema(
        [
            { name: t('nav.home'), url: locale === seoConfig.defaultLocale ? '/' : `/${locale}` },
            { name: t('nav.contact'), url: locale === seoConfig.defaultLocale ? '/contact' : `/${locale}/contact` },
        ],
        locale
    );

    return (
        <>
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                suppressHydrationWarning
            />

            <main id="main-content" className="min-h-screen bg-black">
                <h1 className="sr-only">Contact Patrick Bartosik</h1>
                <SimpleContactForm />
            </main>
        </>
    );
}


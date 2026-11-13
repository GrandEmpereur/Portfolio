import { getI18n, getScopedI18n } from "@/locales/serveur";
import { setStaticParamsLocale } from "next-international/server";
import { getPublishedProjects } from "@/lib/data/lastwork.data";
import { HOME_FAQ_IDS } from "@/components/home/home-faq";
import { HomeHashScroll } from "@/components/home/HomeHashScroll";
import { getPersonSchema, getWebsiteSchema, getProjectsListSchema, getProfessionalServiceSchema, getFAQSchema, getBreadcrumbSchema, serializeJsonLd } from "@/lib/structured-data";
import { Metadata } from "next";
import { seoConfig, ogLocaleMap } from "@/lib/seo-config";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeProjects } from "@/components/home/HomeProjects";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeBlog } from "@/components/home/HomeBlog";
import { HomeEnd } from "@/components/home/HomeEnd";
import { SiteFooter } from "@/components/site/SiteFooter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();

  const title = t('meta.home.title');
  const description = t('meta.home.description');

  return {
    // absolute: the layout template would add the name a second time
    title: { absolute: title },
    description,
    keywords: t('meta.home.keywords'),
    openGraph: {
      title,
      description,
      url: locale === seoConfig.defaultLocale ? `${seoConfig.baseUrl}/` : `${seoConfig.baseUrl}/${locale}`,
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
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const t = await getI18n();
  const tEnd = await getScopedI18n("homeEnd");

  const faqSchema = getFAQSchema(
    HOME_FAQ_IDS.map((id) => ({
      question: tEnd(`faq.${id}.question`),
      answer: tEnd(`faq.${id}.answer`),
    })),
  );

  const schemas = [
    getPersonSchema(locale),
    getWebsiteSchema(locale),
    getProjectsListSchema(getPublishedProjects(), locale),
    getProfessionalServiceSchema(locale),
    faqSchema,
    getBreadcrumbSchema(
      [{ name: t("common.nav.chapters.accueil"), url: locale === seoConfig.defaultLocale ? "/" : `/${locale}` }],
      locale,
    ),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}

      <main id="main-content" className="relative w-full">
        <HomeHero />
        <HomeProjects />
        <HomeServices />
        <HomeBlog />
        <HomeEnd />
      </main>

      <SiteFooter />
      <HomeHashScroll />
    </>
  );
}

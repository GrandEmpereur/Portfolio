import { getI18n } from "@/locales/serveur";
import { setStaticParamsLocale } from "next-international/server";
import { lastwork } from "@/lib/data/lastwork.data";
import { getPersonSchema, getWebsiteSchema, getProjectsListSchema, getProfessionalServiceSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/structured-data";
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
    title,
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
      creator: '@patrickbartosik',
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getI18n()

  // Generate structured data
  const personSchema = getPersonSchema(locale);
  const websiteSchema = getWebsiteSchema(locale);
  const projectsSchema = getProjectsListSchema(lastwork.slice(0, 5), locale);
  const professionalServiceSchema = getProfessionalServiceSchema(locale);

  // FAQ Schema
  const faqs = [
    { question: t('faq.question1'), answer: t('faq.answer1') },
    { question: t('faq.question2'), answer: t('faq.answer2') },
    { question: t('faq.question3'), answer: t('faq.answer3') },
    { question: t('faq.question4'), answer: t('faq.answer4') },
    { question: t('faq.question5'), answer: t('faq.answer5') },
    { question: t('faq.question6'), answer: t('faq.answer6') },
    { question: t('faq.question7'), answer: t('faq.answer7') },
  ];
  const faqSchema = getFAQSchema(faqs);

  // Breadcrumb Schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t('footer.navHome'), url: locale === seoConfig.defaultLocale ? '/' : `/${locale}` },
  ], locale);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />

      <main id="main-content" className="relative w-full">
        <HomeHero />
        <HomeProjects />
        <HomeServices />
        <HomeBlog />
        <HomeEnd />
      </main>

      <SiteFooter />
    </>
  );
}

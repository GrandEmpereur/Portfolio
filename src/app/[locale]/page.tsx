import { getI18n } from "@/locales/serveur";
import Image from "next/image";
import { knowledge } from "@/lib/data/knowlege.data";
import { lastwork } from "@/lib/data/lastwork.data";
import { projectTestimonials } from "@/lib/data/testimonials.data";
import { services } from "@/lib/data/services.data";
import { getPersonSchema, getWebsiteSchema, getProjectsListSchema, getProfessionalServiceSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import { Metadata } from "next";
import { seoConfig } from "@/lib/seo-config";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { LatestProjectsSection } from "@/components/LatestProjectsSection";
import { KnowledgeSection } from "@/components/KnowledgeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StatsSection } from "@/components/StatsSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getI18n();

  const title = t('meta.home.title');
  const description = t('meta.home.description');

  return {
    title,
    description,
    keywords: t('meta.home.keywords'),
    alternates: {
      canonical: locale === seoConfig.defaultLocale ? seoConfig.baseUrl : `${seoConfig.baseUrl}/${locale}`,
    },
    openGraph: {
      title,
      description,
      url: locale === seoConfig.defaultLocale ? seoConfig.baseUrl : `${seoConfig.baseUrl}/${locale}`,
      siteName: seoConfig.siteName,
      locale: locale,
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

  // Get alt texts for knowledge items
  const knowledgeAlts = {
    'Next.js': t('alt.knowledge.nextjs'),
    'React': t('alt.knowledge.react'),
    'Angular': t('alt.knowledge.angular'),
    'Shopify': t('alt.knowledge.shopify'),
    'Tailwind': t('alt.knowledge.tailwind'),
    'Shadcn': t('alt.knowledge.shadcn'),
    'MongoDB': t('alt.knowledge.mongodb'),
    'Supabase': t('alt.knowledge.supabase'),
    'NestJS': t('alt.knowledge.nestjs'),
    'Adonis JS': t('alt.knowledge.adonisjs'),
    'KOA': t('alt.knowledge.koa'),
    'Stripe': t('alt.knowledge.stripe'),
    'LemonSqueezy': t('alt.knowledge.lemonsqueezy'),
    'Polar': t('alt.knowledge.polar'),
    'SCSS': t('alt.knowledge.scss'),
  };

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

      <main className="relative w-full">
        {/* Hero Section - Split Text Animation */}
        <HeroSection
          title={t('hero.title')}
          name={t('hero.name')}
          ctaPrimary={t('hero.cta_primary')}
          ctaSecondary={t('hero.cta_secondary')}
          ctaTertiary={t('hero.download_cv')}
          altText={t('alt.hero')}
        />

        {/* About Section - Animation GSAP au scroll */}
        <AboutSection
          label={t('about.label')}
          text={t('about.heading')}
        />

        {/* Latest Work - Animation GSAP */}
        <LatestProjectsSection
          title={t('work.title')}
          viewAllText={t('work.view_all')}
          projects={lastwork}
        />

        {/* Knowledge/Skills Section - Animation GSAP */}
        <KnowledgeSection
          title={t('knowledge.title')}
          description={t('knowledge.description')}
          knowledge={knowledge}
          knowledgeAlts={knowledgeAlts}
        />

        {/* Services Section - Animation GSAP */}
        <ServicesSection
          title={t('services.title')}
          services={services.filter(s => s.id !== 'mobile-development')}
          locale={locale as 'fr' | 'en' | 'pl'}
          ctaText={t('services.cta')}
        />

        {/* Statistics Section - Animation GSAP + Testimonials Carousel */}
        {/* Temporairement désactivé */}
        {/* <StatsSection
          label={t('stats.label')}
          title={{
            line1: t('stats.heading.line1'),
            line2: t('stats.heading.line2'),
          }}
          description={{
            line1: t('stats.description.line1'),
            line2: t('stats.description.line2'),
          }}
          stats={{
            projectsCompleted: { number: '10+', label: t('stats.projects_completed') },
            yearsExperience: { number: '4+', label: t('stats.years_experience') },
            satisfactionRate: { number: '99%', label: t('stats.satisfaction_rate') },
            revenueGrowth: { number: '25M', label: t('stats.revenue_growth') },
          }}
          testimonials={projectTestimonials.map(testimonial => ({
            name: testimonial.author.name,
            role: testimonial.author.role,
            company: testimonial.author.company,
            quote: testimonial.quote[locale as 'fr' | 'en' | 'pl'] || testimonial.quote.fr,
          }))}
        /> */}

        {/* Contact Section */}
        <ContactSection
          translations={{
            formBrand: t('contact.formBrand'),
            formTitle: t('contact.formTitle'),
            nameLabel: t('contact.nameLabel'),
            namePlaceholder: t('contact.namePlaceholder'),
            emailLabel: t('contact.emailLabel'),
            emailPlaceholder: t('contact.emailPlaceholder'),
            messageLabel: t('contact.messageLabel'),
            messagePlaceholder: t('contact.messagePlaceholder'),
            submitButton: t('contact.submitButton'),
            termsText: t('contact.termsText'),
            termsLink: t('contact.termsLink'),
            andText: t('contact.andText'),
            privacyLink: t('contact.privacyLink'),
            heading: t('contact.heading'),
            description: t('contact.description'),
            quickResponseTitle: t('contact.quickResponseTitle'),
            quickResponseDesc: t('contact.quickResponseDesc'),
            clearStepsTitle: t('contact.clearStepsTitle'),
            clearStepsDesc: t('contact.clearStepsDesc'),
            contactRole: t('contact.contactRole'),
            contactCompany: t('contact.contactCompany'),
            contactName: t('contact.contactName'),
            contactCta: t('contact.contactCta'),
            copyright: t('contact.copyright'),
          }}
        />

        {/* FAQ Section */}
        <FAQSection
          title={t('faq.title')}
          socialTitle={t('faq.socialTitle')}
          faqs={faqs}
          socialLinks={{
            linkedin: seoConfig.social.linkedin,
            github: seoConfig.social.github,
            instagram: 'https://www.instagram.com/empereur.patrick/',
            email: seoConfig.author.email,
          }}
        />

      </main>

      {/* Footer */}
      <Footer
        translations={{
          description: t('footer.description'),
          navigation: t('footer.navigation'),
          navHome: t('footer.navHome'),
          navProjects: t('footer.navProjects'),
          navServices: t('footer.navServices'),
          navContact: t('footer.navContact'),
          social: t('footer.social'),
          legal: t('footer.legal'),
          legalTerms: t('footer.legalTerms'),
          legalPrivacy: t('footer.legalPrivacy'),
          copyright: t('footer.copyright'),
        }}
        socialLinks={{
          linkedin: seoConfig.social.linkedin,
          github: seoConfig.social.github,
          instagram: 'https://instagram.com/patrickbartosik',
          email: seoConfig.author.email,
        }}
      />
    </>
  );
}

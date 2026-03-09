import { getI18n } from "@/locales/serveur";
import { setStaticParamsLocale } from "next-international/server";
import { lastwork } from "@/lib/data/lastwork.data";
import { projectTestimonials } from "@/lib/data/testimonials.data";
import { services } from "@/lib/data/services.data";
import { getPersonSchema, getWebsiteSchema, getProjectsListSchema, getProfessionalServiceSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/structured-data";
import { Metadata } from "next";
import { seoConfig, ogLocaleMap } from "@/lib/seo-config";
import { HeroSection } from "@/components/HeroSection";
import { ClientMarquee } from "@/components/ClientMarquee";
import { AboutSection } from "@/components/AboutSection";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";

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
    alternates: {
      canonical: locale === seoConfig.defaultLocale ? `${seoConfig.baseUrl}/` : `${seoConfig.baseUrl}/${locale}`,
      languages: {
        'fr': `${seoConfig.baseUrl}/`,
        'en': `${seoConfig.baseUrl}/en`,
        'pl': `${seoConfig.baseUrl}/pl`,
        'x-default': `${seoConfig.baseUrl}/`,
      },
    },
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
        {/* Hero Section - Split Text Animation */}
        <HeroSection
          name={t('hero.name')}
          label={t('hero.label')}
          tagline={t('hero.tagline')}
          description={t('hero.description')}
          ctaProjects={t('hero.cta.projects')}
          ctaContact={t('hero.cta.contact')}
          availableText={t('hero.available')}
          scrollText={t('hero.scroll')}
        />

        {/* Client Marquee */}
        <ClientMarquee
          label={t('marquee.label')}
          clients={[
            "Euroclear France",
            "Tartine & Chocolat",
            "Balzac Paris",
            "Qwetch",
            "Odaje",
            "Isotoner",
            "Easy Clothes",
            "Le-1.store",
          ]}
        />

        {/* About Section */}
        <AboutSection
          label={t('about.label')}
          text={t('about.text')}
          text2={t('about.text2')}
          facts={[t('about.fact1'), t('about.fact2'), t('about.fact3')]}
        />

        {/* Selected Work */}
        <SelectedWorkSection
          label={t('selectedWork.label')}
          viewProjectText={t('selectedWork.viewProject')}
          viewAllText={t('selectedWork.viewAll')}
          projects={lastwork.slice(0, 5)}
        />

        {/* Services & Approach Section */}
        <ServicesSection
          label={t('approach.label')}
          approachTitle={t('approach.title')}
          approachSteps={[
            { title: t('approach.step1.title'), desc: t('approach.step1.desc') },
            { title: t('approach.step2.title'), desc: t('approach.step2.desc') },
            { title: t('approach.step3.title'), desc: t('approach.step3.desc') },
            { title: t('approach.step4.title'), desc: t('approach.step4.desc') },
          ]}
          services={services
            .filter(s => ['web-development', 'ecommerce', 'saas-development', 'api-integration'].includes(s.id))
            .map(s => ({
              id: s.id,
              icon: s.icon,
              title: s.title[locale as 'fr' | 'en' | 'pl'] || s.title.fr,
              description: s.description[locale as 'fr' | 'en' | 'pl'] || s.description.fr,
              features: s.features[locale as 'fr' | 'en' | 'pl'] || s.features.fr,
              technologies: s.technologies,
            }))}
          ctaText={t('services.cta')}
          locale={locale as 'fr' | 'en' | 'pl'}
        />

        {/* Testimonials Section */}
        <TestimonialsSection
          label={t('testimonials.label')}
          testimonials={projectTestimonials.map(testimonial => ({
            quote: testimonial.quote[locale as 'fr' | 'en' | 'pl'] || testimonial.quote.fr,
            name: testimonial.author.name,
            role: testimonial.author.role,
            company: testimonial.author.company,
          }))}
        />

        {/* Contact Section */}
        <ContactSection
          translations={{
            title: t('contactCta.title'),
            subtitle: t('contactCta.subtitle'),
            nameLabel: t('contactCta.nameLabel'),
            namePlaceholder: t('contactCta.namePlaceholder'),
            emailLabel: t('contactCta.emailLabel'),
            emailPlaceholder: t('contactCta.emailPlaceholder'),
            messageLabel: t('contactCta.messageLabel'),
            messagePlaceholder: t('contactCta.messagePlaceholder'),
            submitButton: t('contactCta.submitButton'),
            termsText: t('contactCta.termsText'),
            termsLink: t('contactCta.termsLink'),
            andText: t('contactCta.andText'),
            privacyLink: t('contactCta.privacyLink'),
          }}
          socialLinks={{
            linkedin: seoConfig.social.linkedin,
            github: seoConfig.social.github,
            instagram: seoConfig.social.instagram,
            email: seoConfig.author.email,
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
            instagram: seoConfig.social.instagram,
            email: seoConfig.author.email,
          }}
        />

      </main>

      {/* Footer */}
      <Footer
        translations={{
          copyright: t('footer.copyright', { year: new Date().getFullYear().toString() }),
          backToTop: t('footer.backToTop'),
          legalTerms: t('footer.legalTerms'),
          legalPrivacy: t('footer.legalPrivacy'),
        }}
        socialLinks={{
          linkedin: seoConfig.social.linkedin,
          github: seoConfig.social.github,
          instagram: seoConfig.social.instagram,
          email: seoConfig.author.email,
        }}
      />
    </>
  );
}

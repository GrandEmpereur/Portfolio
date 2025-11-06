import { getI18n } from '@/locales/serveur';
import { Metadata } from 'next';
import { seoConfig } from '@/lib/seo-config';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Generate metadata for legal notice page
 * @see .cursor/rules/seo.md for SEO best practices
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const t = await getI18n();

  const title = t('meta.legal.title');
  const description = t('meta.legal.description');

  return {
    title,
    description,
    keywords: t('meta.legal.keywords'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${seoConfig.baseUrl}/mentions-legales`,
    },
    openGraph: {
      title,
      description,
      url: `${seoConfig.baseUrl}/mentions-legales`,
      images: [
        {
          url: `${seoConfig.baseUrl}${seoConfig.openGraph.image}`,
          width: seoConfig.openGraph.imageWidth,
          height: seoConfig.openGraph.imageHeight,
          alt: title,
        },
      ],
    },
  };
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getI18n();
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="relative min-h-screen w-full px-8 md:px-16 lg:px-24 py-32">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 mb-12"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour à l'accueil
      </Link>

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          {t('legal.title')}
        </h1>
        <p className="text-white/50 text-lg">
          {t('legal.lastUpdated')} : {currentDate}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Editor */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
            {t('legal.sections.editor.title')}
          </h2>
          <div className="text-white/80 leading-relaxed space-y-4">
            <p>{t('legal.sections.editor.content')}</p>
            <div className="bg-white/5 rounded-lg p-4 mt-4">
              <p><strong>Patrick Bartosik</strong></p>
              <p>Développeur Full Stack Freelance</p>
              <p>Email : <a href="mailto:contact@bartosik.fr" className="text-orange-500 hover:text-orange-400 transition-colors">contact@bartosik.fr</a></p>
              <p>Site web : <a href="https://patrick.bartosik.fr" className="text-orange-500 hover:text-orange-400 transition-colors">patrick.bartosik.fr</a></p>
            </div>
          </div>
        </section>

        {/* Hosting */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
            {t('legal.sections.host.title')}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {t('legal.sections.host.content')}
          </p>
          <div className="bg-white/5 rounded-lg p-4 mt-4">
            <p><strong>Vercel Inc.</strong></p>
            <p>440 N Barranca Ave #4133</p>
            <p>Covina, CA 91723</p>
            <p>États-Unis</p>
            <p>Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400 transition-colors">vercel.com</a></p>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
            {t('legal.sections.property.title')}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {t('legal.sections.property.content')}
          </p>
        </section>

        {/* Personal Data */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
            {t('legal.sections.data.title')}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {t('legal.sections.data.content')}
          </p>
          <p className="text-white/80 leading-relaxed mt-4">
            Pour plus d'informations, consultez notre{' '}
            <Link href="/politique-confidentialite" className="text-orange-500 hover:text-orange-400 transition-colors underline">
              politique de confidentialité
            </Link>.
          </p>
        </section>

        {/* Cookies */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
            {t('legal.sections.cookies.title')}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {t('legal.sections.cookies.content')}
          </p>
        </section>

        {/* Liability */}
        <section className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-orange-500">
            {t('legal.sections.liability.title')}
          </h2>
          <p className="text-white/80 leading-relaxed">
            {t('legal.sections.liability.content')}
          </p>
        </section>
      </div>

      {/* Contact CTA */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-4">Questions ?</h3>
          <p className="text-white/70 mb-6">
            Pour toute question concernant ces mentions légales, n'hésitez pas à me contacter.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-semibold text-black hover:scale-105 transition-transform duration-300"
          >
            Me contacter
          </Link>
        </div>
      </div>
    </main>
  );
}

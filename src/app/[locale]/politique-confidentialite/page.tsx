import { getI18n, getScopedI18n } from '@/locales/serveur';
import { Metadata } from 'next';
import { seoConfig } from '@/lib/seo-config';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Clock, FileText, Mail } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const t = await getI18n();

  return {
    title: t('privacy.title'),
    description: t('privacy.sections.intro.content'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${seoConfig.baseUrl}/politique-confidentialite`,
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getI18n();
  const tPrivacy = await getScopedI18n('privacy.sections');
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const sections = [
    { key: 'intro', icon: Shield },
    { key: 'collected', icon: Database },
    { key: 'usage', icon: Eye },
    { key: 'security', icon: Lock },
    { key: 'rights', icon: UserCheck },
    { key: 'analytics', icon: FileText },
    { key: 'retention', icon: Clock },
    { key: 'changes', icon: FileText },
  ] as const;

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
        <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-full px-6 py-3 mb-6">
          <Shield className="w-5 h-5 text-orange-500" />
          <span className="text-orange-500 font-semibold">RGPD Compliant</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          {t('privacy.title')}
        </h1>
        <p className="text-white/50 text-lg">
          {t('privacy.lastUpdated')} : {currentDate}
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {sections.map(({ key, icon: Icon }) => (
          <section
            key={key}
            className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10 hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Icon className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-orange-500 flex-1">
                {tPrivacy(`${key}.title`)}
              </h2>
            </div>
            <p className="text-white/80 leading-relaxed ml-16">
              {tPrivacy(`${key}.content`)}
            </p>
          </section>
        ))}
      </div>

      {/* Contact for Data Rights */}
      <div className="max-w-4xl mx-auto mt-16">
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-2xl p-8 md:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Exercez vos droits</h3>
              <p className="text-white/70 mb-6">
                Pour toute demande concernant vos données personnelles (accès, rectification, suppression), contactez-nous directement :
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 ml-16">
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-sm text-white/50 mb-2">Email</p>
              <a
                href="mailto:contact@bartosik.fr"
                className="text-lg font-semibold text-orange-500 hover:text-orange-400 transition-colors"
              >
                contact@bartosik.fr
              </a>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <p className="text-sm text-white/50 mb-2">Délai de réponse</p>
              <p className="text-lg font-semibold">
                Maximum 30 jours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
        <Link
          href="/mentions-legales"
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] transition-all duration-300 group"
        >
          <h4 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">
            Mentions Légales
          </h4>
          <p className="text-white/60 text-sm">
            Informations sur l'éditeur et l'hébergement du site
          </p>
        </Link>

        <Link
          href="/contact"
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/[0.07] transition-all duration-300 group"
        >
          <h4 className="text-lg font-semibold mb-2 group-hover:text-orange-500 transition-colors">
            Contact
          </h4>
          <p className="text-white/60 text-sm">
            Posez-nous vos questions sur la confidentialité
          </p>
        </Link>
      </div>
    </main>
  );
}

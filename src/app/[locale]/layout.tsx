import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SiteHeader } from "@/components/site/SiteHeader";
import { seoConfig, ogLocaleMap } from "@/lib/seo-config";
import { getI18n } from "@/locales/serveur";
import { setStaticParamsLocale } from "next-international/server";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnalyticsGate } from "@/components/consent/AnalyticsGate";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { SiteCursor } from "@/components/site/SiteCursor";
import { RouteTransition } from "@/components/site/RouteTransition";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Runs before first paint. "js" unlocks the JavaScript-only states in the CSS.
// "enter" (page hidden while the hero entrance prepares) only on 900px+ without reduced motion,
// and is always removed after 2.5 s even if the main script never starts.
const BOOT_SCRIPT = `(function(){var h=document.documentElement;h.classList.add('js');try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type!=='navigate'&&new RegExp('^/(en|pl)?/?$').test(location.pathname))history.scrollRestoration='manual'}catch(e){}if(!matchMedia('(min-width: 900px)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;h.classList.add('enter');setTimeout(function(){h.classList.remove('enter')},2500)})();`;

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
    metadataBase: new URL(seoConfig.baseUrl),
    title: {
      default: title,
      template: `%s | ${seoConfig.siteName}`,
    },
    description,
    keywords: t('meta.home.keywords'),

    // Application metadata
    applicationName: seoConfig.applicationName,
    category: seoConfig.category,

    // Authors & Creator
    authors: [{ name: seoConfig.author.name, url: seoConfig.author.url }],
    creator: seoConfig.author.name,
    publisher: seoConfig.siteName,

    // Format detection - disable auto-detection of phone numbers
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Robots configuration
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Alternates for i18n (hreflang codes en BCP 47 — fr-FR, en-US, pl-PL)
    alternates: {
      canonical: locale === seoConfig.defaultLocale ? `${seoConfig.baseUrl}/` : `${seoConfig.baseUrl}/${locale}`,
      languages: {
        'fr-FR': `${seoConfig.baseUrl}/`,
        'en-US': `${seoConfig.baseUrl}/en`,
        'pl-PL': `${seoConfig.baseUrl}/pl`,
        'x-default': `${seoConfig.baseUrl}/`,
      },
    },

    // Icons configuration
    icons: {
      icon: seoConfig.icons.icon,
      shortcut: seoConfig.icons.shortcut,
      apple: seoConfig.icons.apple,
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: ogLocaleMap[locale] ?? locale,
      url: locale === seoConfig.defaultLocale ? `${seoConfig.baseUrl}/` : `${seoConfig.baseUrl}/${locale}`,
      title,
      description,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.baseUrl}${seoConfig.openGraph.image}`,
          width: seoConfig.openGraph.imageWidth,
          height: seoConfig.openGraph.imageHeight,
          alt: title,
          type: seoConfig.openGraph.imageType,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${seoConfig.baseUrl}${seoConfig.openGraph.image}`],
    },
  };
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: seoConfig.themeColor },
      { media: '(prefers-color-scheme: dark)', color: seoConfig.themeColor },
    ],
  };
}

export default async function RootLayout({
  children,
  params: paramsPromise,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await paramsPromise;
  setStaticParamsLocale(locale);

  const skipLinkText: Record<string, string> = {
    fr: 'Aller au contenu principal',
    en: 'Skip to main content',
    pl: 'Przejdź do głównej treści',
  };

  return (
    <html
      lang={locale}
      className={`dark ${archivo.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body
        className="theme-dark antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-bone focus:text-ink focus:rounded-lg focus:text-sm focus:font-medium"
        >
          {skipLinkText[locale] ?? skipLinkText.en}
        </a>
        <Providers locale={locale}>
          <AnalyticsGate />
          <ConsentBanner />
          <SmoothScroll>
            <SiteHeader />
            <SiteCursor />
            <RouteTransition />
            {children}
            <Toaster />
            <VercelAnalytics />
            <SpeedInsights />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}

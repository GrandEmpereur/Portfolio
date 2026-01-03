import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/navBar";
import { seoConfig } from "@/lib/seo-config";
import { getI18n } from "@/locales/serveur";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { PageLoader } from "@/components/PageLoader";
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics as GoogleAnalytics } from '@/components/Analytics';
import { GoogleTagManager } from '@next/third-parties/google'

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

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

    // Alternates for i18n
    alternates: {
      canonical: locale === seoConfig.defaultLocale ? seoConfig.baseUrl : `${seoConfig.baseUrl}/${locale}`,
      languages: {
        'en': `${seoConfig.baseUrl}/en`,
        'fr': `${seoConfig.baseUrl}`,
        'pl': `${seoConfig.baseUrl}/pl`,
        'x-default': `${seoConfig.baseUrl}`,
      },
    },

    // Manifest for PWA
    manifest: '/manifest.webmanifest',

    // Icons configuration
    icons: {
      icon: seoConfig.icons.icon,
      shortcut: seoConfig.icons.shortcut,
      apple: seoConfig.icons.apple,
    },

    // Apple Web App configuration
    appleWebApp: {
      capable: seoConfig.appleWebApp.capable,
      statusBarStyle: seoConfig.appleWebApp.statusBarStyle,
      title: seoConfig.appleWebApp.title,
    },

    // Verification tokens
    verification: {
      google: seoConfig.verification.google || undefined,
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === seoConfig.defaultLocale ? seoConfig.baseUrl : `${seoConfig.baseUrl}/${locale}`,
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
      creator: seoConfig.author.twitter,
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
  return (
    <html lang={locale} className="dark">
      <body
        className={`${anton.variable} ${inter.variable} antialiased dark:bg-black bg-black`}
      >
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <Providers locale={locale}>
          <PageLoader />
          <CustomCursor />
          <GoogleAnalytics />
          <SmoothScroll>
            <NavBar />
            {children}
            <Toaster />
            <VercelAnalytics />
            <SpeedInsights />
          </SmoothScroll>
        </Providers>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
        )}
      </body>
    </html>
  );
}

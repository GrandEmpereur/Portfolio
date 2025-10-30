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
import { PageTransition } from "@/components/PageTransition";
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
    authors: [{ name: seoConfig.author.name, url: seoConfig.author.url }],
    creator: seoConfig.author.name,
    publisher: seoConfig.siteName,
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
    alternates: {
      canonical: locale === seoConfig.defaultLocale ? seoConfig.baseUrl : `${seoConfig.baseUrl}/${locale}`,
      languages: {
        'en': `${seoConfig.baseUrl}/en`,
        'fr': `${seoConfig.baseUrl}`,
        'pl': `${seoConfig.baseUrl}/pl`,
      },
    },
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

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
      <GoogleTagManager gtmId="GTM-5SZB3CZK" />
      <body
        className={`${anton.variable} ${inter.variable} antialiased dark:bg-black bg-black`}
      >
        <Providers locale={locale}>
          <PageLoader />
          <PageTransition />
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
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SZB3CZK" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
      </body>
    </html>
  );
}

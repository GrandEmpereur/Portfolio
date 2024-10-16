import type { Metadata, Viewport } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import '@/scss/styles.scss';
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Locale } from "@/i18nConfig";
import { GoogleTagManager } from '@next/third-parties/google'

const poppins = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://patrick.bartosik.fr'),
  title: {
    default: "Patrick Bartosik - Développeur Full Stack | Expert React & Next.js",
    template: "%s"
  },
  description: "Développeur Full Stack spécialisé en React et Next.js. Création d'applications web innovantes, performantes et optimisées SEO pour propulser votre projet ou entreprise.",
  keywords: ["Développeur Full Stack", "React", "Next.js", "Applications Web", "SEO", "Performance Web", "Patrick Bartosik"],
  authors: [{ name: "Patrick Bartosik", url: "https://patrick.bartosik.fr" }],
  creator: "Patrick Bartosik",
  publisher: "Patrick Bartosik",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    title: "Patrick Bartosik - Développeur Full Stack | Expert React & Next.js",
    description: "Développeur Full Stack spécialisé en React et Next.js. Création d'applications web innovantes et performantes.",
    url: "https://patrick.bartosik.fr",
    siteName: "Patrick Bartosik - Développeur Full Stack",
    images: [
      {
        url: "https://patrick.bartosik.fr/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Patrick Bartosik - Développeur Full Stack",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick Bartosik - Développeur Full Stack | Expert React & Next.js",
    description: "Expert en React et Next.js, créateur d'applications web innovantes et performantes.",
    images: ["https://patrick.bartosik.fr/img/og-image.jpg"],
    creator: "@patrick_bartosik",
    site: "@patrick_bartosik",
  },
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
  verification: {
    other: {
      me: ['mailto:contact@patrick.bartosik.fr', 'https://twitter.com/patrick_bartosik'],
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: 'black',
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang === 'fr' ? 'fr': 'en'} className={`${poppins.variable} ${plusJakartaSans.variable} dark`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="https://patrick.bartosik.fr/sitemap.xml" />
      </head>
      <GoogleTagManager gtmId="GTM-5SZB3CZK" />
      <body className={cn(
        'min-h-screen relative font-sans antialiased grainy',
        poppins.className,
      )}>
        {children}
        <SpeedInsights />
        <Analytics />
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SZB3CZK" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
      </body>
    </html>
  );
}

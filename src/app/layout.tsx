import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import '@/scss/styles.scss';
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { type Locale } from "@/i18nConfig";

const inter = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const mono = Plus_Jakarta_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta-sans',
});

export const metadata: Metadata = {
  title: "Bartosik Patrick - Développeur Full Stack | Expert React & Next.js",
  description: "Découvrez le portfolio innovant de Bartosik Patrick, développeur Full Stack spécialisé en React et Next.js. Explorez des applications web alliant esthétique et fonctionnalité, conçues pour repousser les limites des expériences digitales.",
  keywords: "Développeur Full Stack, React, Next.js, Applications Web, SEO, Performance Web",
  openGraph: {
    title: "Bartosik Patrick - Développeur Full Stack | Expert React & Next.js",
    description: "Découvrez le portfolio innovant de Bartosik Patrick, développeur Full Stack spécialisé en React et Next.js.",
    type: "website",
    locale: "fr_FR",
    url: "https://patrick.bartosik.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bartosik Patrick - Développeur Full Stack",
    description: "Expert en React et Next.js, créateur d'applications web innovantes.",
  },
};

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} className="dark">
      <head>
        <link rel="canonical" href="https://patrick.bartosik.fr" />
      </head>
      <body className={cn(
        'min-h-screen relative font-sans antialiased grainy ',
        inter.className,
      )}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

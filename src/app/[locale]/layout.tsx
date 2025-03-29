import type { Metadata, Viewport } from "next";
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Providers } from '@/app/[locale]/providers';
import { ReactNode } from "react";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "@/app/globals.css"
import '@/scss/reset.scss';

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
    images: [
      {
        url: "https://patrick.bartosik.fr/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bartosik Patrick - Portfolio",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bartosik Patrick - Développeur Full Stack",
    description: "Expert en React et Next.js, créateur d'applications web innovantes.",
    images: ["https://patrick.bartosik.fr/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  
  return (
    <html lang={locale} className="dark">
      <body className={cn(
        'min-h-screen relative font-sans antialiased grainy',
        inter.variable,
      )}>
        <Providers locale={locale}>
            {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

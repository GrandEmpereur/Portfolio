import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans  } from "next/font/google";
import "./globals.css";
import '@/scss/styles.scss';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { i18n, type Locale } from "@/i18nConfig";

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
  title: "Bartosik Patrick - Full Stack Developer | Expert in React, Next.js, & Tailwind CSS",
  description: "Discover the cutting-edge portfolio of Bartosik Patrick, a seasoned Full Stack Developer specializing in React, Next.js, and Tailwind CSS. Dive into a showcase of innovative web applications that blend aesthetics with functionality, crafted to push the boundaries of digital experiences.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang} className="dark">
      <body className={cn(
            'min-h-screen relative font-sans antialiased grainy ',
            inter.className, 
          )}>
        <NavBar params={params} />
        {children}
        <Footer params={params} />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
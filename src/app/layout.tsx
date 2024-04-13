import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans  } from "next/font/google";
import "./globals.css";
import '@/scss/styles.scss';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const inter = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const mono = Plus_Jakarta_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Bartosik Patrick - Portfolio",
  description: "Welcome to my portfolio! I'm a fullstack developer with a passion for creating beautiful and functional web applications using modern technologies like React, Next.js, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
            'min-h-screen font-sans antialiased grainy',
            inter.className, 
          )}>
        <NavBar />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import './scss/styles.scss';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"

const inter = Poppins({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});


Analytics({
  framework: 'next',
});

export const metadata: Metadata = {
  title: "Portfolio - Patrick",
  description: "Welcome to my portfolio, my name is Patrick and i am a fullstack developer, specializing in React and JavaScript ecosystem.",
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
            inter.className
          )}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

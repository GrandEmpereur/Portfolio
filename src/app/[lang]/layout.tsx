import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { i18n, type Locale } from "@/i18nConfig";

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <div>
        <NavBar params={params} />
        {children}
        <Footer params={params} />
    </div>
  );
}

import NavBarServer from "@/components/serveur/serveurSideNavbar";
import Footer from "@/components/Footer";
import { i18n, type Locale } from "@/i18nConfig";

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    return (
        <div>
            <NavBarServer params={params} />
            {children}
            <Footer params={params} />
        </div>
    );
}

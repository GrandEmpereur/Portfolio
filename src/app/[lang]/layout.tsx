import NavBarServer from "@/components/serveur/serveurSideNavbar";
import Footer from "@/components/Footer";
import {i18n, type Locale} from "@/i18nConfig";
import PageTransition from "@/components/PageTransition"; // Assurez-vous que le chemin est correct

export default function RootLayout({
                                       children,
                                       params,
                                   }: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    return (
        <div>
            <NavBarServer params={params}/>
            <PageTransition>{children}</PageTransition>
            <Footer params={params}/>
        </div>
    );
}

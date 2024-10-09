import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18nConfig";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
    const locales = [...i18n.locales];
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
    return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Exclure les chemins spécifiques
    if (
        pathname.startsWith('/api/') ||
        pathname.startsWith('/_next/') ||
        pathname.includes('/img/') ||
        pathname.includes('/shape/') ||
        pathname.includes('/stack/') ||
        pathname.includes('/svg/') ||
        pathname === '/robots.txt' ||
        pathname === '/sitemap.xml' ||
        pathname.endsWith('sitemap.xml') ||
        pathname === '/favicon.ico' ||
        pathname === '/CV.pdf'
    ) {
        return NextResponse.next();
    }

    // Vérifier si le pathname commence par un locale valide
    const pathnameIsMissingValidLocale = !i18n.locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameIsMissingValidLocale) {
        const locale = getLocale(request);
        // Vérifier si l'agent utilisateur est un robot de Google
        const userAgent = request.headers.get('user-agent') || '';
        if (userAgent.toLowerCase().includes('googlebot')) {
            // Pour les robots Google, ne pas rediriger, permettre l'accès direct
            return NextResponse.next();
        }
        // Rediriger vers la version localisée pour les autres utilisateurs
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
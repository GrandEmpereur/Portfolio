import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18nConfig";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales;
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locale = matchLocale(languages, locales, i18n.defaultLocale);
    return locale;
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

    const pathnameIsMissingLocale = i18n.locales.every(
        (locale: string) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
    const isExcludedPath = pathname.startsWith("/img/");
    if (isExcludedPath) {
        // Skip i18n modification for images or other excluded paths
        return;
    }
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        if (locale === i18n.defaultLocale) {
            return NextResponse.rewrite(
                new URL(
                    `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                    request.url
                )
            );
        }
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    matcher: [
        /*
         * Exclure les chemins suivants du middleware :
         * - _next/static (fichiers statiques)
         * - _next/image (fichiers d'optimisation d'images)
         * - favicon.ico, sitemap.xml, robots.txt (fichiers de métadonnées)
         */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}


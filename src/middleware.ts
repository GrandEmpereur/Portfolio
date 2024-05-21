import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "@/i18nConfig";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request: NextRequest): string | undefined {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: string[] = [...i18n.locales]; // Copy the readonly array to a mutable array

    const languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

    const locale = matchLocale(languages, locales, i18n.defaultLocale);

    return locale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Exclude paths like /robots.txt and /sitemap.xml
    if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
        return NextResponse.next();
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);

        if (locale) {
            const newUrl = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
            return NextResponse.redirect(new URL(newUrl, request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|img/*|shape/*|stack/*|svg/*|CV.pdf|robots.txt|sitemap.xml).*)",
    ],
};

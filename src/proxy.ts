import { NextRequest, NextResponse } from "next/server";

const LOCALE_HEADER = "X-Next-Locale";
const DEFAULT_LOCALE = "fr";
// Locales that are served under a URL prefix (French lives at the root, unprefixed).
const PREFIXED_LOCALES = ["en", "pl"] as const;

/**
 * URL path is the single source of truth for the locale. No cookie or
 * Accept-Language detection is performed, so a stateless (bot) request always
 * resolves the same way — which is required for /en and /pl to be indexable.
 *
 * - /en, /pl (and their sub-paths)  -> served as-is (200), locale from the path
 * - /fr, /fr/*                      -> permanent (308) redirect to the unprefixed path
 * - everything else                 -> French, internally rewritten to /fr/* (URL stays clean)
 */
export default function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    const segment = pathname.split("/", 2)[1];

    // French is canonical at the root: strip any explicit /fr prefix permanently.
    if (segment === DEFAULT_LOCALE) {
        const stripped = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
        const url = new URL(stripped, request.url);
        url.search = search;
        return NextResponse.redirect(url, 308);
    }

    // Prefixed locales are served directly from their URL — never redirected.
    if ((PREFIXED_LOCALES as readonly string[]).includes(segment)) {
        const response = NextResponse.next();
        response.headers.set(LOCALE_HEADER, segment);
        return response;
    }

    // No locale prefix -> French. Rewrite to the [locale] segment without
    // exposing /fr in the URL.
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set(LOCALE_HEADER, DEFAULT_LOCALE);
    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|icons|svg|og|sitemap.xml|robots.txt|llms.txt|llms-full.txt|cv.pdf|CV.pdf|not-found).*)",
    ],
};

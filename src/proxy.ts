import { createI18nMiddleware } from "next-international/middleware";
import { NextRequest } from "next/server";

const I18nMiddleware = createI18nMiddleware({
    locales: ["en", "fr", "pl"],
    defaultLocale: "fr",
    urlMappingStrategy: 'rewriteDefault'
});

export default function proxy(request: NextRequest) {
    return I18nMiddleware(request);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|icons|svg|og|sitemap.xml|robots.txt|cv.pdf|CV.pdf|not-found).*)"],
};

export const i18n = {
    locales: ["en", "fr",],
    defaultLocale: "fr",
} as const;

export type Locale = (typeof i18n)["locales"][number];
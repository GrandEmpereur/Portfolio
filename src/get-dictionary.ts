import 'server-only'
import type { Locale } from "./i18nConfig"

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import("../translations/en.json").then((module) => module.default),
    fr: () => import("../translations/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.en();
import 'server-only'
import type { Locale } from "./i18nConfig"

const dictionaries = {
    fr: () => import("../translations/fr.json").then((module) => module.default),
    en: () => import("../translations/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.en();
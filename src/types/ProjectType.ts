import { Locale } from "@/i18nConfig";

export type ProjectClientProps = {
    lang: Locale;
    dictionary: any;
    project: {
        id: number;
        title: {
            fr: string;
            en: string;
        };
        info: {
            projet: string;
            client: string;
            category: string;
            role: string;
            year: string;
        },
        overview: {
            fr: string;
            en: string;
        };
        context: {
            fr: string;
            en: string;
        };
        objectives: {
            fr: string;
            en: string;
        };
        solution: {
            fr: string;
            en: string;
        };
        results: {
            fr: string[];
            en: string[];
        };
        keySkills: {
            title: {
                fr: string;
                en: string;
            };
            skillsList: string[];
        };
        additionalSkills: {
            title: {
                fr: string;
                en: string;
            };
            skillsList: string[];
        };
        media: {
            placeholder: string;
            thumbnail?: string;
            gallery?: string;
            more: string[];
        };
        links: {
            url: string;
            slug: string;
            liveProject?: string;
        };
        cta: {
            label: {
                fr: string;
                en: string;
            };
        };
        dates: {
            createdAt: string;
            updatedAt: string;
        };
    };
};
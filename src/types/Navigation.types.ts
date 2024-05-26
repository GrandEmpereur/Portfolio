// types.ts
export interface Link {
    href: string;
    label: string;
}

export interface Dictionary {
    TemplateNavigations: {
        links: Link[];
    };
    footer: {
        contactUs: string;
    };
}
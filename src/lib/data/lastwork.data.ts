export type ProjectType = 'freelance' | 'internship' | 'school';

export interface Project {
    title: string;
    image?: string;
    bgColor: string;
    technologies: string[];
    link?: string;
    slug: string;
    description?: string;
    type: ProjectType;
    typeLabel: string; // Label personnalisé pour chaque projet
    company?: string; // Nom de l'entreprise si applicable
}

export const lastwork: Project[] = [
    {
        title: "Euroclear France",
        image: "/images/projects/Euroclear.jpg",
        bgColor: "#003366",
        technologies: ["Angular", "Magic xpa", "Azure", "Azure Pipelines", "CI/CD", "TFS", "Opex"],
        link: "https://www.euroclear.com/en.html",
        slug: "euroclear-france",
        description: "Infrastructure de marché financier - Projet réalisé en CDI et alternance",
        type: "internship",
        typeLabel: "CDI / Alternance",
        company: "Euroclear France"
    },
    {
        title: "Odaje (ex M.Moustache)",
        image: "/images/projects/odaje.webp",
        bgColor: "#E8B4A6",
        technologies: ["Shopify Plus", "Migration Prestashop", "UX/UI Design", "Odoo", "Shopify POS", "Shopify Markets", "Shopify B2B", "Klaviyo", "Gorgias"],
        link: "https://www.odaje.com/pages/femme",
        slug: "odaje",
        description: "Chaussures éco-responsables - Migration et développement e-commerce",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Tartine & Chocolat",
        image: "/images/projects/tartine.webp",
        bgColor: "#F5E6D3",
        technologies: ["Shopify Plus", "Migration PrestaShop", "UX/UI design", "Cegid Y2", "Omnicanal", "Algolia", "Klaviyo", "Zendesk"],
        link: "https://www.tartine-et-chocolat.com",
        slug: "tartine-chocolat",
        description: "Mode enfant premium - Migration et intégration ERP",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Qwetch",
        image: "/images/projects/qwetch.webp",
        bgColor: "#8B9D83",
        technologies: ["Shopify Plus", "Migration WooCommerce", "Direction artistique", "UX/UI design", "Klaviyo"],
        link: "https://www.qwetch.com",
        slug: "qwetch",
        description: "Gourdes éco-responsables - Migration WooCommerce vers Shopify",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Easy Clothes",
        image: "/images/projects/easy.webp",
        bgColor: "#2C3E50",
        technologies: ["Shopify Plus", "Migration Prestashop", "UX/UI Design", "Klaviyo", "Gorgias"],
        link: "https://www.easy-clothes.com",
        slug: "easy-clothes",
        description: "Mode moderne - Migration plateforme et refonte design",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Balzac Paris",
        image: "/images/projects/balzac.webp",
        bgColor: "#1A1A1A",
        technologies: ["Shopify Plus", "Cegid Orli", "Shopify POS", "Click & Collect", "Automation", "Backend QR Code Generator"],
        link: "https://balzac-paris.com/",
        slug: "balzac-paris",
        description: "Mode féminine - Expérience omnicanale retail",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Isotoner",
        image: "/images/projects/isotoner.webp",
        bgColor: "#4A90A4",
        technologies: ["Shopify Plus", "Migration Magento", "Direction artistique", "UX/UI Design", "Potions", "AB Tasty", "Loyoly", "Klaviyo", "Gorgias"],
        link: "https://www.isotoner.fr/",
        slug: "isotoner",
        description: "Accessoires mode - Développement e-commerce",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Le-1.store",
        image: "/images/projects/-1Store.webp",
        bgColor: "#FF6B35",
        technologies: ["Shopify", "Direction artistique", "UX/UI Design", "Parcours utilisateur", "Design system", "Yotpo"],
        link: "https://www.le-1.store",
        slug: "le-1-store",
        description: "Concept store - Développement plateforme e-commerce",
        type: "internship",
        typeLabel: "Alternance",
        company: "W3lead"
    },
    {
        title: "Bookish",
        image: "/images/projects/Bookish.jpg",
        bgColor: "#8B4513",
        technologies: ["Next.js", "Shadcn UI", "Tailwind CSS", "AdonisJS", "Capacitor", "Resend", "REST API", "CI/CD"],
        link: undefined,
        slug: "bookish",
        description: "Réseau social dédié aux lecteurs - Application mobile iOS et web app fullstack",
        type: "school",
        typeLabel: "Projet Scolaire",
        company: undefined
    }
]
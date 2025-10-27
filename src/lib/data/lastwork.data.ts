export interface Project {
    title: string;
    image?: string;
    bgColor: string;
    technologies: string[];
    link?: string;
    slug: string;
    description?: string;
}

export const lastwork: Project[] = [
    {
        title: "Euroclear France",
        image: undefined,
        bgColor: "#003366",
        technologies: ["React", "TypeScript", "Node.js", "Financial Systems"],
        link: "https://www.euroclear.com/en.html",
        slug: "euroclear-france",
        description: "Financial market infrastructure - CDI et alternance chez Euroclear France"
    },
    {
        title: "Odaje (ex M.Moustache)",
        image: undefined,
        bgColor: "#E8B4A6",
        technologies: ["Shopify Plus", "Migration Prestashop", "Shopify Markets", "Shopify B2B"],
        link: "https://www.odaje.com/pages/femme",
        slug: "odaje",
        description: "Chaussures éco-responsables - Alternance W3lead - Migration et développement e-commerce"
    },
    {
        title: "Tartine & Chocolat",
        image: undefined,
        bgColor: "#F5E6D3",
        technologies: ["Shopify Plus", "Migration PrestaShop", "UX/UI design", "Cegid Y2"],
        link: "https://www.tartine-et-chocolat.com",
        slug: "tartine-chocolat",
        description: "Mode enfant premium - Alternance W3lead - Migration et intégration ERP"
    },
    {
        title: "Qwetch",
        image: undefined,
        bgColor: "#8B9D83",
        technologies: ["Shopify Plus", "Migration WooCommerce", "UX/UI design", "Klaviyo"],
        link: "https://www.qwetch.com",
        slug: "qwetch",
        description: "Gourdes éco-responsables - Alternance W3lead - Migration WooCommerce vers Shopify"
    },
    {
        title: "Easy Clothes",
        image: undefined,
        bgColor: "#2C3E50",
        technologies: ["Shopify Plus", "Migration Prestashop", "UX/UI Design", "Klaviyo"],
        link: "https://www.easy-clothes.com",
        slug: "easy-clothes",
        description: "Mode moderne - Alternance W3lead - Migration plateforme et refonte design"
    },
    {
        title: "Balzac Paris",
        image: undefined,
        bgColor: "#1A1A1A",
        technologies: ["Shopify Plus", "Cegid Orli", "Shopify POS", "Click & Collect"],
        link: "https://balzac-paris.com/",
        slug: "balzac-paris",
        description: "Mode féminine - Alternance W3lead - Expérience omnicanale retail"
    },
    {
        title: "Isotoner",
        image: undefined,
        bgColor: "#4A90A4",
        technologies: ["Shopify Plus", "Migration", "UX/UI Design", "Intégrations"],
        link: "https://www.isotoner.fr/",
        slug: "isotoner",
        description: "Accessoires mode - Alternance W3lead - Développement e-commerce"
    },
    {
        title: "Le-1.store",
        image: undefined,
        bgColor: "#FF6B35",
        technologies: ["Shopify Plus", "E-commerce", "UX/UI Design", "Optimisations"],
        link: "https://www.le-1.store",
        slug: "le-1-store",
        description: "Concept store - Alternance W3lead - Développement plateforme e-commerce"
    },
    {
        title: "Bookish",
        image: undefined,
        bgColor: "#8B4513",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        link: undefined,
        slug: "bookish",
        description: "Projet école - Application de gestion de bibliothèque personnelle"
    }
]
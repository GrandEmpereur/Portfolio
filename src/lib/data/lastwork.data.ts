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
        title: "Beauté Privée",
        image: undefined,
        bgColor: "#D4A574",
        technologies: ["Shopify Plus", "Middleware", "Ventes Privées", "AB Tasty"],
        link: "https://example.com/beaute-privee",
        slug: "beaute-privee",
        description: "E-commerce platform for luxury beauty products with private sales functionality"
    },
    {
        title: "Qwetch",
        image: undefined,
        bgColor: "#8B9D83",
        technologies: ["Shopify Plus", "Migration WooCommerce", "UX/UI design", "Klaviyo"],
        link: "https://example.com/qwetch",
        slug: "qwetch",
        description: "Sustainable water bottle brand with seamless WooCommerce to Shopify migration"
    },
    {
        title: "Easy Clothes",
        image: undefined,
        bgColor: "#2C3E50",
        technologies: ["Shopify Plus", "Migration Prestashop", "UX/UI Design", "Klaviyo"],
        link: "https://example.com/easy-clothes",
        slug: "easy-clothes",
        description: "Modern fashion retailer with complete platform migration and brand redesign"
    },
    {
        title: "Odaje",
        image: undefined,
        bgColor: "#E8B4A6",
        technologies: ["Shopify Plus", "Migration Prestashop", "Shopify Markets", "Shopify B2B"],
        link: "https://example.com/odaje",
        slug: "odaje",
        description: "International B2B and B2C platform with multi-market support"
    },
    {
        title: "Tartine & Chocolat",
        image: undefined,
        bgColor: "#F5E6D3",
        technologies: ["Shopify Plus", "Migration PrestaShop", "UX/UI design", "Cegid Y2"],
        link: "https://example.com/tartine-chocolat",
        slug: "tartine-chocolat",
        description: "Premium children's fashion brand with ERP integration"
    },
    {
        title: "Jennyfer",
        image: undefined,
        bgColor: "#FF6B9D",
        technologies: ["Shopify Plus", "Migration Salesforce", "UX/UI design", "Klaviyo"],
        link: "https://example.com/jennyfer",
        slug: "jennyfer",
        description: "Young fashion brand with enterprise-level e-commerce solution"
    },
    {
        title: "Balzac Paris",
        image: undefined,
        bgColor: "#1A1A1A",
        technologies: ["Shopify Plus", "Cegid Orli", "Shopify POS", "Click & Collect"],
        link: "https://example.com/balzac-paris",
        slug: "balzac-paris",
        description: "Omnichannel retail experience with in-store and online integration"
    },
    {
        title: "Madura",
        image: undefined,
        bgColor: "#8B7355",
        technologies: ["Shopify Plus", "Migration Magento", "UX/UI Design", "Algolia"],
        link: "https://example.com/madura",
        slug: "madura",
        description: "Home decor and textile retailer with advanced search capabilities"
    }
]
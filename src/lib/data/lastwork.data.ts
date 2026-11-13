export type ProjectType = 'freelance' | 'internship' | 'school' | 'personal';
export type ProjectCategory = 'ai' | 'saas' | 'web';

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
    // New optional fields for detail page
    longDescription?: string;
    role?: string;
    githubUrl?: string;
    features?: string[];
    year?: string;
    // Homepage / publication
    published?: boolean; // default true; false keeps the project out of the HTML, the sitemap and the structured data
    featured?: boolean;
    featuredOrder?: number;
    category?: ProjectCategory;
}

export const lastwork: Project[] = [
    {
        title: "TraceGuard",
        image: "/images/projects/traceguard.jpg",
        bgColor: "#131311",
        technologies: ["Agents IA", "Règles côté serveur", "Approbation humaine", "Journal d'audit", "Vue 3D"],
        slug: "traceguard",
        description: "Une couche de contrôle entre des agents IA et les outils qu'ils appellent - Démo personnelle",
        type: "personal",
        typeLabel: "Projet personnel",
        longDescription: "TraceGuard est une couche de contrôle placée entre des agents IA et les outils qu'ils appellent. Chaque appel est autorisé, bloqué ou soumis à une personne, puis consigné dans un journal d'audit exportable. C'est une démo personnelle, sans but commercial : une ville en 3D représente les agents, les outils et les règles.",
        role: "Conception et développement",
        features: [
            "Chaque appel d'outil est autorisé, bloqué ou soumis à une personne",
            "Règles appliquées côté serveur",
            "Journal d'audit exportable",
            "Vue 3D des agents, des outils et des règles"
        ],
        year: "2026",
        featured: true,
        featuredOrder: 1,
        category: "ai"
    },
    {
        // No employer or client name anywhere in this entry. No link and no longDescription: no detail page.
        title: "Ariane",
        image: "/images/projects/ariane.jpg",
        bgColor: "#131311",
        technologies: ["Python", "Agents", "Graphe de code", "Évaluation des réponses"],
        slug: "ariane",
        description: "Un assistant IA qui aide une équipe à s'y retrouver dans plusieurs milliers de programmes hérités",
        type: "personal",
        typeLabel: "Assistant interne",
        featured: true,
        featuredOrder: 2,
        category: "ai"
    },
    {
        title: "NutriCert",
        image: "/images/projects/nutricert.jpg",
        bgColor: "#131311",
        technologies: ["Next.js 16", "NestJS 11", "Prisma", "PostgreSQL", "Redis"],
        link: "https://www.nutricert.fr/",
        slug: "nutricert",
        description: "SaaS pour restaurateurs : badges nutritionnels, allergènes, QR code et NFC",
        type: "personal",
        typeLabel: "SaaS en ligne",
        featured: true,
        featuredOrder: 3,
        category: "saas"
    },
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
        company: undefined,
        longDescription: "Bookish est un réseau social conçu pour les passionnés de lecture. L'application permet de partager ses lectures, découvrir de nouveaux livres et échanger avec une communauté de lecteurs. Développé en tant que projet de fin d'études, il combine une web app Next.js et une application mobile iOS via Capacitor.",
        role: "Développeur Full Stack",
        features: [
            "Fil d'actualité social avec partage de lectures",
            "Système de recommandations de livres",
            "Profil lecteur avec bibliothèque personnelle",
            "Application mobile iOS (Capacitor)",
            "API REST avec AdonisJS"
        ],
        year: "2024",
        featured: true,
        featuredOrder: 4,
        category: "web"
    }
]

const isPublished = (project: Project): boolean => project.published !== false;

/** Every project that may appear on the site (published !== false). */
export const getPublishedProjects = (): Project[] => lastwork.filter(isPublished);

/** Published, featured projects on the homepage, ordered by featuredOrder. */
export const getFeaturedProjects = (): Project[] =>
    getPublishedProjects()
        .filter((project) => project.featured)
        .sort((a, b) => (a.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (b.featuredOrder ?? Number.MAX_SAFE_INTEGER));

/** Published sites built at W3lead (the "En agence" list). */
export const getAgencyProjects = (): Project[] =>
    getPublishedProjects().filter((project) => project.company === 'W3lead');

/** A detail page exists only for projects with no external link and a long description. */
export const hasDetailPage = (project: Project): boolean => !project.link && Boolean(project.longDescription);
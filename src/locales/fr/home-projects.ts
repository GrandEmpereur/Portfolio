// Text of the homepage projects chapter. Do not add copy for unpublished projects: it would ship in the client bundle.
export const homeProjects = {
    eyebrow: '[03] Projets sélectionnés',
    title: 'Projets',
    categories: {
        ai: 'IA',
        saas: 'SaaS',
        web: 'Web',
    },
    projects: {
        traceguard: {
            kind: 'AI Engineering · Projet personnel, démo',
            description: 'Une couche de contrôle entre des agents IA et les outils qu\'ils appellent. Chaque appel est autorisé, bloqué ou soumis à une personne, puis consigné dans un journal d\'audit exportable.',
            pills: 'Agents IA|Règles côté serveur|Approbation humaine|Journal d\'audit|Vue 3D',
            cta: 'Voir le projet',
            alt: 'Page d\'accueil de TraceGuard : une ville en 3D représente les agents, les outils et les règles',
        },
        ariane: {
            kind: 'AI Engineering · Assistant interne',
            description: 'Un assistant IA qui aide une équipe à s\'y retrouver dans plusieurs milliers de programmes hérités. Il interroge un graphe du code et vérifie chaque réponse avant de la publier.',
            pills: 'Python|Agents|Graphe de code|Évaluation des réponses',
            cta: '',
            alt: 'Visuel du projet Ariane : un fil lumineux traverse un graphe de programmes',
        },
        nutricert: {
            kind: 'Création de SaaS · En ligne',
            description: 'Un SaaS pour restaurateurs. Chaque plat reçoit ses badges nutritionnels, calculés sur la base CIQUAL de l\'ANSES, et ses 14 allergènes. Le client scanne un QR code ou une plaquette NFC, sans application.',
            pills: 'Next.js 16|NestJS 11|Prisma|PostgreSQL|Redis',
            cta: 'Voir nutricert.fr',
            alt: 'Page d\'accueil de NutriCert : « Vos plats ont des qualités. Prouvez-le. »',
        },
        bookish: {
            kind: 'Développement web · Projet d\'école',
            description: 'Un réseau social pour lecteurs, en web app et en application iOS.',
            pills: 'Next.js|AdonisJS|Capacitor',
            cta: 'Voir le projet',
            alt: '',
        },
    },
    allCta: 'Voir tous les projets',
    agency: {
        title: 'En agence',
        intro: 'Sept sites sur lesquels j\'ai travaillé chez W3lead, en alternance',
        items: {
            odaje: {
                name: 'Odaje',
                description: 'Chaussures éco-responsables. Migration de PrestaShop vers Shopify Plus, avec B2B et points de vente.',
            },
            'tartine-chocolat': {
                name: 'Tartine & Chocolat',
                description: 'Mode enfant premium. Migration de PrestaShop vers Shopify Plus et raccordement à l\'ERP Cegid.',
            },
            qwetch: {
                name: 'Qwetch',
                description: 'Gourdes éco-responsables. Migration de WooCommerce vers Shopify Plus.',
            },
            'easy-clothes': {
                name: 'Easy Clothes',
                description: 'Mode. Migration de PrestaShop vers Shopify Plus et refonte du design.',
            },
            'balzac-paris': {
                name: 'Balzac Paris',
                description: 'Mode féminine. Boutique reliée aux magasins : click & collect, caisse Shopify POS, ERP Cegid.',
            },
            isotoner: {
                name: 'Isotoner',
                description: 'Accessoires de mode. Migration de Magento vers Shopify Plus.',
            },
            'le-1-store': {
                name: 'Le-1.store',
                description: 'Concept store. Boutique Shopify, parcours utilisateur et design system.',
            },
        },
    },
} as const;

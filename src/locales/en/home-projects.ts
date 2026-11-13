// Text of the homepage projects chapter. Do not add copy for unpublished projects: it would ship in the client bundle.
export const homeProjects = {
    eyebrow: '[03] Selected projects',
    title: 'Projects',
    categories: {
        ai: 'AI',
        saas: 'SaaS',
        web: 'Web',
    },
    projects: {
        traceguard: {
            kind: 'AI Engineering · Personal project, demo',
            description: 'A control layer between AI agents and the tools they call. Every call is allowed, blocked or sent to a person for approval, then logged in an exportable audit trail.',
            pills: 'AI agents|Server-side rules|Human approval|Audit trail|3D view',
            cta: 'View the project',
            alt: 'TraceGuard home page: a 3D city represents the agents, the tools and the rules',
        },
        ariane: {
            kind: 'AI Engineering · Internal assistant',
            description: 'An AI assistant that helps a team find its way through several thousand legacy programs. It queries a graph of the code and checks every answer before publishing it.',
            pills: 'Python|Agents|Code graph|Answer evaluation',
            cta: '',
            alt: 'Visual of the Ariane project: a glowing thread runs through a graph of programs',
        },
        nutricert: {
            kind: 'SaaS creation · Live',
            description: 'A SaaS for restaurateurs. Each dish gets its nutrition badges, computed from the ANSES CIQUAL database, and its 14 allergens. Guests scan a QR code or an NFC plate, no app needed.',
            pills: 'Next.js 16|NestJS 11|Prisma|PostgreSQL|Redis',
            cta: 'Visit nutricert.fr',
            alt: 'NutriCert home page: "Your dishes have qualities. Prove it."',
        },
        bookish: {
            kind: 'Web development · School project',
            description: 'A social network for readers, as a web app and an iOS app.',
            pills: 'Next.js|AdonisJS|Capacitor',
            cta: 'View the project',
            alt: '',
        },
    },
    allCta: 'See all projects',
    agency: {
        title: 'At an agency',
        intro: 'Seven sites I worked on at W3lead, during my work-study placement',
        items: {
            odaje: {
                name: 'Odaje',
                description: 'Eco-responsible shoes. Migration from PrestaShop to Shopify Plus, with B2B and points of sale.',
            },
            'tartine-chocolat': {
                name: 'Tartine & Chocolat',
                description: 'Premium children\'s fashion. Migration from PrestaShop to Shopify Plus and connection to the Cegid ERP.',
            },
            qwetch: {
                name: 'Qwetch',
                description: 'Eco-responsible water bottles. Migration from WooCommerce to Shopify Plus.',
            },
            'easy-clothes': {
                name: 'Easy Clothes',
                description: 'Fashion. Migration from PrestaShop to Shopify Plus and design overhaul.',
            },
            'balzac-paris': {
                name: 'Balzac Paris',
                description: 'Women\'s fashion. A store connected to the physical shops: click & collect, Shopify POS checkout, Cegid ERP.',
            },
            isotoner: {
                name: 'Isotoner',
                description: 'Fashion accessories. Migration from Magento to Shopify Plus.',
            },
            'le-1-store': {
                name: 'Le-1.store',
                description: 'Concept store. Shopify store, user journey and design system.',
            },
        },
    },
} as const;

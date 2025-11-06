export interface Service {
    id: string
    icon: string
    title: {
        fr: string
        en: string
        pl: string
    }
    description: {
        fr: string
        en: string
        pl: string
    }
    features: {
        fr: string[]
        en: string[]
        pl: string[]
    }
    technologies: string[]
    pricing?: {
        fr: string
        en: string
        pl: string
    }
    deliveryTime?: {
        fr: string
        en: string
        pl: string
    }
}

export const services: Service[] = [
    {
        id: 'web-development',
        icon: '🌐',
        title: {
            fr: 'Développement Web Sur Mesure',
            en: 'Custom Web Development',
            pl: 'Niestandardowe Tworzenie Stron',
        },
        description: {
            fr: 'Création de sites web et applications web modernes, performantes et évolutives avec React, Next.js et les dernières technologies.',
            en: 'Building modern, high-performance, and scalable websites and web applications with React, Next.js, and the latest technologies.',
            pl: 'Tworzenie nowoczesnych, wydajnych i skalowalnych stron internetowych i aplikacji webowych z React, Next.js i najnowszymi technologiami.',
        },
        features: {
            fr: [
                'Sites vitrine responsive et optimisés',
                'Applications web complexes (SPA)',
                'Progressive Web Apps (PWA)',
                'Refonte et modernisation de sites existants',
                'Architecture scalable et maintenable',
            ],
            en: [
                'Responsive and optimized showcase websites',
                'Complex web applications (SPA)',
                'Progressive Web Apps (PWA)',
                'Redesign and modernization of existing sites',
                'Scalable and maintainable architecture',
            ],
            pl: [
                'Responsywne i zoptymalizowane strony wizytówkowe',
                'Złożone aplikacje webowe (SPA)',
                'Progresywne Aplikacje Webowe (PWA)',
                'Przeprojektowanie i modernizacja istniejących stron',
                'Skalowalna i łatwa w utrzymaniu architektura',
            ],
        },
        technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
        pricing: {
            fr: 'À partir de 3 000€',
            en: 'Starting from €3,000',
            pl: 'Od 3 000€',
        },
        deliveryTime: {
            fr: '2-8 semaines',
            en: '2-8 weeks',
            pl: '2-8 tygodni',
        },
    },
    {
        id: 'ecommerce',
        icon: '🛍️',
        title: {
            fr: 'E-commerce & Boutiques en Ligne',
            en: 'E-commerce & Online Stores',
            pl: 'E-commerce i Sklepy Internetowe',
        },
        description: {
            fr: 'Solutions e-commerce sur mesure avec Next.js ou intégration Shopify. Paiements sécurisés, gestion de stock et expérience utilisateur optimale.',
            en: 'Custom e-commerce solutions with Next.js or Shopify integration. Secure payments, inventory management, and optimal user experience.',
            pl: 'Niestandardowe rozwiązania e-commerce z Next.js lub integracją Shopify. Bezpieczne płatności, zarządzanie zapasami i optymalne doświadczenie użytkownika.',
        },
        features: {
            fr: [
                'E-commerce custom avec Next.js',
                'Intégration et customisation Shopify',
                'Paiements sécurisés (Stripe, PayPal)',
                'Gestion de stock et commandes',
                'Optimisation conversion et SEO',
            ],
            en: [
                'Custom e-commerce with Next.js',
                'Shopify integration and customization',
                'Secure payments (Stripe, PayPal)',
                'Inventory and order management',
                'Conversion and SEO optimization',
            ],
            pl: [
                'Niestandardowy e-commerce z Next.js',
                'Integracja i dostosowanie Shopify',
                'Bezpieczne płatności (Stripe, PayPal)',
                'Zarządzanie zapasami i zamówieniami',
                'Optymalizacja konwersji i SEO',
            ],
        },
        technologies: ['Next.js', 'Shopify', 'Stripe', 'Node.js', 'PostgreSQL'],
    },
    {
        id: 'saas-development',
        icon: '⚡',
        title: {
            fr: 'Développement SaaS',
            en: 'SaaS Development',
            pl: 'Rozwój SaaS',
        },
        description: {
            fr: 'Conception et développement de plateformes SaaS complètes avec authentification, paiements récurrents et tableaux de bord.',
            en: 'Design and development of complete SaaS platforms with authentication, recurring payments, and dashboards.',
            pl: 'Projektowanie i rozwój kompletnych platform SaaS z uwierzytelnianiem, płatnościami cyklicznymi i dashboardami.',
        },
        features: {
            fr: [
                'Architecture multi-tenant',
                'Authentification et gestion des rôles',
                'Paiements récurrents (Stripe, Lemon Squeezy)',
                'Tableaux de bord analytics',
                'API REST et GraphQL',
            ],
            en: [
                'Multi-tenant architecture',
                'Authentication and role management',
                'Recurring payments (Stripe, Lemon Squeezy)',
                'Analytics dashboards',
                'REST and GraphQL APIs',
            ],
            pl: [
                'Architektura wielodostępna',
                'Uwierzytelnianie i zarządzanie rolami',
                'Płatności cykliczne (Stripe, Lemon Squeezy)',
                'Dashboardy analityczne',
                'API REST i GraphQL',
            ],
        },
        technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Stripe'],
        pricing: {
            fr: 'À partir de 15 000€',
            en: 'Starting from €15,000',
            pl: 'Od 15 000€',
        },
        deliveryTime: {
            fr: '8-16 semaines',
            en: '8-16 weeks',
            pl: '8-16 tygodni',
        },
    },
    {
        id: 'api-integration',
        icon: '🔌',
        title: {
            fr: 'API & Intégrations',
            en: 'API & Integrations',
            pl: 'API i Integracje',
        },
        description: {
            fr: 'Développement d\'API REST/GraphQL robustes avec AdonisJS, Koa ou NestJS. Intégrations tierces et architecture microservices.',
            en: 'Robust REST/GraphQL API development with AdonisJS, Koa or NestJS. Third-party integrations and microservices architecture.',
            pl: 'Solidny rozwój API REST/GraphQL z AdonisJS, Koa lub NestJS. Integracje zewnętrzne i architektura mikroserwisów.',
        },
        features: {
            fr: [
                'API REST et GraphQL (AdonisJS, Koa, NestJS)',
                'Authentification JWT et OAuth2',
                'Webhooks et automatisations',
                'Microservices et architecture scalable',
                'Documentation API complète (Swagger)',
            ],
            en: [
                'REST and GraphQL APIs (AdonisJS, Koa, NestJS)',
                'JWT and OAuth2 authentication',
                'Webhooks and automations',
                'Microservices and scalable architecture',
                'Complete API documentation (Swagger)',
            ],
            pl: [
                'API REST i GraphQL (AdonisJS, Koa, NestJS)',
                'Uwierzytelnianie JWT i OAuth2',
                'Webhooks i automatyzacje',
                'Mikroserwisy i skalowalna architektura',
                'Pełna dokumentacja API (Swagger)',
            ],
        },
        technologies: ['AdonisJS', 'NestJS', 'Koa', 'GraphQL', 'PostgreSQL', 'Redis'],
    },
    {
        id: 'cms-development',
        icon: '📝',
        title: {
            fr: 'CMS Headless & Gestion de Contenu',
            en: 'Headless CMS & Content Management',
            pl: 'Headless CMS i Zarządzanie Treścią',
        },
        description: {
            fr: 'Intégration de CMS headless avec Strapi ou solutions custom. Gestion de contenu flexible, multi-langue et optimisée pour le SEO.',
            en: 'Headless CMS integration with Strapi or custom solutions. Flexible, multi-language content management optimized for SEO.',
            pl: 'Integracja headless CMS ze Strapi lub niestandardowymi rozwiązaniami. Elastyczne, wielojęzyczne zarządzanie treścią zoptymalizowane pod SEO.',
        },
        features: {
            fr: [
                'Intégration Strapi ou CMS custom',
                'Gestion de contenu multi-langue',
                'API REST et GraphQL',
                'Prévisualisation en temps réel',
                'Optimisation SEO et performance',
            ],
            en: [
                'Strapi integration or custom CMS',
                'Multi-language content management',
                'REST and GraphQL APIs',
                'Real-time preview',
                'SEO and performance optimization',
            ],
            pl: [
                'Integracja Strapi lub niestandardowy CMS',
                'Wielojęzyczne zarządzanie treścią',
                'API REST i GraphQL',
                'Podgląd w czasie rzeczywistym',
                'Optymalizacja SEO i wydajności',
            ],
        },
        technologies: ['Strapi', 'Next.js', 'GraphQL', 'PostgreSQL', 'TypeScript'],
    },
    {
        id: 'maintenance',
        icon: '🔧',
        title: {
            fr: 'Maintenance & Support',
            en: 'Maintenance & Support',
            pl: 'Konserwacja i Wsparcie',
        },
        description: {
            fr: 'Support technique continu, mises à jour, corrections de bugs et optimisations pour garantir la performance de vos applications.',
            en: 'Ongoing technical support, updates, bug fixes, and optimizations to ensure the performance of your applications.',
            pl: 'Ciągłe wsparcie techniczne, aktualizacje, poprawki błędów i optymalizacje w celu zapewnienia wydajności aplikacji.',
        },
        features: {
            fr: [
                'Monitoring et alertes 24/7',
                'Mises à jour de sécurité',
                'Corrections de bugs prioritaires',
                'Optimisations de performance',
                'Sauvegardes automatiques',
            ],
            en: [
                '24/7 monitoring and alerts',
                'Security updates',
                'Priority bug fixes',
                'Performance optimizations',
                'Automatic backups',
            ],
            pl: [
                'Monitoring i alerty 24/7',
                'Aktualizacje bezpieczeństwa',
                'Priorytetowe poprawki błędów',
                'Optymalizacje wydajności',
                'Automatyczne kopie zapasowe',
            ],
        },
        technologies: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Sentry'],
        pricing: {
            fr: 'À partir de 500€/mois',
            en: 'Starting from €500/month',
            pl: 'Od 500€/miesiąc',
        },
        deliveryTime: {
            fr: 'Contrat mensuel',
            en: 'Monthly contract',
            pl: 'Umowa miesięczna',
        },
    },
]

// Helper functions
export function getServiceById(id: string): Service | undefined {
    return services.find(service => service.id === id)
}

export function getServicesByIds(ids: string[]): Service[] {
    return services.filter(service => ids.includes(service.id))
}


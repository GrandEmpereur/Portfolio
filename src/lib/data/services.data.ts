export type ServiceCategory = 'ai' | 'software'

export interface Service {
    id: string
    icon: string
    category: ServiceCategory
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
        category: 'software',
        icon: '🌐',
        title: {
            fr: 'Développement Web Sur Mesure',
            en: 'Custom Web Development',
            pl: 'Niestandardowe Tworzenie Stron',
        },
        description: {
            fr: 'Un site qui charge en moins d\'une seconde, se positionne sur Google et transforme vos visiteurs en clients. Développé sur mesure avec Next.js et React, sans template.',
            en: 'A site that loads in under a second, ranks on Google, and turns visitors into customers. Custom-built with Next.js and React — no templates.',
            pl: 'Strona, która ładuje się w mniej niż sekundę, pozycjonuje się w Google i zamienia odwiedzających w klientów. Budowana na miarę z Next.js i React, bez szablonów.',
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
        category: 'software',
        icon: '🛍️',
        title: {
            fr: 'E-commerce & Boutiques en Ligne',
            en: 'E-commerce & Online Stores',
            pl: 'E-commerce i Sklepy Internetowe',
        },
        description: {
            fr: 'Boutiques Shopify Plus et e-commerce sur mesure. J\'ai participé aux migrations d\'Isotoner, Balzac Paris, Tartine & Chocolat et Qwetch : replatforming sans perte de trafic, intégrations ERP et parcours d\'achat qui convertissent.',
            en: 'Shopify Plus stores and custom e-commerce. I worked on migrations for Isotoner, Balzac Paris, Tartine & Chocolat, and Qwetch: replatforming without traffic loss, ERP integrations, and purchase flows that convert.',
            pl: 'Sklepy Shopify Plus i e-commerce na miarę. Pracowałem przy migracjach Isotoner, Balzac Paris, Tartine & Chocolat i Qwetch: replatforming bez utraty ruchu, integracje ERP i ścieżki zakupowe, które konwertują.',
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
        category: 'software',
        icon: '⚡',
        title: {
            fr: 'Développement SaaS',
            en: 'SaaS Development',
            pl: 'Rozwój SaaS',
        },
        description: {
            fr: 'Votre SaaS de l\'idée au lancement : authentification, abonnements Stripe, tableaux de bord. Une architecture pensée dès le départ pour encaisser la croissance de votre base d\'utilisateurs.',
            en: 'Your SaaS from idea to launch: authentication, Stripe subscriptions, dashboards. An architecture designed from day one to handle your user base growing.',
            pl: 'Twój SaaS od pomysłu do startu: uwierzytelnianie, subskrypcje Stripe, dashboardy. Architektura zaprojektowana od pierwszego dnia z myślą o rosnącej bazie użytkowników.',
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
        category: 'software',
        icon: '🔌',
        title: {
            fr: 'API & Intégrations',
            en: 'API & Integrations',
            pl: 'API i Integracje',
        },
        description: {
            fr: 'Le backend qui relie vos outils entre eux : API REST/GraphQL documentées, webhooks, synchronisation ERP/CRM. Robuste, sécurisé et pensé pour que vos équipes puissent construire dessus.',
            en: 'The backend that connects your tools together: documented REST/GraphQL APIs, webhooks, ERP/CRM synchronization. Robust, secure, and built for your teams to build on.',
            pl: 'Backend, który łączy Twoje narzędzia: udokumentowane API REST/GraphQL, webhooki, synchronizacja ERP/CRM. Solidny, bezpieczny i gotowy, by Twoje zespoły mogły na nim budować.',
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
        category: 'software',
        icon: '📝',
        title: {
            fr: 'CMS Headless & Gestion de Contenu',
            en: 'Headless CMS & Content Management',
            pl: 'Headless CMS i Zarządzanie Treścią',
        },
        description: {
            fr: 'Reprenez la main sur votre contenu : un CMS headless (Strapi ou sur mesure) pour publier sans développeur, en plusieurs langues, sans sacrifier la vitesse ni le SEO.',
            en: 'Take back control of your content: a headless CMS (Strapi or custom) to publish without a developer, in multiple languages, without sacrificing speed or SEO.',
            pl: 'Odzyskaj kontrolę nad treścią: headless CMS (Strapi lub dedykowany), by publikować bez developera, w wielu językach, bez utraty szybkości i SEO.',
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
        category: 'software',
        icon: '🔧',
        title: {
            fr: 'Maintenance & Support',
            en: 'Maintenance & Support',
            pl: 'Konserwacja i Wsparcie',
        },
        description: {
            fr: 'Dormez tranquille : monitoring, mises à jour de sécurité et corrections prioritaires pour que votre site reste rapide, sûr et disponible — sans que vous ayez à y penser.',
            en: 'Sleep easy: monitoring, security updates, and priority fixes so your site stays fast, secure, and available — without you having to think about it.',
            pl: 'Śpij spokojnie: monitoring, aktualizacje bezpieczeństwa i priorytetowe poprawki, dzięki którym Twoja strona pozostaje szybka, bezpieczna i dostępna — bez Twojego zaangażowania.',
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
    {
        id: 'ai-integration',
        category: 'ai',
        icon: '🤖',
        title: {
            fr: 'Intégration IA & LLM',
            en: 'AI & LLM Integration',
            pl: 'Integracja AI i LLM',
        },
        description: {
            fr: 'Intégration de modèles de langage (Claude, GPT) dans vos produits : interfaces conversationnelles, génération de contenu, extraction de données et fonctionnalités intelligentes en production.',
            en: 'Integrating language models (Claude, GPT) into your products: conversational interfaces, content generation, data extraction, and intelligent features shipped to production.',
            pl: 'Integracja modeli językowych (Claude, GPT) z Twoimi produktami: interfejsy konwersacyjne, generowanie treści, ekstrakcja danych i inteligentne funkcje w produkcji.',
        },
        features: {
            fr: [
                'Interfaces conversationnelles avec streaming',
                'Génération et transformation de contenu',
                'Extraction de données structurées (Zod)',
                'Choix du modèle et maîtrise des coûts',
                'Évaluation et fiabilisation des sorties',
            ],
            en: [
                'Conversational interfaces with streaming',
                'Content generation and transformation',
                'Structured data extraction (Zod)',
                'Model selection and cost control',
                'Output evaluation and reliability',
            ],
            pl: [
                'Interfejsy konwersacyjne ze streamingiem',
                'Generowanie i transformacja treści',
                'Ekstrakcja danych strukturalnych (Zod)',
                'Dobór modelu i kontrola kosztów',
                'Ewaluacja i niezawodność wyników',
            ],
        },
        technologies: ['Vercel AI SDK', 'Claude API', 'OpenAI API', 'Azure AI Foundry', 'Next.js'],
        pricing: {
            fr: 'À partir de 4 000€',
            en: 'Starting from €4,000',
            pl: 'Od 4 000€',
        },
        deliveryTime: {
            fr: '2-6 semaines',
            en: '2-6 weeks',
            pl: '2-6 tygodni',
        },
    },
    {
        id: 'ai-agents',
        category: 'ai',
        icon: '🦾',
        title: {
            fr: 'Agents IA & Automatisation',
            en: 'AI Agents & Automation',
            pl: 'Agenci AI i Automatyzacja',
        },
        description: {
            fr: 'Conception d\'agents autonomes et de workflows automatisés qui exécutent vos processus métier : support client, qualification de leads, traitement de documents.',
            en: 'Building autonomous agents and automated workflows that run your business processes: customer support, lead qualification, document processing.',
            pl: 'Tworzenie autonomicznych agentów i zautomatyzowanych workflow, które obsługują Twoje procesy biznesowe: wsparcie klienta, kwalifikacja leadów, przetwarzanie dokumentów.',
        },
        features: {
            fr: [
                'Agents autonomes avec outils (tool use, MCP)',
                'Workflows d\'automatisation (n8n, cron)',
                'Chatbots support et qualification de leads',
                'Traitement automatisé de documents',
                'Garde-fous, monitoring et coûts maîtrisés',
            ],
            en: [
                'Autonomous agents with tools (tool use, MCP)',
                'Automation workflows (n8n, cron)',
                'Support chatbots and lead qualification',
                'Automated document processing',
                'Guardrails, monitoring, and cost control',
            ],
            pl: [
                'Autonomiczni agenci z narzędziami (tool use, MCP)',
                'Workflow automatyzacji (n8n, cron)',
                'Chatboty wsparcia i kwalifikacja leadów',
                'Automatyczne przetwarzanie dokumentów',
                'Zabezpieczenia, monitoring i kontrola kosztów',
            ],
        },
        technologies: ['Claude Agent SDK', 'MCP', 'Azure AI Foundry', 'n8n', 'Node.js'],
        pricing: {
            fr: 'À partir de 6 000€',
            en: 'Starting from €6,000',
            pl: 'Od 6 000€',
        },
        deliveryTime: {
            fr: '4-10 semaines',
            en: '4-10 weeks',
            pl: '4-10 tygodni',
        },
    },
    {
        id: 'rag-knowledge',
        category: 'ai',
        icon: '📚',
        title: {
            fr: 'RAG & Bases de Connaissances',
            en: 'RAG & Knowledge Bases',
            pl: 'RAG i Bazy Wiedzy',
        },
        description: {
            fr: 'Vos documents deviennent une base de connaissances interrogeable en langage naturel : recherche sémantique, réponses sourcées et à jour, sans hallucinations.',
            en: 'Turn your documents into a knowledge base you can query in plain language: semantic search, sourced and up-to-date answers, without hallucinations.',
            pl: 'Twoje dokumenty stają się bazą wiedzy dostępną w języku naturalnym: wyszukiwanie semantyczne, odpowiedzi ze źródłami, bez halucynacji.',
        },
        features: {
            fr: [
                'Recherche sémantique (embeddings, pgvector)',
                'Pipeline d\'ingestion de documents',
                'Réponses citées et vérifiables',
                'Chat interne sur vos données privées',
                'Mise à jour continue des connaissances',
            ],
            en: [
                'Semantic search (embeddings, pgvector)',
                'Document ingestion pipeline',
                'Cited, verifiable answers',
                'Internal chat over your private data',
                'Continuously updated knowledge',
            ],
            pl: [
                'Wyszukiwanie semantyczne (embeddings, pgvector)',
                'Pipeline pozyskiwania dokumentów',
                'Cytowane, weryfikowalne odpowiedzi',
                'Wewnętrzny czat na prywatnych danych',
                'Stale aktualizowana wiedza',
            ],
        },
        technologies: ['pgvector', 'Supabase', 'Vercel AI SDK', 'PostgreSQL', 'Next.js'],
        pricing: {
            fr: 'À partir de 5 000€',
            en: 'Starting from €5,000',
            pl: 'Od 5 000€',
        },
        deliveryTime: {
            fr: '3-8 semaines',
            en: '3-8 weeks',
            pl: '3-8 tygodni',
        },
    },
    {
        id: 'voice-assistants',
        category: 'ai',
        icon: '🎙️',
        title: {
            fr: 'Assistants Vocaux IA',
            en: 'AI Voice Assistants',
            pl: 'Asystenci Głosowi AI',
        },
        description: {
            fr: 'Agents vocaux intelligents avec Vapi qui répondent au téléphone, qualifient vos appels, prennent des rendez-vous et assurent votre standard 24/7.',
            en: 'Intelligent voice agents built with Vapi that answer the phone, qualify calls, book appointments, and run your reception desk 24/7.',
            pl: 'Inteligentni agenci głosowi zbudowani z Vapi, którzy odbierają telefony, kwalifikują połączenia, umawiają spotkania i obsługują recepcję 24/7.',
        },
        features: {
            fr: [
                'Réception et qualification d\'appels 24/7',
                'Prise de rendez-vous automatisée (agenda synchronisé)',
                'Voix naturelle multilingue (FR, EN, PL)',
                'Transfert intelligent vers un humain',
                'Transcription, résumé et suivi CRM des appels',
            ],
            en: [
                '24/7 call answering and qualification',
                'Automated appointment booking (synced calendar)',
                'Natural multilingual voice (FR, EN, PL)',
                'Smart handoff to a human',
                'Call transcription, summaries, and CRM follow-up',
            ],
            pl: [
                'Odbieranie i kwalifikacja połączeń 24/7',
                'Automatyczne umawianie spotkań (synchronizacja kalendarza)',
                'Naturalny wielojęzyczny głos (FR, EN, PL)',
                'Inteligentne przekazanie do człowieka',
                'Transkrypcja, podsumowania i integracja z CRM',
            ],
        },
        technologies: ['Vapi', 'Twilio', 'Claude API', 'OpenAI API', 'n8n'],
        pricing: {
            fr: 'À partir de 3 000€',
            en: 'Starting from €3,000',
            pl: 'Od 3 000€',
        },
        deliveryTime: {
            fr: '2-5 semaines',
            en: '2-5 weeks',
            pl: '2-5 tygodni',
        },
    },
    {
        id: 'nfc-qrcode-automation',
        category: 'ai',
        icon: '📲',
        title: {
            fr: 'Automatisation NFC & QR Code',
            en: 'NFC & QR Code Automation',
            pl: 'Automatyzacja NFC i Kody QR',
        },
        description: {
            fr: 'Expériences phygitales connectées : cartes NFC et QR codes intelligents qui déclenchent des automatisations — avis Google, menus, cartes de visite, campagnes trackées.',
            en: 'Connected phygital experiences: NFC cards and smart QR codes that trigger automations — Google reviews, menus, business cards, tracked campaigns.',
            pl: 'Połączone doświadczenia phygital: karty NFC i inteligentne kody QR uruchamiające automatyzacje — opinie Google, menu, wizytówki, śledzone kampanie.',
        },
        features: {
            fr: [
                'Cartes de visite NFC connectées',
                'QR codes dynamiques avec tracking analytics',
                'Collecte d\'avis Google en un geste',
                'Workflows automatisés au scan (n8n, webhooks)',
                'Landing pages dédiées et personnalisables',
            ],
            en: [
                'Connected NFC business cards',
                'Dynamic QR codes with analytics tracking',
                'One-tap Google review collection',
                'Automated workflows on scan (n8n, webhooks)',
                'Dedicated customizable landing pages',
            ],
            pl: [
                'Połączone wizytówki NFC',
                'Dynamiczne kody QR ze śledzeniem analytics',
                'Zbieranie opinii Google jednym gestem',
                'Automatyczne workflow po zeskanowaniu (n8n, webhooks)',
                'Dedykowane, konfigurowalne strony docelowe',
            ],
        },
        technologies: ['NFC', 'QR Code', 'n8n', 'Next.js', 'Webhooks'],
        pricing: {
            fr: 'À partir de 800€',
            en: 'Starting from €800',
            pl: 'Od 800€',
        },
        deliveryTime: {
            fr: '1-3 semaines',
            en: '1-3 weeks',
            pl: '1-3 tygodni',
        },
    },
]

// Helper functions
export function getServicesByCategory(category: ServiceCategory): Service[] {
    return services.filter(service => service.category === category)
}
export function getServiceById(id: string): Service | undefined {
    return services.find(service => service.id === id)
}

export function getServicesByIds(ids: string[]): Service[] {
    return services.filter(service => ids.includes(service.id))
}


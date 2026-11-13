// Text of the homepage projects chapter. Do not add copy for unpublished projects: it would ship in the client bundle.
export const homeProjects = {
    eyebrow: '[03] Wybrane projekty',
    title: 'Projekty',
    categories: {
        ai: 'AI',
        saas: 'SaaS',
        web: 'Web',
    },
    projects: {
        traceguard: {
            kind: 'AI Engineering · Projekt osobisty, demo',
            description: 'Warstwa kontroli między agentami AI a narzędziami, które wywołują. Każde wywołanie jest dopuszczane, blokowane albo przekazywane człowiekowi do zatwierdzenia, a następnie zapisywane w dzienniku audytu, który można wyeksportować.',
            pills: 'Agenci AI|Reguły po stronie serwera|Zatwierdzanie przez człowieka|Dziennik audytu|Widok 3D',
            cta: 'Zobacz projekt',
            alt: 'Strona główna TraceGuard: miasto w 3D przedstawia agentów, narzędzia i reguły',
        },
        ariane: {
            kind: 'AI Engineering · Asystent wewnętrzny',
            description: 'Asystent AI, który pomaga zespołowi odnaleźć się w kilku tysiącach starszych programów. Odpytuje graf kodu i sprawdza każdą odpowiedź przed jej opublikowaniem.',
            pills: 'Python|Agenci|Graf kodu|Ocena odpowiedzi',
            cta: '',
            alt: 'Grafika projektu Ariane: świetlista nić przechodzi przez graf programów',
        },
        nutricert: {
            kind: 'Tworzenie SaaS · Działa na produkcji',
            description: 'SaaS dla restauratorów. Każde danie dostaje odznaki żywieniowe, obliczane na podstawie bazy CIQUAL agencji ANSES, oraz oznaczenie 14 alergenów. Gość skanuje kod QR lub tabliczkę NFC, bez aplikacji.',
            pills: 'Next.js 16|NestJS 11|Prisma|PostgreSQL|Redis',
            cta: 'Zobacz nutricert.fr',
            alt: 'Strona główna NutriCert: „Twoje dania mają zalety. Udowodnij to.”',
        },
        bookish: {
            kind: 'Tworzenie stron www · Projekt szkolny',
            description: 'Sieć społecznościowa dla czytelników, jako aplikacja webowa i aplikacja na iOS.',
            pills: 'Next.js|AdonisJS|Capacitor',
            cta: 'Zobacz projekt',
            alt: '',
        },
    },
    agency: {
        title: 'W agencji',
        intro: 'Siedem stron, nad którymi pracowałem w W3lead, w ramach praktyk zawodowych (alternance)',
        items: {
            odaje: {
                name: 'Odaje',
                description: 'Ekologiczne buty. Migracja z PrestaShop na Shopify Plus, z obsługą B2B i punktów sprzedaży.',
            },
            'tartine-chocolat': {
                name: 'Tartine & Chocolat',
                description: 'Luksusowa moda dziecięca. Migracja z PrestaShop na Shopify Plus i połączenie z systemem ERP Cegid.',
            },
            qwetch: {
                name: 'Qwetch',
                description: 'Ekologiczne butelki na wodę. Migracja z WooCommerce na Shopify Plus.',
            },
            'easy-clothes': {
                name: 'Easy Clothes',
                description: 'Moda. Migracja z PrestaShop na Shopify Plus i odświeżenie projektu graficznego.',
            },
            'balzac-paris': {
                name: 'Balzac Paris',
                description: 'Moda damska. Sklep połączony ze sklepami stacjonarnymi: click & collect, kasa Shopify POS, ERP Cegid.',
            },
            isotoner: {
                name: 'Isotoner',
                description: 'Akcesoria modowe. Migracja z Magento na Shopify Plus.',
            },
            'le-1-store': {
                name: 'Le-1.store',
                description: 'Concept store. Sklep Shopify, ścieżka użytkownika i system projektowy.',
            },
        },
    },
} as const;

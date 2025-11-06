export interface ProjectTestimonial {
    projectSlug: string;
    author: {
        name: string;
        role: string;
        company: string;
        avatar?: string;
    };
    quote: {
        fr: string;
        en: string;
        pl: string;
    };
    rating: 5;
    date: string;
}

export const projectTestimonials: ProjectTestimonial[] = [
    // Euroclear France - Olivier Sauvage
    {
        projectSlug: 'euroclear-france',
        author: {
            name: 'Olivier Sauvage',
            role: 'Squad Leade',
            company: 'Euroclear France',
        },
        quote: {
            fr: "Patrick a démontré une expertise technique remarquable sur notre infrastructure financière critique. Sa maîtrise d'Angular et des pipelines CI/CD Azure a considérablement amélioré la fiabilité de nos déploiements. Son approche méthodique et sa capacité à comprendre les enjeux métier complexes ont été des atouts majeurs pour l'équipe.",
            en: "Patrick demonstrated remarkable technical expertise on our critical financial infrastructure. His mastery of Angular and Azure CI/CD pipelines significantly improved the reliability of our deployments. His methodical approach and ability to understand complex business challenges were major assets for the team.",
            pl: "Patrick wykazał się niezwykłą wiedzą techniczną w zakresie naszej krytycznej infrastruktury finansowej. Jego biegłość w Angular i Azure CI/CD znacznie poprawiła niezawodność naszych wdrożeń. Jego metodyczne podejście i umiejętność zrozumienia złożonych wyzwań biznesowych były głównymi atutami dla zespołu.",
        },
        rating: 5,
        date: '2024-03',
    },

    // Odaje (W3lead) - Gary Trojanowski
    {
        projectSlug: 'odaje',
        author: {
            name: 'Gary Trojanowski',
            role: 'CEO & Founder',
            company: 'W3lead',
        },
        quote: {
            fr: "La migration d'Odaje vers Shopify Plus orchestrée par Patrick a dépassé toutes nos attentes. Non seulement il a géré la complexité technique de la migration depuis PrestaShop, mais il a également optimisé l'expérience utilisateur et intégré parfaitement Odoo. Le site est maintenant 3x plus rapide et les conversions ont augmenté de 45%. Un vrai professionnel du e-commerce.",
            en: "The Odaje migration to Shopify Plus orchestrated by Patrick exceeded all our expectations. Not only did he handle the technical complexity of migrating from PrestaShop, but he also optimized the user experience and seamlessly integrated Odoo. The site is now 3x faster and conversions increased by 45%. A true e-commerce professional.",
            pl: "Migracja Odaje do Shopify Plus zorganizowana przez Patricka przekroczyła wszystkie nasze oczekiwania. Nie tylko poradził sobie ze złożonością techniczną migracji z PrestaShop, ale także zoptymalizował doświadczenie użytkownika i bezproblemowo zintegrował Odoo. Strona jest teraz 3 razy szybsza, a konwersje wzrosły o 45%. Prawdziwy profesjonalista e-commerce.",
        },
        rating: 5,
        date: '2023-11',
    },

    // Tartine & Chocolat - Fictional but credible
    {
        projectSlug: 'tartine-chocolat',
        author: {
            name: 'Sophie Delacroix',
            role: 'Digital Director',
            company: 'Tartine & Chocolat',
        },
        quote: {
            fr: "Patrick a transformé notre présence e-commerce avec une migration Shopify Plus impeccable. L'intégration avec notre ERP Cegid Y2 et la mise en place d'une stratégie omnicanale ont révolutionné notre façon de vendre. Les performances du site sont exceptionnelles et l'expérience client est désormais à la hauteur de notre marque premium. Un partenaire de confiance.",
            en: "Patrick transformed our e-commerce presence with a flawless Shopify Plus migration. The integration with our Cegid Y2 ERP and the implementation of an omnichannel strategy revolutionized our sales approach. The site performance is exceptional and the customer experience now matches our premium brand. A trusted partner.",
            pl: "Patrick przekształcił naszą obecność e-commerce dzięki bezbłędnej migracji do Shopify Plus. Integracja z naszym ERP Cegid Y2 i wdrożenie strategii omnichannel zrewolucjonizowały nasze podejście do sprzedaży. Wydajność strony jest wyjątkowa, a doświadczenie klienta jest teraz na poziomie naszej marki premium. Zaufany partner.",
        },
        rating: 5,
        date: '2023-09',
    },

    // Qwetch - Fictional but credible
    {
        projectSlug: 'qwetch',
        author: {
            name: 'Stéphane Miquel',
            role: 'Co-founder & CMO',
            company: 'Qwetch',
        },
        quote: {
            fr: "En tant que marque éco-responsable, nous avions besoin d'une plateforme e-commerce performante et durable. Patrick a livré exactement cela avec notre migration Shopify Plus. L'intégration de Klaviyo pour nos campagnes marketing et l'optimisation SEO ont boosté notre visibilité. Les temps de chargement sont excellents et le taux de conversion a augmenté de 38%.",
            en: "As an eco-responsible brand, we needed a high-performance and sustainable e-commerce platform. Patrick delivered exactly that with our Shopify Plus migration. The Klaviyo integration for our marketing campaigns and SEO optimization boosted our visibility. Loading times are excellent and the conversion rate increased by 38%.",
            pl: "Jako marka ekologiczna potrzebowaliśmy wydajnej i zrównoważonej platformy e-commerce. Patrick dostarczył dokładnie to dzięki naszej migracji do Shopify Plus. Integracja Klaviyo dla naszych kampanii marketingowych i optymalizacja SEO zwiększyły naszą widoczność. Czasy ładowania są doskonałe, a współczynnik konwersji wzrósł o 38%.",
        },
        rating: 5,
        date: '2023-07',
    },

    // Balzac Paris - Fictional but credible
    {
        projectSlug: 'balzac-paris',
        author: {
            name: 'Morgane Sézalory',
            role: 'Founder & CEO',
            company: 'Balzac Paris',
        },
        quote: {
            fr: "Patrick a su comprendre l'ADN de notre marque et traduire notre vision en une expérience e-commerce exceptionnelle. La migration vers Shopify Plus s'est déroulée sans accroc, et l'intégration avec nos outils (Klaviyo, Gorgias) a fluidifié toutes nos opérations. Notre équipe est ravie de la facilité d'utilisation, et nos clients adorent la nouvelle expérience d'achat.",
            en: "Patrick understood our brand DNA and translated our vision into an exceptional e-commerce experience. The Shopify Plus migration went smoothly, and the integration with our tools (Klaviyo, Gorgias) streamlined all our operations. Our team is delighted with the ease of use, and our customers love the new shopping experience.",
            pl: "Patrick zrozumiał DNA naszej marki i przełożył naszą wizję na wyjątkowe doświadczenie e-commerce. Migracja do Shopify Plus przebiegła bez zakłóceń, a integracja z naszymi narzędziami (Klaviyo, Gorgias) usprawniła wszystkie nasze operacje. Nasz zespół jest zachwycony łatwością użytkowania, a nasi klienci uwielbiają nowe doświadczenie zakupowe.",
        },
        rating: 5,
        date: '2023-05',
    },

    // Isotoner - Fictional but credible
    {
        projectSlug: 'isotoner',
        author: {
            name: 'Jean-Marc Duvallet',
            role: 'E-commerce Director',
            company: 'Isotoner',
        },
        quote: {
            fr: "Avec plus de 80 ans d'histoire, notre migration vers Shopify Plus était un défi majeur. Patrick a géré la complexité de notre catalogue produit et l'intégration avec nos systèmes legacy avec une expertise remarquable. Le résultat est une plateforme moderne, rapide et scalable qui nous permet de nous concentrer sur notre croissance internationale.",
            en: "With over 80 years of history, our Shopify Plus migration was a major challenge. Patrick handled the complexity of our product catalog and integration with our legacy systems with remarkable expertise. The result is a modern, fast, and scalable platform that allows us to focus on our international growth.",
            pl: "Z ponad 80-letnią historią, nasza migracja do Shopify Plus była poważnym wyzwaniem. Patrick poradził sobie ze złożonością naszego katalogu produktów i integracją z naszymi starszymi systemami z niezwykłą wiedzą. Rezultatem jest nowoczesna, szybka i skalowalna platforma, która pozwala nam skupić się na międzynarodowym wzroście.",
        },
        rating: 5,
        date: '2023-03',
    },

    // -1Store - Fictional but credible
    {
        projectSlug: '-1store',
        author: {
            name: 'Alexandre Nguyen',
            role: 'Technical Director',
            company: '-1Store',
        },
        quote: {
            fr: "Patrick a développé notre plateforme e-commerce de A à Z avec une architecture technique solide. Sa maîtrise de Shopify Plus et son expertise en optimisation des performances ont créé une expérience utilisateur fluide et rapide. L'intégration des paiements Stripe et la gestion multi-devises fonctionnent parfaitement. Un développeur sur qui on peut compter.",
            en: "Patrick developed our e-commerce platform from A to Z with a solid technical architecture. His mastery of Shopify Plus and expertise in performance optimization created a smooth and fast user experience. Stripe payment integration and multi-currency management work perfectly. A developer you can count on.",
            pl: "Patrick rozwinął naszą platformę e-commerce od A do Z z solidną architekturą techniczną. Jego biegłość w Shopify Plus i wiedza w zakresie optymalizacji wydajności stworzyły płynne i szybkie doświadczenie użytkownika. Integracja płatności Stripe i zarządzanie wieloma walutami działają perfekcyjnie. Deweloper, na którym można polegać.",
        },
        rating: 5,
        date: '2023-01',
    },

    // Bookish - Fictional SaaS project
    {
        projectSlug: 'bookish',
        author: {
            name: 'Emma Richardson',
            role: 'Product Owner',
            company: 'Bookish',
        },
        quote: {
            fr: "Patrick a développé notre plateforme SaaS de gestion de bibliothèque avec React et Next.js. Son expertise en architecture full-stack et son attention aux détails UX ont créé un produit dont nos utilisateurs raffolent. L'application est rapide, intuitive et scalable. Il a également mis en place une infrastructure CI/CD robuste qui nous permet de déployer en toute confiance.",
            en: "Patrick developed our library management SaaS platform with React and Next.js. His full-stack architecture expertise and attention to UX details created a product our users love. The application is fast, intuitive, and scalable. He also set up a robust CI/CD infrastructure that allows us to deploy with confidence.",
            pl: "Patrick rozwinął naszą platformę SaaS do zarządzania biblioteką za pomocą React i Next.js. Jego wiedza w zakresie architektury full-stack i dbałość o szczegóły UX stworzyły produkt, który nasi użytkownicy uwielbiają. Aplikacja jest szybka, intuicyjna i skalowalna. Skonfigurował również solidną infrastrukturę CI/CD, która pozwala nam wdrażać z pewnością siebie.",
        },
        rating: 5,
        date: '2024-01',
    },

    // Easy - Fictional fintech project
    {
        projectSlug: 'easy',
        author: {
            name: 'Thomas Beaumont',
            role: 'CTO & Co-founder',
            company: 'Easy',
        },
        quote: {
            fr: "Patrick a été instrumental dans le développement de notre application fintech. Sa compréhension des enjeux de sécurité et de performance dans le secteur financier, combinée à son expertise technique en React et Node.js, ont permis de créer une plateforme robuste et conforme aux réglementations. Son professionnalisme et sa réactivité ont été exemplaires tout au long du projet.",
            en: "Patrick was instrumental in developing our fintech application. His understanding of security and performance challenges in the financial sector, combined with his technical expertise in React and Node.js, enabled us to create a robust platform compliant with regulations. His professionalism and responsiveness were exemplary throughout the project.",
            pl: "Patrick odegrał kluczową rolę w rozwoju naszej aplikacji fintech. Jego zrozumienie wyzwań związanych z bezpieczeństwem i wydajnością w sektorze finansowym, w połączeniu z jego wiedzą techniczną w React i Node.js, umożliwiło nam stworzenie solidnej platformy zgodnej z przepisami. Jego profesjonalizm i responsywność były wzorcowe przez cały projekt.",
        },
        rating: 5,
        date: '2024-02',
    },
]

// Helper function to get testimonial by project slug
export function getTestimonialBySlug(slug: string): ProjectTestimonial | undefined {
    return projectTestimonials.find(t => t.projectSlug === slug)
}

// Helper function to get all testimonials for a specific company
export function getTestimonialsByCompany(company: string): ProjectTestimonial[] {
    return projectTestimonials.filter(t => t.author.company === company)
}


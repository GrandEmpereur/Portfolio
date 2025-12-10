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
    // Gary Trojanowski - W3lead
    {
        projectSlug: 'W3lead',
        author: {
            name: 'Gary Trojanowski',
            role: 'CEO & Founder',
            company: 'W3lead',
        },
        quote: {
            fr: "Patrick a démontré une expertise exceptionnelle en tant que développeur full-stack au sein de W3lead. Sa maîtrise technique et sa capacité à livrer des solutions robustes ont été déterminantes pour nos projets e-commerce. Un véritable atout pour l'équipe.",
            en: "Patrick demonstrated exceptional expertise as a full-stack developer at W3lead. His technical mastery and ability to deliver robust solutions were decisive for our e-commerce projects. A true asset to the team.",
            pl: "Patrick wykazał się wyjątkową wiedzą jako programista full-stack w W3lead. Jego mistrzostwo techniczne i zdolność do dostarczania solidnych rozwiązań były decydujące dla naszych projektów e-commerce. Prawdziwy atut dla zespołu.",
        },
        rating: 5,
        date: '2023-11',
    },

    // Olivier Sauvage - Euroclear France
    {
        projectSlug: 'euroclear-france',
        author: {
            name: 'Olivier Sauvage',
            role: 'Squad Leader EC4S ',
            company: 'Euroclear France',
        },
        quote: {
            fr: "Patrick a excellé en tant qu'expert IT System Operator au sein d'Euroclear France. Sa maîtrise d'Angular, des pipelines CI/CD Azure et son approche méthodique ont considérablement amélioré la fiabilité de notre infrastructure financière critique. Un professionnel remarquable.",
            en: "Patrick excelled as an IT System Operator expert at Euroclear France. His mastery of Angular, Azure CI/CD pipelines and methodical approach significantly improved the reliability of our critical financial infrastructure. A remarkable professional.",
            pl: "Patrick wyróżnił się jako ekspert IT System Operator w Euroclear France. Jego biegłość w Angular, Azure CI/CD i metodyczne podejście znacznie poprawiły niezawodność naszej krytycznej infrastruktury finansowej. Niezwykły profesjonalista.",
        },
        rating: 5,
        date: '2024-03',
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


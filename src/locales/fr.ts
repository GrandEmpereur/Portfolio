// locales/fr.ts
import { common } from './fr/common';
import { homeHero } from './fr/home-hero';
import { homeProjects } from './fr/home-projects';
import { homeServices } from './fr/home-services';
import { homeEnd } from './fr/home-end';
import { contactPage } from './fr/contact-page';
import { legalPages } from './fr/legal-pages';

export default {
    common,
    homeHero,
    homeProjects,
    homeServices,
    homeEnd,
    contactPage,
    legalPages,
    'projectDetail': {
        'role': 'Rôle',
        'technologies': 'Technologies',
        'features': 'Fonctionnalités',
        'year': 'Année',
        'viewSite': 'Voir le site',
        'viewGithub': 'Voir sur GitHub',
        'backToProjects': 'Retour aux projets',
        'nextProject': 'Projet suivant',
        'prevProject': 'Projet précédent',
    },
    'meta': {
        'home': {
            'title': 'Patrick Bartosik | AI Engineer & Full Stack freelance Paris',
            'description': 'AI Engineer et développeur Full Stack freelance à Paris. Intégration de LLM, agents IA et RAG, SaaS, création et refonte de site. Premier échange gratuit.',
            'keywords': 'ai engineer freelance paris, développeur full stack freelance paris, intégration llm, agent ia, rag, développeur saas, création de site web, refonte de site web, développeur next.js freelance',
        },
        'projects': {
            'title': 'Projets IA, SaaS et web',
            'description': 'TraceGuard, NutriCert, Bookish et les sites réalisés en agence : projets IA, SaaS et web d\'un AI Engineer et développeur Full Stack freelance à Paris.',
            'keywords': 'portfolio ai engineer, projets ia, projets saas, réalisations développeur full stack, développeur freelance paris',
        },
        'contact': {
            'title': 'Contact : AI Engineer & Full Stack',
            'description': 'Décrivez votre projet IA ou Full Stack en 2 minutes, ou écrivez-moi directement. Je réponds sous 24 h, depuis Paris et en visio. Premier échange gratuit.',
            'keywords': 'contact ai engineer freelance, contact développeur full stack paris, projet ia, projet saas, consultation gratuite développeur',
        },
    },
    'notFound': {
        'title': 'Page introuvable',
        'heading': '404',
        'description': 'Désolé, la page que vous recherchez n\'existe pas ou a été déplacée.',
        'homeButton': 'Retour à l\'accueil',
        'projectsButton': 'Voir mes projets',
        'contactButton': 'Me contacter',
    },
} as const
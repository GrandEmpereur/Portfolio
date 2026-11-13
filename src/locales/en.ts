// locales/en.ts
import { common } from './en/common';
import { homeHero } from './en/home-hero';
import { homeProjects } from './en/home-projects';
import { homeServices } from './en/home-services';
import { homeEnd } from './en/home-end';
import { contactPage } from './en/contact-page';
import { legalPages } from './en/legal-pages';

export default {
    common,
    homeHero,
    homeProjects,
    homeServices,
    homeEnd,
    contactPage,
    legalPages,
    'projectDetail': {
        'role': 'Role',
        'technologies': 'Technologies',
        'features': 'Features',
        'year': 'Year',
        'viewSite': 'View site',
        'viewGithub': 'View on GitHub',
        'backToProjects': 'Back to projects',
        'nextProject': 'Next project',
        'prevProject': 'Previous project',
    },
    'meta': {
        'home': {
            'title': 'Patrick Bartosik | Freelance AI Engineer & Full Stack, Paris',
            'description': 'Freelance AI Engineer and Full Stack developer in Paris. LLM integration, AI agents and RAG, SaaS, website creation and redesign. Free first call, reply in 24h.',
            'keywords': 'freelance ai engineer paris, freelance full stack developer paris, llm integration, ai agents, rag, saas developer, website creation, website redesign, next.js developer for hire',
        },
        'projects': {
            'title': 'AI, SaaS and web projects',
            'description': 'TraceGuard, NutriCert, Bookish and the sites built at an agency: AI, SaaS and web projects by a freelance AI Engineer and Full Stack developer in Paris.',
            'keywords': 'ai engineer portfolio, ai projects, saas projects, full stack developer work, freelance developer paris',
        },
        'contact': {
            'title': 'Contact: AI Engineer & Full Stack',
            'description': 'Describe your AI or Full Stack project in 2 minutes, or write to me directly. I reply within 24 hours, from Paris and by video call. The first call is free.',
            'keywords': 'contact freelance ai engineer, contact full stack developer paris, ai project, saas project, free developer consultation',
        },
    },
    'notFound': {
        'title': 'Page Not Found',
        'heading': '404',
        'description': 'Sorry, the page you are looking for does not exist or has been moved.',
        'homeButton': 'Back to Home',
        'projectsButton': 'View My Projects',
        'contactButton': 'Contact Me',
    },
} as const
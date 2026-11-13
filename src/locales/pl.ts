// locales/pl.ts
import { common } from './pl/common';
import { homeHero } from './pl/home-hero';
import { homeProjects } from './pl/home-projects';
import { homeServices } from './pl/home-services';
import { homeEnd } from './pl/home-end';
import { contactPage } from './pl/contact-page';
import { legalPages } from './pl/legal-pages';
import { servicesPage } from './pl/services-page';

export default {
    common,
    homeHero,
    homeProjects,
    homeServices,
    homeEnd,
    contactPage,
    legalPages,
    servicesPage,
    'projectDetail': {
        'role': 'Rola',
        'technologies': 'Technologie',
        'features': 'Funkcjonalności',
        'year': 'Rok',
        'viewSite': 'Zobacz stronę',
        'viewGithub': 'Zobacz na GitHub',
        'backToProjects': 'Powrót do projektów',
        'nextProject': 'Następny projekt',
        'prevProject': 'Poprzedni projekt',
    },
    'meta': {
        'home': {
            'title': 'Patrick Bartosik | Freelance AI Engineer i Full Stack, Paryż',
            'description': 'Freelance AI Engineer i programista Full Stack w Paryżu. Integracja LLM, agenci AI i RAG, SaaS, tworzenie i przebudowa stron www. Pierwsza rozmowa gratis.',
            'keywords': 'freelance ai engineer paryż, freelance full stack developer, integracja llm, agenci ai, rag, programista saas, tworzenie stron internetowych, przebudowa strony internetowej, programista next.js',
        },
        'projects': {
            'title': 'Projekty AI, SaaS i web',
            'description': 'TraceGuard, NutriCert, Bookish i strony z agencji: projekty AI, SaaS i webowe freelance AI Engineera i programisty Full Stack z Paryża. Zobacz realizacje.',
            'keywords': 'portfolio ai engineer, projekty ai, projekty saas, realizacje full stack developera, freelance programista paryż',
        },
        'contact': {
            'title': 'Kontakt: AI Engineer i Full Stack',
            'description': 'Opisz swój projekt AI lub Full Stack w 2 minuty albo napisz do mnie bezpośrednio. Odpowiadam w 24 godziny, z Paryża i na wideo. Pierwsza rozmowa gratis.',
            'keywords': 'kontakt freelance ai engineer, kontakt full stack developer paryż, projekt ai, projekt saas, bezpłatna konsultacja programisty',
        },
    },
    'notFound': {
        'title': 'Strona nie znaleziona',
        'heading': '404',
        'description': 'Przepraszamy, strona której szukasz nie istnieje lub została przeniesiona.',
        'homeButton': 'Wróć do strony głównej',
        'projectsButton': 'Zobacz moje projekty',
        'contactButton': 'Skontaktuj się',
    },
} as const
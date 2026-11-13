import type { Locale } from '@/lib/locale-path';

export type ServiceCategory = 'ai' | 'fullstack';

export interface Service {
  id: string;
  /** Index shown in the list, e.g. "IA·01". The letters are the same in every language. */
  code: string;
  category: ServiceCategory;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Indicative lead time. An empty string means "not shown". */
  duration: Record<Locale, string>;
  technologies: string[];
}

export const services: Service[] = [
  {
    id: 'llm-integration',
    code: 'IA·01',
    category: 'ai',
    title: {
      fr: 'Intégration de LLM',
      en: 'LLM integration',
      pl: 'Integracja LLM',
    },
    description: {
      fr: "Je branche Claude ou GPT sur votre produit pour qu'il réponde à vos clients ou lise vos documents à votre place.",
      en: 'I plug Claude or GPT into your product so it answers your customers or reads your documents for you.',
      pl: 'Podłączam Claude lub GPT do Twojego produktu, aby odpowiadał Twoim klientom lub czytał dokumenty za Ciebie.',
    },
    duration: {
      fr: '2 à 6 semaines',
      en: '2 to 6 weeks',
      pl: '2 do 6 tygodni',
    },
    technologies: ['Vercel AI SDK', 'Claude API', 'OpenAI API', 'Azure AI Foundry', 'Next.js'],
  },
  {
    id: 'ai-agents',
    code: 'IA·02',
    category: 'ai',
    title: {
      fr: 'Agents IA et automatisation',
      en: 'AI agents and automation',
      pl: 'Agenci AI i automatyzacja',
    },
    description: {
      fr: 'Un agent qui traite une tâche métier de bout en bout, par exemple qualifier un lead ou répondre au support.',
      en: 'An agent that handles a business task from start to finish, for example qualifying a lead or answering support requests.',
      pl: 'Agent, który obsługuje zadanie biznesowe od początku do końca, na przykład kwalifikuje leada lub odpowiada w supporcie.',
    },
    duration: {
      fr: '4 à 10 semaines',
      en: '4 to 10 weeks',
      pl: '4 do 10 tygodni',
    },
    technologies: ['Claude Agent SDK', 'MCP', 'Azure AI Foundry', 'n8n', 'Node.js'],
  },
  {
    id: 'rag-knowledge',
    code: 'IA·03',
    category: 'ai',
    title: {
      fr: 'RAG et bases de connaissances',
      en: 'RAG and knowledge bases',
      pl: 'RAG i bazy wiedzy',
    },
    description: {
      fr: "Vos documents deviennent une base qu'on interroge en français, avec la source de chaque réponse.",
      en: 'Your documents become a base you can query in plain language, with the source of every answer.',
      pl: 'Twoje dokumenty stają się bazą, którą można odpytywać zwykłym językiem, ze źródłem każdej odpowiedzi.',
    },
    duration: {
      fr: '3 à 8 semaines',
      en: '3 to 8 weeks',
      pl: '3 do 8 tygodni',
    },
    technologies: ['pgvector', 'Supabase', 'Vercel AI SDK', 'PostgreSQL', 'Next.js'],
  },
  {
    id: 'saas-development',
    code: 'FS·01',
    category: 'fullstack',
    title: {
      fr: 'Création de SaaS',
      en: 'SaaS development',
      pl: 'Tworzenie SaaS',
    },
    description: {
      fr: "Votre SaaS de l'idée au lancement, avec ou sans IA : comptes utilisateurs, abonnements Stripe, tableau de bord.",
      en: 'Your SaaS from idea to launch, with or without AI: user accounts, Stripe subscriptions, dashboard.',
      pl: 'Twój SaaS od pomysłu do startu, z AI lub bez: konta użytkowników, subskrypcje Stripe, panel.',
    },
    duration: {
      fr: '8 à 16 semaines',
      en: '8 to 16 weeks',
      pl: '8 do 16 tygodni',
    },
    technologies: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'Stripe'],
  },
  {
    id: 'web-development',
    code: 'FS·02',
    category: 'fullstack',
    title: {
      fr: 'Création de site web',
      en: 'Website development',
      pl: 'Tworzenie stron internetowych',
    },
    description: {
      fr: 'Un site sur mesure avec Next.js, fait pour charger vite et être trouvé sur Google.',
      en: 'A custom site built with Next.js, made to load fast and to be found on Google.',
      pl: 'Strona na miarę w Next.js, stworzona, by ładować się szybko i być widoczna w Google.',
    },
    duration: {
      fr: '2 à 8 semaines',
      en: '2 to 8 weeks',
      pl: '2 do 8 tygodni',
    },
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  },
  {
    id: 'web-redesign',
    code: 'FS·03',
    category: 'fullstack',
    title: {
      fr: 'Refonte de site web',
      en: 'Website redesign',
      pl: 'Przebudowa strony internetowej',
    },
    description: {
      fr: 'Votre site actuel repris pour gagner en vitesse et en référencement, en gardant vos adresses et vos positions Google.',
      en: 'Your current site reworked to gain speed and search visibility, keeping your URLs and your Google rankings.',
      pl: 'Twoja obecna strona przebudowana tak, by zyskać na szybkości i widoczności w wyszukiwarce, z zachowaniem adresów URL i pozycji w Google.',
    },
    duration: {
      fr: '',
      en: '',
      pl: '',
    },
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Search Console'],
  },
];

/**
 * Splits a testimonial into its closing sentence (the pull quote shown large) and the rest.
 * A single-sentence text comes back whole as `pull`, with an empty `rest`.
 */
export const splitTestimonial = (text: string): { pull: string; rest: string } => {
  const trimmed = text.trim();
  const cut = trimmed.slice(0, -1).lastIndexOf('. ');
  if (cut === -1) return { pull: trimmed, rest: '' };
  return { pull: trimmed.slice(cut + 2), rest: trimmed.slice(0, cut + 1) };
};

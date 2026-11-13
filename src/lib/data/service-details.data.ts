import type { ContactRequest } from '@/lib/contact-request';
import type { Locale } from '@/lib/locale-path';

/** Answer of the contact form's first question that a service preselects. */
export type ServiceNeed = ContactRequest['needs'][number];

export interface ServiceStep {
  title: string;
  text: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/**
 * Long-form content of one service, shown on the /services page.
 * The short card (title, description, lead time, technologies) stays in services.data.ts.
 * No price anywhere, in any language.
 */
export interface ServiceDetail {
  /** Same id as in services.data.ts. Also the anchor of the section on /services. */
  id: string;
  /** `/contact?need=<need>` is where this service's call to action goes. */
  need: ServiceNeed;
  /** Two or three sentences: the problem this service solves, told from the client's side. */
  intro: Record<Locale, string>;
  /** 3 or 4 situations in which this service is the right one. */
  useCases: Record<Locale, string[]>;
  /** 4 or 5 things the client has in hand at the end. */
  deliverables: Record<Locale, string[]>;
  /** 3 or 4 steps, specific to this service. */
  steps: Record<Locale, ServiceStep[]>;
  /** 2 or 3 questions clients ask before starting. */
  faq: Record<Locale, ServiceFaq[]>;
  /** Slug of a published project (lastwork.data.ts) that illustrates the service, if there is one. */
  projectSlug?: string;
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'llm-integration',
    need: 'llm',
    intro: {
      fr: "Votre équipe répond chaque jour aux mêmes questions, ou passe des heures à lire des contrats et des comptes rendus avant de décider. Je branche Claude ou GPT à l'endroit de votre produit où ce travail se fait. Des contrôles vérifient chaque réponse avant qu'elle n'arrive à vos utilisateurs.",
      en: 'Your team answers the same questions every day, or spends hours reading contracts and meeting notes before making a decision. I plug Claude or GPT into the part of your product where that work happens. Checks verify every answer before it reaches your users.',
      pl: 'Twój zespół codziennie odpowiada na te same pytania albo godzinami czyta umowy i notatki ze spotkań, zanim podejmie decyzję. Podłączam Claude lub GPT w tym miejscu Twojego produktu, w którym ta praca się odbywa. Każda odpowiedź przechodzi kontrolę, zanim trafi do użytkowników.',
    },
    useCases: {
      fr: [
        'Vous avez un support qui répond chaque jour aux mêmes questions.',
        'Vous avez des contrats, des comptes rendus ou des rapports à lire et à résumer avant chaque décision.',
        'Vous avez un produit en ligne et vous voulez y ajouter un assistant ou une aide à la rédaction.',
        "Vous avez un prototype convaincant en démo, à fiabiliser avant de l'ouvrir à vos utilisateurs.",
      ],
      en: [
        'You have a support team that answers the same questions every day.',
        'You have contracts, meeting notes or reports to read and sum up before every decision.',
        'You have a live product and want to add an assistant or writing help to it.',
        'You have a prototype that works in a demo and needs to be made reliable before real users see it.',
      ],
      pl: [
        'Masz support, który codziennie odpowiada na te same pytania.',
        'Masz umowy, notatki ze spotkań lub raporty, które trzeba przeczytać i streścić przed każdą decyzją.',
        'Masz działający produkt i chcesz dodać do niego asystenta albo pomoc w pisaniu.',
        'Masz prototyp, który dobrze wypada na demo i wymaga dopracowania, zanim zobaczą go użytkownicy.',
      ],
    },
    deliverables: {
      fr: [
        'La fonctionnalité en production dans votre produit.',
        "Les clés d'API et les comptes Claude, OpenAI ou Azure AI Foundry ouverts à votre nom.",
        'Le code source et les prompts dans votre dépôt Git.',
        "Un jeu d'exemples tirés de vos vraies demandes, à relancer après chaque changement de modèle ou de prompt.",
        'Une documentation et une formation pour que votre équipe ajuste les prompts sans moi.',
      ],
      en: [
        'The feature live in your product.',
        'API keys and Claude, OpenAI or Azure AI Foundry accounts opened in your name.',
        'The source code and the prompts in your Git repository.',
        'A set of examples taken from your real requests, to rerun after every model or prompt change.',
        'Documentation and a training session so your team can adjust the prompts without me.',
      ],
      pl: [
        'Funkcja działająca na produkcji w Twoim produkcie.',
        'Klucze API oraz konta Claude, OpenAI lub Azure AI Foundry założone na Twoją firmę.',
        'Kod źródłowy i prompty w Twoim repozytorium Git.',
        'Zestaw przykładów z Twoich prawdziwych zapytań, do ponownego uruchomienia po każdej zmianie modelu lub promptu.',
        'Dokumentacja i szkolenie, dzięki którym Twój zespół sam poprawi prompty.',
      ],
    },
    steps: {
      fr: [
        {
          title: "Cas d'usage",
          text: 'On choisit une tâche précise et on rassemble des exemples réels, chacun avec la réponse attendue.',
        },
        {
          title: 'Choix du modèle',
          text: 'Je fais passer ces exemples à Claude et à GPT, et les résultats désignent le modèle retenu.',
        },
        {
          title: 'Contrôles',
          text: "J'ajoute les vérifications qui relisent chaque réponse, et le renvoi vers une personne quand l'une d'elles échoue.",
        },
        {
          title: 'Ouverture progressive',
          text: "La fonctionnalité est d'abord ouverte à un petit groupe d'utilisateurs, puis à tous une fois leurs retours traités.",
        },
      ],
      en: [
        {
          title: 'Use case',
          text: 'We pick one precise task and collect real examples, each with the answer you expect.',
        },
        {
          title: 'Model choice',
          text: 'I run those examples through Claude and GPT, and the results decide which model we keep.',
        },
        {
          title: 'Checks',
          text: 'I add the checks that review every answer, and the handover to a person when one of them fails.',
        },
        {
          title: 'Gradual rollout',
          text: 'The feature opens to a small group of users first, then to everyone once their feedback is handled.',
        },
      ],
      pl: [
        {
          title: 'Przypadek użycia',
          text: 'Wybieramy jedno konkretne zadanie i zbieramy prawdziwe przykłady, każdy z oczekiwaną odpowiedzią.',
        },
        {
          title: 'Wybór modelu',
          text: 'Sprawdzam te przykłady na Claude i GPT, a o wyborze modelu decydują wyniki.',
        },
        {
          title: 'Kontrole',
          text: 'Dodaję mechanizmy, które sprawdzają każdą odpowiedź, oraz przekazanie sprawy osobie z zespołu, gdy któraś kontrola zawiedzie.',
        },
        {
          title: 'Stopniowe uruchomienie',
          text: 'Funkcja trafia najpierw do małej grupy użytkowników, a do wszystkich po uwzględnieniu ich uwag.',
        },
      ],
    },
    faq: {
      fr: [
        {
          question: 'Claude ou GPT, lequel choisir ?',
          answer:
            "Cela dépend de la tâche. Je fais passer vos exemples réels aux deux modèles et je retiens celui qui donne les meilleurs résultats. L'intégration passe par le Vercel AI SDK, une couche commune aux deux fournisseurs, donc changer de modèle plus tard se fait sans réécrire le reste.",
        },
        {
          question: 'Que se passe-t-il quand le modèle se trompe ?',
          answer:
            "Un modèle de langage peut donner une réponse fausse sur un ton assuré, c'est pourquoi chaque réponse est contrôlée avant d'arriver à vos utilisateurs. Les vérifications dépendent du cas : format attendu, source citée, sujets à écarter. Quand l'une d'elles échoue, la demande est transmise à une personne de votre équipe.",
        },
        {
          question: "Faut-il refaire mon produit pour y ajouter de l'IA ?",
          answer:
            "Non. J'intègre le modèle dans votre produit existant, sous la forme d'un écran, d'un champ de saisie ou d'un traitement en arrière-plan. Le reste de votre application reste tel qu'il est.",
        },
      ],
      en: [
        {
          question: 'Claude or GPT: which one should I pick?',
          answer:
            'It depends on the task. I run your real examples through both models and keep the one that gives the best results. The integration goes through the Vercel AI SDK, a layer shared by both providers, so switching models later does not mean rewriting the rest.',
        },
        {
          question: 'What happens when the model gets it wrong?',
          answer:
            'A language model can give a wrong answer in a confident tone, which is why every answer is checked before it reaches your users. The checks depend on the case: expected format, cited source, topics to leave out. When one of them fails, the request goes to a person on your team.',
        },
        {
          question: 'Do I have to rebuild my product to add AI?',
          answer:
            'No. I integrate the model into your existing product, as a screen, an input field or a background job. The rest of your application stays as it is.',
        },
      ],
      pl: [
        {
          question: 'Claude czy GPT: który wybrać?',
          answer:
            'To zależy od zadania. Sprawdzam Twoje prawdziwe przykłady na obu modelach i wybieram ten, który daje lepsze wyniki. Integracja przechodzi przez Vercel AI SDK, warstwę wspólną dla obu dostawców, więc późniejsza zmiana modelu nie wymaga przepisywania reszty.',
        },
        {
          question: 'Co się dzieje, gdy model się pomyli?',
          answer:
            'Model językowy potrafi podać błędną odpowiedź pewnym tonem, dlatego każda odpowiedź jest sprawdzana, zanim trafi do użytkowników. Kontrole zależą od przypadku: oczekiwany format, podane źródło, tematy do pominięcia. Gdy któraś zawiedzie, zapytanie trafia do osoby z Twojego zespołu.',
        },
        {
          question: 'Czy muszę przebudować produkt, żeby dodać AI?',
          answer:
            'Nie. Wbudowuję model w istniejący produkt: jako ekran, pole formularza albo zadanie działające w tle. Reszta aplikacji pozostaje bez zmian.',
        },
      ],
    },
  },
  {
    id: 'ai-agents',
    need: 'agent',
    intro: {
      fr: "Certaines tâches reviennent chaque jour et suivent toujours les mêmes étapes, comme qualifier un lead entrant ou répondre à une demande de support. Un agent IA les traite de bout en bout dans vos outils. Vous décidez de ce qu'il fait seul et de ce qu'une personne doit approuver.",
      en: 'Some tasks come back every day and always follow the same steps, such as qualifying an inbound lead or answering a support request. An AI agent handles them from start to finish inside your tools. You decide what it does on its own and what a person has to approve.',
      pl: 'Niektóre zadania wracają codziennie i zawsze przebiegają tak samo, na przykład kwalifikacja nowego leada albo odpowiedź na zgłoszenie do supportu. Agent AI wykonuje je od początku do końca w Twoich narzędziach. To Ty decydujesz, co robi sam, a co musi zatwierdzić ktoś z zespołu.',
    },
    useCases: {
      fr: [
        "Vous avez des leads qui attendent une réponse parce que personne n'a le temps de les qualifier.",
        'Vous avez des demandes de support qui se règlent par les mêmes actions, dans le même ordre.',
        "Vous avez une tâche qui passe d'un outil à l'autre par copier-coller.",
        'Vous avez un agent en test et vous hésitez à lui ouvrir vos vrais outils.',
      ],
      en: [
        'You have leads waiting for a reply because nobody has time to qualify them.',
        'You have support requests that are solved by the same actions, in the same order.',
        'You have a task that moves from one tool to the next by copy and paste.',
        'You have an agent in testing and you hesitate to give it access to your real tools.',
      ],
      pl: [
        'Masz leady, które czekają na odpowiedź, bo nikt nie ma czasu ich zakwalifikować.',
        'Masz zgłoszenia do supportu, które rozwiązuje się tymi samymi czynnościami, w tej samej kolejności.',
        'Masz zadanie, które przechodzi z narzędzia do narzędzia metodą kopiuj i wklej.',
        'Masz agenta w testach i wahasz się, czy dać mu dostęp do prawdziwych narzędzi.',
      ],
    },
    deliverables: {
      fr: [
        "L'agent en production, connecté à vos outils par leurs API ou par MCP.",
        "La liste écrite de ce qu'il fait seul, de ce qui demande une approbation et de ce qui lui est interdit.",
        'Un journal de chacune de ses actions, que vous pouvez consulter et exporter.',
        "Le code source et les scénarios d'automatisation dans votre dépôt Git.",
        "Une formation pour les personnes qui supervisent l'agent et reprennent les cas qu'il leur transmet.",
      ],
      en: [
        'The agent in production, connected to your tools through their APIs or MCP.',
        'The written list of what it does alone, what needs approval and what it is forbidden to do.',
        'A log of every action it takes, which you can read and export.',
        'The source code and the automation workflows in your Git repository.',
        'Training for the people who supervise the agent and pick up the cases it hands over.',
      ],
      pl: [
        'Agent działający na produkcji, połączony z Twoimi narzędziami przez ich API lub MCP.',
        'Spisana lista tego, co agent robi sam, co wymaga zatwierdzenia i czego mu nie wolno.',
        'Dziennik wszystkich jego działań, który możesz przeglądać i eksportować.',
        'Kod źródłowy i scenariusze automatyzacji w Twoim repozytorium Git.',
        'Szkolenie dla osób, które nadzorują agenta i przejmują przekazane przez niego sprawy.',
      ],
    },
    steps: {
      fr: [
        {
          title: 'Tâche cible',
          text: 'On décrit la tâche étape par étape, exceptions comprises, comme pour former un nouveau collègue.',
        },
        {
          title: 'Outils et droits',
          text: "Je connecte l'agent aux outils nécessaires et je fixe pour chacun ce qu'il peut lire, modifier ou seulement proposer.",
        },
        {
          title: 'Essai supervisé',
          text: "L'agent traite de vrais cas et une personne valide chaque action avant son exécution.",
        },
        {
          title: 'Autonomie',
          text: "Les actions qu'il réussit à chaque fois passent en automatique, les autres restent soumises à approbation.",
        },
      ],
      en: [
        {
          title: 'Target task',
          text: 'We describe the task step by step, exceptions included, the way you would train a new colleague.',
        },
        {
          title: 'Tools and permissions',
          text: 'I connect the agent to the tools it needs and set, for each one, what it may read, change or only suggest.',
        },
        {
          title: 'Supervised trial',
          text: 'The agent works on real cases and a person approves each action before it runs.',
        },
        {
          title: 'Autonomy',
          text: 'The actions it gets right every time become automatic, the others stay subject to approval.',
        },
      ],
      pl: [
        {
          title: 'Zadanie docelowe',
          text: 'Opisujemy zadanie krok po kroku, razem z wyjątkami, tak jak przy wdrażaniu nowego pracownika.',
        },
        {
          title: 'Narzędzia i uprawnienia',
          text: 'Łączę agenta z potrzebnymi narzędziami i dla każdego ustalam, co może odczytać, zmienić albo tylko zaproponować.',
        },
        {
          title: 'Próba pod nadzorem',
          text: 'Agent pracuje na prawdziwych przypadkach, a osoba z zespołu zatwierdza każde działanie przed jego wykonaniem.',
        },
        {
          title: 'Samodzielność',
          text: 'Działania, które za każdym razem wykonuje poprawnie, przechodzą w tryb automatyczny, pozostałe nadal wymagają zatwierdzenia.',
        },
      ],
    },
    faq: {
      fr: [
        {
          question: 'Un agent peut-il faire une erreur dans mes outils ?',
          answer:
            "Oui, et le projet est construit autour de ce risque. Chaque appel d'outil est autorisé, bloqué ou soumis à une personne, selon des règles appliquées côté serveur, en dehors du modèle. Tout est consigné dans un journal que vous pouvez exporter.",
        },
        {
          question: "L'agent fonctionne-t-il avec nos outils actuels ?",
          answer:
            "Oui, à condition que l'outil expose une API ou un serveur MCP. Pour enchaîner des étapes simples entre plusieurs applications, j'utilise n8n. On vérifie au premier échange ce que chacun de vos outils permet.",
        },
        {
          question: 'Quelle différence avec une intégration de LLM ?',
          answer:
            "Une intégration de LLM répond ou rédige, puis une personne décide de la suite. Un agent enchaîne plusieurs étapes et utilise vos outils pour aller au bout de la tâche. Il demande plus de cadrage et de tests, d'où un délai de 4 à 10 semaines contre 2 à 6.",
        },
      ],
      en: [
        {
          question: 'Can an agent make a mistake in my tools?',
          answer:
            'Yes, and the project is built around that risk. Every tool call is allowed, blocked or sent to a person for approval, according to rules enforced on the server, outside the model. Everything is recorded in a log you can export.',
        },
        {
          question: 'Does the agent work with the tools we already use?',
          answer:
            'Yes, provided the tool exposes an API or an MCP server. To chain simple steps across several applications, I use n8n. During the first conversation we check what each of your tools allows.',
        },
        {
          question: 'How is this different from an LLM integration?',
          answer:
            'An LLM integration answers or drafts, then a person decides what happens next. An agent chains several steps and uses your tools to carry the task through. It needs more scoping and testing, hence a lead time of 4 to 10 weeks against 2 to 6.',
        },
      ],
      pl: [
        {
          question: 'Czy agent może popełnić błąd w moich narzędziach?',
          answer:
            'Tak, i cały projekt jest zbudowany wokół tego ryzyka. Każde wywołanie narzędzia jest dozwolone, blokowane albo przekazywane osobie z zespołu do zatwierdzenia, według reguł egzekwowanych po stronie serwera, poza modelem. Wszystko trafia do dziennika, który możesz wyeksportować.',
        },
        {
          question: 'Czy agent będzie działał z naszymi obecnymi narzędziami?',
          answer:
            'Tak, pod warunkiem że narzędzie udostępnia API lub serwer MCP. Do łączenia prostych kroków między kilkoma aplikacjami używam n8n. Podczas pierwszej rozmowy sprawdzamy, na co pozwala każde z Twoich narzędzi.',
        },
        {
          question: 'Czym to się różni od integracji LLM?',
          answer:
            'Integracja LLM odpowiada lub pisze tekst, a o dalszych krokach decyduje ktoś z zespołu. Agent wykonuje kilka kroków z rzędu i korzysta z Twoich narzędzi, żeby doprowadzić zadanie do końca. Wymaga więcej ustaleń i testów, stąd termin 4 do 10 tygodni wobec 2 do 6.',
        },
      ],
    },
    projectSlug: 'traceguard',
  },
  {
    id: 'rag-knowledge',
    need: 'rag',
    intro: {
      fr: 'La réponse existe déjà dans vos procédures, vos contrats ou vos comptes rendus, mais la retrouver prend plus de temps que de reposer la question à un collègue. Je transforme ces documents en une base que votre équipe interroge en langage courant. Chaque réponse indique le passage dont elle vient, pour que chacun puisse la vérifier.',
      en: 'The answer already sits somewhere in your procedures, contracts or meeting notes, but finding it takes longer than asking a colleague again. I turn those documents into a base your team queries in plain language. Every answer points to the passage it comes from, so anyone can check it.',
      pl: 'Odpowiedź już jest w Twoich procedurach, umowach albo notatkach ze spotkań, ale jej znalezienie trwa dłużej niż ponowne zapytanie kolegi. Zamieniam te dokumenty w bazę, którą Twój zespół odpytuje zwykłym językiem. Każda odpowiedź wskazuje fragment, z którego pochodzi, więc każdy może ją sprawdzić.',
    },
    useCases: {
      fr: [
        'Vous avez des centaines de documents internes et une recherche par mots-clés qui passe à côté de la bonne page.',
        'Vous avez de nouveaux arrivants qui posent les mêmes questions aux mêmes personnes.',
        'Vous avez un support qui fouille la documentation à chaque ticket.',
        'Vous avez des documents ou du code hérités que plus personne ne connaît en entier.',
      ],
      en: [
        'You have hundreds of internal documents and a keyword search that misses the right page.',
        'You have new hires asking the same people the same questions.',
        'You have a support team that digs through the documentation for every ticket.',
        'You have legacy documents or code that nobody knows in full any more.',
      ],
      pl: [
        'Masz setki wewnętrznych dokumentów i wyszukiwarkę po słowach kluczowych, która nie trafia na właściwą stronę.',
        'Masz nowych pracowników, którzy zadają te same pytania tym samym osobom.',
        'Masz support, który przy każdym zgłoszeniu przekopuje dokumentację.',
        'Masz odziedziczone dokumenty lub kod, których nikt już nie zna w całości.',
      ],
    },
    deliverables: {
      fr: [
        'Une interface de questions et réponses, autonome ou intégrée à votre outil interne.',
        "L'index de vos documents dans PostgreSQL avec pgvector, sur votre propre compte Supabase.",
        "L'import qui met l'index à jour quand un document est ajouté ou modifié.",
        'Un jeu de questions de référence avec les réponses attendues, pour mesurer la qualité après chaque changement.',
        'Le code source sur Git et un guide pour brancher une nouvelle source de documents.',
      ],
      en: [
        'A question-and-answer interface, standalone or built into your internal tool.',
        'The index of your documents in PostgreSQL with pgvector, on your own Supabase account.',
        'The import that updates the index when a document is added or edited.',
        'A set of reference questions with the expected answers, to measure quality after every change.',
        'The source code on Git and a guide for plugging in a new document source.',
      ],
      pl: [
        'Interfejs pytań i odpowiedzi, samodzielny albo wbudowany w Twoje narzędzie wewnętrzne.',
        'Indeks Twoich dokumentów w PostgreSQL z pgvector, na Twoim własnym koncie Supabase.',
        'Import, który aktualizuje indeks po dodaniu lub zmianie dokumentu.',
        'Zestaw pytań wzorcowych z oczekiwanymi odpowiedziami, do mierzenia jakości po każdej zmianie.',
        'Kod źródłowy w Git i instrukcja podłączania nowego źródła dokumentów.',
      ],
    },
    steps: {
      fr: [
        {
          title: 'Inventaire',
          text: 'On liste les sources à couvrir, leur format et les personnes qui y ont accès.',
        },
        {
          title: 'Indexation',
          text: "Je découpe les documents en passages et j'indexe chacun avec son titre et le lien vers l'original.",
        },
        {
          title: 'Questions de référence',
          text: "Votre équipe fournit de vraies questions, je mesure les réponses et j'ajuste la recherche jusqu'à ce que la bonne source remonte.",
        },
        {
          title: 'Mise à jour',
          text: "L'index suit les changements de vos documents, et vous savez ajouter une source sans moi.",
        },
      ],
      en: [
        {
          title: 'Inventory',
          text: 'We list the sources to cover, their format and who has access to them.',
        },
        {
          title: 'Indexing',
          text: 'I split the documents into passages and index each one with its title and a link to the original.',
        },
        {
          title: 'Reference questions',
          text: 'Your team supplies real questions, I measure the answers and tune the search until the right source comes up.',
        },
        {
          title: 'Updates',
          text: 'The index follows the changes in your documents, and you know how to add a source without me.',
        },
      ],
      pl: [
        {
          title: 'Inwentaryzacja',
          text: 'Spisujemy źródła do objęcia, ich format i osoby, które mają do nich dostęp.',
        },
        {
          title: 'Indeksowanie',
          text: 'Dzielę dokumenty na fragmenty i indeksuję każdy z tytułem oraz linkiem do oryginału.',
        },
        {
          title: 'Pytania wzorcowe',
          text: 'Twój zespół podaje prawdziwe pytania, ja mierzę odpowiedzi i dostrajam wyszukiwanie, aż zwraca właściwe źródło.',
        },
        {
          title: 'Aktualizacje',
          text: 'Indeks nadąża za zmianami w dokumentach, a Ty umiesz dodać nowe źródło beze mnie.',
        },
      ],
    },
    faq: {
      fr: [
        {
          question: 'Le système peut-il inventer une réponse ?',
          answer:
            'Le risque existe avec tout modèle de langage, et le RAG sert à le réduire : le modèle répond à partir des passages retrouvés dans vos documents et affiche sa source. Quand aucun passage ne répond à la question, il le dit. Les questions de référence servent à vérifier ce comportement avant la mise en service.',
        },
        {
          question: 'Quels documents peut-on indexer ?',
          answer:
            "Tout ce dont on peut extraire du texte : PDF, pages web, fichiers bureautiques, tickets, code source. Les documents scannés et les grands tableaux demandent un traitement à part, que j'évalue sur vos fichiers au premier échange.",
        },
        {
          question: 'Faut-il ranger nos documents avant de commencer ?',
          answer:
            "Non, on part de vos documents tels qu'ils sont. L'inventaire sert à repérer les doublons et les versions périmées, que j'écarte de l'index pour qu'ils ne faussent pas les réponses.",
        },
      ],
      en: [
        {
          question: 'Can the system make up an answer?',
          answer:
            'The risk exists with any language model, and RAG is there to reduce it: the model answers from the passages found in your documents and shows its source. When no passage answers the question, it says so. The reference questions are used to verify this before going live.',
        },
        {
          question: 'Which documents can be indexed?',
          answer:
            'Anything text can be extracted from: PDFs, web pages, office files, tickets, source code. Scanned documents and large tables need separate handling, which I assess on your files during the first conversation.',
        },
        {
          question: 'Do we need to tidy up our documents first?',
          answer:
            'No, we start from your documents as they are. The inventory is used to spot duplicates and outdated versions, which I leave out of the index so they do not skew the answers.',
        },
      ],
      pl: [
        {
          question: 'Czy system może wymyślić odpowiedź?',
          answer:
            'To ryzyko istnieje przy każdym modelu językowym, a RAG służy do jego ograniczenia: model odpowiada na podstawie fragmentów znalezionych w Twoich dokumentach i pokazuje źródło. Gdy żaden fragment nie odpowiada na pytanie, model to mówi. Pytania wzorcowe pozwalają to sprawdzić przed uruchomieniem.',
        },
        {
          question: 'Jakie dokumenty można zaindeksować?',
          answer:
            'Wszystko, z czego da się wydobyć tekst: pliki PDF, strony internetowe, pliki biurowe, zgłoszenia, kod źródłowy. Skany i duże tabele wymagają osobnej obróbki, którą oceniam na Twoich plikach podczas pierwszej rozmowy.',
        },
        {
          question: 'Czy musimy najpierw uporządkować dokumenty?',
          answer:
            'Nie, zaczynamy od dokumentów w obecnym stanie. Inwentaryzacja pozwala wychwycić duplikaty i nieaktualne wersje, które pomijam w indeksie, żeby nie zniekształcały odpowiedzi.',
        },
      ],
    },
    projectSlug: 'ariane',
  },
  {
    id: 'saas-development',
    need: 'saas',
    intro: {
      fr: "Vous avez une idée de produit par abonnement, parfois déjà des maquettes ou des clients intéressés, et il vous manque la personne qui le construit. Je prends le produit de l'idée au lancement : comptes utilisateurs, abonnements Stripe, tableau de bord, avec ou sans IA. Au lancement, vos premiers clients peuvent s'inscrire, s'abonner et s'en servir.",
      en: 'You have an idea for a subscription product, sometimes mockups or interested customers already, and you are missing the person who builds it. I take the product from idea to launch: user accounts, Stripe subscriptions, dashboard, with or without AI. On launch day, your first customers can sign up, subscribe and use it.',
      pl: 'Masz pomysł na produkt w modelu subskrypcyjnym, czasem już makiety albo zainteresowanych klientów, i brakuje Ci osoby, która go zbuduje. Prowadzę produkt od pomysłu do startu: konta użytkowników, subskrypcje Stripe, panel, z AI lub bez. W dniu startu pierwsi klienci mogą się zarejestrować, wykupić subskrypcję i korzystać z produktu.',
    },
    useCases: {
      fr: [
        'Vous avez une idée, quelques clients intéressés, et pas encore de produit à leur faire essayer.',
        "Vous avez un outil interne ou un tableur que vous voulez proposer à d'autres entreprises.",
        'Vous avez un prototype no-code qui atteint ses limites.',
        "Vous avez une équipe produit et besoin d'un lead technique pour la partie développement.",
      ],
      en: [
        'You have an idea, a few interested customers, and no product for them to try yet.',
        'You have an internal tool or a spreadsheet you want to offer to other companies.',
        'You have a no-code prototype that has reached its limits.',
        'You have a product team and need a technical lead for the engineering side.',
      ],
      pl: [
        'Masz pomysł, kilku zainteresowanych klientów i jeszcze żadnego produktu, który mogliby wypróbować.',
        'Masz wewnętrzne narzędzie albo arkusz kalkulacyjny, który chcesz udostępnić innym firmom.',
        'Masz prototyp no-code, który doszedł do granic swoich możliwości.',
        'Masz zespół produktowy i potrzebujesz lidera technicznego do części programistycznej.',
      ],
    },
    deliverables: {
      fr: [
        "L'application en production sur votre nom de domaine.",
        'Les comptes utilisateurs et leur tableau de bord.',
        'Les abonnements Stripe : souscription, changement de formule, résiliation.',
        "Le code source sur Git, avec l'hébergement, la base de données et Stripe ouverts à votre nom.",
        'Une documentation technique pour la personne qui reprendra le code.',
      ],
      en: [
        'The application in production on your domain name.',
        'User accounts and their dashboard.',
        'Stripe subscriptions: sign-up, plan change, cancellation.',
        'The source code on Git, with hosting, database and Stripe opened in your name.',
        'Technical documentation for whoever takes over the code.',
      ],
      pl: [
        'Aplikacja działająca na produkcji pod Twoją domeną.',
        'Konta użytkowników i ich panel.',
        'Subskrypcje Stripe: zakup, zmiana planu, rezygnacja.',
        'Kod źródłowy w Git oraz hosting, baza danych i Stripe założone na Twoją firmę.',
        'Dokumentacja techniczna dla osoby, która przejmie kod.',
      ],
    },
    steps: {
      fr: [
        {
          title: 'Périmètre de lancement',
          text: 'On sépare ce qui doit exister le premier jour de ce qui peut attendre les premiers retours.',
        },
        {
          title: 'Socle',
          text: "Je construis d'abord les comptes, les droits et la base de données, dont dépend tout le reste.",
        },
        {
          title: "Parcours d'abonnement",
          text: "Stripe est branché tôt et testé de l'inscription à la résiliation.",
        },
        {
          title: 'Premiers utilisateurs',
          text: "Le produit s'ouvre à un petit groupe avant le lancement public, le temps de corriger ce qui les bloque.",
        },
      ],
      en: [
        {
          title: 'Launch scope',
          text: 'We separate what must exist on day one from what can wait for the first feedback.',
        },
        {
          title: 'Foundation',
          text: 'I build accounts, permissions and the database first, since everything else depends on them.',
        },
        {
          title: 'Subscription flow',
          text: 'Stripe is wired in early and tested from sign-up to cancellation.',
        },
        {
          title: 'First users',
          text: 'The product opens to a small group before the public launch, long enough to fix what blocks them.',
        },
      ],
      pl: [
        {
          title: 'Zakres na start',
          text: 'Oddzielamy to, co musi istnieć pierwszego dnia, od tego, co może poczekać na pierwsze opinie.',
        },
        {
          title: 'Fundament',
          text: 'Najpierw buduję konta, uprawnienia i bazę danych, od których zależy cała reszta.',
        },
        {
          title: 'Ścieżka subskrypcji',
          text: 'Stripe jest podłączony wcześnie i przetestowany od rejestracji do rezygnacji.',
        },
        {
          title: 'Pierwsi użytkownicy',
          text: 'Produkt trafia do małej grupy przed publicznym startem, żeby poprawić to, co ich blokuje.',
        },
      ],
    },
    faq: {
      fr: [
        {
          question: 'Peut-on lancer avec une version plus petite ?',
          answer:
            "Oui, et c'est ce que je recommande. Le délai de 8 à 16 semaines dépend surtout du nombre de fonctionnalités présentes au lancement. On fixe ce périmètre ensemble avant le premier sprint, et le reste s'ajoute ensuite sur la même base.",
        },
        {
          question: 'Serai-je dépendant de vous après le lancement ?',
          answer:
            "Non. Vous consultez le dépôt Git pendant tout le projet, et l'hébergement, la base de données et Stripe sont ouverts à votre nom. Avec la documentation technique, un autre développeur peut reprendre le produit.",
        },
        {
          question: 'Comment se décide le budget ?',
          answer:
            'Le premier échange est gratuit et sans engagement : on y cadre vos objectifs et le périmètre de lancement. Vous recevez ensuite un devis et un calendrier détaillé avec des jalons. Je travaille au forfait ou en régie.',
        },
      ],
      en: [
        {
          question: 'Can we launch with a smaller version?',
          answer:
            'Yes, and that is what I recommend. The 8 to 16 week lead time depends mostly on how many features are there at launch. We set that scope together before the first sprint, and the rest is added later on the same foundation.',
        },
        {
          question: 'Will I depend on you after launch?',
          answer:
            'No. You can browse the Git repository throughout the project, and hosting, database and Stripe are opened in your name. With the technical documentation, another developer can take the product over.',
        },
        {
          question: 'How is the budget decided?',
          answer:
            'The first conversation is free and without obligation: we use it to frame your goals and the launch scope. You then receive a quote and a detailed schedule with milestones. I work either on a fixed scope or on a time-and-materials basis.',
        },
      ],
      pl: [
        {
          question: 'Czy można wystartować z mniejszą wersją?',
          answer:
            'Tak, i właśnie to polecam. Termin 8 do 16 tygodni zależy głównie od liczby funkcji dostępnych na starcie. Ten zakres ustalamy wspólnie przed pierwszym sprintem, a resztę dodajemy później na tej samej podstawie.',
        },
        {
          question: 'Czy po starcie produkt będzie zależał od Ciebie?',
          answer:
            'Nie. Przez cały projekt masz wgląd w repozytorium Git, a hosting, baza danych i Stripe są założone na Twoją firmę. Dzięki dokumentacji technicznej produkt może przejąć inny programista.',
        },
        {
          question: 'Jak ustalany jest budżet?',
          answer:
            'Pierwsza rozmowa jest bezpłatna i do niczego nie zobowiązuje: ustalamy na niej Twoje cele i zakres na start. Potem otrzymujesz wycenę oraz szczegółowy harmonogram z kamieniami milowymi. Pracuję w modelu ryczałtowym albo rozliczanym według czasu pracy.',
        },
      ],
    },
    projectSlug: 'nutricert',
  },
  {
    id: 'web-development',
    need: 'site',
    intro: {
      fr: "Vous lancez une activité ou une offre, et il vous faut un site qui la présente clairement et que vos clients trouvent sur Google. Je le construis avec Next.js, page par page à partir de vos contenus, pour qu'il s'affiche vite sur mobile et que les moteurs de recherche lisent tout ce qu'il contient.",
      en: 'You are launching a business or an offer, and you need a site that presents it clearly and that your customers find on Google. I build it with Next.js, page by page from your content, so that it loads fast on mobile and search engines can read everything on it.',
      pl: 'Otwierasz firmę albo wprowadzasz nową ofertę i potrzebujesz strony, która jasno ją przedstawia i którą klienci znajdą w Google. Buduję ją w Next.js, podstrona po podstronie na bazie Twoich treści, tak aby szybko ładowała się na telefonie, a wyszukiwarki mogły odczytać całą jej zawartość.',
    },
    useCases: {
      fr: [
        'Vous avez une activité qui démarre et pas encore de site.',
        'Vous avez un site monté avec un outil en ligne, et vous en avez atteint les limites.',
        "Vous avez un lancement daté et besoin d'un site prêt ce jour-là.",
        "Vous avez des clients dans plusieurs pays et besoin d'un site en plusieurs langues.",
      ],
      en: [
        'You have a business starting up and no website yet.',
        'You have a site made with an online builder and you have hit its limits.',
        'You have a launch date and need a site ready that day.',
        'You have customers in several countries and need a site in several languages.',
      ],
      pl: [
        'Masz firmę na starcie i jeszcze nie masz strony.',
        'Masz stronę z kreatora online i jego możliwości przestały Ci wystarczać.',
        'Masz wyznaczoną datę premiery i potrzebujesz strony gotowej na ten dzień.',
        'Masz klientów w kilku krajach i potrzebujesz strony w kilku językach.',
      ],
    },
    deliverables: {
      fr: [
        'Le site en ligne sur votre nom de domaine.',
        "Le code source sur Git et l'hébergement ouvert à votre nom.",
        'Les bases du référencement en place : titres, descriptions, sitemap, données structurées.',
        'Une mesure de la vitesse de chargement sur mobile, faite avant la mise en ligne.',
        'Une formation et une documentation pour faire évoluer le site sans moi.',
      ],
      en: [
        'The site live on your domain name.',
        'The source code on Git and hosting opened in your name.',
        'The search basics in place: titles, descriptions, sitemap, structured data.',
        'A measurement of loading speed on mobile, taken before going live.',
        'Training and documentation so the site can evolve without me.',
      ],
      pl: [
        'Strona opublikowana pod Twoją domeną.',
        'Kod źródłowy w Git i hosting założony na Twoją firmę.',
        'Podstawy SEO na miejscu: tytuły, opisy, mapa strony, dane strukturalne.',
        'Pomiar szybkości ładowania na telefonie, wykonany przed publikacją.',
        'Szkolenie i dokumentacja, dzięki którym rozwiniesz stronę beze mnie.',
      ],
    },
    steps: {
      fr: [
        {
          title: 'Arborescence',
          text: 'On liste les pages, ce que chacune doit dire et la recherche Google à laquelle elle répond.',
        },
        {
          title: "Page d'accueil",
          text: 'Je la conçois et la développe en premier, pour fixer le style avant de décliner les autres pages.',
        },
        {
          title: 'Vitesse et référencement',
          text: 'Chaque page est mesurée sur mobile et reçoit son titre, sa description et ses données structurées.',
        },
        {
          title: 'Mise en ligne',
          text: 'Je branche votre nom de domaine et je déclare le site et son sitemap à Google.',
        },
      ],
      en: [
        {
          title: 'Page plan',
          text: 'We list the pages, what each one has to say and the Google search it answers.',
        },
        {
          title: 'Home page',
          text: 'I design and build it first, to settle the style before rolling it out to the other pages.',
        },
        {
          title: 'Speed and search',
          text: 'Every page is measured on mobile and gets its title, description and structured data.',
        },
        {
          title: 'Going live',
          text: 'I connect your domain name and submit the site and its sitemap to Google.',
        },
      ],
      pl: [
        {
          title: 'Struktura strony',
          text: 'Spisujemy podstrony: co każda ma przekazać i na jakie wyszukiwanie w Google odpowiada.',
        },
        {
          title: 'Strona główna',
          text: 'Projektuję ją i koduję jako pierwszą, żeby ustalić styl przed pozostałymi podstronami.',
        },
        {
          title: 'Szybkość i SEO',
          text: 'Każda podstrona jest mierzona na telefonie i dostaje swój tytuł, opis oraz dane strukturalne.',
        },
        {
          title: 'Publikacja',
          text: 'Podłączam Twoją domenę i zgłaszam stronę wraz z mapą strony do Google.',
        },
      ],
    },
    faq: {
      fr: [
        {
          question: 'Pourquoi Next.js ?',
          answer:
            "Next.js prépare les pages côté serveur : le texte arrive déjà écrit dans le navigateur, ce qui accélère l'affichage et permet à Google de lire tout le contenu. Le même socle sert ensuite à ajouter un espace client ou une fonctionnalité IA sans changer de technologie.",
        },
        {
          question: 'Mon site sera-t-il bien placé sur Google ?',
          answer:
            'Je mets en place ce qui dépend de la technique : vitesse de chargement, balisage des pages, sitemap, données structurées. La position dans les résultats dépend aussi de vos contenus et de vos concurrents, donc je ne promets pas de classement.',
        },
      ],
      en: [
        {
          question: 'Why Next.js?',
          answer:
            'Next.js prepares pages on the server: the text arrives already written in the browser, which speeds up display and lets Google read all the content. The same foundation can later take a customer area or an AI feature without changing technology.',
        },
        {
          question: 'Will my site rank well on Google?',
          answer:
            'I put in place everything that depends on the technical side: loading speed, page markup, sitemap, structured data. Where you appear in the results also depends on your content and your competitors, so I do not promise a ranking.',
        },
      ],
      pl: [
        {
          question: 'Dlaczego Next.js?',
          answer:
            'Next.js przygotowuje strony po stronie serwera: tekst trafia do przeglądarki już gotowy, co przyspiesza wyświetlanie i pozwala Google odczytać całą treść. Na tej samej podstawie można później dodać strefę klienta albo funkcję AI bez zmiany technologii.',
        },
        {
          question: 'Czy moja strona będzie wysoko w Google?',
          answer:
            'Wdrażam wszystko, co zależy od strony technicznej: szybkość ładowania, znaczniki, mapę strony, dane strukturalne. Pozycja w wynikach zależy też od Twoich treści i konkurencji, dlatego nie obiecuję konkretnego miejsca.',
        },
      ],
    },
  },
  {
    id: 'web-redesign',
    need: 'refonte',
    intro: {
      fr: 'Votre site a vieilli : il est lent, pénible à modifier, et il ne reflète plus votre activité. Le refaire sans préparation peut pourtant vous faire perdre les visites que Google vous envoie déjà. Je le reprends pour gagner en vitesse et en référencement, en gardant vos adresses et vos positions Google.',
      en: 'Your site has aged: it is slow, painful to edit, and it no longer reflects your business. Rebuilding it without preparation can still lose you the visits Google already sends. I rework it to gain speed and search visibility while keeping your URLs and your Google rankings.',
      pl: 'Twoja strona się zestarzała: jest wolna, trudno ją edytować i nie oddaje już tego, czym się zajmujesz. Przebudowa bez przygotowania może jednak odebrać Ci ruch, który Google już do Ciebie kieruje. Przebudowuję stronę tak, by zyskała na szybkości i widoczności, z zachowaniem adresów URL i pozycji w Google.',
    },
    useCases: {
      fr: [
        "Vous avez un site qui met plusieurs secondes à s'afficher sur un téléphone.",
        'Vous avez des pages bien placées sur Google et vous craignez de les perdre en changeant de site.',
        'Vous avez un site bâti sur un thème et des extensions que plus personne ne maintient.',
        "Vous avez changé d'offre ou d'image, et le site raconte encore l'ancienne.",
      ],
      en: [
        'You have a site that takes several seconds to appear on a phone.',
        'You have pages that rank well on Google and you fear losing them by changing sites.',
        'You have a site built on a theme and plugins that nobody maintains any more.',
        'You have changed your offer or your brand, and the site still tells the old story.',
      ],
      pl: [
        'Masz stronę, która na telefonie ładuje się kilka sekund.',
        'Masz podstrony wysoko w Google i obawiasz się, że stracisz je przy zmianie strony.',
        'Masz stronę opartą na motywie i wtyczkach, których nikt już nie aktualizuje.',
        'Masz nową ofertę albo nowy wizerunek, a strona wciąż opowiada o poprzednich.',
      ],
    },
    deliverables: {
      fr: [
        'Le nouveau site en ligne à la même adresse.',
        'Le plan de redirections : chaque ancienne adresse mène à sa nouvelle page.',
        'Un relevé avant et après de la vitesse de chargement et des pages indexées.',
        "Le code source sur Git et l'hébergement ouvert à votre nom.",
        'Un suivi dans la Search Console pendant les semaines qui suivent la bascule.',
      ],
      en: [
        'The new site live at the same address.',
        'The redirect plan: every old URL leads to its new page.',
        'A before-and-after record of loading speed and indexed pages.',
        'The source code on Git and hosting opened in your name.',
        'Monitoring in Search Console during the weeks after the switch.',
      ],
      pl: [
        'Nowa strona dostępna pod tym samym adresem.',
        'Plan przekierowań: każdy stary adres prowadzi do swojej nowej podstrony.',
        'Zestawienie przed i po: szybkość ładowania oraz zaindeksowane podstrony.',
        'Kod źródłowy w Git i hosting założony na Twoją firmę.',
        'Monitoring w Search Console w tygodniach po przełączeniu.',
      ],
    },
    steps: {
      fr: [
        {
          title: 'État des lieux',
          text: 'Je relève dans la Search Console les pages qui reçoivent des visites, leurs positions et la vitesse actuelle du site.',
        },
        {
          title: 'Plan de redirections',
          text: 'Chaque adresse existante est conservée ou redirigée vers sa nouvelle page, une par une.',
        },
        {
          title: 'Reconstruction',
          text: "Je refais le site avec Next.js sur une adresse de test, pendant que l'ancien reste en ligne.",
        },
        {
          title: 'Bascule',
          text: "Le nouveau site remplace l'ancien, puis je surveille l'indexation et je corrige les adresses oubliées.",
        },
      ],
      en: [
        {
          title: 'Audit',
          text: "In Search Console, I record the pages that get visits, their rankings and the site's current speed.",
        },
        {
          title: 'Redirect plan',
          text: 'Every existing URL is kept or redirected to its new page, one by one.',
        },
        {
          title: 'Rebuild',
          text: 'I rebuild the site with Next.js on a test address while the old one stays online.',
        },
        {
          title: 'Switch',
          text: 'The new site replaces the old one, then I watch indexing and fix any URL that was missed.',
        },
      ],
      pl: [
        {
          title: 'Stan wyjściowy',
          text: 'W Search Console sprawdzam podstrony, które mają wejścia, ich pozycje i obecną szybkość strony.',
        },
        {
          title: 'Plan przekierowań',
          text: 'Każdy istniejący adres zostaje zachowany albo przekierowany na nową podstronę, jeden po drugim.',
        },
        {
          title: 'Przebudowa',
          text: 'Buduję stronę od nowa w Next.js pod adresem testowym, a stara pozostaje w tym czasie online.',
        },
        {
          title: 'Przełączenie',
          text: 'Nowa strona zastępuje starą, a ja obserwuję indeksowanie i poprawiam pominięte adresy.',
        },
      ],
    },
    faq: {
      fr: [
        {
          question: 'Vais-je perdre mon référencement ?',
          answer:
            "C'est le principal risque d'une refonte, et le plan de redirections existe pour l'éviter : aucune adresse connue de Google ne doit mener à une page d'erreur. Les positions peuvent bouger le temps que Google relise le site. Je suis la Search Console après la bascule pour corriger ce qui doit l'être.",
        },
        {
          question: 'Combien de temps dure une refonte ?',
          answer:
            "Cela dépend du nombre de pages et de ce que l'on garde de l'existant, c'est pourquoi je n'annonce pas de délai avant d'avoir vu le site. Après le premier échange, vous recevez un calendrier détaillé avec des jalons.",
        },
        {
          question: 'Faut-il tout refaire ?',
          answer:
            "Non. L'état des lieux distingue les pages qui fonctionnent, dont on garde le texte et l'adresse, de celles à réécrire ou à fusionner. Le design peut être repris ou revu, selon ce qui a motivé la refonte.",
        },
      ],
      en: [
        {
          question: 'Will I lose my search rankings?',
          answer:
            'That is the main risk of a redesign, and the redirect plan exists to prevent it: no URL that Google knows should lead to an error page. Rankings can move while Google reads the site again. I follow Search Console after the switch to fix whatever needs fixing.',
        },
        {
          question: 'How long does a redesign take?',
          answer:
            'It depends on the number of pages and on how much of the existing site we keep, which is why I give no lead time before seeing the site. After the first conversation, you receive a detailed schedule with milestones.',
        },
        {
          question: 'Does everything have to be redone?',
          answer:
            'No. The audit separates the pages that work, whose text and URL we keep, from those to rewrite or merge. The design can be carried over or revised, depending on what prompted the redesign.',
        },
      ],
      pl: [
        {
          question: 'Czy stracę pozycje w Google?',
          answer:
            'To główne ryzyko przebudowy i właśnie po to powstaje plan przekierowań: żaden adres znany Google nie powinien prowadzić do strony błędu. Pozycje mogą się wahać, dopóki Google ponownie nie przeczyta strony. Po przełączeniu śledzę Search Console i poprawiam to, co tego wymaga.',
        },
        {
          question: 'Ile trwa przebudowa strony?',
          answer:
            'To zależy od liczby podstron i od tego, ile zostaje z obecnej strony, dlatego nie podaję terminu, zanim jej nie zobaczę. Po pierwszej rozmowie otrzymujesz szczegółowy harmonogram z kamieniami milowymi.',
        },
        {
          question: 'Czy trzeba wszystko robić od nowa?',
          answer:
            'Nie. Analiza stanu wyjściowego oddziela podstrony, które działają i zachowują tekst oraz adres, od tych do przepisania lub połączenia. Projekt graficzny można zachować albo odświeżyć, zależnie od powodu przebudowy.',
        },
      ],
    },
  },
];

export const getServiceDetail = (id: string): ServiceDetail | undefined =>
  serviceDetails.find((detail) => detail.id === id);

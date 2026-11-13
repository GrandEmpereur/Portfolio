# Product

## Register

brand

## Users

Prospects qui évaluent Patrick Bartosik comme AI Engineer et développeur Full Stack freelance : fondateurs de startups/scale-ups, CTOs et responsables produit de PME et grands comptes, principalement en France (Paris) et en remote Europe/Amérique du Nord. Ils arrivent via Google, via un assistant IA, LinkedIn ou recommandation, souvent sur mobile, et décident en quelques secondes si le profil mérite un contact. Le job à accomplir : vérifier la crédibilité technique et le goût du détail, puis envoyer une demande de mission via la page contact.

## Product Purpose

Portfolio vitrine multilingue (fr de référence, en, pl) de Patrick Bartosik, « AI Engineer & développeur Full Stack freelance à Paris ». Il vend deux métiers : IA (intégration de LLM, agents, RAG) et Full Stack (création de SaaS, création et refonte de sites). Aucun prix n'est affiché, et l'e-commerce ne fait pas partie des services. Le site est lui-même la démonstration du savoir-faire : performance, animations GSAP maîtrisées, SEO technique. Succès = demandes de mission qualifiées, et être trouvé par Google et par les assistants IA.

## Brand Personality

Auteur, précis, premium. Une affiche avec un portrait studio en couleurs naturelles, un titre en capitales larges, des chapitres numérotés, des filets d'index, un unique accent karmin. Le mouvement est poussé (textes qui se révèlent, défilement lissé, curseur personnalisé) mais maîtrisé. Le ton écrit est direct et concret ("des fonctionnalités IA qui arrivent réellement en production, pas des démos").

## Anti-references

- **Portfolio qui sacrifie la lisibilité à l'effet** : animations qui dégradent la lecture et les Core Web Vitals, contenu invisible sans JavaScript.
- **Site corporate daté** : stock photos, bleu corporate, mises en page symétriques sans caractère.
- **Template généré par IA** : grilles de cartes identiques, glassmorphism par défaut, gradients décoratifs, hero à métriques, eyebrow uppercase mécanique au-dessus de chaque section, tirets cadratins dans la copy.

## Design Principles

1. **Le site est la preuve** : chaque section doit démontrer le niveau d'exécution vendu au client. Un détail bâclé contredit l'offre.
2. **Une signature, un accent** : la grande typo, l'index éditorial et le karmin unique portent la mémoire ; le mouvement la met en scène sans la remplacer.
3. **L'éditorial encode l'information** : les codes (`IA·01`, `FS·02`), filets et numérotations n'existent que quand ils portent un sens réel (séquence, taxonomie), jamais en décoration.
4. **Performant par défaut** : contenu visible sans JS (SEO/crawlers), mouvement lourd réservé aux grands écrans à souris, images optimisées. Le waouh ne coûte jamais le LCP : LCP mobile de 2,5 s au plus, sinon c'est l'animation qui est allégée.
5. **Trois langues, une voix** : fr/en/pl restent synchronisés en ton et en contenu ; le français fait référence, toute nouvelle copy se décline dans les trois locales.

## Accessibility & Inclusion

WCAG 2.2 AA : contrastes texte ≥ 4.5:1 (le palier discret à 42 % est réservé aux étiquettes courtes ; à vérifier au cas par cas), focus visible au clavier (anneau karmin), `prefers-reduced-motion` respecté sur toutes les animations GSAP, pas de dépendance au survol (version tactile pensée sans), `aria-label` sur les liens icônes, formulaires avec labels associés et erreurs annoncées (`role="alert"`).

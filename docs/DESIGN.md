---
name: Portfolio Patrick Bartosik
description: Portfolio d'auteur d'un AI Engineer et développeur Full Stack freelance, typographie display massive, index éditorial, un accent karmin, mouvement GSAP poussé.
colors:
  ink: "#0B0B0A"
  bone: "#ECE7DE"
  accent: "#EC2A45"
  accent-sur-clair: "#C8102E"
  vert-disponibilite: "#22C55E"
  ink-clair: "#12120F"
  bone-mut: "#ECE7DEA8"
  bone-fnt: "#ECE7DE85"
  bone-ln: "#ECE7DE29"
  bone-nav: "#ECE7DE8C"
  bone-anneau: "#ECE7DE99"
  ink-mut: "#12120FB3"
  ink-fnt: "#12120F99"
  ink-ln: "#12120F29"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 9.4vw, 9.375rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.125rem, 5.4vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  sm: "6px"
  md: "8px"
  lg: "10px"
  full: "999px"
spacing:
  section-y: "clamp(4.5rem, 10vw, 9.375rem)"
  container-x: "clamp(1rem, 2.2vw, 2.25rem)"
  row-y: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "13px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.full}"
    padding: "13px 22px"
  nav-pill:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.full}"
    padding: "7px 8px 7px 20px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "9px 0"
  tech-pill:
    backgroundColor: "transparent"
    textColor: "{colors.bone-mut}"
    rounded: "{rounded.full}"
    padding: "4px 11px"
---

# Design System: Portfolio Patrick Bartosik

## 1. Overview

**Creative North Star: « L'Affiche d'Auteur »**

Le site se lit comme une affiche suivie d'un dossier : un portrait studio en couleurs naturelles, un titre en capitales larges posé à même le fond, puis des chapitres numérotés qui s'épinglent et se relaient au scroll. Les codes d'index en mono (`IA·01`, `FS·02`) et les filets fins structurent l'information ; la page se lit comme un document d'agence, pas comme une pile de cartes. Un seul accent, le karmin, signale ce qui est actif ou important.

Le mouvement est poussé : textes qui se révèlent, entrées composées, défilement lissé, curseur point et anneau. Il reste une couche d'enrichissement : le contenu est complet sans JavaScript, et le waouh ne coûte jamais le LCP.

Le système rejette le portfolio qui sacrifie la lisibilité et les Core Web Vitals à l'effet, le site corporate daté (stock photos, bleu corporate) et le template généré par IA (grilles de cartes identiques, glassmorphism, gradients décoratifs, hero à métriques).

**Key Characteristics:**
- Palette `ink` / `bone` avec un seul accent karmin ; vert réservé à la disponibilité.
- Archivo large en capitales pour les titres, Geist Mono pour les codes et étiquettes.
- Lignes d'index séparées par des filets plutôt que des cartes ; boutons et navigation en pilule.
- Mouvement GSAP poussé, réservé aux grands écrans à souris ; sur mobile le hero s'affiche directement.
- Contenu toujours visible sans JavaScript (SEO, crawlers non-JS).

## 2. Colors

Deux thèmes posés par classe : `.theme-dark` (fond `ink`, texte `bone`) et `.theme-light` (fond `bone`, texte `ink`). Le thème clair est utilisé pour les services et la méthode.

### Primary
- **Ink** (#0B0B0A) : fond du thème sombre, texte du thème clair, texte des boutons pleins.
- **Bone** (#ECE7DE) : texte du thème sombre, fond du thème clair, fond des boutons pleins.

### Accent
- **Karmin** (#EC2A45) : l'unique accent. Trait de progression, code actif, point du curseur, état coché, focus. Sur fond clair, le texte accent passe en **Karmin profond** (#C8102E) pour tenir le contraste.

### Neutral (dérivés du texte)
Trois paliers d'opacité du texte courant, dans les deux thèmes (`--mut`, `--fnt`, `--ln`).
- **Secondaire** `--mut` : sombre `rgba(236,231,222,.66)`, clair `rgba(18,18,15,.7)`. Descriptions et corps secondaire.
- **Discret** `--fnt` : sombre `rgba(236,231,222,.52)`, clair `rgba(18,18,15,.6)`. Codes mono, légendes, placeholders. Textes courts uniquement, jamais un paragraphe.
- **Filet** `--ln` : sombre `rgba(236,231,222,.16)`, clair `rgba(18,18,15,.16)`. Filets d'index, bordures de pills, séparateurs. Passe à pleine intensité au hover d'une ligne.
- Dans la barre de navigation sombre : liens et langues `rgba(236,231,222,.55)`, fond `rgba(18,18,16,.84)`. Anneau du curseur : `rgba(236,231,222,.6)`.

### Tertiary
- **Vert disponibilité** (#22C55E) : uniquement le point « disponible » (hero, réassurance du contact). Aucun autre usage.

### Named Rules
**La Règle de l'Accent Unique.** Le karmin est la seule couleur de marque. Pas de second accent, pas de dégradé, pas de gradient text. Les jetons shadcn (`primary`, `border`, `foreground`…) sont redirigés vers cette palette ; aucun code hexadécimal dans les composants, seulement les jetons du bloc `@theme`.

## 3. Typography

**Display Font:** Archivo variable (axe de largeur `wdth`, fallback Helvetica Neue, Arial, sans-serif)
**Body Font:** Archivo, largeur normale
**Label/Mono Font:** Geist Mono (fallback ui-monospace)

**Character:** des titres larges, serrés et en capitales, face à un texte courant sobre. Anton et Inter ne sont plus utilisées.

### Hierarchy
- **Display** (500, largeur 112 %, clamp(2.75rem, 9.4vw, 9.375rem), 0.9, -0.04em) : grands titres, capitales. Le titre d'affiche du hero (≈ 9.9vw) et le titre géant de section (≈ 18.8vw) en sont des agrandissements, interligne jusqu'à 0.84.
- **Headline** (500, largeur 112 %, clamp(2.125rem, 5.4vw, 5.25rem), 0.9, -0.04em) : titres de section et de bloc, capitales.
- **Title** (600, 1.125rem, -0.01em) : titres de lignes d'index ; sous-titres de groupe en 500.
- **Body** (400, 1rem, 1.55) : paragraphes, largeur max ~65ch.
- **Label** (Geist Mono, 11px, 0.08em, capitales) : codes d'index `IA·01`, `FS·02`, étiquettes, compteurs, légendes.

### Named Rules
**La Règle du Sens.** Codes et numérotations n'apparaissent que quand ils encodent une taxonomie ou une séquence réelle. Un numéro décoratif est interdit.
**La Règle de la Mesure.** Les titres ne descendent pas sous -0.04em d'interlettrage et ne sont jamais utilisés en corps de texte ni en bouton.

## 4. Elevation

Aucune ombre portée décorative. La profondeur vient des filets, des paliers d'opacité du texte, des changements de thème (sombre vers clair) et de l'image. La barre de navigation en pilule et l'aperçu au survol portent un fin liseré, pas une ombre. Un effet de profondeur n'apparaît qu'en réponse à une interaction.

### Named Rules
**La Règle du Liseré.** Une surface se détache par un filet de 1px (`--ln`), jamais par une box-shadow.

## 5. Components

Caractère : **affirmés au repos, précis à l'interaction**. Un bouton se soulève de 2px, une ligne d'index décale son titre de 8px, le curseur annonce l'action.

### Navigation
- Barre en pilule fixe (rayon 999px, fond sombre translucide, liseré). Chapitres numérotés ; un trait karmin de progression se remplit sous les chapitres au scroll. Sur mobile, seul le chapitre courant est affiché, un appui ouvre la liste. Sur la page contact : retour, libellé, langues, « Fermer ».

### Buttons
- **Shape:** pilule (999px), 13px 22px, 14px en graisse 500.
- **Primary:** fond `bone` (ou `ink` en thème clair), texte inverse. Hover : translation de -2px ; bouton aimanté de quelques pixels vers la souris sur grand écran.
- **Ghost:** transparent, liseré `--ln`.

### Hero « affiche »
- Portrait studio en couleurs naturelles, titre d'affiche en capitales larges, accroche, deux boutons, repères de cadrage aux quatre coins et heure de Paris. Le `<h1>` de positionnement reste visible en petites capitales mono.

### Chapitres épinglés
- Hero vers profil (l'affiche se défait, le profil s'allume mot à mot) et projets (un projet à la fois, compteur et segments de progression). Grands écrans à souris seulement.

### Index Rows (composant signature)
- Ligne séparée par un filet : code mono, titre, description, flèche. Hover : filet en pleine intensité, titre décalé de 8px, flèche visible. Sert pour les services, les options du contact, les articles et la liste d'agence.
- **Liste d'agence :** un aperçu d'image suit la souris au survol ; sur écran tactile, une vignette est affichée dans la ligne.

### Section claire
- Services (deux groupes de trois, durée indicative, aucun prix), étapes de la méthode qui se remplissent au scroll, citation à onglets qui s'allume mot à mot.

### FAQ
- Accordéon `<details name="faq">` en lignes d'index ; signe plus qui pivote, question ouverte en karmin.

### Footer
- Nom géant qui défile en continu, liens légaux, gestion des cookies, réseaux.

### Page contact
- Écran fixe à partir de 900 px : « dossier » récapitulatif vivant à gauche, une question à la fois à droite avec progression. Options en lignes d'index, choix courts en pastilles, champs soulignés. En dessous de 900 px, la page défile normalement.

### Inputs / Fields
- **Style:** soulignés (`border-b` `--ln`), fond transparent, pas de radius. Focus : filet en pleine intensité. Erreur : message avec `role="alert"`, `aria-invalid` sur le champ.

### Chips (tech pills)
- Liseré `--ln`, texte `--mut`, 12px, radius full.

### Curseur
- Point karmin exact et anneau en léger retard ; l'anneau grossit sur les liens, boutons et libellés. Souris uniquement.

## 6. Motion

GSAP poussé : textes découpés qui se révèlent, entrées composées au chargement, défilement lissé (Lenis), boutons aimantés, parallaxe. Courbe de référence `cubic-bezier(.2,.7,.2,1)` pour les entrées et les survols, `cubic-bezier(.7,0,.2,1)` pour les barres de progression ; durées de 0,25 à 0,9 s.

### Garde-fous
- Rien n'est caché sans JavaScript : les états de départ sont posés par GSAP ou par des classes que seul JavaScript ajoute (`js`, `enter`, `pinned`).
- Épinglage, curseur, aimantation, parallaxe et aperçu au survol : uniquement à partir de 900 px, avec une souris et sans `prefers-reduced-motion`.
- Sur mobile, le hero s'affiche directement depuis le HTML servi.
- Le waouh ne coûte jamais le LCP : LCP mobile de 2,5 s au plus, sinon c'est l'animation qui est allégée.

## 7. Do's and Don'ts

### Do:
- **Do** garder le texte courant au palier secondaire (66 %) ou au-dessus ; le palier discret (42 %) est réservé aux étiquettes courtes.
- **Do** livrer chaque contenu visible sans JavaScript.
- **Do** découper les textes après `document.fonts.ready`, avec `aria: 'auto'`.
- **Do** décliner toute nouvelle copy en fr/en/pl simultanément.
- **Do** utiliser des lignes d'index à filets pour tout listing (services, FAQ, projets, options).
- **Do** passer par les jetons de couleur, jamais par un hexadécimal dans un composant.

### Don't:
- **Don't** réintroduire le « template généré par IA » : grilles de cartes identiques, glassmorphism par défaut, gradients décoratifs, hero à métriques, eyebrow mécanique au-dessus de chaque section.
- **Don't** utiliser de gradient text (`background-clip: text`).
- **Don't** écrire de tiret cadratin (—) dans la copy ; utiliser virgules, deux-points ou « · » dans les codes.
- **Don't** poser de box-shadow décorative, de side-stripe coloré, ni de carte dans une carte.
- **Don't** afficher de prix, ni d'e-commerce parmi les services.
- **Don't** laisser une animation dégrader le LCP ou rendre un contenu invisible sans JavaScript.

---
name: Portfolio Patrick Bartosik
description: Portfolio cinématique noir et blanc d'un développeur freelance (web + IA), typographie display massive et index éditorial.
colors:
  noir-pellicule: "#000000"
  blanc-projecteur: "#FFFFFF"
  blanc-lecture: "#FFFFFF99"
  blanc-legende: "#FFFFFF66"
  hairline: "#FFFFFF1A"
  vert-signal: "#22C55E"
  rouge-erreur: "#F87171"
typography:
  display:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 6.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Anton, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.625
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 300
    letterSpacing: "0.3em"
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.75rem"
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  lg: "0.65rem"
  full: "9999px"
spacing:
  section-y: "clamp(6rem, 10vw, 10rem)"
  container-x: "clamp(1.5rem, 5vw, 5rem)"
  row-y: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.blanc-projecteur}"
    textColor: "{colors.noir-pellicule}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.blanc-projecteur}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.blanc-projecteur}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  tech-pill:
    backgroundColor: "transparent"
    textColor: "{colors.blanc-legende}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Portfolio Patrick Bartosik

## 1. Overview

**Creative North Star: « Le Générique de Film »**

Le site se lit comme un générique de long-métrage : une image brumeuse plein écran, un nom en capitales massives (Anton) posé dessus comme un titre, puis des sections qui défilent comme des cartons — codes d'index en mono (`AI·01`, `[SE]`), filets hairline, texte de lecture en Inter léger. Le noir n'est pas un thème sombre : c'est la salle. La lumière vient des photos et du blanc typographique, dosé en paliers d'opacité.

Le système rejette explicitement le portfolio flashy surchargé (3D gratuite, curseurs exotiques), le site corporate daté (stock photos, bleu corporate) et le template généré par IA (grilles de cartes identiques, glassmorphism, gradients décoratifs, hero à métriques). La confiance passe par la retenue : un seul moment fort par section, exécuté parfaitement.

**Key Characteristics:**
- Monochrome strict : noir + blanc en paliers d'opacité, vert réservé au statut, rouge aux erreurs.
- Typographie display Anton uppercase comme signature ; Inter léger pour tout le reste.
- Structure éditoriale : lignes d'index hairline plutôt que cartes, codes mono qui encodent une taxonomie réelle.
- Motion GSAP « once » au scroll, un reveal par section, `prefers-reduced-motion` respecté.
- Contenu toujours visible sans JavaScript (SEO, crawlers non-JS).

## 2. Colors

Palette monochrome de salle de projection : la couleur est bannie sauf quand elle signale un état.

### Primary
- **Noir Pellicule** (#000000) : fond de toutes les sections (`bg-black`). Jamais adouci en gris foncé ; le noir pur est la salle.
- **Blanc Projecteur** (#FFFFFF) : titres, CTA primaires, texte à pleine intensité. Sa version pleine est réservée à ce qui doit être lu en premier.

### Neutral
- **Blanc Lecture** (rgba(255,255,255,0.6) à 0.9) : corps de texte et descriptions. Plancher de lisibilité : ne jamais descendre sous 50 % d'opacité pour du texte courant.
- **Blanc Légende** (rgba(255,255,255,0.3) à 0.5) : labels uppercase, codes mono, pills techno, placeholders. Réservé aux textes courts ou décoratifs, jamais à un paragraphe.
- **Hairline** (rgba(255,255,255,0.1), 1px) : filets d'index, bordures de lignes et de pills. S'éclaircit à ~0.25 au hover.

### Tertiary
- **Vert Signal** (#22C55E) : uniquement le point « disponible » du hero. Aucun autre usage autorisé.
- **Rouge Erreur** (#F87171) : uniquement les messages d'erreur de formulaire.

### Named Rules
**La Règle Monochrome.** Aucune couleur n'entre dans l'interface hors vert-statut et rouge-erreur. Les utilitaires `.text-gradient-orange` / `.text-gradient-purple` (globals.css) et l'accent ambre shadcn sont des legacy à éteindre, pas des options.

## 3. Typography

**Display Font:** Anton (fallback sans-serif)
**Body Font:** Inter (fallback sans-serif)
**Label/Mono Font:** ui-monospace (codes d'index ; la variable `--font-geist-mono` n'est pas chargée, le fallback système fait foi)

**Character:** Contraste maximal entre un display condensé qui crie (Anton, uppercase, interlignage 0.95) et un corps qui chuchote (Inter 300). C'est ce grand écart qui fait le ton cinématique.

### Hierarchy
- **Display** (400, clamp(2.5rem, 5.5vw, 6.5rem), 0.95) : nom du hero et titres monumentaux, uppercase, tracking-tight.
- **Headline** (400, clamp(2.25rem, 5vw, 4.5rem), 0.95) : titres de section (h2), uppercase.
- **Title** (400–600, 1.25–1.5rem) : titres de lignes d'index et de sous-blocs. En Inter semibold quand la ligne doit rester lisible et dense.
- **Body** (300, 1rem, 1.625) : paragraphes en Inter light, largeur max ~65ch (`max-w-xl` / `max-w-2xl`).
- **Label** (300, 0.75rem, tracking 0.3em, UPPERCASE) : eyebrows de section et légendes.
- **Mono** (0.75rem, tracking large) : codes d'index `AI·01`, `[SE]`, légendes photo `PATRICK BARTOSIK · PARIS, FR`.

### Named Rules
**La Règle du Générique.** Anton est réservé aux titres. Jamais en corps de texte, jamais en bouton, jamais sous 1.5rem : un générique ne chuchote pas.
**La Règle du Sens.** Codes et numérotations (`AI·01`, `01 Discovery`) n'apparaissent que quand ils encodent une taxonomie ou une séquence réelle. Un numéro décoratif est interdit.

## 4. Elevation

Système flat : aucune box-shadow structurelle. La profondeur vient de trois matériaux : l'image photographique (voiles `bg-black/50`, dégradés vers le noir), les paliers d'opacité du blanc, et les filets hairline 1px. Des lueurs subtiles (glow doux sur hover d'image ou de CTA) sont autorisées comme réponse à l'interaction, jamais comme état de repos.

### Named Rules
**La Règle Lueur-pas-Ombre.** Une surface au repos est plate. Si un effet de profondeur apparaît, c'est une lueur déclenchée par le hover/focus, pas une ombre portée permanente.

## 5. Components

Caractère : **affûtés et discrets**. Présence minimale au repos, réponse précise au hover (flèche qui apparaît, translation de 2px, bordure qui s'éclaircit).

### Buttons
- **Shape:** pill intégrale (border-radius 9999px)
- **Primary:** fond Blanc Projecteur, texte noir, padding 14px 32px, flèche `ArrowUpRight` qui se décale au hover (`translate-x-0.5 -translate-y-0.5`)
- **Hover / Focus:** `bg-white/90`, `active:scale-95`, focus visible au clavier
- **Ghost:** bordure `white/20`, texte blanc, hover `bg-white/10` + bordure `white/40`

### Index Rows (composant signature)
- Ligne éditoriale : `border-t` hairline, code mono à gauche, titre semibold, description Blanc Lecture, pills techno en bas
- Hover : bordure → `white/25`, titre `translate-x-2`, flèche `ArrowUpRight` qui apparaît
- Utilisée pour les services, la FAQ et tout futur listing ; c'est l'alternative maison à la grille de cartes

### Inputs / Fields
- **Style:** soulignés uniquement (`border-b white/20`), fond transparent, pas de radius
- **Focus:** bordure → `white/60`, aucun ring décoratif
- **Error:** message `rouge-erreur` 0.75rem avec `role="alert"`, `aria-invalid` sur le champ

### Chips (tech pills)
- Bordure hairline, texte Blanc Légende 0.75rem, radius full ; hover : bordure et texte s'éclaircissent

### Navigation
- Barre flottante arrondie avec fond sombre translucide, liens Inter, état actif en pill claire. Le gradient orange de l'état actif est un legacy hors doctrine (voir Règle Monochrome).

### Photo Captions
- Légende mono sous les images (`PATRICK BARTOSIK · PARIS, FR`), séparateur « · » — jamais de tiret cadratin

## 6. Do's and Don'ts

### Do:
- **Do** garder le corps de texte à ≥ 50 % d'opacité de blanc sur noir (AA 4.5:1) ; `white/30-40` seulement pour labels courts et décor.
- **Do** un seul reveal GSAP par section (`once: true`, ease power3/power4.out), toujours doublé de `prefers-reduced-motion`.
- **Do** livrer chaque contenu visible sans JavaScript : `gsap.from` uniquement, jamais d'état initial caché en CSS.
- **Do** décliner toute nouvelle copy en fr/en/pl simultanément.
- **Do** utiliser les lignes d'index hairline pour tout listing (services, FAQ, projets).

### Don't:
- **Don't** réintroduire le « template généré par IA » : grilles de cartes identiques, glassmorphism par défaut, gradients décoratifs, hero à métriques, eyebrow mécanique au-dessus de chaque section.
- **Don't** utiliser de gradient text (`background-clip: text`) : les utilitaires orange/purple existants sont à retirer, pas à imiter.
- **Don't** faire du « portfolio flashy surchargé » : pas de 3D gratuite, pas de curseur exotique, pas d'animation qui coûte le LCP.
- **Don't** écrire de tiret cadratin (—) dans la copy ; utiliser virgules, deux-points ou « · » dans les codes.
- **Don't** poser de box-shadow au repos, de side-stripe coloré, ou de carte dans une carte.
- **Don't** dépasser clamp max 6.5rem sur le display ni descendre le tracking sous -0.04em.

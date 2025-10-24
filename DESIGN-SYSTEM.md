# 🎨 Design System - Portfolio Patrick Bartosik

## 🌟 Thème principal

### Glassmorphism
Le portfolio utilise le **glassmorphism** comme style visuel principal :
- Effets de verre avec `backdrop-blur`
- Transparence et gradients subtils (`bg-white/10`, `bg-white/20`)
- Borders semi-transparentes (`border-white/5`, `border-white/10`)
- Ombres douces (`shadow-[0_1px_2.5px_rgba(0,0,0,0.2)]`)
- Arrondis généreux (`rounded-[60px]`, `rounded-xl`)

#### Exemples d'application :
- **Navbar** : 
  ```css
  bg-gradient-to-r from-white/[0.13] to-white/[0.08]
  backdrop-blur-[100px]
  rounded-[60px]
  shadow-[0_1px_2.5px_rgba(0,0,0,0.2)]
  border border-white/5
  ```

- **Boutons** :
  ```css
  bg-white/10 hover:bg-white/20
  backdrop-blur-[7.3px]
  rounded-full
  ```

---

## 📐 Typographie - Hyper Texte

### Principe
Utilisation de **typographies extra-larges** pour créer un impact visuel fort et moderne.

### Tailles de police principales

#### Hero Section
- **Nom principal** : `text-[180px]` (140-180px)
- **Titre professionnel** : `text-sm md:text-base` (petit, contraste avec le nom)

#### Headings
- **H1** : `text-[140px] - text-[300px]` (Hyper texte)
- **H2** : `text-6xl md:text-7xl lg:text-8xl xl:text-9xl` (96px - 128px)
- **H3** : `text-5xl md:text-6xl lg:text-7xl` (48px - 72px)
- **H4** : `text-3xl md:text-4xl` (30px - 36px)

#### Body Text
- **Large** : `text-lg md:text-xl` (18px - 20px)
- **Base** : `text-base` (16px)
- **Small** : `text-sm` (14px)

### Font Weights
- **Black** : `font-black` (900) - Pour les titres principaux
- **Bold** : `font-bold` (700) - Pour les sous-titres
- **Medium** : `font-medium` (500) - Pour le texte important
- **Light** : `font-light` (300) - Pour les textes secondaires

---

## 🎨 Palette de couleurs

### Couleurs principales
- **Orange** : `#FF6B35` (orange-500, orange-600)
  - Utilisé pour les CTAs, accents, gradients
- **Noir** : `#000000` 
  - Background principal (mode dark uniquement)
- **Blanc** : `#FFFFFF`
  - Textes principaux avec opacités variées

### Opacités de blanc
- `text-white` : Texte principal (100%)
- `text-white/90` : Texte secondaire (90%)
- `text-white/70` : Texte tertiaire (70%)
- `text-white/60` : Labels, hints (60%)
- `text-white/40` : Désactivé, placeholder (40%)

### Gris
- `text-gray-300` : Titres dans sections sombres
- `text-gray-400` : Descriptions, textes secondaires
- `text-gray-500` : Textes très secondaires

---

## 📏 Spacing & Layout

### Padding uniforme
- **Sections** : `px-20` (80px left/right) sur desktop
  - Responsive : `px-6 sm:px-8 md:px-12 lg:px-20`
  - Vertical : `py-20 md:py-32` ou `py-24`

### No Max-Width
- ❌ **Pas de `max-width`** sur les containers principaux
- ✅ Le contenu s'étend sur toute la largeur
- ✅ Contrôlé uniquement par le padding de 80px

### Gap & Spacing
- **Entre sections** : `gap-y-24` ou `mb-20 md:mb-32`
- **Entre éléments** : `gap-4`, `gap-6`, `gap-8`, `gap-12`
- **Grids** : `gap-6` pour les cards

---

## 🎭 Effets & Animations

### ⚠️ RÈGLE IMPORTANTE : GSAP OBLIGATOIRE
**Toutes les animations doivent obligatoirement passer par GSAP (GreenSock Animation Platform).**

- ❌ **NE PAS utiliser** : animations CSS natives, animations Tailwind (@keyframes, animate-*)
- ✅ **UTILISER** : GSAP pour tous les effets d'animation (scroll, fade, slide, etc.)

### Pourquoi GSAP ?
- Performances optimales
- Contrôle précis des timelines
- Compatibilité cross-browser
- Animations fluides et professionnelles

### Transitions (pour les états hover/focus seulement)
- **Standard** : `transition-all duration-300` (OK pour hover uniquement)
- **Lentes** : `transition-all duration-500` (OK pour hover uniquement)

### Hover Effects (Transitions CSS autorisées)
- **Scale** : `hover:scale-[1.02]` - Léger agrandissement
- **Translate** : `hover:translate-y-[-4px]` - Mouvement vertical
- **Opacity** : `hover:opacity-100` - Changement d'opacité
- **Background** : `hover:bg-white/20` - Changement de fond

### Animations complexes (GSAP uniquement)
```javascript
// Fade in au scroll
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%"
  }
});

// Timeline complexe
const tl = gsap.timeline();
tl.from(".hero-title", { opacity: 0, y: 30, duration: 0.8 })
  .from(".hero-cta", { opacity: 0, x: -20, duration: 0.6 }, "-=0.4");

// Animation mot par mot avec blur (Section About)
wordsRef.current.forEach((word, index) => {
  gsap.fromTo(
    word,
    {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: word,
        start: "top 85%",
        end: "top 65%",
        scrub: 1,
      },
      delay: index * 0.02, // Délai progressif
    }
  );
});

// Animation en cascade (stagger) pour les cartes de projets
cardsRef.current.forEach((card, index) => {
  if (!card) return;

  // Animation principale de la carte
  gsap.from(card, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      end: "top 60%",
      scrub: 1,
    },
    delay: index * 0.1, // Stagger effect
  });

  // Animation parallaxe subtile de l'image au scroll
  const imageContainer = card.querySelector('.project-image');
  if (imageContainer) {
    gsap.to(imageContainer, {
      y: -20,
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
      },
    });
  }
});

// Animation au hover avec GSAP (plus de contrôle)
card.addEventListener('mouseenter', () => {
  gsap.to(content, {
    y: -5,
    duration: 0.4,
    ease: "power2.out",
  });
});
```

### Setup GSAP dans Next.js
```typescript
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

### Types d'animations utilisées

#### 1. **Blur Reveal** (Section About)
- Chaque mot apparaît progressivement avec un effet de flou
- `filter: blur(10px)` → `blur(0px)`
- Synchronisé au scroll avec `scrub: 1`
- Délai progressif de `0.02s` entre chaque mot

#### 2. **Stagger Animation** (Cartes de projets)
- Apparition en cascade des cartes
- Fade in + scale + translateY
- Délai de `0.1s` entre chaque carte
- Durée de `1.2s` pour une animation fluide

#### 3. **Parallaxe** (Images de projets)
- Mouvement subtil de l'image au scroll
- `y: -20px` sur tout le scroll
- `scrub: 2` pour un mouvement plus lent que le scroll

#### 4. **Fade & Slide** (Titres et boutons)
- Fade in combiné avec translateY ou translateX
- `start: "top 85%"`, `end: "top 65%"`
- `scrub: 1` pour synchronisation parfaite

#### 5. **Hover Interactions** (Contenu des cartes)
- Animation GSAP au hover pour plus de contrôle
- `y: -5px` sur `0.4s`
- Easing `power2.out` pour fluidité

#### 6. **Grid Stagger** (Section Compétences)
- Animation en cascade des cartes de compétences
- Fade in + scale + translateY
- Stagger par ligne : `delay: (index % 3) * 0.05`
- Hover effect : scale de l'icône

#### 7. **Card Reveal** (Section Services)
- Cartes glassmorphism avec animations progressives
- Fade in + scale avec délai de `0.15s` entre chaque
- Hover : changement de gradient + scale + glow effect
- Icônes avec effet de scale au hover

#### 8. **Number Counter** (Section Stats)
- Animation de compteur avec GSAP
- Les chiffres s'incrémentent progressivement de 0 à leur valeur finale
- Durée de `2s` avec `ease: "power2.out"`
- Déclenché quand la section entre dans le viewport (`ScrollTrigger`)
- Supporte les formats : `10+`, `99%`, `25M`, etc.
- Le suffixe (`+`, `%`, `M`) est coloré en orange (#FF4925)
- Design avec bordures verticales gauche/droite uniquement (#333333)
- 13 lignes décoratives en haut sur toute la largeur de chaque carte

#### 9. **Featured Testimonial Carousel** (Témoignages mis en avant)
- Layout horizontal : 55% texte à gauche, 35% image à droite
- Quote en hypertext style (text-6xl, font-bold)
- Quote icon `"` en orange (#FF4925) en font-serif
- Avatar en rounded-2xl avec gradient orange
- Divider horizontal (#333333) entre le quote et l'auteur
- **Carousel automatique** avec Embla Carousel (Autoplay plugin)
- Défilement automatique toutes les **5 secondes** (stopOnInteraction: true)
- Navigation avec boutons Previous/Next en glassmorphism **centrés en bas**
- Animation GSAP de fade-in au scroll pour tout le carousel
- Image en aspect ratio 3:4 avec rounded-xl
- Support de 10 témoignages dans le carousel

---

## 🧩 Composants récurrents

### Boutons

#### CTA Principal (Glassmorphism)
```tsx
<a className="group flex items-center gap-3 px-6 py-3 
  bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-full 
  transition-all duration-300 border border-white/10 shadow-lg">
  <span className="w-7 h-7 rounded-full bg-gradient-to-br 
    from-white/20 to-white/10 backdrop-blur-sm 
    flex items-center justify-center border border-white/20">
    {/* Icon */}
  </span>
  <span className="text-white font-medium">
    Text
  </span>
</a>
```

#### CTA Orange (Alternatif - si accent couleur nécessaire)
```tsx
<a className="group flex items-center gap-3 px-6 py-3 
  bg-orange-500 hover:bg-orange-600 rounded-full 
  transition-all duration-300">
  <span className="w-7 h-7 rounded-full bg-white 
    flex items-center justify-center">
    {/* Icon */}
  </span>
  <span className="text-white font-medium">
    Text
  </span>
</a>
```

#### CTA Secondaire (Minimaliste)
```tsx
<a className="group relative text-white/70 hover:text-white 
  transition-colors duration-300">
  <span className="text-sm tracking-wide uppercase font-light">
    Text
  </span>
  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white 
    transition-all duration-300 group-hover:w-full"></span>
</a>
```

### Cards avec Glassmorphism
```tsx
<div className="relative overflow-hidden rounded-xl 
  bg-gradient-to-t from-black/80 via-transparent to-transparent
  backdrop-blur-sm">
  {/* Content */}
</div>
```

### Navbar Glassmorphism
```tsx
<nav className="fixed top-0 left-0 right-0 z-50">
  <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
    <div className="max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-r from-white/[0.13] to-white/[0.08] 
        backdrop-blur-[100px] rounded-[60px] 
        shadow-[0_1px_2.5px_rgba(0,0,0,0.2)] border border-white/5">
        {/* Content */}
      </div>
    </div>
  </div>
</nav>
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- **sm** : 640px
- **md** : 768px
- **lg** : 1024px
- **xl** : 1280px
- **2xl** : 1536px

### Stratégie Mobile-First
1. Design pour mobile d'abord
2. Ajout progressif pour tablette et desktop
3. Typographie responsive avec classes multiples
4. Grids qui s'adaptent : `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## 📧 Contact Section

### Caractéristiques générales
- **Container** : `w-full`, `min-h-screen`, `overflow-hidden`
- **Background** : Image avec overlay noir (`bg-black/80`) pour un effet élégant
- **Layout** : 50/50 responsive dans un container de 1400px max
- **Centrage** : Contenu centré verticalement et horizontalement
- **Padding** : 80px horizontal (`px-20`), 80px vertical (`py-20`)
- **Gap entre colonnes** : 64-96px responsive (`gap-16 lg:gap-24`)

### GAUCHE - Formulaire (50% width)
**Container wrapper** :
- Width : `lg:w-1/2` (50% sur desktop)
- Alignement : Centré sur mobile, aligné à droite sur desktop (`justify-end`)

**Formulaire blanc (max 470px)** :
- Background : `bg-white`
- Border radius : `rounded-[18px]`
- Padding : `p-10` (40px)
- Max-width : 470px

**Heading du formulaire** :
- Brand : `text-[#0A0A0A]`, `text-sm`, `font-medium`, mb-[12px]
- Titre : `text-[#0A0A0A]`, `text-[32px]`, `font-bold`, `leading-[1.3]`
- Margin bottom : 30px

**Inputs** :
- Height : 58px fixe
- Background : `bg-[#F5F5F5]`
- Border radius : `rounded-[10px]`
- Text color : `text-[#999999]`
- Placeholder : `placeholder:text-[#999999]`
- Padding horizontal : 16px (px-4)
- Labels : `text-[#090909]`, `text-sm`, mb-[12px]
- Space between inputs : 24px

**Submit Button** :
- Width : 100%
- Height : 58px
- Background : `bg-[#0A0A0A]`
- Border radius : `rounded-full`
- Text : `text-base`, `font-medium`, `text-white`

**Legal Text** :
- Text : `text-xs`, `text-[#090909]`, `leading-[1.3]`
- Links : `text-[#0A0A0A]`, `underline`

**Copyright (Desktop uniquement)** :
- Position : En bas de la colonne gauche
- Margin top : 100px
- Text : `text-white`, `text-sm`

### DROITE - Content (50% width)
**Container wrapper** :
- Width : `lg:w-1/2` (50% sur desktop)
- Alignement : Centré sur mobile, aligné à gauche sur desktop (`justify-start`)
- Max-width : 650px

**Heading principal "Let's talk."** :
- Font size : `text-6xl md:text-7xl lg:text-8xl xl:text-[140px]` (responsive)
- Color : `text-white`
- Font weight : `font-bold`
- Line height : `leading-[0.95]`
- Space after : 64px (space-y-16)

**Description** :
- Text : `text-lg` à `text-xl`, `text-white/70` (opacité 70%)
- Leading : `leading-relaxed`
- Max width : 470px

**Divider** :
- Height : 1px
- Background : `bg-white/20` (opacité 20%)
- Width : 100%

**Info Cards (Grid 2 colonnes)** :
- Layout : `grid grid-cols-1 md:grid-cols-2`
- Gap : 32px (`gap-8`)
- Puce (dot) : `w-2 h-2`, `rounded-full`
  - Card 1 : `bg-green-500`
  - Card 2 : `bg-blue-500`
- Titre : `text-lg`, `font-semibold`, `text-white`
- Description : `text-sm`, `text-white/60`, `leading-relaxed`
- Spacing : `space-y-4` pour chaque card

**Contact Card (410px width × 160px height)** :
- **Image Container** (125px × 160px) :
  - Width : 125px fixe
  - Height : 160px fixe
  - Background : `bg-white`
  - Border radius : `rounded-2xl` (16px)
  - Padding : 6px (p-1.5)
  - **Avatar intérieur** (113px × full height) :
    - Background : `bg-gradient-to-br from-orange-400 to-orange-600`
    - Border radius : `rounded-xl` (12px)
    - Initiales "PB" : `text-4xl`, `font-bold`, `text-white`, centré

- **Card Content** (285px × 160px) :
  - Width : 285px fixe
  - Height : 160px fixe
  - Background : `bg-white`
  - Border radius : `rounded-2xl` (16px, pas rounded-r-2xl)
  - Padding : 24px (p-6)
  - **Text Section** :
    - Role : `text-[#0A0A0A]`, `text-xs`, `font-medium`, `h-[14px]`, `mb-[3px]`
    - Company : `text-[#090909]`, `text-xs`, `h-[15px]`, `opacity-60`
    - Name : `text-[#090909]`, `text-[20px]`, `font-semibold`, `leading-[1.265]`, `mt-[5px]`
  - **CTA Button** (128px × 30px) :
    - Width : 128px fixe
    - Height : 30px fixe
    - Background : `bg-[#0A0A0A]`
    - Border radius : `rounded-full`
    - Text : `text-[10px]`, `text-white`
    - Padding : `px-3`
    - Layout : `justify-between` (texte à gauche, dot à droite)
    - White dot (8px × 8px) avec hover scale 1.25

### Animations GSAP (Améliorées)
**Heading "Let's talk."** :
- Fade in + slide up + scale effect
- `y: 100`, `scale: 0.9`, `opacity: 0`
- Duration : 1.5s
- Easing : `power4.out`
- ScrollTrigger : start "top 90%", scrub 1.5

**Formulaire** :
- Slide depuis la gauche
- `x: -100`, `opacity: 0`
- Duration : 1.2s
- Easing : `power3.out`
- ScrollTrigger : start "top 85%", scrub 1.2

**Description** :
- Fade in + slight slide
- `y: 30`, `opacity: 0`
- Duration : 1s
- Easing : `power2.out`

**Divider** :
- Scale horizontalement depuis la gauche
- `scaleX: 0`, `transformOrigin: "left center"`
- Duration : 1s
- Easing : `power2.inOut`

**Info Cards** :
- Stagger animation sur les 2 cards
- `y: 40`, `opacity: 0`, `stagger: 0.2`
- Duration : 1s
- Easing : `power3.out`

**Contact Card** :
- Slide depuis la droite avec rotation 3D
- `x: 60`, `rotateY: -15`, `opacity: 0`
- Duration : 1.2s
- Easing : `power3.out`

### Layout & Centrage
- Container centré verticalement : `min-h-screen flex items-center justify-center`
- Max-width : 1400px avec `mx-auto`
- Formulaire : aligné à droite (`justify-end`) sur desktop
- Contenu : aligné à gauche (`justify-start`) sur desktop
- Gap entre colonnes : 16-24 (responsive)

### Notifications
- Toaster (Sonner) pour les messages de succès/erreur

---

## ❓ FAQ Section

### Caractéristiques générales
- **Background** : Noir (`bg-black`)
- **Layout** : 2 colonnes asymétriques (Titre 360px gauche, Accordion droite)
- **Padding** : `py-20` (vertical), `px-20` (horizontal)
- **Gap** : `gap-32` (128px) entre les colonnes

### GAUCHE - Titre & Social (360px width)
**Container** :
- Width : `lg:w-[360px]`
- Layout : `flex flex-col justify-between`
- Min height : `lg:min-h-[400px]`

**Titre (Hypertext)** :
- Font size : `text-6xl md:text-7xl lg:text-8xl xl:text-[100px]`
- Color : `text-white`
- Font weight : `font-bold`
- Line height : `leading-[0.95]`
- HTML rendering : Supporte les `<br/>` pour mise en forme

**Social Links** :
- Margin : `mt-12 lg:mt-auto`
- Titre "Let's connect" :
  - Color : `text-white/60`
  - Font size : `text-base`
  - Font weight : `font-medium`
  - Margin bottom : `mb-6`
- **Boutons glassmorphisme** :
  - Size : `w-12 h-12` (48px × 48px)
  - Background : `bg-white/10` + `backdrop-blur-sm`
  - Border : `border border-white/20`
  - Border radius : `rounded-[20px]`
  - Hover : `hover:bg-white/20`
  - Gap : `gap-3`
  - Icons : `w-5 h-5`, `text-white`
  - Transition : `transition-all duration-300`

### DROITE - Accordion Glassmorphisme (max 900px)
**Container** :
- Width : `flex-1`
- Max width : `lg:max-w-[900px]`

**Accordion Settings** :
- Type : `single`
- Collapsible : `true`
- Default value : `item-0` (premier item ouvert)
- Spacing : `space-y-4` (16px entre les items)

**Accordion Items (Glassmorphisme)** :
- Background : `bg-white/10` + `backdrop-blur-md`
- Border : `border border-white/20`
- Border radius : `rounded-[30px]`
- Shadow : `shadow-lg`
- Hover : `hover:bg-white/15`
- Overflow : `overflow-hidden`
- Transition : `transition-all duration-300`

**Trigger (Question)** :
- Padding : `px-8 py-6`
- Text :
  - Color : `text-white`
  - Font size : `text-lg md:text-xl`
  - Font weight : `font-semibold`
  - Padding right : `pr-4`
- Icon : Rotation 45° on open (`[&[data-state=open]>svg]:rotate-45`)

**Content (Réponse)** :
- Padding : `px-8 pb-6`
- Text :
  - Color : `text-white/70` (opacité 70%)
  - Font size : `text-base`
  - Line height : `leading-relaxed`

### Animations GSAP
- **Titre** : Fade-in + slide up (`y: 60`, `opacity: 0`)
- **Accordion Items** : Stagger slide from right (`x: 50`, `stagger: 0.1`)
- **Social Links** : Fade-in from bottom (`y: 30`, `opacity: 0`)

### Design Notes
- La FAQ suit entièrement le design system glassmorphisme
- Chaque item de l'accordion est une carte glassmorphisme indépendante
- Espacement généreux entre les items (16px) pour une meilleure lisibilité
- Social links avec effet glassmorphisme cohérent avec le reste du portfolio

---

## 🔗 Footer

### Caractéristiques
- **Background** : Noir (`bg-black`) avec border top blanc/10
- **Layout** : Grid 4 colonnes (responsive)
- **Padding** : 80px horizontal (`px-20`), 64px vertical (`py-16`)

### Grid Layout
- Mobile : 1 colonne
- Tablet : 2 colonnes
- Desktop : 4 colonnes
- Gap : 48px (`gap-12`)

### Sections
1. **Brand** : Logo PB gradient orange + description
2. **Navigation** : Liens vers Home, Projects, Services, Contact
3. **Social** : Boutons glassmorphism avec icônes
4. **Legal** : Terms & Privacy Policy

### Social Buttons
- Taille : 40x40px
- Background : `bg-white/10`, hover `bg-white/20`
- Glassmorphism : `backdrop-blur-sm`
- Icônes : 16x16px en blanc

### Bottom Bar
- Border top blanc/10
- Copyright à gauche en blanc/40
- Status "Available for projects" à droite
- Point vert animé (`animate-pulse`)

---

## ✨ Règles à respecter

### DO ✅
- Utiliser le glassmorphism pour les éléments flottants (navbar, cards, boutons)
- Privilégier les grandes typographies (140-300px) pour les titres principaux
- Garder un padding uniforme de 80px (px-20) sur toutes les sections
- **Utiliser GSAP pour TOUTES les animations** (scroll, fade, slide, etc.)
- Utiliser les transitions CSS uniquement pour les états hover/focus
- Créer de la hiérarchie avec les opacités de blanc
- Border radius généreux (rounded-xl, rounded-[60px])
- Fond noir uniquement (dark mode forcé)

### DON'T ❌
- ❌ **NE JAMAIS utiliser d'animations CSS natives ou Tailwind** (animate-*, @keyframes)
- Ne pas utiliser de max-width sur les containers principaux
- Ne pas mélanger plusieurs styles (rester glassmorphism)
- Ne pas utiliser de petites typographies pour les titres principaux
- Ne pas oublier les états hover et les transitions
- Ne pas surcharger avec trop d'effets
- Ne pas utiliser de light mode

---

## 🎯 Accessibilité

- Contraste minimum respecté (WCAG AA)
- Textes lisibles malgré les effets de transparence
- Zones cliquables suffisamment grandes (min 44x44px)
- Focus visible sur les éléments interactifs
- Alt texts sur toutes les images

---

## 🔧 Configuration technique

### Dark Mode
- Forcé en dark mode : `<html className="dark">`
- Background noir : `bg-black`
- Pas de toggle dark/light mode

### Internationalisation
- Support FR, EN, PL
- `next-international` pour l'i18n
- Language switcher dans la navbar

### SEO
- Metadata dynamique avec `generateMetadata()`
- Structured data (JSON-LD)
- Sitemap et robots.txt
- Images optimisées avec next/image

---

**Dernière mise à jour** : 2025-01-23  
**Version** : 1.0.0


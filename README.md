# 🎨 Patrick Bartosik - Portfolio v2

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.0-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

> Portfolio moderne de développeur Full-Stack spécialisé en e-commerce et solutions Shopify Plus. Conçu avec une architecture Next.js 15, des animations GSAP fluides et un design glassmorphism élégant.

[🌐 Voir le Portfolio](https://patrickbartosik.com) • [📧 Contact](mailto:contact@patrickbartosik.com) • [💼 LinkedIn](https://linkedin.com/in/patrickbartosik)

---

## ✨ Caractéristiques

### 🎯 Design & UX
- **Glassmorphism** - Effets de verre modernes avec backdrop-blur
- **Typographie Hyper-Text** - Titres extra-larges pour un impact visuel fort
- **Animations GSAP** - Animations fluides et professionnelles (scroll triggers, stagger, parallax)
- **Responsive Design** - Interface optimisée mobile-first
- **Dark Mode** - Mode sombre élégant par défaut

### 🚀 Fonctionnalités Techniques
- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **Internationalisation** (FR, EN, PL) avec `next-international`
- **SEO Optimisé** - Metadata dynamique, sitemap, structured data (JSON-LD)
- **Performance** - Images optimisées avec `next/image`, lazy loading
- **Analytics** - Intégration Google Analytics 4

### 📦 Sections
- **Hero** - Présentation dynamique avec animations
- **About** - Animation mot par mot avec blur reveal
- **Services** - Cartes glassmorphism avec hover effects
- **Latest Projects** - Grid de projets avec badges de catégorie
- **Stats** - Compteurs animés avec GSAP
- **Testimonials** - Carousel automatique Embla
- **FAQ** - Accordion glassmorphism
- **Contact** - Formulaire avec validation et notifications

---

## 🛠️ Stack Technique

### Frontend
```json
{
  "framework": "Next.js 15",
  "language": "TypeScript 5.0",
  "styling": "Tailwind CSS 3.4",
  "animations": "GSAP 3.12 + ScrollTrigger",
  "ui-components": "Radix UI + Shadcn",
  "icons": "Lucide React",
  "fonts": "Inter + Anton (Google Fonts)"
}
```

### Tooling & Build
```json
{
  "package-manager": "Bun",
  "linting": "ESLint + Prettier",
  "deployment": "Vercel",
  "i18n": "next-international"
}
```

### Intégrations
- **Email** - Resend (contact form)
- **Notifications** - Sonner (toast notifications)
- **Carousel** - Embla Carousel + Autoplay
- **Analytics** - Google Analytics 4

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js 18+ ou Bun
- Git

### Installation

```bash
# Cloner le repository
git clone https://github.com/patrickbartosik/portfolio-v2.git
cd portfolio-v2

# Installer les dépendances avec Bun (recommandé)
bun install

# Ou avec npm
npm install
```

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Resend API (pour le formulaire de contact)
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=contact@patrickbartosik.com
RESEND_TO_EMAIL=patrick@example.com
```

### Développement

```bash
# Démarrer le serveur de développement
bun dev

# Ou avec npm
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build & Production

```bash
# Créer un build de production
bun run build

# Démarrer le serveur de production
bun start

# Ou avec npm
npm run build && npm start
```

---

## 📁 Structure du Projet

```
portfolio-v2/
├── public/
│   ├── images/
│   │   ├── projects/       # Images des projets
│   │   └── og-image.svg    # Open Graph image
│   └── fonts/              # Fonts locales (si nécessaire)
├── src/
│   ├── app/
│   │   ├── [locale]/       # Routes internationalisées
│   │   │   ├── layout.tsx  # Layout principal
│   │   │   ├── page.tsx    # Homepage
│   │   │   ├── projects/   # Page des projets
│   │   │   ├── contact/    # Page de contact
│   │   │   └── ...
│   │   ├── not-found.tsx   # 404 global
│   │   ├── sitemap.ts      # Sitemap dynamique
│   │   └── globals.css     # Styles globaux
│   ├── components/
│   │   ├── ProjectCard.tsx
│   │   ├── LatestProjectsSection.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Analytics.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── data/
│   │   │   └── lastwork.data.ts    # Données des projets
│   │   └── structured-data.ts      # JSON-LD schemas
│   ├── locales/
│   │   ├── en.ts           # Traductions anglaises
│   │   ├── fr.ts           # Traductions françaises
│   │   └── pl.ts           # Traductions polonaises
│   └── types/              # Types TypeScript
├── DESIGN-SYSTEM.md        # Guide de design
├── vercel.json             # Configuration Vercel
└── package.json
```

---

## 🎨 Design System

Le portfolio suit un design system cohérent basé sur le **Glassmorphism** et la **typographie Hyper-Text**.

### Principes clés

#### 1. Glassmorphism
```tsx
// Exemple de carte glassmorphism
<div className="bg-white/10 backdrop-blur-md rounded-[30px] border border-white/20 shadow-lg">
  {/* Contenu */}
</div>
```

#### 2. Animations GSAP
```typescript
// Animation au scroll
gsap.from(".element", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%"
  }
});
```

#### 3. Typographie
- **Headings** : Anton (Google Fonts) - Bold, uppercase
- **Body** : Inter (Google Fonts) - Regular, light
- **Tailles** : De 140px à 300px pour les titres principaux

Pour plus de détails, consultez [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md)

---

## 📊 Données des Projets

Les projets sont définis dans `src/lib/data/lastwork.data.ts` :

```typescript
export interface Project {
  title: string;
  image?: string;
  bgColor: string;
  technologies: string[];
  link?: string;
  slug: string;
  description?: string;
  type: ProjectType; // 'freelance' | 'internship' | 'school'
  typeLabel: string;
  company?: string;
}
```

### Badges de catégories
- **Freelance** - Projets clients indépendants
- **Alternance/CDI** - Projets réalisés en entreprise
- **Projet Scolaire** - Projets académiques

---

## 🌍 Internationalisation

Le site supporte 3 langues :
- 🇫🇷 Français (par défaut)
- 🇬🇧 Anglais
- 🇵🇱 Polonais

### Ajouter une traduction

1. Créer un fichier dans `src/locales/` (ex: `de.ts` pour l'allemand)
2. Copier la structure de `en.ts`
3. Traduire tous les textes
4. Mettre à jour la configuration i18n

```typescript
// src/locales/de.ts
export default {
  hero: {
    greeting: "Hallo, ich bin",
    name: "Patrick Bartosik",
    // ...
  }
}
```

---

## 🚀 Déploiement

### Vercel (Recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/patrickbartosik/portfolio-v2)

1. Connecter votre repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement à chaque push

### Autres plateformes

Le portfolio est compatible avec :
- **Netlify**
- **AWS Amplify**
- **Cloudflare Pages**
- **Self-hosted** (Docker)

---

## 🎯 Performances

### Lighthouse Score
- **Performance** : 95+
- **Accessibility** : 100
- **Best Practices** : 100
- **SEO** : 100

### Optimisations
✅ Images optimisées avec `next/image`  
✅ Lazy loading des composants  
✅ Code splitting automatique  
✅ Minification CSS/JS  
✅ Compression Gzip/Brotli  
✅ Cache headers optimisés  

---

## 📝 Scripts Disponibles

```bash
# Développement
bun dev              # Démarrer le serveur de développement
bun build            # Build de production
bun start            # Serveur de production
bun lint             # Linter ESLint
bun format           # Formatter avec Prettier

# Tests
bun test             # Lancer les tests (si configurés)
bun type-check       # Vérification TypeScript
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📄 License

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Patrick Bartosik**  
Développeur Full-Stack E-commerce & Shopify Plus

- 🌐 Website: [patrickbartosik.com](https://patrickbartosik.com)
- 💼 LinkedIn: [linkedin.com/in/patrickbartosik](https://linkedin.com/in/patrickbartosik)
- 📧 Email: contact@patrickbartosik.com
- 🐙 GitHub: [@patrickbartosik](https://github.com/patrickbartosik)

---

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - Le framework React pour la production
- [Vercel](https://vercel.com/) - Hébergement et déploiement
- [GSAP](https://greensock.com/gsap/) - Animations professionnelles
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Radix UI](https://www.radix-ui.com/) - Composants UI accessibles
- [Lucide](https://lucide.dev/) - Icônes SVG magnifiques

---

<div align="center">

### ⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile !

Made with ❤️ by [Patrick Bartosik](https://patrickbartosik.com)

</div>

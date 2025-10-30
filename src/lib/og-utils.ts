import { seoConfig } from './seo-config';

/**
 * Génère une URL pour l'image Open Graph dynamique
 * @param title - Titre à afficher sur l'image
 * @param subtitle - Sous-titre à afficher
 * @param description - Description optionnelle
 * @returns URL complète de l'image OG
 */
export function generateOgImageUrl(
    title?: string,
    subtitle?: string,
    description?: string
): string {
    const params = new URLSearchParams();

    if (title) params.set('title', title);
    if (subtitle) params.set('subtitle', subtitle);
    if (description) params.set('description', description);

    const query = params.toString();
    const path = query ? `/api/og/dynamic?${query}` : '/api/og';

    return `${seoConfig.baseUrl}${path}`;
}

/**
 * Génère l'URL de l'image OG par défaut
 */
export function getDefaultOgImageUrl(): string {
    return `${seoConfig.baseUrl}/api/og`;
}

/**
 * Exemple d'utilisation pour une page de projet
 */
export function generateProjectOgImage(projectTitle: string, projectDescription?: string): string {
    return generateOgImageUrl(
        projectTitle,
        'Portfolio - Patrick Bartosik',
        projectDescription
    );
}

/**
 * Exemple d'utilisation pour une page de blog/article
 */
export function generateArticleOgImage(articleTitle: string, category?: string): string {
    return generateOgImageUrl(
        articleTitle,
        category || 'Article',
        'Par Patrick Bartosik - Développeur Full-Stack'
    );
}


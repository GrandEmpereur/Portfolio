import type { MetadataRoute } from 'next';
import { seoConfig } from '@/lib/seo-config';

/**
 * robots.txt
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
 *
 * A crawler obeys ONE group only: the most specific one naming it. A named group does not inherit
 * from `User-agent: *`, so every named group must repeat the form-route exceptions it needs.
 *
 * The Open Graph image is a static file (`/og/og-image.png`), outside `/api/`: no rule may block it,
 * social networks fetch it for link previews.
 * No `/_next/` rule: Googlebot needs the JS and CSS there to render the pages.
 */
const FORM_ROUTES = ['/api/contact', '/api/contact-simple', '/api/contact-source'];

// Crawlers that collect content to train generative models (GPTBot, ClaudeBot, Google-Extended, CCBot).
// Decision of the site owner: they are allowed on the public pages, as before. To opt out of training,
// switch `disallow` below to ['/'] (this does not affect Google Search, ChatGPT search or Claude search,
// which use other tokens and fall under the `*` group). `anthropic-ai` is a legacy token that Anthropic
// no longer documents; it is kept because it was already listed.
const TRAINING_CRAWLERS = ['GPTBot', 'ClaudeBot', 'anthropic-ai', 'Google-Extended', 'CCBot'];

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Everyone else: search engines, AI search crawlers (OAI-SearchBot, Claude-SearchBot,
            // PerplexityBot) and user-triggered fetchers (ChatGPT-User, Claude-User, Perplexity-User).
            {
                userAgent: '*',
                allow: '/',
                disallow: FORM_ROUTES,
            },
            {
                userAgent: TRAINING_CRAWLERS,
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: `${seoConfig.baseUrl}/sitemap.xml`,
    };
}

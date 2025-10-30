import { NextRequest } from 'next/server';

/**
 * Preview page pour visualiser les images OG en développement
 * Accessible uniquement en développement à : /api/og/preview
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const variant = searchParams.get('variant') || 'default';

    const examples = {
        default: {
            url: '/api/og',
            title: 'Image OG par défaut',
            description: 'Image principale du portfolio',
        },
        custom: {
            url: '/api/og/dynamic?title=Mon%20Projet%20Shopify&subtitle=E-commerce%20-%202024',
            title: 'Image OG personnalisée',
            description: 'Exemple avec titre et sous-titre personnalisés',
        },
        long: {
            url: '/api/og/dynamic?title=Un%20Projet%20avec%20un%20Tr%C3%A8s%20Long%20Titre%20pour%20Tester%20le%20Responsive&subtitle=Next.js%20%2B%20Shopify%20Plus&description=Description%20compl%C3%A8te%20du%20projet',
            title: 'Image OG avec texte long',
            description: 'Test avec beaucoup de contenu',
        },
    };

    const example = examples[variant as keyof typeof examples] || examples.default;

    return new Response(
        `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OG Image Preview - Patrick Bartosik</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            color: #fff;
            padding: 40px 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            background: linear-gradient(to right, #fff, #FF6B35);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .subtitle {
            color: #999;
            margin-bottom: 40px;
            font-size: 1.1rem;
        }
        .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }
        .tab {
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: #fff;
            text-decoration: none;
            transition: all 0.3s;
            font-size: 0.95rem;
        }
        .tab:hover {
            background: rgba(255, 107, 53, 0.2);
            border-color: #FF6B35;
        }
        .tab.active {
            background: #FF6B35;
            border-color: #FF6B35;
        }
        .preview {
            background: rgba(0, 0, 0, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
        }
        .preview h2 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #FF6B35;
        }
        .preview p {
            color: #999;
            margin-bottom: 20px;
        }
        .image-wrapper {
            background: #000;
            border: 2px solid rgba(255, 107, 53, 0.3);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
        }
        img {
            width: 100%;
            height: auto;
            display: block;
        }
        .info {
            background: rgba(255, 107, 53, 0.1);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 12px;
            padding: 20px;
            margin-top: 30px;
        }
        .info h3 {
            color: #FF6B35;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        .info-item {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 8px;
        }
        .info-label {
            color: #999;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        .info-value {
            color: #fff;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            word-break: break-all;
        }
        code {
            background: rgba(0, 0, 0, 0.5);
            padding: 2px 6px;
            border-radius: 4px;
            color: #FF6B35;
            font-size: 0.9em;
        }
        .tools {
            margin-top: 30px;
        }
        .tools h3 {
            margin-bottom: 15px;
            color: #FF6B35;
        }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 15px;
        }
        .tool-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s;
        }
        .tool-card:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 107, 53, 0.5);
            transform: translateY(-2px);
        }
        .tool-card h4 {
            color: #fff;
            margin-bottom: 8px;
            font-size: 1.1rem;
        }
        .tool-card p {
            color: #999;
            margin-bottom: 12px;
            font-size: 0.9rem;
        }
        .tool-card a {
            color: #FF6B35;
            text-decoration: none;
            font-size: 0.9rem;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        .tool-card a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 OG Image Preview</h1>
        <p class="subtitle">Aperçu des images Open Graph générées dynamiquement</p>

        <div class="tabs">
            <a href="/api/og/preview?variant=default" class="tab ${variant === 'default' ? 'active' : ''}">
                Par défaut
            </a>
            <a href="/api/og/preview?variant=custom" class="tab ${variant === 'custom' ? 'active' : ''}">
                Personnalisée
            </a>
            <a href="/api/og/preview?variant=long" class="tab ${variant === 'long' ? 'active' : ''}">
                Texte long
            </a>
        </div>

        <div class="preview">
            <h2>${example.title}</h2>
            <p>${example.description}</p>
            <div class="image-wrapper">
                <img src="${example.url}" alt="OG Image Preview" />
            </div>
        </div>

        <div class="info">
            <h3>📋 Informations techniques</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">URL de l'image</div>
                    <div class="info-value">${example.url}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Dimensions</div>
                    <div class="info-value">1200x630px (Ratio 1.91:1)</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Format</div>
                    <div class="info-value">PNG (généré dynamiquement)</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Runtime</div>
                    <div class="info-value">Edge Runtime (Vercel)</div>
                </div>
            </div>
        </div>

        <div class="tools">
            <h3>🔍 Outils de validation</h3>
            <p style="color: #999; margin-bottom: 15px;">
                Testez votre image OG sur les différentes plateformes :
            </p>
            <div class="tools-grid">
                <div class="tool-card">
                    <h4>Facebook Debugger</h4>
                    <p>Vérifiez comment votre image apparaît sur Facebook</p>
                    <a href="https://developers.facebook.com/tools/debug/" target="_blank">
                        Ouvrir l'outil →
                    </a>
                </div>
                <div class="tool-card">
                    <h4>Twitter Card Validator</h4>
                    <p>Prévisualisez votre carte Twitter</p>
                    <a href="https://cards-dev.twitter.com/validator" target="_blank">
                        Ouvrir l'outil →
                    </a>
                </div>
                <div class="tool-card">
                    <h4>LinkedIn Inspector</h4>
                    <p>Testez votre image sur LinkedIn</p>
                    <a href="https://www.linkedin.com/post-inspector/" target="_blank">
                        Ouvrir l'outil →
                    </a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
        `,
        {
            headers: {
                'Content-Type': 'text/html',
            },
        }
    );
}


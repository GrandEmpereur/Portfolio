import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Palette written out here: these routes cannot read the CSS tokens (ink, bone, accent).
const INK = '#0B0B0A';
const BONE = '#ECE7DE';
const ACCENT = '#EC2A45';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Paramètres dynamiques
        const title = searchParams.get('title') || 'Patrick Bartosik';
        const subtitle = searchParams.get('subtitle') || 'AI Engineer & Full Stack';
        const description = searchParams.get('description');

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: INK,
                        position: 'relative',
                    }}
                >
                    {/* Background gradient circles */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-100px',
                            left: '-100px',
                            width: '400px',
                            height: '400px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(236, 42, 69, 0.15) 0%, transparent 70%)',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-50px',
                            right: '-50px',
                            width: '360px',
                            height: '360px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(236, 42, 69, 0.10) 0%, transparent 70%)',
                        }}
                    />

                    {/* Glassmorphism card */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '1040px',
                            padding: '60px',
                            background: 'rgba(236, 231, 222, 0.05)',
                            border: '2px solid rgba(236, 231, 222, 0.16)',
                            borderRadius: '24px',
                        }}
                    >
                        {/* Decorative accent line */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '120px',
                                left: '80px',
                                width: '170px',
                                height: '4px',
                                background: ACCENT,
                                borderRadius: '2px',
                            }}
                        />

                        {/* Title */}
                        <div
                            style={{
                                fontSize: title.length > 20 ? '56px' : '72px',
                                fontWeight: 'bold',
                                background: 'linear-gradient(to right, #ECE7DE, rgba(236, 42, 69, 0.9))',
                                backgroundClip: 'text',
                                color: 'transparent',
                                marginBottom: '16px',
                                textAlign: 'center',
                                maxWidth: '900px',
                            }}
                        >
                            {title}
                        </div>

                        {/* Subtitle */}
                        <div
                            style={{
                                fontSize: '42px',
                                fontWeight: '600',
                                color: BONE,
                                opacity: 0.9,
                                marginBottom: description ? '24px' : '40px',
                                textAlign: 'center',
                            }}
                        >
                            {subtitle}
                        </div>

                        {/* Description (optional) */}
                        {description && (
                            <div
                                style={{
                                    fontSize: '24px',
                                    fontWeight: '400',
                                    color: BONE,
                                    opacity: 0.7,
                                    marginBottom: '40px',
                                    textAlign: 'center',
                                    maxWidth: '800px',
                                }}
                            >
                                {description}
                            </div>
                        )}

                        {/* Badges */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '20px',
                                marginTop: '20px',
                            }}
                        >
                            {['AI Engineering', 'Full Stack'].map((label) => (
                                <div
                                    key={label}
                                    style={{
                                        padding: '12px 28px',
                                        border: `1.5px solid ${label === 'Full Stack' ? ACCENT : 'rgba(236, 231, 222, 0.42)'}`,
                                        borderRadius: '999px',
                                        fontSize: '20px',
                                        fontWeight: 500,
                                        color: label === 'Full Stack' ? ACCENT : BONE,
                                    }}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>

                        {/* URL at bottom */}
                        <div
                            style={{
                                position: 'absolute',
                                bottom: '50px',
                                fontSize: '24px',
                                fontWeight: '400',
                                color: BONE,
                                opacity: 0.5,
                            }}
                        >
                            patrick.bartosik.fr
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e) {
        console.error('Error generating OG image:', e);
        return new Response('Failed to generate image', { status: 500 });
    }
}


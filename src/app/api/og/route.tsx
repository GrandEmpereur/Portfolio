import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
                    backgroundColor: '#000000',
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
                        background: 'radial-gradient(circle, rgba(255, 107, 53, 0.15) 0%, transparent 70%)',
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
                        background: 'radial-gradient(circle, rgba(255, 140, 90, 0.15) 0%, transparent 70%)',
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
                        height: '380px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '24px',
                        padding: '60px',
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
                            background: '#FF6B35',
                            borderRadius: '2px',
                        }}
                    />

                    {/* Name */}
                    <div
                        style={{
                            fontSize: '72px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #FFFFFF, rgba(255, 107, 53, 0.8))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginBottom: '16px',
                        }}
                    >
                        Patrick Bartosik
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: '42px',
                            fontWeight: '600',
                            color: '#FFFFFF',
                            opacity: 0.9,
                            marginBottom: '40px',
                        }}
                    >
                        Développeur Full-Stack
                    </div>

                    {/* Technologies badges */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                            marginTop: '20px',
                        }}
                    >
                        <div
                            style={{
                                padding: '12px 28px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                            }}
                        >
                            React
                        </div>
                        <div
                            style={{
                                padding: '12px 28px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                            }}
                        >
                            Next.js
                        </div>
                        <div
                            style={{
                                padding: '12px 28px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '12px',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                            }}
                        >
                            TypeScript
                        </div>
                        <div
                            style={{
                                padding: '12px 28px',
                                background: 'rgba(255, 107, 53, 0.2)',
                                border: '1.5px solid rgba(255, 107, 53, 0.4)',
                                borderRadius: '12px',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: '#FF6B35',
                            }}
                        >
                            Shopify Plus
                        </div>
                    </div>

                    {/* URL at bottom */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '50px',
                            fontSize: '24px',
                            fontWeight: '400',
                            color: '#FFFFFF',
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
}


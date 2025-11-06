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

                    {/* Logo Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '48px',
                        }}
                    >
                        <div
                            style={{
                                width: '56px',
                                height: '56px',
                                background: 'linear-gradient(135deg, #DAB967 0%, #BC874D 62%, #AE6E41 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                color: '#000000',
                            }}
                        >
                            PB
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                                opacity: 0.9,
                            }}
                        >
                            <span>Bartosik</span>
                            <span>Patrick</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <div
                        style={{
                            fontSize: '82px',
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            marginBottom: '24px',
                            lineHeight: 1.1,
                            textAlign: 'center',
                        }}
                    >
                        Développeur
                    </div>
                    <div
                        style={{
                            fontSize: '82px',
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            marginBottom: '48px',
                            lineHeight: 1.1,
                            textAlign: 'center',
                        }}
                    >
                        Full Stack
                    </div>

                    {/* Technologies badges */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '16px',
                        }}
                    >
                        <div
                            style={{
                                padding: '10px 24px',
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '10px',
                                fontSize: '18px',
                                fontWeight: '500',
                                color: '#FFFFFF',
                                opacity: 0.9,
                            }}
                        >
                            React • Next.js
                        </div>
                        <div
                            style={{
                                padding: '10px 24px',
                                background: 'rgba(218, 185, 103, 0.15)',
                                border: '1.5px solid rgba(218, 185, 103, 0.3)',
                                borderRadius: '10px',
                                fontSize: '18px',
                                fontWeight: '500',
                                color: '#DAB967',
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


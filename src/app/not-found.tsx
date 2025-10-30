"use client";

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simple vanilla JS animation since we can't use GSAP here
        const heading = document.querySelector('.not-found-heading');
        if (heading) {
            heading.classList.add('animate-float');
        }
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '5rem 1.5rem',
                background: '#000',
                color: '#fff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                overflow: 'hidden',
            }}
        >
            {/* Background gradients */}
            <div style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 50%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'pulse 3s ease-in-out infinite',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '25%',
                    right: '25%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '25%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(234, 88, 12, 0.05) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }} />
            </div>

            <div style={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: '80rem',
                margin: '0 auto',
                textAlign: 'center',
            }}>
                {/* 404 Number */}
                <div style={{ marginBottom: '3rem' }}>
                    <h1
                        className="not-found-heading"
                        style={{
                            fontSize: 'clamp(120px, 20vw, 320px)',
                            fontWeight: 900,
                            lineHeight: 0.85,
                            letterSpacing: '-0.05em',
                            background: 'linear-gradient(to bottom right, #fff 0%, rgba(255, 255, 255, 0.9) 50%, rgba(249, 115, 22, 0.4) 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: 0,
                        }}
                    >
                        404
                    </h1>
                </div>

                {/* Glass card */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '3rem 2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                >
                    <h2 style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        lineHeight: 1.2,
                    }}>
                        Page Not Found
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxWidth: '48rem',
                        margin: '0 auto',
                        lineHeight: 1.6,
                    }}>
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>
                </div>

                {/* Buttons */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                }}>
                    <Link
                        href="/"
                        style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '300px',
                            overflow: 'hidden',
                            borderRadius: '9999px',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            display: 'inline-block',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            const overlay = e.currentTarget.querySelector('.button-overlay') as HTMLElement;
                            if (overlay) overlay.style.opacity = '1';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            const overlay = e.currentTarget.querySelector('.button-overlay') as HTMLElement;
                            if (overlay) overlay.style.opacity = '0';
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            padding: '1rem 2rem',
                            background: 'linear-gradient(to right, #f97316, #ea580c)',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            color: '#000',
                            overflow: 'hidden',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                        }}>
                            <span style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                Back to Home
                            </span>
                            <div
                                className="button-overlay"
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(to right, #ea580c, #c2410c)',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                        </div>
                    </Link>

                    <Link
                        href="/projects"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            padding: '1rem 2rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderRadius: '9999px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            fontWeight: 600,
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            color: '#fff',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                        </svg>
                        <span>View Projects</span>
                    </Link>

                    <Link
                        href="/contact"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            padding: '1rem 2rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderRadius: '9999px',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            fontWeight: 600,
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            textDecoration: 'none',
                            color: '#fff',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        <span>Contact Me</span>
                    </Link>
                </div>

                {/* Decorative dots */}
                <div style={{
                    marginTop: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        background: '#f97316',
                        animation: 'pulse 2s ease-in-out infinite',
                    }} />
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        background: 'rgba(249, 115, 22, 0.6)',
                        animation: 'pulse 2s ease-in-out 0.3s infinite',
                    }} />
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '9999px',
                        background: 'rgba(249, 115, 22, 0.3)',
                        animation: 'pulse 2s ease-in-out 0.6s infinite',
                    }} />
                </div>
            </div>

            {/* Inline keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          @media (min-width: 640px) {
            .not-found-heading {
              font-size: clamp(180px, 20vw, 320px) !important;
            }
          }
        `
            }} />
        </div>
    );
}

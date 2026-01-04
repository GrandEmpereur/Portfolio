"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import SplitType from "split-type";
import Link from "next/link";
import heroImage from "../../public/images/hero.webp";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
    title: string;
    name: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
    altText: string;
}

export const HeroSection = ({
    title,
    name,
    ctaPrimary,
    ctaSecondary,
    ctaTertiary,
    altText,
}: HeroSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const ctasRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !nameRef.current) return;

        // Détection mobile pour optimiser les animations
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        const ctx = gsap.context(() => {
            // Timeline d'entrée
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            // 1. Titre professionnel
            if (titleRef.current) {
                tl.from(titleRef.current, {
                    opacity: 0,
                    y: isMobile ? 20 : 30,
                    duration: isMobile ? 0.6 : 1,
                }, 0.2);
            }

            // 2. Animation du nom - Simplifiée sur mobile
            if (isMobile) {
                // Animation simple fade-in sur mobile (pas de split text)
                tl.from(
                    nameRef.current,
                    {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    0.4
                );
            } else {
                // Animation complexe lettre par lettre sur desktop
                const split = new SplitType(nameRef.current!, {
                    types: "chars",
                    tagName: "span",
                });

                if (split.chars) {
                    tl.from(
                        split.chars,
                        {
                            opacity: 0,
                            y: 100,
                            rotationX: -90,
                            stagger: 0.05,
                            duration: 1,
                            ease: "back.out(1.7)",
                        },
                        0.4
                    );
                }
            }

            // 3. CTAs
            if (ctasRef.current) {
                tl.from(
                    ctasRef.current,
                    {
                        opacity: 0,
                        y: isMobile ? 20 : 40,
                        duration: isMobile ? 0.6 : 1,
                    },
                    isMobile ? 0.6 : 0.8
                );
            }

            // 4. Scroll indicator
            if (scrollIndicatorRef.current) {
                tl.from(
                    scrollIndicatorRef.current,
                    {
                        opacity: 0,
                        y: 20,
                        duration: 0.8,
                    },
                    isMobile ? 0.8 : 1
                );
            }

            // Parallax sur le background - DÉSACTIVÉ sur mobile pour les performances
            if (!isMobile && backgroundRef.current) {
                gsap.to(backgroundRef.current, {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const nameParts = name.split(" ");

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center overflow-hidden"
        >
            {/* Background avec overlay optimisé */}
            <div className="absolute inset-0 z-0">
                <div ref={backgroundRef} className="absolute inset-0 will-change-transform">
                    <Image
                        src={heroImage}
                        alt={altText}
                        fill
                        className="object-cover scale-110"
                        priority
                        placeholder="blur"
                        sizes="100vw"
                        quality={75}
                    />
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black/90"></div>
                {/* Grain texture pour profondeur */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30"></div>
            </div>

            {/* Conteneur principal - Layout organisé */}
            <div className="relative z-10 w-full min-h-screen flex flex-col">
                {/* Espace du haut pour navbar */}
                <div className="flex-1"></div>

                {/* Contenu principal - Centré */}
                <div className="w-full px-4 sm:px-6 md:px-8 pb-16 sm:pb-24 md:pb-32">
                    <div className="max-w-full mx-auto">
                        {/* Titre professionnel - En haut à gauche */}
                        <div ref={titleRef} className="mb-6 sm:mb-8 lg:mb-12">
                            <p className="text-xs md:text-sm text-white/50 font-light tracking-[0.3em] uppercase">
                                {title}
                            </p>
                        </div>

                        {/* Grid Layout - 2 colonnes sur desktop */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
                            {/* Nom - Prend plus d'espace (8 colonnes) */}
                            <div className="lg:col-span-8">
                                <h1
                                    ref={nameRef}
                                    className="text-[50px] sm:text-[70px] md:text-[110px] lg:text-[140px] xl:text-[180px] font-bold leading-[0.92] tracking-tight text-white"
                                >
                                    {nameParts.map((part, index) => (
                                        <span key={index} className="block">
                                            {part}
                                        </span>
                                    ))}
                                </h1>
                            </div>

                            {/* CTAs - Alignés à droite (4 colonnes) */}
                            <div ref={ctasRef} className="lg:col-span-4 flex justify-start lg:justify-end">
                                <div className="flex flex-col gap-5 lg:gap-6">
                                    <Link
                                        href="/projects"
                                        className="group relative inline-flex items-center gap-3 text-white hover:text-white/90 transition-all duration-300 active:scale-95"
                                    >
                                        <span className="text-sm lg:text-base tracking-wide uppercase font-medium">
                                            {ctaPrimary}
                                        </span>
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </Link>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <Link
                                        href="/contact"
                                        className="group relative inline-flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 active:scale-95"
                                    >
                                        <span className="text-sm lg:text-base tracking-wide uppercase font-light">
                                            {ctaSecondary}
                                        </span>
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </Link>

                                    <div className="w-full h-px bg-white/10"></div>

                                    <Link
                                        href="/CV.pdf"
                                        download="Patrick_Bartosik_CV.pdf"
                                        target="_blank"
                                        className="group relative inline-flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 active:scale-95"
                                    >
                                        <span className="text-sm lg:text-base tracking-wide uppercase font-light">
                                            {ctaTertiary}
                                        </span>

                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Bas centre (masqué sur petit mobile) */}
            <div
                ref={scrollIndicatorRef}
                className="hidden sm:flex absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-white/50 text-xs tracking-widest uppercase">
                        Scroll
                    </span>
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2 relative overflow-hidden">
                        <div className="w-1 h-3 bg-white/60 rounded-full animate-scroll"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};


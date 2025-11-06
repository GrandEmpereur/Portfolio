"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import type { Service } from "@/lib/data/services.data";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ServicesSectionProps {
    title: string;
    services: Service[];
    locale: 'fr' | 'en' | 'pl';
    ctaText: string;
}

export const ServicesSection = ({ title, services, locale, ctaText }: ServicesSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre avec parallax
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    opacity: 0,
                    y: 80,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                });

                // Parallax sur le titre
                gsap.to(titleRef.current, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }

            // Animation 3D des cartes
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const icon = card.querySelector(".service-icon");

                // Perspective 3D sur la carte
                gsap.set(card, {
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                });

                // Animation d'entrée 3D
                gsap.from(card, {
                    opacity: 0,
                    y: 100,
                    rotationX: -15,
                    scale: 0.9,
                    duration: 1.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                    delay: index * 0.1,
                });

                // Hover effects 3D - DÉSACTIVÉS sur mobile/tablette
                const isTouchDevice =
                    window.matchMedia('(max-width: 1023px)').matches ||
                    'ontouchstart' in window;

                if (!isTouchDevice) {
                    card.addEventListener("mouseenter", () => {
                        gsap.to(card, {
                            y: -10,
                            scale: 1.02,
                            duration: 0.5,
                            ease: "power3.out",
                        });

                        if (icon) {
                            gsap.to(icon, {
                                scale: 1.2,
                                rotation: 10,
                                duration: 0.5,
                                ease: "back.out(1.7)",
                            });
                        }
                    });

                    card.addEventListener("mouseleave", () => {
                        gsap.to(card, {
                            y: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: "power3.out",
                        });

                        if (icon) {
                            gsap.to(icon, {
                                scale: 1,
                                rotation: 0,
                                duration: 0.5,
                                ease: "back.out(1.7)",
                            });
                        }
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20"
        >
            {/* Header */}
            <div className="mb-8 sm:mb-12 md:mb-16">
                <h2
                    ref={titleRef}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/90 leading-none tracking-tight"
                >
                    {title}
                </h2>
            </div>

            {/* Services Grid - Bento Box Layout Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        ref={(el) => {
                            cardsRef.current[index] = el;
                        }}
                        className="group relative overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 p-5 sm:p-6 md:p-7 lg:p-8 transform-gpu transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-orange-500/10 active:scale-95 flex flex-col"
                    >
                        {/* Gradient background on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Content */}
                        <div className="relative z-10 flex flex-col h-full">
                            {/* Icon Emoji */}
                            <div className="service-icon mb-4 sm:mb-5 md:mb-6 text-4xl sm:text-5xl md:text-6xl">
                                {service.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/90 mb-3 sm:mb-4 leading-tight">
                                {service.title[locale]}
                            </h3>

                            {/* Description */}
                            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6">
                                {service.description[locale]}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6 flex-grow">
                                {service.features[locale].slice(0, 3).map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-white/50">
                                        <span className="text-orange-500 mt-0.5 text-sm sm:text-base flex-shrink-0">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-7 md:mb-8">
                                {service.technologies.slice(0, 3).map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs rounded-full glass-light text-white/70 border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Button - Always at bottom */}
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs sm:text-sm font-semibold hover:from-orange-600 hover:to-orange-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 mt-auto"
                            >
                                <span>{ctaText}</span>
                                <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
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
                ))}
            </div>
        </section>
    );
};


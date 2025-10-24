"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface KnowledgeItem {
    title: string;
    icon: string;
}

interface KnowledgeSectionProps {
    title: string;
    description: string;
    knowledge: KnowledgeItem[];
    knowledgeAlts: { [key: string]: string };
}

export const KnowledgeSection = ({
    title,
    description,
    knowledge,
    knowledgeAlts,
}: KnowledgeSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre avec parallax
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    opacity: 0,
                    x: -80,
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
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }

            // Animation de la description
            if (descriptionRef.current) {
                gsap.from(descriptionRef.current, {
                    opacity: 0,
                    x: 80,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation en cascade des cartes avec rotation
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const logo = card.querySelector(".logo");
                const number = card.querySelector(".number");

                // Animation d'entrée de la carte avec rotation
                gsap.from(card, {
                    opacity: 0,
                    y: 60,
                    rotation: -5,
                    scale: 0.9,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 65%",
                        scrub: 1.5,
                    },
                    delay: (index % 3) * 0.08, // Stagger par ligne
                });

                // Hover effects avancés
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, {
                        y: -15,
                        scale: 1.05,
                        duration: 0.5,
                        ease: "power3.out",
                    });

                    if (logo) {
                        gsap.to(logo, {
                            rotation: 5,
                            scale: 1.2,
                            duration: 0.5,
                            ease: "back.out(1.7)",
                        });
                    }

                    if (number) {
                        gsap.to(number, {
                            scale: 1.2,
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out",
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

                    if (logo) {
                        gsap.to(logo, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: "back.out(1.7)",
                        });
                    }

                    if (number) {
                        gsap.to(number, {
                            scale: 1,
                            opacity: 0.5,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [knowledge.length]);

    return (
        <section
            ref={sectionRef}
            className="flex flex-col gap-y-24 items-center justify-center py-32 px-20"
        >
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-32 w-full">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                >
                    {title}
                </h2>

                <p
                    ref={descriptionRef}
                    className="text-base md:text-lg font-medium leading-relaxed text-gray-400"
                >
                    {description}
                </p>
            </div>

            {/* Grille 3 colonnes x 4 rangées */}
            <div className="relative grid grid-cols-3 w-full">
                {knowledge.map((item, index) => {
                    const altText = knowledgeAlts[item.title] || item.title;
                    return (
                        <div
                            key={item.title}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className="relative flex min-h-[200px] p-[29.66px_24px_29.65px_24px] flex-col justify-center items-center border border-white/08 group hover:bg-white/5 transition-colors duration-300 cursor-pointer"
                        >
                            <div className="logo mb-4 text-white">
                                <Image
                                    src={item.icon}
                                    alt={altText}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-contain"
                                    style={{ filter: "brightness(0) invert(1)" }}
                                />
                            </div>
                            <h3 className="text-white text-xl">{item.title}</h3>
                            <span className="number absolute bottom-6 right-6 text-gray-400 text-sm font-medium tracking-wider uppercase opacity-50">
                                /{(index + 1).toString().padStart(2, "0")}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


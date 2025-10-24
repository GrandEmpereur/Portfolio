"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface AboutSectionProps {
    label: string;
    text: string;
}

export const AboutSection = ({ label, text }: AboutSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

    // Diviser le texte en mots
    const words = text.split(' ');

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Parallax subtil sur le label
            if (labelRef.current) {
                gsap.to(labelRef.current, {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });
            }

            // Animation pour chaque mot avec timings améliorés
            wordsRef.current.forEach((word, index) => {
                if (!word) return;

                gsap.fromTo(
                    word,
                    {
                        opacity: 0,
                        filter: "blur(10px)",
                        y: 30,
                    },
                    {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        duration: 1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: word,
                            start: "top 85%",
                            end: "top 60%",
                            scrub: 1.5,
                            toggleActions: "play none none reverse",
                        },
                        delay: index * 0.015, // Timing plus serré pour effet cascade
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [words.length]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center px-20 py-32"
        >
            <div className="flex flex-col lg:flex-row gap-x-24 xl:gap-x-32 w-full items-start lg:items-center">
                {/* Label */}
                <div ref={labelRef} className="mb-8 lg:mb-0 flex-shrink-0">
                    <span className="text-gray-400 text-xs font-light tracking-[0.3em] uppercase">
                        ({label})
                    </span>
                </div>

                {/* Texte animé avec effet de blur */}
                <div className="flex-1">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] leading-[1.2] font-light text-gray-300">
                        {words.map((word, index) => (
                            <span
                                key={index}
                                ref={(el) => {
                                    wordsRef.current[index] = el;
                                }}
                                className="inline-block mr-3 md:mr-4 lg:mr-5"
                                style={{
                                    opacity: 0,
                                    filter: "blur(10px)",
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </section>
    );
};


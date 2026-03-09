"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import Image from "next/image";

interface AboutSectionProps {
    label: string;
    text: string;
    text2: string;
    facts: string[];
}

const renderWords = (text: string) => {
    return text.split(" ").map((word, i) => (
        <span key={i} className="word-reveal inline-block mr-[0.3em]">
            {word}
        </span>
    ));
};

export const AboutSection = ({
    label,
    text,
    text2,
    facts,
}: AboutSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const factsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            const words =
                sectionRef.current.querySelectorAll<HTMLElement>(".word-reveal");
            words.forEach((word) => {
                word.style.opacity = "1";
                word.style.filter = "none";
            });
            return;
        }

        const ctx = gsap.context(() => {
            // Word reveal on text
            const words =
                sectionRef.current!.querySelectorAll(".word-reveal");
            gsap.from(words, {
                opacity: 0,
                filter: "blur(8px)",
                duration: 0.6,
                stagger: 0.03,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            // Facts stagger
            const factItems =
                sectionRef.current!.querySelectorAll(".fact-item");
            gsap.from(factItems, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: factsRef.current,
                    start: "top 85%",
                    once: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 lg:py-40 bg-black"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Text Column */}
                    <div className="lg:col-span-7" ref={textRef}>
                        <p className="text-xs md:text-sm tracking-[0.3em] text-white/40 uppercase font-light mb-8 md:mb-12">
                            {label}
                        </p>
                        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80 mb-6">
                            {renderWords(text)}
                        </p>
                        <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/80">
                            {renderWords(text2)}
                        </p>

                        {/* Facts */}
                        <div
                            ref={factsRef}
                            className="flex flex-wrap gap-x-8 gap-y-3 mt-8 md:mt-12"
                        >
                            {facts.map((fact, i) => (
                                <div
                                    key={i}
                                    className="fact-item flex items-center gap-2 text-sm text-white/50"
                                >
                                    <span className="w-4 h-px bg-white/30" />
                                    {fact}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Photo Column */}
                    <div className="lg:col-span-5 mt-12 lg:mt-0">
                        <div className="relative aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-lg border border-white/5">
                            <Image
                                src="/images/hero.webp"
                                alt="Patrick Bartosik"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                quality={80}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

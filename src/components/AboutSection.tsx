"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap-config";

interface AboutSectionProps {
    label: string;
    text: string;
    text2: string;
    facts: string[];
}

const renderWords = (text: string) =>
    text.split(" ").map((word, i) => (
        <span key={i} className="word-reveal mr-[0.3em] inline-block">
            {word}
        </span>
    ));

export const AboutSection = ({
    label,
    text,
    text2,
    facts,
}: AboutSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const leadRef = useRef<HTMLParagraphElement>(null);
    const imageWrapRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion) return;

            // Lead paragraph — word-by-word reveal
            gsap.from(sectionRef.current.querySelectorAll(".word-reveal"), {
                opacity: 0.15,
                filter: "blur(6px)",
                duration: 0.5,
                stagger: 0.02,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: leadRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            // Body copy + facts
            sectionRef.current
                .querySelectorAll<HTMLElement>("[data-animate-item]")
                .forEach((item) => {
                    gsap.from(item, {
                        y: 40,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            once: true,
                        },
                    });
                });

            // Subtle photo parallax
            if (imageWrapRef.current && imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    { yPercent: -6 },
                    {
                        yPercent: 6,
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageWrapRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    },
                );
            }
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-24 md:py-32 lg:py-40"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-20">
                <p className="mb-10 text-xs font-light uppercase tracking-[0.3em] text-white/40 md:mb-14 md:text-sm">
                    {label}
                </p>

                {/* Lead — the thesis, in large type */}
                <p
                    ref={leadRef}
                    className="max-w-4xl text-xl font-light leading-relaxed text-white/90 md:text-2xl lg:text-[1.75rem] lg:leading-[1.5]"
                >
                    {renderWords(text)}
                </p>

                <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
                    {/* Photo — treated like a film still */}
                    <div className="lg:col-span-5" data-animate-item>
                        <div
                            ref={imageWrapRef}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-[3/4]"
                        >
                            <div ref={imageRef} className="absolute -inset-y-[8%] inset-x-0">
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
                        <p className="mt-3 font-mono text-xs tracking-widest text-white/30">
                            PATRICK BARTOSIK · PARIS, FR
                        </p>
                    </div>

                    {/* Body copy + facts */}
                    <div className="flex flex-col lg:col-span-7">
                        <p
                            data-animate-item
                            className="text-base font-light leading-relaxed text-white/60 md:text-lg"
                        >
                            {text2}
                        </p>

                        <div className="mt-12 lg:mt-auto" data-animate-item>
                            {facts.map((fact) => (
                                <div
                                    key={fact}
                                    className="flex items-center gap-4 border-t border-white/10 py-4 text-sm text-white/60 last:border-b"
                                >
                                    <span className="h-px w-4 bg-white/30" />
                                    {fact}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

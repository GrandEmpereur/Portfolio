"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap-config";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
    name: string;
    label: string;
    tagline: string;
    description: string;
    ctaProjects: string;
    ctaContact: string;
    availableText: string;
    scrollText: string;
}

export const HeroSection = ({
    name,
    label,
    tagline,
    description,
    ctaProjects,
    ctaContact,
    availableText,
    scrollText,
}: HeroSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const availableRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReducedMotion) return;

        const isMobile = window.matchMedia("(max-width: 767px)").matches;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            if (availableRef.current) {
                tl.from(availableRef.current, { opacity: 0, y: -10, duration: 0.6 }, 0.1);
            }

            if (labelRef.current) {
                tl.from(labelRef.current, { opacity: 0, y: -20, duration: 0.8 }, 0.2);
            }

            if (nameRef.current) {
                if (isMobile) {
                    tl.from(nameRef.current, { opacity: 0, y: 40, duration: 0.8 }, 0.4);
                } else {
                    tl.to(
                        nameRef.current,
                        {
                            duration: 1.5,
                            scrambleText: {
                                text: name,
                                chars: "!<>-_\\/[]{}—=+*^?#",
                                speed: 0.4,
                            },
                            ease: "none",
                        },
                        0.3,
                    );
                }
            }

            if (taglineRef.current) {
                tl.from(
                    taglineRef.current,
                    { opacity: 0, y: 20, duration: 0.8 },
                    isMobile ? 0.8 : 1.5,
                );
            }

            if (ctaRef.current) {
                tl.from(
                    ctaRef.current,
                    { opacity: 0, y: 20, duration: 0.8 },
                    isMobile ? 1 : 1.8,
                );
            }

            if (scrollRef.current) {
                tl.from(
                    scrollRef.current,
                    { opacity: 0, y: 20, duration: 0.8 },
                    isMobile ? 1.2 : 2.2,
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [name]);

    const nameParts = name.split(" ");

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-end overflow-hidden bg-black"
        >

            {/* Availability badge - top right */}
            <div
                ref={availableRef}
                className="absolute top-24 sm:top-28 right-6 sm:right-8 md:right-12 lg:right-20 z-20"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                    </span>
                    <span className="text-xs text-white/70 font-light tracking-wider uppercase">
                        {availableText}
                    </span>
                </div>
            </div>

            <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-20 pb-24 sm:pb-32 md:pb-40">
                <p
                    ref={labelRef}
                    className="text-xs md:text-sm text-white/50 font-light tracking-[0.3em] uppercase mb-6 sm:mb-8 lg:mb-10"
                >
                    {label}
                </p>

                <h1
                    ref={nameRef}
                    className="text-[clamp(3rem,10vw,12rem)] font-bold leading-[0.9] tracking-tight text-white uppercase"
                >
                    {nameParts.map((part, index) => (
                        <span key={index} className="block">
                            {part}
                        </span>
                    ))}
                </h1>

                <div ref={taglineRef} className="max-w-xl">
                    <div className="w-16 h-px bg-white/30 mt-6 md:mt-8 mb-4" />
                    <p className="text-sm md:text-base text-white/60 font-light tracking-wide mb-2">
                        {tagline}
                    </p>
                    <p className="text-sm md:text-base text-white/40 font-light leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* CTA Buttons */}
                <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mt-8 md:mt-10">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300"
                    >
                        {ctaProjects}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-light hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                        {ctaContact}
                    </Link>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="hidden sm:flex absolute bottom-8 md:bottom-12 right-8 md:right-12 z-20"
            >
                <div className="flex flex-col items-center gap-3">
                    <span className="text-white/40 text-xs tracking-widest uppercase">
                        {scrollText}
                    </span>
                    <div className="w-px h-12 bg-white/30 relative overflow-hidden">
                        <div className="w-full h-3 bg-white/70 animate-scroll" />
                    </div>
                </div>
            </div>
        </section>
    );
};

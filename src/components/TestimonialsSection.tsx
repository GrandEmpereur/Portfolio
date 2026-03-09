"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface TestimonialsSectionProps {
    label: string;
    testimonials: {
        quote: string;
        name: string;
        role: string;
        company: string;
    }[];
}

export const TestimonialsSection = ({
    label,
    testimonials,
}: TestimonialsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const authorRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const isAnimating = useRef(false);

    const goToIndex = useCallback(
        (index: number) => {
            if (isAnimating.current || index === activeIndex) return;
            isAnimating.current = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false;
                },
            });

            // Fade out current
            tl.to([quoteRef.current, authorRef.current], {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: "power2.in",
            });

            // Update state
            tl.call(() => setActiveIndex(index));

            // Fade in new
            tl.fromTo(
                [quoteRef.current, authorRef.current],
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            );
        },
        [activeIndex],
    );

    // Auto-rotate
    useEffect(() => {
        if (testimonials.length <= 1) return;

        const interval = setInterval(() => {
            if (!isHovered && !isAnimating.current) {
                const nextIndex = (activeIndex + 1) % testimonials.length;
                goToIndex(nextIndex);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, isHovered, testimonials.length, goToIndex]);

    // Initial scroll animation
    useEffect(() => {
        if (!sectionRef.current) return;
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.from([quoteRef.current, authorRef.current], {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (testimonials.length === 0) return null;

    const current = testimonials[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative py-24 md:py-32 lg:py-40 bg-black"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 text-center">
                <p className="text-xs md:text-sm tracking-[0.3em] text-white/40 uppercase font-light mb-16 md:mb-24">
                    {label}
                </p>

                {/* Quote area */}
                <div className="relative min-h-[200px] md:min-h-[250px] flex items-center justify-center">
                    {/* Decorative quote mark */}
                    <span
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 text-[12rem] md:text-[16rem] leading-none text-white/[0.03] font-bold pointer-events-none select-none"
                        aria-hidden="true"
                    >
                        &ldquo;
                    </span>

                    <p
                        ref={quoteRef}
                        className="relative z-10 text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/80 font-light italic max-w-4xl"
                    >
                        {current.quote}
                    </p>
                </div>

                {/* Author */}
                <div ref={authorRef} className="mt-8 md:mt-12">
                    <p className="text-base font-semibold text-white">
                        {current.name}
                    </p>
                    <p className="text-sm text-white/40 mt-1">
                        {current.role}, {current.company}
                    </p>
                </div>

                {/* Navigation dots */}
                {testimonials.length > 1 && (
                    <div className="flex items-center justify-center gap-3 mt-10">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                                    i === activeIndex
                                        ? "bg-white w-8"
                                        : "bg-white/20 hover:bg-white/40 w-2"
                                }`}
                                aria-label={`Testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

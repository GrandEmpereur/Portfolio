"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap-config";

interface ApproachStep {
    title: string;
    desc: string;
}

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    features: string[];
    technologies: string[];
}

interface ServiceCategoryGroup {
    id: string;
    code: string;
    name: string;
    tagline: string;
    services: ServiceItem[];
}

interface ServicesSectionProps {
    label: string;
    heading: string;
    categories: ServiceCategoryGroup[];
    approachTitle: string;
    approachSteps: ApproachStep[];
    ctaText: string;
}

export const ServicesSection = ({
    label,
    heading,
    categories,
    approachTitle,
    approachSteps,
    ctaText,
}: ServicesSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion || !sectionRef.current) return;

            let split: SplitText | undefined;
            if (headingRef.current) {
                split = new SplitText(headingRef.current, { type: "lines" });
                gsap.from(split.lines, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            sectionRef.current
                .querySelectorAll<HTMLElement>("[data-animate-list]")
                .forEach((list) => {
                    gsap.from(list.querySelectorAll("[data-animate-item]"), {
                        y: 48,
                        opacity: 0,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: list,
                            start: "top 80%",
                            once: true,
                        },
                    });
                });

            return () => split?.revert();
        },
        { scope: sectionRef },
    );

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-20">
                {/* Header */}
                <p className="mb-6 text-xs font-light uppercase tracking-[0.3em] text-white/40 md:text-sm">
                    {label}
                </p>
                <h2
                    ref={headingRef}
                    className="mb-20 max-w-3xl text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white md:mb-28"
                >
                    {heading}
                </h2>

                {/* Categories */}
                <div className="space-y-24 md:space-y-32">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
                        >
                            {/* Category identity */}
                            <div className="lg:sticky lg:top-28 lg:self-start">
                                <span className="font-mono text-xs tracking-widest text-white/30">
                                    [{category.code}]
                                </span>
                                <h3 className="mt-3 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                                    {category.name}
                                </h3>
                                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/50">
                                    {category.tagline}
                                </p>
                            </div>

                            {/* Service index */}
                            <div data-animate-list>
                                {category.services.map((service, i) => (
                                    <article
                                        key={service.id}
                                        data-animate-item
                                        className="group border-t border-white/10 py-8 transition-colors duration-300 last:border-b hover:border-white/25 md:py-10"
                                    >
                                        <div className="flex items-baseline gap-5 md:gap-8">
                                            <span className="shrink-0 font-mono text-xs text-white/30 transition-colors duration-300 group-hover:text-white/60">
                                                {category.code}·
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="flex items-start justify-between gap-4 text-xl font-semibold uppercase tracking-tight text-white transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
                                                    {service.title}
                                                    <ArrowUpRight
                                                        aria-hidden
                                                        className="mt-1 h-5 w-5 shrink-0 text-white/0 transition-all duration-300 group-hover:text-white/70"
                                                    />
                                                </h4>
                                                <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/50">
                                                    {service.description}
                                                </p>
                                                <ul className="mt-5 flex flex-wrap gap-2">
                                                    {service.technologies.map(
                                                        (tech) => (
                                                            <li
                                                                key={tech}
                                                                className="rounded-full border border-white/10 px-3 py-1 text-xs font-light text-white/40 transition-colors duration-300 group-hover:border-white/20 group-hover:text-white/60"
                                                            >
                                                                {tech}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Approach — a real sequence, hence the numbering */}
                <div className="mt-24 border-t border-white/10 pt-16 md:mt-32 md:pt-20">
                    <h3 className="mb-10 text-xs font-light uppercase tracking-[0.3em] text-white/40 md:mb-14 md:text-sm">
                        {approachTitle}
                    </h3>
                    <div
                        data-animate-list
                        className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {approachSteps.map((step, i) => (
                            <div key={step.title} data-animate-item>
                                <span className="font-mono text-xs text-white/30">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h4 className="mt-3 text-base font-semibold text-white">
                                    {step.title}
                                </h4>
                                <p className="mt-2 text-sm font-light leading-relaxed text-white/50">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-16 md:mt-20">
                    <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-light text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                    >
                        {ctaText}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

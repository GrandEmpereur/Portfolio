"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface ApproachStep {
    title: string;
    desc: string;
}

interface ServiceItem {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
    technologies: string[];
}

interface ServicesApproachSectionProps {
    label: string;
    approachTitle: string;
    approachSteps: ApproachStep[];
    services: ServiceItem[];
    ctaText: string;
    locale: "fr" | "en" | "pl";
}

export const ServicesSection = ({
    label,
    approachTitle,
    approachSteps,
    services,
    ctaText,
    locale,
}: ServicesApproachSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            const cards =
                sectionRef.current!.querySelectorAll(".card-animate");

            gsap.from(cards, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 75%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 md:py-32 lg:py-40">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-20">
                <p className="mb-16 text-xs font-light uppercase tracking-[0.3em] text-white/40 md:mb-24 md:text-sm">
                    {label}
                </p>

                <div
                    ref={gridRef}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
                >
                    {/* Approach Card */}
                    <div className="card-animate rounded-2xl border border-white/5 bg-white/[0.03] p-8 md:p-10 lg:col-span-2 lg:row-span-2">
                        <h3 className="mb-8 text-2xl font-bold text-white md:mb-12 md:text-3xl">
                            {approachTitle}
                        </h3>
                        <div className="space-y-8 md:space-y-10">
                            {approachSteps.map((step, i) => (
                                <div key={i} className="flex items-start">
                                    <span className="mr-6 text-5xl font-bold leading-none text-white/[0.06] md:text-6xl">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="pt-2">
                                        <h4 className="text-lg font-semibold text-white">
                                            {step.title}
                                        </h4>
                                        <p className="mt-1 text-sm text-white/50">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Service Cards */}
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="card-animate flex flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.05] md:p-8"
                        >
                            <span className="mb-4 text-2xl">
                                {service.icon}
                            </span>
                            <h3 className="mb-3 text-lg font-semibold text-white">
                                {service.title}
                            </h3>
                            <div className="mb-4 space-y-2">
                                {service.features.slice(0, 3).map((f, i) => (
                                    <p
                                        key={i}
                                        className="flex items-start gap-2 text-sm text-white/50"
                                    >
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                                        {f}
                                    </p>
                                ))}
                            </div>
                            <div className="mt-auto flex flex-wrap gap-2 pt-4">
                                {service.technologies
                                    .slice(0, 4)
                                    .map((tech, i) => (
                                        <span
                                            key={i}
                                            className="rounded-full bg-white/[0.05] px-2.5 py-1 text-xs text-white/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

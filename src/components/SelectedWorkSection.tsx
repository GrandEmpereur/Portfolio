"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/data/lastwork.data";

interface SelectedWorkSectionProps {
    label: string;
    viewProjectText: string;
    viewAllText: string;
    projects: Project[];
}

const ArrowIcon = () => (
    <svg
        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
);

export const SelectedWorkSection = ({
    label,
    viewProjectText,
    viewAllText,
    projects,
}: SelectedWorkSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const projectRowsRef = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const infoRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            projectRowsRef.current.forEach((row, index) => {
                if (!row) return;

                const imageEl = imageRefs.current[index];
                const infoEl = infoRefs.current[index];

                // Image clip-path reveal
                if (imageEl) {
                    gsap.fromTo(
                        imageEl,
                        { clipPath: "inset(0 0 100% 0)" },
                        {
                            clipPath: "inset(0 0 0% 0)",
                            duration: 1.2,
                            ease: "power3.inOut",
                            scrollTrigger: {
                                trigger: row,
                                start: "top 75%",
                                once: true,
                            },
                        },
                    );
                }

                // Info elements stagger fade-in
                if (infoEl) {
                    const infoElements = infoEl.querySelectorAll(
                        "[data-animate-info]",
                    );
                    if (infoElements.length > 0) {
                        gsap.from(infoElements, {
                            y: 30,
                            opacity: 0,
                            duration: 0.8,
                            stagger: 0.1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: row,
                                start: "top 70%",
                                once: true,
                            },
                        });
                    }
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [projects.length]);

    return (
        <section
            ref={sectionRef}
            className="w-full bg-black py-16 md:py-24 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-20"
        >
            {/* Section label */}
            <p className="text-xs md:text-sm tracking-[0.3em] text-white/40 uppercase font-light mb-16 md:mb-24">
                {label}
            </p>

            {/* Project items */}
            <div className="flex flex-col">
                {projects.map((project, index) => {
                    const isEven = index % 2 === 0;
                    const isLast = index === projects.length - 1;
                    const formattedNumber = String(index + 1).padStart(2, "0");
                    const linkHref =
                        project.link && project.link.startsWith("http")
                            ? project.link
                            : `/projects/${project.slug}`;
                    const isExternal =
                        project.link && project.link.startsWith("http");
                    const displayedTechs = project.technologies.slice(0, 4);

                    return (
                        <div
                            key={project.slug}
                            ref={(el) => {
                                projectRowsRef.current[index] = el;
                            }}
                            className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center min-h-[60vh] lg:min-h-[70vh] ${
                                !isLast ? "mb-16 md:mb-24 lg:mb-32" : ""
                            }`}
                        >
                            {/* Image side */}
                            <div
                                className={`lg:col-span-7 ${
                                    isEven
                                        ? "lg:order-1"
                                        : "lg:order-2"
                                }`}
                            >
                                <div
                                    ref={(el) => {
                                        imageRefs.current[index] = el;
                                    }}
                                    className="relative aspect-[16/10] overflow-hidden rounded-lg"
                                    style={{ backgroundColor: project.bgColor }}
                                    data-cursor-label="View"
                                >
                                    {project.image ? (
                                        isExternal ? (
                                            <a
                                                href={linkHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative w-full h-full"
                                            >
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} - ${project.description || "Project"}`}
                                                    fill
                                                    className="object-contain p-6 hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                                    loading="lazy"
                                                    quality={75}
                                                />
                                            </a>
                                        ) : (
                                            <Link
                                                href={linkHref}
                                                className="block relative w-full h-full"
                                            >
                                                <Image
                                                    src={project.image}
                                                    alt={`${project.title} - ${project.description || "Project"}`}
                                                    fill
                                                    className="object-contain p-6 hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                                    loading="lazy"
                                                    quality={75}
                                                />
                                            </Link>
                                        )
                                    ) : (
                                        <div className="absolute inset-0 rounded-lg" />
                                    )}
                                </div>
                            </div>

                            {/* Info side */}
                            <div
                                ref={(el) => {
                                    infoRefs.current[index] = el;
                                }}
                                className={`lg:col-span-5 flex flex-col justify-center px-0 lg:px-6 ${
                                    isEven
                                        ? "lg:order-2"
                                        : "lg:order-1"
                                }`}
                            >
                                {/* Number */}
                                <span
                                    data-animate-info
                                    className="text-[8rem] lg:text-[10rem] font-bold leading-none text-white/10 select-none"
                                >
                                    {formattedNumber}
                                </span>

                                {/* Title */}
                                <h3
                                    data-animate-info
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-[-2rem]"
                                >
                                    {project.title}
                                </h3>

                                {/* Type badge */}
                                <div data-animate-info className="mt-3">
                                    <span className="inline-block text-xs tracking-[0.15em] uppercase text-white/40 border border-white/10 rounded-full px-3 py-1">
                                        {project.typeLabel}
                                    </span>
                                </div>

                                {/* Tech tags */}
                                <div
                                    data-animate-info
                                    className="flex flex-wrap gap-2 mt-4"
                                >
                                    {displayedTechs.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs text-white/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* View project link */}
                                <div data-animate-info className="mt-6">
                                    {isExternal ? (
                                        <a
                                            href={linkHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                                        >
                                            {viewProjectText}
                                            <ArrowIcon />
                                        </a>
                                    ) : (
                                        <Link
                                            href={linkHref}
                                            className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                                        >
                                            {viewProjectText}
                                            <ArrowIcon />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* View all projects link */}
            <div className="mt-16 md:mt-24 text-center">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors tracking-wide uppercase"
                >
                    {viewAllText}
                    <svg
                        className="w-4 h-4"
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
        </section>
    );
};

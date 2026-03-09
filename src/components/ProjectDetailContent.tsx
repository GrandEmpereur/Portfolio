"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { Project } from "@/lib/data/lastwork.data";

interface ProjectDetailContentProps {
    project: Project;
    prevProject: Project | null;
    nextProject: Project | null;
    translations: {
        role: string;
        technologies: string;
        features: string;
        year: string;
        viewGithub: string;
        backToProjects: string;
        nextProjectLabel: string;
        prevProjectLabel: string;
    };
}

const ProjectLink = ({
    project,
    children,
    className,
}: {
    project: Project;
    children: React.ReactNode;
    className?: string;
}) => {
    const isExternal = project.link && project.link.startsWith("http");

    if (isExternal) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <Link href={`/projects/${project.slug}`} className={className}>
            {children}
        </Link>
    );
};

export const ProjectDetailContent = ({
    project,
    prevProject,
    nextProject,
    translations,
}: ProjectDetailContentProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion) return;

            const animElements =
                containerRef.current?.querySelectorAll("[data-animate]");
            if (!animElements || animElements.length === 0) return;

            gsap.from(animElements, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
            });
        },
        { scope: containerRef },
    );

    return (
        <div ref={containerRef} className="min-h-screen bg-black text-white">
            {/* Hero */}
            <section
                className="relative w-full flex items-end"
                style={{ minHeight: "65vh" }}
            >
                {/* Background */}
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={`${project.title} - ${project.description || "Project"}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        quality={80}
                    />
                ) : (
                    <div
                        className="absolute inset-0"
                        style={{ backgroundColor: project.bgColor }}
                    />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Hero content */}
                <div className="relative z-10 w-full px-6 sm:px-8 md:px-16 pb-16 md:pb-24">
                    <h1
                        data-animate
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                    >
                        {project.title}
                    </h1>

                    {/* Badges */}
                    <div
                        data-animate
                        className="flex flex-wrap items-center gap-3 mt-4"
                    >
                        <span className="inline-block text-xs tracking-[0.15em] uppercase text-white/70 border border-white/20 rounded-full px-4 py-1.5">
                            {project.typeLabel}
                        </span>
                        {project.company && (
                            <span className="inline-block text-xs tracking-[0.15em] uppercase text-white/70 border border-white/20 rounded-full px-4 py-1.5">
                                {project.company}
                            </span>
                        )}
                    </div>

                    {/* Short description */}
                    {project.description && (
                        <p
                            data-animate
                            className="max-w-2xl text-base md:text-lg text-white/60 font-light leading-relaxed mt-6"
                        >
                            {project.description}
                        </p>
                    )}
                </div>
            </section>

            {/* Content section */}
            <section className="max-w-4xl mx-auto px-6 sm:px-8 md:px-16 py-16 md:py-24">
                {/* Long description */}
                {project.longDescription && (
                    <div data-animate className="mb-16 md:mb-20">
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                            {project.longDescription}
                        </p>
                    </div>
                )}

                {/* Info grid: role + year */}
                {(project.role || project.year) && (
                    <div
                        data-animate
                        className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/10 pt-8 mb-16 md:mb-20"
                    >
                        {project.role && (
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                                    {translations.role}
                                </p>
                                <p className="text-base text-white/80">
                                    {project.role}
                                </p>
                            </div>
                        )}
                        {project.year && (
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
                                    {translations.year}
                                </p>
                                <p className="text-base text-white/80">
                                    {project.year}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Technologies */}
                {project.technologies.length > 0 && (
                    <div data-animate className="mb-16 md:mb-20">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
                            {translations.technologies}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-sm text-white/70 border border-white/15 rounded-full px-4 py-1.5"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features */}
                {project.features && project.features.length > 0 && (
                    <div data-animate className="mb-16 md:mb-20">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-6">
                            {translations.features}
                        </p>
                        <ul className="space-y-4">
                            {project.features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-4 text-white/70"
                                >
                                    <span className="text-sm text-white/30 font-light tabular-nums mt-0.5">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-base leading-relaxed">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* CTAs */}
                <div
                    data-animate
                    className="flex flex-wrap items-center gap-4 pt-8 border-t border-white/10"
                >
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300"
                        >
                            <Github className="w-4 h-4" />
                            {translations.viewGithub}
                        </a>
                    )}
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-light hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        {translations.backToProjects}
                    </Link>
                </div>
            </section>

            {/* Prev/Next navigation */}
            {(prevProject || nextProject) && (
                <nav className="w-full border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        {/* Previous */}
                        <div
                            className={`${!prevProject ? "pointer-events-none" : ""} ${nextProject ? "border-b sm:border-b-0 sm:border-r border-white/10" : "sm:col-span-2"}`}
                        >
                            {prevProject ? (
                                <ProjectLink
                                    project={prevProject}
                                    className="group flex items-center gap-4 px-6 sm:px-8 md:px-16 py-10 md:py-14 hover:bg-white/5 transition-colors duration-300"
                                >
                                    <ArrowLeft className="w-5 h-5 text-white/40 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                                            {translations.prevProjectLabel}
                                        </p>
                                        <p className="text-lg font-medium text-white/80 group-hover:text-white transition-colors truncate">
                                            {prevProject.title}
                                        </p>
                                    </div>
                                </ProjectLink>
                            ) : (
                                <div className="px-6 sm:px-8 md:px-16 py-10 md:py-14" />
                            )}
                        </div>

                        {/* Next */}
                        <div
                            className={`${!nextProject ? "pointer-events-none" : ""} ${!prevProject ? "sm:col-span-2" : ""}`}
                        >
                            {nextProject ? (
                                <ProjectLink
                                    project={nextProject}
                                    className="group flex items-center justify-end gap-4 px-6 sm:px-8 md:px-16 py-10 md:py-14 hover:bg-white/5 transition-colors duration-300"
                                >
                                    <div className="min-w-0 text-right">
                                        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                                            {translations.nextProjectLabel}
                                        </p>
                                        <p className="text-lg font-medium text-white/80 group-hover:text-white transition-colors truncate">
                                            {nextProject.title}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                </ProjectLink>
                            ) : (
                                <div className="px-6 sm:px-8 md:px-16 py-10 md:py-14" />
                            )}
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

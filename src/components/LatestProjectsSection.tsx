"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data/lastwork.data";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface LatestProjectsSectionProps {
    title: string;
    viewAllText: string;
    projects: Project[];
}

// Composant carte copié depuis ProjectCard - même design exact
const ProjectCardWithHover = ({
    project,
    index,
    cardRef
}: {
    project: Project;
    index: number;
    cardRef: (el: HTMLAnchorElement | null) => void;
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            ref={cardRef}
            href={`/projects/${project.slug}`}
            className="relative w-full aspect-square overflow-hidden cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
        >
            {/* Background - Image or Color */}
            {project.image ? (
                <Image
                    src={project.image}
                    alt={`${project.title} - ${project.description || 'E-commerce project'}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    style={{
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                />
            ) : (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: project.bgColor,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                />
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.2)',
                    transition: 'background-color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            />

            {/* Title - Always Visible - Centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center px-8 transition-opacity duration-300">
                    {project.title}
                </h3>
            </div>

            {/* Hover Content */}
            <div
                className={`absolute inset-0 z-20 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                {/* Technologies - Bottom Left */}
                <div className="absolute bottom-8 left-8 flex flex-wrap gap-2 max-w-[60%]">
                    {project.technologies.map((tech, techIndex) => (
                        <span
                            key={techIndex}
                            className="bg-white/90 text-black text-xs md:text-sm px-3 py-1.5 rounded-full font-medium backdrop-blur-sm"
                            style={{
                                animation: isHovered
                                    ? `slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${techIndex * 0.05}s forwards`
                                    : 'none',
                                opacity: 0,
                                transform: 'translateY(20px)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Button - Bottom Right */}
                <div className="absolute bottom-8 right-8 pointer-events-auto">
                    <div
                        className="bg-white text-black p-3 md:p-4 rounded-full hover:bg-white/90 hover:scale-110"
                        style={{
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            animation: isHovered
                                ? 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards'
                                : 'none',
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </div>
            </div>

            {/* Keyframes for animations */}
            <style jsx>{`
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </a>
    );
};

export const LatestProjectsSection = ({
    title,
    viewAllText,
    projects
}: LatestProjectsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Parallax sur le titre
            if (titleRef.current) {
                gsap.to(titleRef.current, {
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });

                // Animation d'entrée du titre
                gsap.from(titleRef.current, {
                    opacity: 0,
                    y: 60,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation du bouton "View All"
            if (buttonRef.current) {
                gsap.from(buttonRef.current, {
                    opacity: 0,
                    x: 40,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: buttonRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation en cascade des cartes de projets
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Animation principale de la carte - Plus impactante
                gsap.from(card, {
                    opacity: 0,
                    y: 80,
                    scale: 0.95,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                    delay: index * 0.15, // Stagger effect plus prononcé
                });

                // Animation au hover - Légère translation + scale
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, {
                        y: -10,
                        scale: 1.02,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, {
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [projects.length]);

    return (
        <section ref={sectionRef} className="w-full py-20 md:py-32 px-20">
            {/* Header */}
            <div className="flex items-end justify-between mb-12 md:mb-16">
                <h2
                    ref={titleRef}
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-300"
                >
                    {title}
                </h2>

                {/* View All Button - Glassmorphism */}
                <a
                    ref={buttonRef}
                    href="/projects"
                    data-magnetic="true"
                    className="group flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-full transition-all duration-300 border border-white/10 shadow-lg"
                >
                    <span className="w-7 h-7 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg
                            className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </span>
                    <span className="text-white font-medium hidden sm:inline">
                        {viewAllText}
                    </span>
                </a>
            </div>

            {/* Project Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.slice(0, 4).map((project, index) => (
                    <ProjectCardWithHover
                        key={project.slug}
                        project={project}
                        index={index}
                        cardRef={(el) => {
                            cardsRef.current[index] = el;
                        }}
                    />
                ))}
            </div>
        </section>
    );
};


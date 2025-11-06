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

    // Use external link if available, otherwise use internal route
    const linkHref = project.link && project.link.startsWith('http')
        ? project.link
        : `/projects/${project.slug}`;
    const isExternal = project.link && project.link.startsWith('http');

    // Détection mobile pour désactiver hover
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(max-width: 1023px)').matches
            );
        };
        checkTouch();
        window.addEventListener('resize', checkTouch);
        return () => window.removeEventListener('resize', checkTouch);
    }, []);

    return (
        <a
            ref={cardRef}
            href={linkHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="relative w-full aspect-square overflow-hidden cursor-pointer active:scale-95 transition-transform"
            onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
            onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
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
                    loading="lazy"
                    quality={75}
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

            {/* Project Type Badge - Top Left */}
            <div
                className="absolute top-4 left-4 z-30"
                style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                <div className="px-3 py-1.5 rounded-full bg-white backdrop-blur-md border border-white/20 text-black text-xs font-semibold uppercase tracking-wider shadow-lg">
                    {project.typeLabel}
                </div>
            </div>

            {/* Company Badge - Top Right (if applicable) */}
            {project.company && (
                <div
                    className="absolute top-4 right-4 z-30"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
                    }}
                >
                    <div className="px-3 py-1.5 rounded-full bg-white backdrop-blur-md border border-white/20 text-black text-xs font-medium shadow-lg">
                        {project.company}
                    </div>
                </div>
            )}

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
                                opacity: isHovered ? 1 : 0,
                                transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${techIndex * 0.05}s`,
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
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
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
        <section ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-8 md:px-12 lg:px-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 mb-8 sm:mb-12 md:mb-16">
                <h2
                    ref={titleRef}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-300"
                >
                    {title}
                </h2>

                {/* View All Button - Glassmorphism */}
                <a
                    ref={buttonRef}
                    href="/projects"
                    className="group flex items-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/15 active:scale-95 backdrop-blur-md rounded-full transition-all duration-300 border border-white/10 shadow-lg"
                >
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <svg
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white group-hover:translate-x-0.5 transition-transform duration-300"
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
                    <span className="text-white font-medium text-sm sm:text-base">
                        {viewAllText}
                    </span>
                </a>
            </div>

            {/* Project Grid - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
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


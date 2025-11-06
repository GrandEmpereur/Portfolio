"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    image?: string;
}

interface StatsSectionProps {
    label: string;
    title: {
        line1: string;
        line2: string;
    };
    description: {
        line1: string;
        line2: string;
    };
    stats: {
        projectsCompleted: { number: string; label: string };
        yearsExperience: { number: string; label: string };
        satisfactionRate: { number: string; label: string };
        revenueGrowth: { number: string; label: string };
    };
    testimonials: Testimonial[];
}

export const StatsSection = ({
    label,
    title,
    description,
    stats,
    testimonials,
}: StatsSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
    const testimonialRef = useRef<HTMLDivElement>(null);

    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    );
    const statsGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du label avec parallax
            if (labelRef.current) {
                gsap.from(labelRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: labelRef.current,
                        start: "top 85%",
                        end: "top 65%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation du titre avec stagger amélioré
            if (titleRef.current) {
                gsap.from(titleRef.current.children, {
                    opacity: 0,
                    y: 80,
                    stagger: 0.25,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                });

                // Parallax sur le titre
                gsap.to(titleRef.current, {
                    yPercent: -15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }

            // Animation de la description
            if (descriptionRef.current) {
                gsap.from(descriptionRef.current, {
                    opacity: 0,
                    x: -50,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: "top 85%",
                        end: "top 65%",
                        scrub: 1.5,
                    },
                });
            }

            // Parallax sur la grille de stats
            if (statsGridRef.current) {
                gsap.to(statsGridRef.current, {
                    yPercent: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: statsGridRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }

            // Animation des stats avec compteur
            statsRefs.current.forEach((stat, index) => {
                if (!stat) return;

                const numberElement = stat.querySelector(".stat-number");
                const decorativeLines = stat.querySelectorAll(".decorative-line");

                if (!numberElement) return;

                // Animation d'entrée des cartes avec scale
                gsap.from(stat, {
                    opacity: 0,
                    y: 60,
                    scale: 0.95,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 90%",
                        end: "top 65%",
                        scrub: 1.5,
                    },
                    delay: index * 0.15,
                });

                // Animation des lignes décoratives
                if (decorativeLines.length > 0) {
                    gsap.from(decorativeLines, {
                        scaleY: 0,
                        stagger: 0.02,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: stat,
                            start: "top 85%",
                            end: "top 65%",
                            scrub: 1.5,
                        },
                    });
                }

                // Animation du compteur
                const initialValue = numberElement.textContent || "0";
                const numericValue = parseInt(initialValue.replace(/\D/g, "")) || 0;

                // Store the final value before animation
                numberElement.setAttribute('data-final', numericValue.toString());

                // Set initial value to 0
                numberElement.textContent = "0";

                ScrollTrigger.create({
                    trigger: stat,
                    start: "top 85%",
                    once: true,
                    onEnter: () => {
                        const finalNum = parseInt(numberElement.getAttribute('data-final') || "0");

                        gsap.to(
                            { val: 0 },
                            {
                                val: finalNum,
                                duration: 2,
                                ease: "power2.out",
                                onUpdate: function () {
                                    const current = Math.ceil(this.targets()[0].val);
                                    numberElement.textContent = current.toString();
                                },
                            }
                        );
                    },
                });
            });

            // Animation du carousel de testimonials
            if (testimonialRef.current) {
                gsap.from(testimonialRef.current, {
                    opacity: 0,
                    y: 80,
                    scale: 0.98,
                    duration: 1.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: testimonialRef.current,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                });

                // Parallax subtil sur le testimonial
                gsap.to(testimonialRef.current, {
                    yPercent: -8,
                    ease: "none",
                    scrollTrigger: {
                        trigger: testimonialRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const allStats = [
        { number: stats.projectsCompleted.number, label: stats.projectsCompleted.label },
        { number: stats.yearsExperience.number, label: stats.yearsExperience.label },
        { number: stats.satisfactionRate.number, label: stats.satisfactionRate.label },
        { number: stats.revenueGrowth.number, label: stats.revenueGrowth.label },
    ];

    // Fonction pour extraire le nombre et le suffixe
    const parseStatNumber = (value: string) => {
        const match = value.match(/^(\d+)(.*)$/);
        if (match) {
            return { number: match[1], suffix: match[2] };
        }
        return { number: value, suffix: "" };
    };

    return (
        <section ref={sectionRef} className="w-full bg-[#121212] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start justify-between mb-12 sm:mb-16 md:mb-20 gap-8 sm:gap-10 md:gap-12">
                <div className="lg:w-1/2">
                    <span
                        ref={labelRef}
                        className="text-gray-400 text-xs sm:text-sm font-medium tracking-wider uppercase block mb-6 sm:mb-8"
                    >
                        ({label})
                    </span>
                    <h2
                        ref={titleRef}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-gray-300 leading-tight"
                    >
                        <span className="block">{title.line1}</span>
                        <span className="block">{title.line2}</span>
                    </h2>
                </div>
                <div ref={descriptionRef} className="lg:w-1/3 lg:pt-16 xl:pt-32">
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
                        <span className="block mb-3 sm:mb-4">{description.line1}</span>
                        <span className="block">{description.line2}</span>
                    </p>
                </div>
            </div>

            {/* Stats Grid - Stack on mobile */}
            <div ref={statsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
                {allStats.map((stat, index) => {
                    const { number, suffix } = parseStatNumber(stat.number);
                    return (
                        <div
                            key={index}
                            ref={(el) => {
                                statsRefs.current[index] = el;
                            }}
                            className="relative border-l border-r border-[#333333] p-4 sm:p-6 md:p-8 lg:p-12 group hover:bg-white/[0.02] active:bg-white/[0.04] transition-all duration-500"
                        >
                            {/* Top decorative lines - Full width */}
                            <div className="absolute top-0 left-2 sm:left-3 right-0 h-1.5 sm:h-2 flex gap-3 sm:gap-[26px] overflow-hidden">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="decorative-line w-px h-1.5 sm:h-2 bg-[#333333] group-hover:bg-orange-500/30 transition-colors duration-500"
                                    />
                                ))}
                            </div>

                            <div className="pt-6 sm:pt-8">
                                <div className="flex items-start mb-6 sm:mb-8">
                                    <span className="stat-number text-[60px] sm:text-[70px] md:text-[80px] lg:text-[90px] xl:text-[104px] font-bold text-[#CACACA] leading-none group-hover:text-white transition-colors duration-500">
                                        {number}
                                    </span>
                                    <span className="stat-suffix text-[60px] sm:text-[70px] md:text-[80px] lg:text-[90px] xl:text-[104px] font-bold text-[#FF4925] leading-none">
                                        {suffix}
                                    </span>
                                </div>
                                <p className="text-[#CACACA] text-xs sm:text-sm md:text-base leading-relaxed max-w-[150px]">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Testimonials Carousel - Featured Style Responsive */}
            <div ref={testimonialRef} className="w-full relative">
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index}>
                                <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center pb-12 sm:pb-14 md:pb-16">
                                    {/* Left - Text Content */}
                                    <div className="flex-1 lg:w-[55%]">
                                        {/* Quote Icon */}
                                        <div className="mb-4 sm:mb-5 md:mb-6">
                                            <span className="text-[#FF4925] text-5xl sm:text-6xl md:text-7xl font-serif leading-none">"</span>
                                        </div>

                                        {/* Quote Text - Hypertext Style */}
                                        <blockquote className="mb-8 sm:mb-10 md:mb-12">
                                            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#CACACA] mb-4 sm:mb-5 md:mb-6">
                                                {testimonial.quote}
                                            </p>
                                        </blockquote>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-[#333333] mb-4 sm:mb-5 md:mb-6"></div>

                                        {/* Author Info */}
                                        <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-[88px] md:h-[88px] rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl">
                                                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-[#CACACA] text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-0.5 sm:mb-1">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-[#8F8F8F] text-sm sm:text-base md:text-lg">
                                                    {testimonial.role} @ {testimonial.company}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Image */}
                                    <div className="w-full lg:w-[35%] flex-shrink-0">
                                        <div className="relative w-full aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden">
                                            {testimonial.image ? (
                                                <Image
                                                    src={testimonial.image}
                                                    alt={`${testimonial.name} - ${testimonial.role}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 35vw"
                                                    loading="lazy"
                                                    quality={75}
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                    <span className="text-white/20 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold">
                                                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons - Positioned at bottom center */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4 z-20">
                        <CarouselPrevious className="static translate-y-0 bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-sm rounded-full p-2 sm:p-3 text-white border border-white/20" />
                        <CarouselNext className="static translate-y-0 bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-sm rounded-full p-2 sm:p-3 text-white border border-white/20" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};


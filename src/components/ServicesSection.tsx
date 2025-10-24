"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Code, Sparkles, ShoppingCart } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Service {
    title: string;
    description: string;
    icon: "code" | "sparkles" | "shopping";
}

interface ServicesSectionProps {
    title: string;
    services: {
        webDev: { title: string; description: string };
        saasDev: { title: string; description: string };
        ecommerce: { title: string; description: string };
    };
}

const iconMap = {
    code: Code,
    sparkles: Sparkles,
    shopping: ShoppingCart,
};

export const ServicesSection = ({ title, services }: ServicesSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const servicesList: Service[] = [
        {
            title: services.webDev.title,
            description: services.webDev.description,
            icon: "code",
        },
        {
            title: services.saasDev.title,
            description: services.saasDev.description,
            icon: "sparkles",
        },
        {
            title: services.ecommerce.title,
            description: services.ecommerce.description,
            icon: "shopping",
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre avec parallax
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    opacity: 0,
                    y: 80,
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
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }

            // Animation 3D des cartes
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                const icon = card.querySelector(".service-icon");
                const title = card.querySelector(".service-title");
                const description = card.querySelector(".service-description");

                // Perspective 3D sur la carte
                gsap.set(card, {
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                });

                // Animation d'entrée 3D
                gsap.from(card, {
                    opacity: 0,
                    y: 100,
                    rotationX: -15,
                    scale: 0.9,
                    duration: 1.8,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                    delay: index * 0.2,
                });

                // Hover effects 3D
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, {
                        rotationY: 5,
                        rotationX: -5,
                        z: 30,
                        scale: 1.05,
                        duration: 0.6,
                        ease: "power3.out",
                    });

                    if (icon) {
                        gsap.to(icon, {
                            scale: 1.2,
                            rotation: 10,
                            duration: 0.5,
                            ease: "back.out(1.7)",
                        });
                    }

                    if (title) {
                        gsap.to(title, {
                            x: 10,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    }

                    if (description) {
                        gsap.to(description, {
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    }
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        rotationY: 0,
                        rotationX: 0,
                        z: 0,
                        scale: 1,
                        duration: 0.6,
                        ease: "power3.out",
                    });

                    if (icon) {
                        gsap.to(icon, {
                            scale: 1,
                            rotation: 0,
                            duration: 0.5,
                            ease: "back.out(1.7)",
                        });
                    }

                    if (title) {
                        gsap.to(title, {
                            x: 0,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    }

                    if (description) {
                        gsap.to(description, {
                            opacity: 0.7,
                            y: 0,
                            duration: 0.4,
                            ease: "power2.out",
                        });
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full py-20 md:py-32 px-20"
        >
            {/* Title */}
            <h2
                ref={titleRef}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-300 mb-16"
            >
                {title}
            </h2>

            {/* Services Grid - 3 colonnes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {servicesList.map((service, index) => {
                    const Icon = iconMap[service.icon];
                    return (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm border border-white/10 p-8 md:p-10 transition-colors duration-500 hover:border-white/20 cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="service-icon mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-orange-500" strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="service-title text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                                {service.title}
                            </h3>

                            {/* Description */}
                            <p className="service-description text-gray-400 text-base md:text-lg leading-relaxed opacity-70">
                                {service.description}
                            </p>

                            {/* Hover effect - subtle glow */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-orange-500/5 to-transparent"></div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


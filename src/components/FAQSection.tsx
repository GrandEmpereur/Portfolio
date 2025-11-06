"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    title: string;
    faqs: FAQ[];
    socialTitle: string;
    socialLinks: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        email?: string;
    };
}

export const FAQSection = ({ title, faqs, socialTitle, socialLinks }: FAQSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);
    const socialRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du titre avec scale effect
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    opacity: 0,
                    y: 80,
                    scale: 0.9,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        end: "top 60%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation de l'accordion avec meilleur stagger
            if (accordionRef.current) {
                gsap.from(accordionRef.current.children, {
                    opacity: 0,
                    x: 60,
                    scale: 0.98,
                    stagger: 0.12,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: accordionRef.current,
                        start: "top 80%",
                        end: "top 55%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation des social links avec bounce
            if (socialRef.current) {
                gsap.from(socialRef.current, {
                    opacity: 0,
                    y: 40,
                    duration: 1.2,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: socialRef.current,
                        start: "top 90%",
                        end: "top 70%",
                        scrub: 1.5,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-black">
            <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
                    {/* Titre - Gauche */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <h2
                                ref={titleRef}
                                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-8 sm:mb-10 lg:mb-0"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </div>

                        {/* Social Links */}
                        <div ref={socialRef} className="mt-8 lg:mt-auto">
                            <p className="text-white/60 text-sm sm:text-base font-medium mb-6">
                                {socialTitle}
                            </p>
                            <div className="flex items-center gap-3 sm:gap-4">
                                {socialLinks.linkedin && (
                                    <a
                                        href={socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Patrick Bartosik sur LinkedIn - Développeur Full Stack"
                                        aria-label="Visitez mon profil LinkedIn"
                                        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </a>
                                )}
                                {socialLinks.github && (
                                    <a
                                        href={socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Patrick Bartosik sur GitHub - Projets Open Source"
                                        aria-label="Visitez mon profil GitHub"
                                        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Github className="w-5 h-5 text-white" />
                                    </a>
                                )}
                                {socialLinks.instagram && (
                                    <a
                                        href={socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Patrick Bartosik sur Instagram"
                                        aria-label="Visitez mon profil Instagram"
                                        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Instagram className="w-5 h-5 text-white" />
                                    </a>
                                )}
                                {socialLinks.email && (
                                    <a
                                        href={`mailto:${socialLinks.email}`}
                                        title="Contactez Patrick Bartosik par email"
                                        aria-label="Envoyez-moi un email"
                                        className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Mail className="w-5 h-5 text-white" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Accordion - Droite */}
                    <div className="lg:col-span-7">
                        <div ref={accordionRef}>
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="item-0"
                                className="space-y-4 sm:space-y-5 w-full"
                            >
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    >
                                        <AccordionTrigger className="px-5 sm:px-7 md:px-9 py-5 sm:py-6 md:py-7 text-left hover:no-underline [&[data-state=open]>svg]:rotate-45">
                                            <span className="text-white text-base sm:text-lg md:text-xl font-semibold pr-4">
                                                {faq.question}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-5 sm:px-7 md:px-9 pb-5 sm:pb-6 md:pb-7 pt-0">
                                            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


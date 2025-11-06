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
            <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 sm:gap-16 md:gap-20 lg:gap-32">
                    {/* Titre - Gauche */}
                    <div className="flex flex-col justify-between w-full lg:min-w-[400px]">
                        <h2
                            ref={titleRef}
                            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] font-bold leading-[0.95] mb-10 sm:mb-12 md:mb-16"
                            dangerouslySetInnerHTML={{ __html: title }}
                        />

                        {/* Social Links */}
                        <div ref={socialRef} className="mt-8 sm:mt-10 md:mt-12 lg:mt-auto">
                            <p className="text-white/60 text-sm sm:text-base font-medium mb-6 sm:mb-8">
                                {socialTitle}
                            </p>
                            <div className="flex items-center gap-4">
                                {socialLinks.linkedin && (
                                    <a
                                        href={socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl sm:rounded-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </a>
                                )}
                                {socialLinks.github && (
                                    <a
                                        href={socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl sm:rounded-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </a>
                                )}
                                {socialLinks.instagram && (
                                    <a
                                        href={socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl sm:rounded-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </a>
                                )}
                                {socialLinks.email && (
                                    <a
                                        href={`mailto:${socialLinks.email}`}
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl sm:rounded-[20px] bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-all duration-300"
                                    >
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Accordion - Droite */}
                    <div className="flex-1 w-full lg:max-w-[1000px]">
                        <div ref={accordionRef}>
                            <Accordion
                                type="single"
                                collapsible
                                defaultValue="item-0"
                                className="space-y-4 sm:space-y-5 md:space-y-6 w-full"
                            >
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl md:rounded-[30px] overflow-hidden shadow-lg hover:bg-white/15 active:bg-white/20 transition-all duration-300"
                                    >
                                        <AccordionTrigger className="px-5 sm:px-7 md:px-10 py-5 sm:py-6 md:py-8 text-left hover:no-underline [&[data-state=open]>svg]:rotate-45">
                                            <span className="text-white text-base sm:text-lg md:text-xl font-semibold pr-4 sm:pr-6">
                                                {faq.question}
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-5 sm:px-7 md:px-10 pb-5 sm:pb-6 md:pb-8 pt-1 sm:pt-2">
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


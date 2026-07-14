"use client";

import { Fragment, useRef } from "react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap-config";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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

const socialLinkClassName =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white";

export const FAQSection = ({
    title,
    faqs,
    socialTitle,
    socialLinks,
}: FAQSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion) return;

            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            if (listRef.current) {
                gsap.from(listRef.current.querySelectorAll("[data-animate-item]"), {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: listRef.current,
                        start: "top 80%",
                        once: true,
                    },
                });
            }
        },
        { scope: sectionRef },
    );

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-24 md:py-32 lg:py-40"
        >
            <div className="mx-auto max-w-7xl px-6 sm:px-8 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
                    {/* Title + socials */}
                    <div className="lg:col-span-5">
                        <div className="lg:sticky lg:top-28">
                            <h2
                                ref={titleRef}
                                className="text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white"
                            >
                                {title
                                    .split(/<br\s*\/?>/i)
                                    .map((part, index, parts) => (
                                        <Fragment key={index}>
                                            {part}
                                            {index < parts.length - 1 && <br />}
                                        </Fragment>
                                    ))}
                            </h2>

                            <div className="mt-10 lg:mt-14">
                                <p className="mb-5 text-xs font-light uppercase tracking-[0.3em] text-white/40">
                                    {socialTitle}
                                </p>
                                <div className="flex items-center gap-3">
                                    {socialLinks.linkedin && (
                                        <a
                                            href={socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn"
                                            className={socialLinkClassName}
                                        >
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    )}
                                    {socialLinks.github && (
                                        <a
                                            href={socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="GitHub"
                                            className={socialLinkClassName}
                                        >
                                            <Github className="h-4 w-4" />
                                        </a>
                                    )}
                                    {socialLinks.instagram && (
                                        <a
                                            href={socialLinks.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                            className={socialLinkClassName}
                                        >
                                            <Instagram className="h-4 w-4" />
                                        </a>
                                    )}
                                    {socialLinks.email && (
                                        <a
                                            href={`mailto:${socialLinks.email}`}
                                            aria-label="Email"
                                            className={socialLinkClassName}
                                        >
                                            <Mail className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Questions — hairline index, like the services list */}
                    <div ref={listRef} className="lg:col-span-7">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-0"
                            className="w-full"
                        >
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={faq.question}
                                    value={`item-${index}`}
                                    data-animate-item
                                    className="border-t border-white/10 transition-colors duration-300 last:border-b hover:border-white/25"
                                >
                                    <AccordionTrigger className="group gap-6 rounded-none py-6 hover:no-underline md:py-7 [&>svg]:mt-1 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white/40 [&>svg]:transition-transform [&>svg]:duration-300">
                                        <span className="text-base font-semibold text-white transition-colors duration-300 group-hover:text-white/80 md:text-lg">
                                            {faq.question}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-7">
                                        <p className="max-w-2xl text-sm font-light leading-relaxed text-white/50 md:text-base">
                                            {faq.answer}
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    );
};

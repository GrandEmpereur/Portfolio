"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap-config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    simpleContactSchema,
    type SimpleContactData,
} from "@/lib/simple-contact-schema";
import { toast } from "sonner";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

interface ContactCtaSectionProps {
    translations: {
        title: string;
        subtitle: string;
        nameLabel: string;
        namePlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        messageLabel: string;
        messagePlaceholder: string;
        submitButton: string;
        termsText: string;
        termsLink: string;
        andText: string;
        privacyLink: string;
    };
    socialLinks: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        email?: string;
    };
}

export const ContactSection = ({
    translations,
    socialLinks,
}: ContactCtaSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const termsRef = useRef<HTMLParagraphElement>(null);
    const socialsRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SimpleContactData>({
        resolver: zodResolver(simpleContactSchema),
    });

    const onSubmit = async (data: SimpleContactData) => {
        try {
            const response = await fetch("/api/contact-simple", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            toast.success("Message sent!");
            reset();
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (prefersReducedMotion) return;

        const isMobile = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            // Title animation
            if (titleRef.current) {
                if (!isMobile) {
                    gsap.set(titleRef.current, {
                        perspective: 1000,
                        transformStyle: "preserve-3d",
                    });

                    const split = new SplitText(titleRef.current, {
                        type: "chars",
                    });

                    gsap.from(split.chars, {
                        opacity: 0,
                        y: 50,
                        rotationX: -90,
                        stagger: 0.02,
                        duration: 0.8,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 80%",
                            once: true,
                        },
                    });
                } else {
                    // Mobile: simple fade-in
                    gsap.from(titleRef.current, {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: titleRef.current,
                            start: "top 85%",
                            once: true,
                        },
                    });
                }
            }

            // Subtitle animation
            if (subtitleRef.current) {
                gsap.from(subtitleRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                    delay: 0.3,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: subtitleRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            // Form fields stagger animation
            if (formRef.current) {
                gsap.from(formRef.current.children, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            // Terms text animation
            if (termsRef.current) {
                gsap.from(termsRef.current, {
                    opacity: 0,
                    y: 15,
                    duration: 0.5,
                    delay: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: termsRef.current,
                        start: "top 90%",
                        once: true,
                    },
                });
            }

            // Social links animation
            if (socialsRef.current) {
                gsap.from(socialsRef.current.children, {
                    opacity: 0,
                    y: 20,
                    scale: 0.8,
                    duration: 0.5,
                    stagger: 0.08,
                    delay: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: socialsRef.current,
                        start: "top 90%",
                        once: true,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col items-center justify-center bg-black py-24 md:py-32 lg:py-0"
        >
            <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 w-full">
                {/* Title */}
                <h2
                    ref={titleRef}
                    className="text-[clamp(2rem,7vw,7rem)] font-bold leading-[0.95] tracking-tight text-white text-center uppercase font-[family-name:var(--font-anton)]"
                >
                    {translations.title}
                </h2>

                {/* Subtitle */}
                <p
                    ref={subtitleRef}
                    className="text-base md:text-lg text-white/50 text-center mt-6 md:mt-8 font-light"
                >
                    {translations.subtitle}
                </p>

                {/* Form */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-12 md:mt-16"
                >
                    {/* Name field */}
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                            {translations.nameLabel}
                        </label>
                        <input
                            {...register("name")}
                            placeholder={translations.namePlaceholder}
                            className="w-full bg-transparent border-0 border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:border-white/60 focus:outline-none transition-colors text-sm"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email field */}
                    <div>
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                            {translations.emailLabel}
                        </label>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder={translations.emailPlaceholder}
                            className="w-full bg-transparent border-0 border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:border-white/60 focus:outline-none transition-colors text-sm"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Message field */}
                    <div className="md:col-span-2">
                        <label className="text-xs text-white/40 uppercase tracking-wider mb-2 block">
                            {translations.messageLabel}
                        </label>
                        <textarea
                            {...register("message")}
                            placeholder={translations.messagePlaceholder}
                            className="w-full bg-transparent border-0 border-b border-white/20 py-3 text-white placeholder:text-white/20 focus:border-white/60 focus:outline-none transition-colors text-sm min-h-[100px] resize-none"
                        />
                        {errors.message && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    {/* Honeypot (hidden) */}
                    <input
                        type="text"
                        {...register("honeypot")}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Submit button */}
                    <div className="md:col-span-2 flex justify-center mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            data-magnetic="true"
                            className="px-10 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="animate-spin h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                translations.submitButton
                            )}
                        </button>
                    </div>
                </form>

                {/* Terms text */}
                <p
                    ref={termsRef}
                    className="text-xs text-white/30 text-center mt-6"
                >
                    {translations.termsText}{" "}
                    <Link
                        href="/mentions-legales"
                        className="text-white/50 underline hover:text-white/70 transition-colors"
                    >
                        {translations.termsLink}
                    </Link>{" "}
                    {translations.andText}{" "}
                    <Link
                        href="/politique-confidentialite"
                        className="text-white/50 underline hover:text-white/70 transition-colors"
                    >
                        {translations.privacyLink}
                    </Link>
                    .
                </p>

                {/* Social links */}
                <div
                    ref={socialsRef}
                    className="flex items-center justify-center gap-4 mt-12 md:mt-16"
                >
                    {socialLinks.linkedin && (
                        <a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors"
                        >
                            <Linkedin className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {socialLinks.github && (
                        <a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors"
                        >
                            <Github className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {socialLinks.instagram && (
                        <a
                            href={socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors"
                        >
                            <Instagram className="w-4 h-4 text-white" />
                        </a>
                    )}
                    {socialLinks.email && (
                        <a
                            href={`mailto:${socialLinks.email}`}
                            aria-label="Email"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors"
                        >
                            <Mail className="w-4 h-4 text-white" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

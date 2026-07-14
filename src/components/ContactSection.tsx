"use client";

import { useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowUpRight, Github, Instagram, Linkedin, Loader2, Mail } from "lucide-react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap-config";
import {
    simpleContactSchema,
    type SimpleContactData,
} from "@/lib/simple-contact-schema";

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

const inputClassName =
    "w-full border-0 border-b border-white/20 bg-transparent py-3 text-sm text-white transition-colors placeholder:text-white/20 focus:border-white/60 focus:outline-none";

const socialLinkClassName =
    "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white";

export const ContactSection = ({
    translations,
    socialLinks,
}: ContactCtaSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

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

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)",
            ).matches;
            if (prefersReducedMotion) return;

            let split: SplitText | undefined;
            if (titleRef.current) {
                split = new SplitText(titleRef.current, { type: "lines" });
                gsap.from(split.lines, {
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 85%",
                        once: true,
                    },
                });
            }

            gsap.from(
                sectionRef.current.querySelectorAll("[data-animate-item]"),
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        once: true,
                    },
                },
            );

            return () => split?.revert();
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
                    {/* Title, subtitle, socials */}
                    <div className="flex flex-col lg:col-span-5">
                        <h2
                            ref={titleRef}
                            className="text-[clamp(2.5rem,5vw,5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white"
                        >
                            {translations.title}
                        </h2>
                        <p
                            data-animate-item
                            className="mt-6 max-w-sm text-base font-light leading-relaxed text-white/50 md:text-lg"
                        >
                            {translations.subtitle}
                        </p>

                        <div
                            data-animate-item
                            className="mt-10 flex items-center gap-3 lg:mt-auto"
                        >
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

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="lg:col-span-7"
                    >
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div data-animate-item>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-xs uppercase tracking-wider text-white/40"
                                >
                                    {translations.nameLabel}
                                </label>
                                <input
                                    id="contact-name"
                                    autoComplete="name"
                                    {...register("name")}
                                    aria-invalid={Boolean(errors.name)}
                                    placeholder={translations.namePlaceholder}
                                    className={inputClassName}
                                />
                                {errors.name && (
                                    <p role="alert" className="mt-1 text-xs text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div data-animate-item>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-xs uppercase tracking-wider text-white/40"
                                >
                                    {translations.emailLabel}
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email")}
                                    aria-invalid={Boolean(errors.email)}
                                    placeholder={translations.emailPlaceholder}
                                    className={inputClassName}
                                />
                                {errors.email && (
                                    <p role="alert" className="mt-1 text-xs text-red-400">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div data-animate-item className="md:col-span-2">
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-xs uppercase tracking-wider text-white/40"
                                >
                                    {translations.messageLabel}
                                </label>
                                <textarea
                                    id="contact-message"
                                    {...register("message")}
                                    aria-invalid={Boolean(errors.message)}
                                    placeholder={translations.messagePlaceholder}
                                    className={`${inputClassName} min-h-[120px] resize-none`}
                                />
                                {errors.message && (
                                    <p role="alert" className="mt-1 text-xs text-red-400">
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

                            <div data-animate-item className="md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    data-magnetic="true"
                                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            {translations.submitButton}
                                        </>
                                    ) : (
                                        <>
                                            {translations.submitButton}
                                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </>
                                    )}
                                </button>
                                <p className="mt-5 text-xs text-white/30">
                                    {translations.termsText}{" "}
                                    <Link
                                        href="/mentions-legales"
                                        className="text-white/50 underline transition-colors hover:text-white/70"
                                    >
                                        {translations.termsLink}
                                    </Link>{" "}
                                    {translations.andText}{" "}
                                    <Link
                                        href="/politique-confidentialite"
                                        className="text-white/50 underline transition-colors hover:text-white/70"
                                    >
                                        {translations.privacyLink}
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

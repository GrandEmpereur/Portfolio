"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import SplitType from "split-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Schéma de validation Zod
const contactFormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({
        message: "Adresse email invalide.",
    }),
    message: z.string().min(10, {
        message: "Le message doit contenir au moins 10 caractères.",
    }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactSectionProps {
    translations: {
        formBrand: string;
        formTitle: string;
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
        heading: string;
        description: string;
        quickResponseTitle: string;
        quickResponseDesc: string;
        clearStepsTitle: string;
        clearStepsDesc: string;
        contactRole: string;
        contactCompany: string;
        contactName: string;
        contactCta: string;
        copyright: string;
    };
}

export const ContactSection = ({ translations }: ContactSectionProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form avec react-hook-form et zod
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    // Submit handler
    async function onSubmit(values: ContactFormValues) {
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            toast.success("Message sent successfully! I'll get back to you soon.");
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Animation du heading avec split text
            if (headingRef.current) {
                const split = new SplitType(headingRef.current, { types: "chars,words" });

                // Perspective 3D
                gsap.set(headingRef.current, {
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                });

                // Animation lettre par lettre avec effet 3D
                if (split.chars) {
                    gsap.from(split.chars, {
                        opacity: 0,
                        y: 80,
                        rotationX: -90,
                        stagger: 0.03,
                        duration: 1.5,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 90%",
                            end: "top 55%",
                            scrub: 1.5,
                        },
                    });
                }

                // Parallax sur le heading
                gsap.to(headingRef.current, {
                    yPercent: -12,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }

            // Animation du formulaire - Slide élégant depuis la gauche avec scale
            if (formRef.current) {
                gsap.from(formRef.current, {
                    opacity: 0,
                    x: -150,
                    scale: 0.95,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1.5,
                    },
                });
            }

            // Animation des éléments du contenu - Stagger fluide
            if (contentRef.current) {
                const children = contentRef.current.children;

                // Animation séparée pour chaque élément avec des effets différents
                Array.from(children).forEach((child, index) => {
                    if (index === 0) {
                        // Description paragraph
                        gsap.from(child, {
                            opacity: 0,
                            y: 30,
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: child,
                                start: "top 85%",
                                end: "top 60%",
                                scrub: 1.2,
                            },
                        });
                    } else if (index === 1) {
                        // Divider
                        gsap.from(child, {
                            scaleX: 0,
                            transformOrigin: "left center",
                            duration: 1,
                            ease: "power2.inOut",
                            scrollTrigger: {
                                trigger: child,
                                start: "top 85%",
                                end: "top 60%",
                                scrub: 1.2,
                            },
                        });
                    } else if (index >= 2 && index <= 3) {
                        // Info cards
                        gsap.from(child, {
                            opacity: 0,
                            y: 40,
                            stagger: 0.2,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: child,
                                start: "top 85%",
                                end: "top 60%",
                                scrub: 1.2,
                            },
                        });
                    } else if (index === 4) {
                        // Contact card - Slide from right avec rotation
                        gsap.from(child, {
                            opacity: 0,
                            x: 60,
                            rotateY: -15,
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: child,
                                start: "top 85%",
                                end: "top 55%",
                                scrub: 1.2,
                            },
                        });
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen overflow-hidden bg-[#0A0A0A] relative"
        >
            {/* Background Image avec overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero.jpg"
                    alt="Contact background"
                    fill
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-black/80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-20 py-20">
                <div className="w-full">
                    {/* Heading - Centré */}
                    <h2
                        ref={headingRef}
                        className="text-white text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight text-center mb-16"
                    >
                        {translations.heading}
                    </h2>

                    {/* Grid 2 colonnes */}
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-center">
                        {/* Colonne gauche - Formulaire */}
                        <div ref={formRef} className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="w-full max-w-[550px]">
                                <div className="bg-white rounded-[25px] p-8 shadow-xl">
                                    {/* Header formulaire */}
                                    <div className="mb-8">
                                        <p className="text-[#0A0A0A] text-xs font-medium tracking-[0.2em] uppercase mb-4">
                                            {translations.formBrand}
                                        </p>
                                        <h3 className="text-[#0A0A0A] text-3xl md:text-4xl font-bold leading-tight">
                                            {translations.formTitle}
                                        </h3>
                                    </div>

                                    {/* Formulaire shadcn/ui avec react-hook-form */}
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                            {/* Name Field */}
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#090909] text-sm font-medium">
                                                            {translations.nameLabel}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder={translations.namePlaceholder}
                                                                {...field}
                                                                className="h-[58px] bg-[#F5F5F5] border-none rounded-[10px] text-[#090909] placeholder:text-[#999999] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Email Field */}
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#090909] text-sm font-medium">
                                                            {translations.emailLabel}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="email"
                                                                placeholder={translations.emailPlaceholder}
                                                                {...field}
                                                                className="h-[58px] bg-[#F5F5F5] border-none rounded-[10px] text-[#090909] placeholder:text-[#999999] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Message Field */}
                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[#090909] text-sm font-medium">
                                                            {translations.messageLabel}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder={translations.messagePlaceholder}
                                                                {...field}
                                                                rows={1}
                                                                className="min-h-[58px] bg-[#F5F5F5] border-none rounded-[10px] text-[#090909] placeholder:text-[#999999] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-[58px] bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white rounded-full text-base font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center gap-2">
                                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    translations.submitButton
                                                )}
                                            </Button>

                                            {/* Terms */}
                                            <p className="text-xs text-[#090909]/60 leading-relaxed">
                                                {translations.termsText}{" "}
                                                <a href="/terms" className="text-[#0A0A0A] underline hover:no-underline">
                                                    {translations.termsLink}
                                                </a>{" "}
                                                {translations.andText}{" "}
                                                <a href="/privacy" className="text-[#0A0A0A] underline hover:no-underline">
                                                    {translations.privacyLink}
                                                </a>.
                                            </p>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </div>

                        {/* Colonne droite - Contenu */}
                        <div ref={contentRef} className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                            <div className="w-full max-w-[650px] space-y-12">
                                {/* Description */}
                                <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                                    {translations.description}
                                </p>

                                {/* Divider */}
                                <div className="w-full h-px bg-white/10"></div>

                                {/* Info Cards */}
                                <div className="flex flex-col gap-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xl">⚡</span>
                                        </div>
                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-2">
                                                {translations.quickResponseTitle}
                                            </h3>
                                            <p className="text-white/60 text-base leading-relaxed">
                                                {translations.quickResponseDesc}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xl">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="text-white text-xl font-semibold mb-2">
                                                {translations.clearStepsTitle}
                                            </h3>
                                            <p className="text-white/60 text-base leading-relaxed">
                                                {translations.clearStepsDesc}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Card */}
                                <div className="flex items-center gap-4">
                                    {/* Image avec initiales */}
                                    <div className="w-[125px] h-[160px] bg-white rounded-2xl p-1.5 flex-shrink-0">
                                        <div className="w-[113px] h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                            <span className="text-white font-bold text-4xl">PB</span>
                                        </div>
                                    </div>

                                    {/* Card content */}
                                    <div className="w-[285px] h-[160px] bg-white rounded-2xl p-6 flex flex-col justify-between">
                                        <div>
                                            <p className="text-[#090909] text-[11px] font-medium h-[14px] mb-[3px]">
                                                {translations.contactRole}
                                            </p>
                                            <p className="text-[#090909]/60 text-[12px] font-normal h-[15px]">
                                                {translations.contactCompany}
                                            </p>
                                            <h4 className="text-[#090909] text-[20px] font-bold leading-[1.265] mt-[5px]">
                                                {translations.contactName}
                                            </h4>
                                        </div>

                                        {/* CTA Button */}
                                        <button className="w-[128px] h-[30px] px-3 bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white rounded-full text-[10px] font-medium transition-all duration-300 flex items-center justify-between">
                                            <span>{translations.contactCta}</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

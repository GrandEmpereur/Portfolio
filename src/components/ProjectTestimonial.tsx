"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import type { ProjectTestimonial } from "@/lib/data/testimonials.data"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface ProjectTestimonialProps {
    testimonial: ProjectTestimonial
    locale: 'fr' | 'en' | 'pl'
}

export function ProjectTestimonialSection({ testimonial, locale }: ProjectTestimonialProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const quoteRef = useRef<HTMLDivElement>(null)
    const authorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            // Animation du quote
            if (quoteRef.current) {
                gsap.from(quoteRef.current, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                })
            }

            // Animation de l'auteur
            if (authorRef.current) {
                gsap.from(authorRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    delay: 0.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: authorRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const quote = testimonial.quote[locale] || testimonial.quote.en

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-black via-zinc-900 to-black"
        >
            <div className="max-w-5xl mx-auto">
                {/* Quote Icon */}
                <div className="mb-8 md:mb-12">
                    <svg
                        className="w-12 h-12 md:w-16 md:h-16 text-white/20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                </div>

                {/* Quote Text */}
                <div ref={quoteRef} className="mb-12 md:mb-16">
                    <blockquote className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white/90 font-light italic">
                        "{quote}"
                    </blockquote>
                </div>

                {/* Author Info */}
                <div ref={authorRef} className="flex items-center gap-6">
                    {/* Avatar Placeholder */}
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
                            <span className="text-2xl md:text-3xl font-bold text-white/80">
                                {testimonial.author.name.charAt(0)}
                            </span>
                        </div>
                    </div>

                    {/* Author Details */}
                    <div className="flex flex-col gap-1">
                        <div className="text-lg md:text-xl font-semibold text-white">
                            {testimonial.author.name}
                        </div>
                        <div className="text-sm md:text-base text-white/60">
                            {testimonial.author.role}
                        </div>
                        <div className="text-sm md:text-base text-white/40">
                            {testimonial.author.company}
                        </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="ml-auto hidden md:flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <svg
                                key={i}
                                className="w-5 h-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>

                {/* Date */}
                <div className="mt-8 text-sm text-white/30">
                    {new Date(testimonial.date).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                    })}
                </div>
            </div>
        </section>
    )
}


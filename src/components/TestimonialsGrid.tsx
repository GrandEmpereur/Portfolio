"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import type { ProjectTestimonial } from "@/lib/data/testimonials.data"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface TestimonialsGridProps {
    testimonials: ProjectTestimonial[]
    locale: 'fr' | 'en' | 'pl'
    title?: string
}

export function TestimonialsGrid({ testimonials, locale, title }: TestimonialsGridProps) {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            // Animation du titre
            if (titleRef.current) {
                gsap.from(titleRef.current, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: "top 80%",
                    },
                })
            }

            // Animation des cards en stagger
            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('.testimonial-card')
                gsap.from(cards, {
                    opacity: 0,
                    y: 60,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 70%",
                    },
                })
            }
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-32 px-8 md:px-16 lg:px-24"
        >
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                {title && (
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 uppercase"
                    >
                        {title}
                    </h2>
                )}

                {/* Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {testimonials.map((testimonial, index) => {
                        const quote = testimonial.quote[locale] || testimonial.quote.en
                        // Truncate long quotes for grid display
                        const truncatedQuote = quote.length > 200
                            ? quote.substring(0, 200) + '...'
                            : quote

                        return (
                            <div
                                key={`${testimonial.projectSlug}-${index}`}
                                className="testimonial-card group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                            >
                                {/* Quote Icon */}
                                <div className="mb-6">
                                    <svg
                                        className="w-8 h-8 text-white/20 group-hover:text-white/30 transition-colors"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Quote */}
                                <blockquote className="text-base md:text-lg leading-relaxed text-white/80 mb-8 italic">
                                    "{truncatedQuote}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10 flex items-center justify-center">
                                            <span className="text-lg font-bold text-white/80">
                                                {testimonial.author.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <div className="text-sm font-semibold text-white">
                                            {testimonial.author.name}
                                        </div>
                                        <div className="text-xs text-white/50">
                                            {testimonial.author.role}
                                        </div>
                                        <div className="text-xs text-white/40">
                                            {testimonial.author.company}
                                        </div>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mt-6">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-4 h-4 text-yellow-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Hover Effect Gradient */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}


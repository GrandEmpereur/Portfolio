"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

interface PageTransitionsProps {
    children: React.ReactNode
}

export const PageTransitions = ({ children }: PageTransitionsProps) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            // Animation des sections au scroll - SIMPLIFIÉE
            const sections = gsap.utils.toArray<HTMLElement>('section')

            sections.forEach((section) => {
                // Fade in simple sans scrub pour éviter les saccades
                gsap.fromTo(section,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none none",
                            once: true, // Animation une seule fois
                        },
                    }
                )
            })

            // Parallax effect OPTIMISÉ - seulement sur éléments avec data-speed
            const parallaxElements = document.querySelectorAll('[data-speed]')
            parallaxElements.forEach((el) => {
                const speed = parseFloat(el.getAttribute('data-speed') || '1')
                const movement = -(speed * 50) // Réduit le mouvement

                gsap.to(el, {
                    y: movement,
                    ease: "none",
                    scrollTrigger: {
                        trigger: el,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5, // Scrub plus rapide
                        invalidateOnRefresh: true,
                    },
                })
            })

            // Reveal effect pour les titres avec data-reveal
            const titles = document.querySelectorAll('[data-reveal="title"]')
            titles.forEach((title) => {
                gsap.fromTo(title,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 85%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                )
            })

            // Stagger effect OPTIMISÉ
            const lists = document.querySelectorAll('[data-stagger]')
            lists.forEach((list) => {
                const items = Array.from(list.children)

                gsap.fromTo(items,
                    {
                        opacity: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: list,
                            start: "top 85%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                )
            })

            // Rotation effect OPTIMISÉ
            const rotateElements = document.querySelectorAll('[data-rotate]')
            rotateElements.forEach((el) => {
                const rotation = parseFloat(el.getAttribute('data-rotate') || '0')

                gsap.fromTo(el,
                    {
                        rotation: -rotation * 0.5,
                        opacity: 0,
                    },
                    {
                        rotation: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            toggleActions: "play none none none",
                            once: true,
                        },
                    }
                )
            })

            // Magnetic effect pour les boutons (sans changement)
            const magneticElements = document.querySelectorAll('[data-magnetic]')
            magneticElements.forEach((el) => {
                const element = el as HTMLElement

                element.addEventListener('mouseenter', () => {
                    gsap.to(element, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                })

                element.addEventListener('mouseleave', () => {
                    gsap.to(element, {
                        scale: 1,
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)",
                    })
                })

                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect()
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15

                    gsap.to(element, {
                        x,
                        y,
                        duration: 0.3,
                        ease: "power2.out",
                    })
                })
            })

        }, containerRef)

        return () => {
            ctx.revert()
        }
    }, [])

    return (
        <div ref={containerRef} className="relative">
            {children}
        </div>
    )
}


'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lastwork } from '@/lib/data/lastwork.data'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function LatestWorkTimeline() {
    const [activeIndex, setActiveIndex] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const projectRefs = useRef<HTMLDivElement[]>([])
    const targetIndexRef = useRef(0)
    const animationFrameRef = useRef<number | null>(null)

    // Get first 5 projects
    const projects = lastwork.slice(0, 5)

    useEffect(() => {
        if (!containerRef.current) return

        const handleScroll = () => {
            if (!containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const scrolled = -rect.top
            const totalHeight = containerRef.current.offsetHeight - window.innerHeight
            const progress = Math.max(0, Math.min(1, scrolled / totalHeight))

            const newTargetIndex = Math.min(
                Math.floor(progress * projects.length),
                projects.length - 1
            )

            targetIndexRef.current = newTargetIndex
        }

        // Smooth animation loop
        const animate = () => {
            const target = targetIndexRef.current
            const current = activeIndex

            // If we're not at the target, smoothly transition
            if (current !== target) {
                setActiveIndex(target)
            }

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check
        animate() // Start animation loop

        return () => {
            window.removeEventListener('scroll', handleScroll)
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [projects.length, activeIndex])

    const currentProject = projects[activeIndex]

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${projects.length * 100}vh` }}>
            {/* Fixed/Sticky Container */}
            <div className="sticky top-0 h-screen w-full flex items-center">
                <div className="w-full h-full flex">
                    {/* Left Side - Project Info */}
                    <div className="w-1/2 h-full flex flex-col justify-between p-8 md:p-16 lg:p-24">
                        {/* Top Section */}
                        <div>
                            <span className="text-gray-400 text-sm font-medium tracking-wider uppercase">
                                (04)
                            </span>
                        </div>

                        {/* Middle Section - Counter and Info */}
                        <div className="flex-1 flex flex-col justify-center">
                            {/* Large Counter */}
                            <div className="mb-8">
                                <h2
                                    key={`counter-${activeIndex}`}
                                    className="text-[120px] md:text-[180px] lg:text-[240px] font-bold text-gray-700 leading-none"
                                    style={{
                                        animation: 'fadeSlideIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                                    }}
                                >
                                    {(activeIndex + 1).toString().padStart(2, '0')}.
                                </h2>
                            </div>

                            {/* Project Name */}
                            <div className="mb-4">
                                <h3
                                    key={`name-${activeIndex}`}
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                                    style={{
                                        animation: 'fadeSlideIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards',
                                        opacity: 0
                                    }}
                                >
                                    {currentProject?.title}
                                </h3>
                            </div>

                            {/* Project Description */}
                            <div className="max-w-md">
                                <p
                                    key={`desc-${activeIndex}`}
                                    className="text-lg md:text-xl text-gray-400"
                                    style={{
                                        animation: 'fadeSlideIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards',
                                        opacity: 0
                                    }}
                                >
                                    {currentProject?.description}
                                </p>
                            </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="space-y-4">
                            {/* Category Labels */}
                            <div className="flex gap-4 text-sm text-gray-500 uppercase tracking-wider">
                                <span>Arjuna</span>
                                <span>Bima</span>
                                <span className="font-bold text-white">Mandala</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Project Image */}
                    <div className="w-1/2 h-full relative overflow-hidden">
                        {currentProject?.image ? (
                            <Image
                                key={`image-${activeIndex}`}
                                src={currentProject.image}
                                alt={`${currentProject.title} - ${currentProject.description || 'E-commerce project showcase'}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                                quality={85}
                                priority={activeIndex === 0}
                                style={{
                                    animation: 'fadeScaleIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                                }}
                            />
                        ) : (
                            <div
                                key={`bg-${activeIndex}`}
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: currentProject?.bgColor,
                                    animation: 'fadeScaleIn 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                                }}
                            />
                        )}

                        {/* Optional: Add a frame/border */}
                        <div className="absolute inset-8 md:inset-16 border-2 border-white/20 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* CTA Section - Positioned at the end */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-24">
                <Link
                    href="/projects"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105"
                >
                    <span>More Projects</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeScaleIn {
                    from {
                        opacity: 0;
                        transform: scale(1.1);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    )
}


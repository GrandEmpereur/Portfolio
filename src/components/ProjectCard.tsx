'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Project } from '@/lib/data/lastwork.data'
import { useState } from 'react'

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const CardContent = () => (
        <div
            className="relative w-full aspect-square overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
        >
            {/* Background - Image or Color */}
            {project.image ? (
                <Image
                    src={project.image}
                    alt={`${project.title} - ${project.description || 'E-commerce project'}`}
                    fill
                    className="object-cover group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    style={{
                        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                />
            ) : (
                <div
                    className="absolute inset-0 group-hover:scale-110"
                    style={{
                        backgroundColor: project.bgColor,
                        transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                />
            )}

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/20 group-hover:bg-black/40"
                style={{
                    transition: 'background-color 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            />

            {/* Title - Always Visible - Centered */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h3 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center px-8 transition-opacity duration-300">
                    {project.title}
                </h3>
            </div>

            {/* Hover Content */}
            <div
                className={`absolute inset-0 z-20 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    transition: 'opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
            >
                {/* Technologies - Bottom Left */}
                <div className="absolute bottom-8 left-8 flex flex-wrap gap-2 max-w-[60%]">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-white/90 text-black text-xs md:text-sm px-3 py-1.5 rounded-full font-medium backdrop-blur-sm"
                            style={{
                                animation: isHovered ? `slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s forwards` : 'none',
                                opacity: 0,
                                transform: 'translateY(20px)',
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Action Button - Bottom Right */}
                <div className="absolute bottom-8 right-8 pointer-events-auto">
                    <div
                        className="bg-white text-black p-3 md:p-4 rounded-full hover:bg-white/90 hover:scale-110"
                        style={{
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            animation: isHovered ? 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards' : 'none',
                            opacity: isHovered ? 1 : 0,
                            transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                        }}
                    >
                        <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                </div>
            </div>

            {/* Keyframes for animations */}
            <style jsx>{`
                @keyframes slideUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )

    // If external link, use regular anchor
    if (project.link && project.link.startsWith('http')) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <CardContent />
            </a>
        )
    }

    // If internal link, use Next.js Link
    return (
        <Link href={`/projects/${project.slug}`} className="block">
            <CardContent />
        </Link>
    )
}


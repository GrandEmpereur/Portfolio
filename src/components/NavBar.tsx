"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useScopedI18n } from "@/locales/client"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export const NavBar = () => {
    const navT = useScopedI18n('nav')
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Fonction pour vérifier si le lien est actif
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/' || pathname === '/fr' || pathname === '/en' || pathname === '/pl'
        }
        return pathname.includes(path)
    }

    // Détecter le scroll pour ajuster la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Fermer le menu mobile lors du changement de route
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <div className="max-w-7xl mx-auto">
                        {/* Container avec glassmorphism moderne */}
                        <div className={`
                            relative backdrop-blur-2xl rounded-full
                            border border-white/5
                            transform-gpu transition-all duration-500
                            ${isScrolled ? 'bg-white/[0.06] border-white/10' : 'bg-white/[0.03]'}
                        `}>
                            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">

                                {/* Logo */}
                                <Link
                                    href="/"
                                    className="text-white font-bold text-xl tracking-tight hover:text-white/80 transition-colors duration-300 z-10"
                                    style={{ fontFamily: 'var(--font-anton), sans-serif' }}
                                >
                                    PB
                                </Link>

                                {/* Navigation Links - Desktop */}
                                <div className="hidden lg:flex items-center gap-2">
                                    <NavLink href="/" isActive={isActive('/')} label={navT('home')} />
                                    <NavLink href="/projects" isActive={isActive('/projects')} label={navT('projects')} />
                                    <NavLink href="/contact" isActive={isActive('/contact')} label={navT('contact')} />
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {/* Language Switcher */}
                                    <div className="hidden sm:block">
                                        <LanguageSwitcher />
                                    </div>

                                    {/* Menu Hamburger - Mobile */}
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full glass-light border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                                        aria-label="Toggle menu"
                                    >
                                        {isMenuOpen ? (
                                            <X className="w-5 h-5" />
                                        ) : (
                                            <Menu className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Menu Mobile - Full Screen Overlay */}
            <div className={`
                fixed inset-0 z-40 lg:hidden
                transition-all duration-500 ease-out
                ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu Content */}
                <div className={`
                    relative h-full flex flex-col items-center justify-center gap-8 p-8
                    transform transition-all duration-500 ease-out
                    ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                `}>
                    {/* Navigation Links */}
                    <MobileNavLink
                        href="/"
                        isActive={isActive('/')}
                        label={navT('home')}
                        delay={0}
                    />
                    <MobileNavLink
                        href="/projects"
                        isActive={isActive('/projects')}
                        label={navT('projects')}
                        delay={100}
                    />
                    <MobileNavLink
                        href="/contact"
                        isActive={isActive('/contact')}
                        label={navT('contact')}
                        delay={200}
                    />

                    {/* Language Switcher Mobile */}
                    <div className="mt-8">
                        <LanguageSwitcher />
                    </div>

                    {/* CTA Button Mobile */}
                    <Link
                        href="/contact"
                        className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-lg font-medium hover:bg-white/90 transition-all duration-300"
                    >
                        <span>{navT('get in touch')}</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

// Composant NavLink Desktop
const NavLink = ({ href, isActive, label }: { href: string; isActive: boolean; label: string }) => {
    return (
        <Link
            href={href}
            className={`
                relative px-4 py-2 rounded-full text-sm font-medium
                transform-gpu transition-all duration-300
                ${isActive
                    ? 'text-white bg-white/10 shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }
            `}
        >
            {label}
        </Link>
    )
}

// Composant NavLink Mobile
const MobileNavLink = ({
    href,
    isActive,
    label,
    delay
}: {
    href: string
    isActive: boolean
    label: string
    delay: number
}) => {
    return (
        <Link
            href={href}
            className="group relative"
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className={`
                text-5xl sm:text-6xl font-black tracking-tight
                transform-gpu transition-all duration-300
                ${isActive
                    ? 'text-gradient-orange'
                    : 'text-white/40 group-hover:text-white/90'
                }
            `}>
                {label}
            </div>

            {/* Underline effect */}
            <div className={`
                h-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500
                transform-gpu transition-all duration-300 origin-left
                ${isActive
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }
            `} />
        </Link>
    )
}

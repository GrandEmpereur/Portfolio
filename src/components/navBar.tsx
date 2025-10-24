"use client"

import Link from "next/link"
import { useScopedI18n } from "@/locales/client"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { usePathname } from "next/navigation"

export const NavBar = () => {
    const navT = useScopedI18n('nav')
    const pathname = usePathname()

    // Fonction pour vérifier si le lien est actif
    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/' || pathname === '/fr' || pathname === '/en' || pathname === '/pl'
        }
        return pathname.includes(path)
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-6xl mx-auto">
                    {/* Container avec glassmorphism */}
                    <div className="relative bg-gradient-to-r from-white/[0.13] to-white/[0.08] backdrop-blur-[100px] rounded-[60px] shadow-[0_1px_2.5px_rgba(0,0,0,0.2)] border border-white/5">
                        <div className="flex items-center justify-between px-3 py-3">

                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-sm hover:scale-105 transition-transform duration-300">
                                    PB
                                </Link>
                            </div>

                            {/* Navigation Links - Cachés sur mobile */}
                            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                                <NavLink href="/" isActive={isActive('/')} label={navT('home')} />
                                <NavLink href="/projects" isActive={isActive('/projects')} label={navT('projects')} />
                                {/*<NavLink href="/services" isActive={isActive('/services')} label={navT('services')} />*/}
                                <NavLink href="/contact" isActive={isActive('/contact')} label={navT('contact')} />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <LanguageSwitcher />

                                {/* CTA Button */}
                                <Link
                                    href="/contact"
                                    className="group relative flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-[7.3px] rounded-full transition-all duration-300 shadow-[0_1px_2.5px_rgba(0,0,0,0.69)]"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:scale-125 transition-transform duration-300"></span>
                                    <span className="text-white text-sm font-medium hidden sm:inline">
                                        {navT('get in touch')}
                                    </span>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// Composant NavLink avec dot gradient
const NavLink = ({ href, isActive, label }: { href: string; isActive: boolean; label: string }) => {
    return (
        <Link
            href={href}
            className="group relative flex items-center gap-2.5 transition-all duration-300"
        >
            {/* Dot gradient */}
            <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive
                ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-green-400 scale-100'
                : 'bg-gradient-to-br from-purple-500/50 via-pink-500/50 to-green-400/50 scale-75 group-hover:scale-100'
                }`}></span>

            {/* Label */}
            <span className={`text-sm font-light tracking-wide transition-all duration-300 ${isActive
                ? 'text-white opacity-100'
                : 'text-white/70 group-hover:text-white group-hover:opacity-100'
                }`}>
                {label}
            </span>
        </Link>
    )
}

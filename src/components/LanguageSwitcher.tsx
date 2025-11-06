"use client"

import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export const LanguageSwitcher = () => {
    const changeLocale = useChangeLocale()
    const locale = useCurrentLocale()

    const languages = [
        { code: 'fr', flag: '🇫🇷', label: 'Français' },
        { code: 'en', flag: '🇺🇸', label: 'English' },
        { code: 'pl', flag: '🇵🇱', label: 'Polski' },
    ]

    const currentLanguage = languages.find(lang => lang.code === locale)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group flex items-center gap-2 px-3 py-2 rounded-full glass-light border border-white/10 text-white hover:bg-white/10 transition-all duration-300">
                    <Globe className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                    <span className="hidden sm:inline text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                        {currentLanguage?.flag}
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="backdrop-blur-2xl bg-black/80 border border-white/10 rounded-2xl p-2 shadow-2xl shadow-orange-500/10"
            >
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLocale(lang.code as 'fr' | 'en' | 'pl')}
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                            transition-all duration-300
                            ${locale === lang.code
                                ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-white'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }
                        `}
                    >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                        {locale === lang.code && (
                            <span className="ml-auto text-orange-500">✓</span>
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


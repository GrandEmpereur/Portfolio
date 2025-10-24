"use client"

import { useChangeLocale, useCurrentLocale } from "@/locales/client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export const LanguageSwitcher = () => {
    const changeLocale = useChangeLocale()
    const locale = useCurrentLocale()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Globe className="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLocale('fr')}>
                    🇫🇷 Français {locale === 'fr' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale('en')}>
                    🇺🇸 English {locale === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLocale('pl')}>
                    🇵🇱 Polski {locale === 'pl' && '✓'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


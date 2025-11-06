"use client"

import { useState, useEffect } from 'react'

/**
 * Hook pour détecter les media queries
 * @param query - Media query string (ex: '(max-width: 767px)')
 * @returns boolean - true si la media query match
 */
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)

        // Set initial value
        setMatches(media.matches)

        // Create listener
        const listener = () => setMatches(media.matches)

        // Add listener (modern browsers)
        media.addEventListener('change', listener)

        // Cleanup
        return () => media.removeEventListener('change', listener)
    }, [query])

    return matches
}

/**
 * Hook pour détecter si on est sur mobile (< 768px)
 */
export const useIsMobile = (): boolean => {
    return useMediaQuery('(max-width: 767px)')
}

/**
 * Hook pour détecter si on est sur tablette (768px - 1023px)
 */
export const useIsTablet = (): boolean => {
    return useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
}

/**
 * Hook pour détecter si on est sur desktop (>= 1024px)
 */
export const useIsDesktop = (): boolean => {
    return useMediaQuery('(min-width: 1024px)')
}

/**
 * Hook pour détecter si on est sur un appareil tactile
 */
export const useIsTouchDevice = (): boolean => {
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        const checkTouch = () => {
            return (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(max-width: 1023px)').matches
            )
        }

        setIsTouch(checkTouch())
    }, [])

    return isTouch
}


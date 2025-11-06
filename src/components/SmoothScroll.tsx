"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
    children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Détection mobile pour ajuster les paramètres
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        // Initialiser Lenis avec paramètres optimisés pour mobile
        lenisRef.current = new Lenis({
            duration: isMobile ? 0.8 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: isMobile ? 0.8 : 1,
            touchMultiplier: isMobile ? 1.5 : 2,
            infinite: false,
        });

        // Intégration avec GSAP ScrollTrigger
        lenisRef.current.on("scroll", ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisRef.current?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenisRef.current?.destroy();
            lenisRef.current = null;
        };
    }, []);

    return <>{children}</>;
};


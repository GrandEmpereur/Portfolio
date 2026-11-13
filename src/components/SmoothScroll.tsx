"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { scroller } from "@/lib/scroll";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Détection mobile pour ajuster les paramètres
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        const lenis = new Lenis({
            duration: isMobile ? 0.8 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: isMobile ? 0.8 : 1,
            touchMultiplier: isMobile ? 1.5 : 2,
            infinite: false,
        });
        scroller.lenis = lenis;

        // Intégration avec GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
            if (scroller.lenis === lenis) scroller.lenis = null;
        };
    }, []);

    return <>{children}</>;
};

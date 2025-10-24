"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(CustomEase);
}

export const PageTransition = () => {
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip animation on first render (page load)
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (!overlayRef.current || !counterRef.current) return;

        // Custom ease pour transition fluide
        CustomEase.create("transitionEase", "0.77, 0, 0.175, 1");

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // === PHASE 1: Entrée de la transition (0-0.6s) ===
            tl.set(overlayRef.current, { display: "flex" });

            // Overlay slide down
            tl.from(overlayRef.current, {
                yPercent: -100,
                duration: 0.6,
                ease: "transitionEase",
            });

            // Counter fade in avec compteur rapide
            tl.from(counterRef.current, {
                opacity: 0,
                duration: 0.3,
            }, "-=0.3");

            // Animation du compteur 0→100
            tl.to({ val: 0 }, {
                val: 100,
                duration: 0.4,
                ease: "power2.inOut",
                onUpdate: function () {
                    if (counterRef.current) {
                        const current = Math.ceil(this.targets()[0].val);
                        counterRef.current.textContent = current.toString().padStart(3, '0');
                    }
                },
            }, "-=0.3");

            // === PHASE 2: Sortie de la transition (0.6-1.2s) ===
            // Overlay slide up
            tl.to(overlayRef.current, {
                yPercent: 100,
                duration: 0.6,
                ease: "transitionEase",
                delay: 0.2,
            });

            // Reset et hide
            tl.set(overlayRef.current, { display: "none" });

        }, overlayRef);

        return () => ctx.revert();
    }, [pathname]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-black hidden items-center justify-center overflow-hidden pointer-events-none"
            style={{ willChange: "transform" }}
        >
            {/* Counter - Centre */}
            <div
                ref={counterRef}
                className="text-7xl md:text-8xl lg:text-9xl font-anton font-bold text-white tabular-nums"
                style={{
                    willChange: "opacity",
                    textShadow: `
                        1px 1px 0 rgba(0,0,0,0.3),
                        2px 2px 0 rgba(0,0,0,0.3),
                        3px 3px 0 rgba(0,0,0,0.3),
                        4px 4px 0 rgba(0,0,0,0.3),
                        5px 5px 0 rgba(0,0,0,0.3),
                        6px 6px 0 rgba(0,0,0,0.3),
                        7px 7px 0 rgba(0,0,0,0.25),
                        8px 8px 0 rgba(0,0,0,0.25),
                        9px 9px 0 rgba(0,0,0,0.25),
                        10px 10px 0 rgba(0,0,0,0.25),
                        11px 11px 15px rgba(0,0,0,0.6)
                    `
                }}
            >
                000
            </div>

            {/* Grain texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
        </div>
    );
};


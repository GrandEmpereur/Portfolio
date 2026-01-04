"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, CustomEase);
}

export const PageLoader = () => {
    const loaderRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!loaderRef.current || !nameRef.current || !counterRef.current) return;

        // Custom ease pour effet unique
        CustomEase.create("counterEase", "0.87, 0, 0.13, 1");

        const ctx = gsap.context(() => {
            // Timeline principale avec defaults
            const tl = gsap.timeline({
                defaults: { ease: "power4.out" },
                onComplete: () => {
                    setIsLoaded(true);
                },
            });

            // Split text sur le nom avec GSAP SplitText
            const split = new SplitText(nameRef.current, {
                type: "chars",
                charsClass: "char"
            });

            // Perspective 3D pour le nom
            gsap.set(nameRef.current, {
                perspective: 1000,
                transformStyle: "preserve-3d",
            });

            // === PHASE 1: Entrée (0-0.5s) ===
            tl.add("start");

            // Animation du counter en haut à gauche
            tl.from(counterRef.current, {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "back.out(1.7)",
            }, "start");

            // Animation du nom en bas à gauche lettre par lettre
            tl.from(split.chars, {
                opacity: 0,
                y: 50,
                rotationX: -90,
                stagger: 0.05,
                duration: 1,
                ease: "back.out(1.7)",
            }, "start+=0.2");

            // === PHASE 2: Chargement avec compteur 3D (0.5-2.5s) ===
            tl.add("loading", "+=0.3");

            // Compteur de 0 à 100
            tl.to({ val: 0 }, {
                val: 100,
                duration: 2,
                ease: "counterEase",
                onUpdate: function () {
                    if (counterRef.current) {
                        const current = Math.ceil(this.targets()[0].val);
                        const formatted = current.toString().padStart(3, '0');
                        counterRef.current.textContent = formatted;
                    }
                },
            }, "loading");

            // === PHASE 3: Sortie (2.5-3.5s) ===
            tl.add("exit", "+=0.3");

            // Fade out du counter
            tl.to(counterRef.current, {
                opacity: 0,
                x: -100,
                duration: 0.8,
                ease: "power2.in",
            }, "exit");

            // Fade out du nom avec rotation 3D
            tl.to(split.chars, {
                opacity: 0,
                y: 100,
                rotationX: 90,
                stagger: 0.02,
                duration: 0.8,
                ease: "power2.in",
            }, "exit");

            // Loader slide up
            tl.to(loaderRef.current, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
            }, "exit+=0.5");

        }, loaderRef);

        return () => ctx.revert();
    }, []);

    if (isLoaded) return null;

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-10000 bg-black overflow-hidden"
            style={{ willChange: "transform" }}
        >
            {/* Counter - Haut à gauche */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12">
                <div
                    ref={counterRef}
                    className="text-7xl md:text-8xl lg:text-9xl font-anton font-bold text-white tabular-nums"
                    style={{
                        willChange: "transform, opacity",
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
            </div>

            {/* Nom et Prénom - Bas à gauche */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <div
                    ref={nameRef}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                    style={{
                        perspective: "1000px",
                        transformStyle: "preserve-3d",
                        willChange: "transform, opacity"
                    }}
                >
                    Patrick Bartosik
                </div>
                <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mt-3">
                    Portfolio Developer
                </p>
            </div>

            {/* Grain texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 pointer-events-none" />
        </div>
    );
};

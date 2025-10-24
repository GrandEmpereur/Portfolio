"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!cursorRef.current || !cursorDotRef.current) return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;

        // Cacher le cursor par défaut
        document.body.style.cursor = "none";

        // Suivi de la souris
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Déplacement instantané du point central
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
            });
        };

        // Animation lerp pour le cercle principal (smooth following)
        const animateCursor = () => {
            const dx = mousePos.current.x - cursorPos.current.x;
            const dy = mousePos.current.y - cursorPos.current.y;

            cursorPos.current.x += dx * 0.15;
            cursorPos.current.y += dy * 0.15;

            gsap.set(cursor, {
                x: cursorPos.current.x,
                y: cursorPos.current.y,
            });

            requestAnimationFrame(animateCursor);
        };

        animateCursor();
        window.addEventListener("mousemove", handleMouseMove);

        // Effet au hover sur les éléments interactifs
        const handleMouseEnter = () => {
            gsap.to(cursor, {
                scale: 1.8,
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(cursorDot, {
                scale: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
            gsap.to(cursorDot, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        // Sélecteurs d'éléments interactifs
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select'
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Effet magnetic sur les CTAs
        const magneticElements = document.querySelectorAll('[data-magnetic="true"]');

        magneticElements.forEach((el) => {
            const htmlEl = el as HTMLElement;

            htmlEl.addEventListener("mousemove", (e) => {
                const rect = htmlEl.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(htmlEl, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out",
                });

                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3,
                });
            });

            htmlEl.addEventListener("mouseleave", () => {
                gsap.to(htmlEl, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)",
                });

                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                });
            });
        });

        // Cleanup
        return () => {
            document.body.style.cursor = "auto";
            window.removeEventListener("mousemove", handleMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnter);
                el.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            {/* Cercle principal - Suit avec lerp */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div className="w-full h-full border-2 border-white rounded-full"></div>
            </div>

            {/* Point central - Suit instantanément */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white pointer-events-none z-[9999] rounded-full mix-blend-difference"
                style={{
                    transform: "translate(-50%, -50%)",
                }}
            ></div>
        </>
    );
};


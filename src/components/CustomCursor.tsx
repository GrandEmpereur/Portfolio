"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-config";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorLabelRef = useRef<HTMLSpanElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const isTouchDevice =
            window.matchMedia("(max-width: 1023px)").matches ||
            "ontouchstart" in window ||
            navigator.maxTouchPoints > 0;

        if (isTouchDevice) return;

        if (!cursorRef.current || !cursorDotRef.current || !cursorLabelRef.current)
            return;

        const cursor = cursorRef.current;
        const cursorDot = cursorDotRef.current;
        const cursorLabel = cursorLabelRef.current;

        document.body.style.cursor = "none";

        let hasRevealed = false;
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });

            if (!hasRevealed) {
                hasRevealed = true;
                gsap.set(cursor, { x: e.clientX, y: e.clientY });
                cursorPos.current = { x: e.clientX, y: e.clientY };
                gsap.to(cursor, { opacity: 1, duration: 0.3 });
                gsap.to(cursorDot, { opacity: 1, duration: 0.3 });
            }
        };

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

        // Default interactive hover
        const handleMouseEnter = () => {
            gsap.to(cursor, { scale: 1.8, duration: 0.3, ease: "power2.out" });
            gsap.to(cursorDot, { scale: 0, duration: 0.3, ease: "power2.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(cursorLabel, { opacity: 0, duration: 0.2 });
            cursorLabel.textContent = "";
        };

        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select',
        );

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnter);
            el.addEventListener("mouseleave", handleMouseLeave);
        });

        // Labeled cursor elements
        const labeledElements = document.querySelectorAll("[data-cursor-label]");

        labeledElements.forEach((el) => {
            const htmlEl = el as HTMLElement;

            htmlEl.addEventListener("mouseenter", () => {
                const labelText = htmlEl.dataset.cursorLabel || "";
                cursorLabel.textContent = labelText;
                gsap.to(cursor, {
                    width: 80,
                    height: 80,
                    duration: 0.3,
                    ease: "power2.out",
                });
                gsap.to(cursorLabel, { opacity: 1, duration: 0.2, delay: 0.1 });
                gsap.to(cursorDot, { scale: 0, duration: 0.3, ease: "power2.out" });
            });

            htmlEl.addEventListener("mouseleave", () => {
                gsap.to(cursor, {
                    width: 48,
                    height: 48,
                    duration: 0.3,
                    ease: "power2.out",
                });
                gsap.to(cursorLabel, { opacity: 0, duration: 0.2 });
                gsap.to(cursorDot, { scale: 1, duration: 0.3, ease: "power2.out" });
                cursorLabel.textContent = "";
            });
        });

        // Magnetic effect
        const magneticElements = document.querySelectorAll(
            '[data-magnetic="true"]',
        );

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
                gsap.to(cursor, { scale: 2, duration: 0.3 });
            });

            htmlEl.addEventListener("mouseleave", () => {
                gsap.to(htmlEl, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)",
                });
                gsap.to(cursor, { scale: 1, duration: 0.3 });
            });
        });

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
            {/* Main cursor circle — hidden until first mousemove */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-12 h-12 pointer-events-none z-[9999] mix-blend-difference hidden lg:flex items-center justify-center"
                style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
            >
                <div className="w-full h-full border-2 border-white rounded-full absolute inset-0" />
                <span
                    ref={cursorLabelRef}
                    className="relative text-white text-xs font-medium uppercase tracking-wider opacity-0"
                />
            </div>

            {/* Center dot — hidden until first mousemove */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white pointer-events-none z-[9999] rounded-full mix-blend-difference hidden lg:block"
                style={{ transform: "translate(-50%, -50%)", opacity: 0 }}
            />
        </>
    );
};

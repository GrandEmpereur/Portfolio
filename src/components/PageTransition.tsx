"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Animation d'apparition
        gsap.fromTo(
            containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        );
    }, [pathname]);

    return <div ref={containerRef}>{children}</div>;
};

export default PageTransition;

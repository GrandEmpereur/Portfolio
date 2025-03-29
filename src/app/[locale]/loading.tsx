'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export default function PageLoading() {
    const [progress, setProgress] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animation de chargement
        const tl = gsap.timeline();

        // Simuler la progression du chargement
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.random() * 10;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 200);

        // Animation du texte de pourcentage
        gsap.to(loaderRef.current, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: 'power2.out'
        });

        // Une fois le chargement terminé
        const completeLoading = () => {
            clearInterval(interval);

            // Animation de sortie
            tl.to(loaderRef.current, {
                duration: 0.5,
                opacity: 0,
                y: -20,
                ease: 'power2.in'
            })
                .to(containerRef.current, {
                    duration: 0.8,
                    y: '-100%',
                    ease: 'power4.inOut',
                    onComplete: () => {
                        // On pourrait ajouter ici une redirection si nécessaire
                    }
                });
        };

        // Vérifier si la progression atteint 100%
        if (progress >= 100) {
            setTimeout(completeLoading, 500);
        }

        return () => {
            clearInterval(interval);
            tl.kill();
        };
    }, [progress]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
            <div
                ref={loaderRef}
                className={cn(
                    "fixed top-8 right-8 flex items-center justify-center text-3xl font-bold opacity-0 translate-y-4",
                    progress === 100 ? "text-primary" : "text-foreground"
                )}
            >
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {Math.round(progress)}%
                    </div>
                    <svg className="h-16 w-16" viewBox="0 0 100 100">
                        <circle
                            className="stroke-muted"
                            cx="50" cy="50" r="40"
                            strokeWidth="8"
                            fill="none"
                        />
                        <circle
                            className="stroke-primary"
                            cx="50" cy="50" r="40"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray="251.2"
                            strokeDashoffset={251.2 - (251.2 * progress) / 100}
                            transform="rotate(-90 50 50)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
} 
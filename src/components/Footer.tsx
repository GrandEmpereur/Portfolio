"use client";

import Link from "next/link";
import { ArrowUp, Github, Instagram, Linkedin, Mail } from "lucide-react";

interface FooterProps {
    translations: {
        copyright: string;
        backToTop: string;
        legalTerms: string;
        legalPrivacy: string;
    };
    socialLinks: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        email?: string;
    };
}

export const Footer = ({ translations, socialLinks }: FooterProps) => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative w-full bg-black border-t border-white/5">
            <div className="w-full px-6 sm:px-8 md:px-12 lg:px-20 py-8">
                {/* Main row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <p className="text-white/30 text-sm order-2 md:order-1">
                        {translations.copyright}
                    </p>

                    {/* Back to top */}
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300 order-1 md:order-2"
                    >
                        <span className="text-xs tracking-widest uppercase">
                            {translations.backToTop}
                        </span>
                        <ArrowUp className="w-3.5 h-3.5 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </button>

                    {/* Social icons */}
                    <div className="flex items-center gap-3 order-3">
                        {socialLinks.linkedin && (
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors duration-300"
                            >
                                <Linkedin className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                            </a>
                        )}
                        {socialLinks.github && (
                            <a
                                href={socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors duration-300"
                            >
                                <Github className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors duration-300"
                            >
                                <Instagram className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                            </a>
                        )}
                        {socialLinks.email && (
                            <a
                                href={`mailto:${socialLinks.email}`}
                                aria-label="Email"
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/10 transition-colors duration-300"
                            >
                                <Mail className="w-3.5 h-3.5 text-white/50" aria-hidden="true" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Legal links */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-white/5">
                    <Link
                        href="/mentions-legales"
                        className="text-xs text-white/20 hover:text-white/40 transition-colors duration-300"
                    >
                        {translations.legalTerms}
                    </Link>
                    <span className="text-white/10 text-xs">·</span>
                    <Link
                        href="/politique-confidentialite"
                        className="text-xs text-white/20 hover:text-white/40 transition-colors duration-300"
                    >
                        {translations.legalPrivacy}
                    </Link>
                </div>
            </div>
        </footer>
    );
};

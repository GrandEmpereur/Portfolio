"use client";

import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

interface FooterProps {
    translations: {
        description: string;
        navigation: string;
        navHome: string;
        navProjects: string;
        navServices: string;
        navContact: string;
        social: string;
        legal: string;
        legalTerms: string;
        legalPrivacy: string;
        copyright: string;
    };
    socialLinks: {
        linkedin?: string;
        github?: string;
        instagram?: string;
        email?: string;
    };
}

export const Footer = ({ translations, socialLinks }: FooterProps) => {
    return (
        <footer className="relative w-full bg-black border-t border-white/10">
            <div className="w-full px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br from-orange-400 to-orange-600 text-white font-bold text-lg hover:scale-105 transition-transform duration-300"
                        >
                            PB
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-[280px]">
                            {translations.description}
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase">
                            {translations.navigation}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                >
                                    {translations.navHome}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/projects"
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                >
                                    {translations.navProjects}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                >
                                    {translations.navContact}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase">
                            {translations.social}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.linkedin && (
                                <a
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn - Patrick Bartosik"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                                >
                                    <Linkedin className="w-4 h-4 text-white" aria-hidden="true" />
                                </a>
                            )}
                            {socialLinks.github && (
                                <a
                                    href={socialLinks.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub - GrandEmpereur"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                                >
                                    <Github className="w-4 h-4 text-white" aria-hidden="true" />
                                </a>
                            )}
                            {socialLinks.instagram && (
                                <a
                                    href={socialLinks.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram - @patrickbartosik"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                                >
                                    <Instagram className="w-4 h-4 text-white" aria-hidden="true" />
                                </a>
                            )}
                            {socialLinks.email && (
                                <a
                                    href={`mailto:${socialLinks.email}`}
                                    aria-label="Envoyer un email à contact@bartosik.fr"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                                >
                                    <Mail className="w-4 h-4 text-white" aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-6 tracking-wide uppercase">
                            {translations.legal}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/mentions-legales"
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                >
                                    {translations.legalTerms}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/politique-confidentialite"
                                    className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                                >
                                    {translations.legalPrivacy}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-white/60 text-sm">
                            {translations.copyright}
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-white/60 text-sm">Available for projects</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};


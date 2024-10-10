// components/clients/NavBarClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNavClient from '@/components/clients/MobileNavClient';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Locale } from "@/i18nConfig";
import { Dictionary, Link as NavLink } from '@/types/Navigation.types';

type NavBarClientProps = {
    lang: Locale;
    dictionary: Dictionary;
};

const NavBarClient: React.FC<NavBarClientProps> = ({ lang, dictionary }) => {
    const pathname = usePathname();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [navHidden, setNavHidden] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                setNavHidden(true);
            } else {
                // Scrolling up
                setNavHidden(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const links: NavLink[] = dictionary.TemplateNavigations.links;
    const contactText: string = dictionary.footer.contactUs;

    return (
        <nav className={`sticky py-10 inset-x-0 top-0 z-30 w-full backdrop-blur ${navHidden ? 'translate-y-[-100%] transition-transform duration-300' : 'translate-y-0 transition-transform duration-300'}`}>
            <MaxWidthWrapper>
                <div className='flex h-max items-center justify-between'>
                    <Link href={`/${lang}`} className='flex z-40 font-semibold'>
                        <Image
                            src="/svg/Logo.svg"
                            alt="My Logo"
                            width={90}
                            height={90}
                            layout='intrinsic'
                            priority={true}
                            style={{ objectFit: 'cover' }}
                            className='lg:w-[90px] w-[60px]'
                            loading='eager'
                        />
                    </Link>

                    <MobileNavClient lang={lang} dictionary={dictionary} />

                    <div className={`hidden items-center space-x-10 lg:flex ${!links.some(link => pathname.startsWith(`/${lang}${link.href}`)) ? 'bg-secondary px-10 py-5 rounded-full' : ''}`}>
                        <ul className='flex items-center justify-around gap-x-10'>
                            {links.map(({ href, label }, index) => (
                                <li key={index}>
                                    <Link href={`/${lang}${href}`}>
                                        <span className={`transition ease-in-out delay-150 hover:text-[#E3B27D] duration-200 ${pathname.startsWith(`/${lang}${href}`)
                                            ? 'bg-secondary px-10 py-5 rounded-full text-[#E3B27D]'
                                            : 'text-white'
                                            }`}>
                                            {label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='hidden items-center space-x-4 lg:flex'>
                        <ul className='flex items-center justify-around gap-x-8'>
                            <li>
                                <Link href={`/${lang}/contact`}>
                                    <Button className='rounded-full ' variant={'other'} size={'lg'}>{contactText}</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default NavBarClient;

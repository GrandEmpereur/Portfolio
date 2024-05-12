'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import MaxWidthWrapper from './MaxWidthWrapper';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { links } from '@/lib/data/navigation';

function NavBar() {
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

        // Add and remove the scroll listener
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`sticky py-10 inset-x-0 top-0 z-30 w-full border-b border-transparent backdrop-blur-lg transition-all ${navHidden ? 'translate-y-[-100%] transition-transform duration-300' : 'translate-y-0 transition-transform duration-300'}`}>
            <MaxWidthWrapper>
                <div className='flex h-max items-center justify-between'>
                    <Link href='/' className='flex z-40 font-semibold'>
                        <Image
                            src="/svg/Logo.svg"
                            alt="My Logo"
                            width={90}
                            height={90}
                            priority
                            style={{ objectFit: 'cover' }}
                            className='lg:w-[90px] w-[60px]'
                        />
                    </Link>

                    <MobileNav />

                    <div className='hidden items-center space-x-4 sm:flex'>
                        <ul className='flex items-center justify-around gap-x-8'>
                            {links.map(({ href, label }, index) => (
                                <li key={index}>
                                    <Link href={href}>
                                        <span className={`transition ease-in-out delay-150 hover:text-[#E3B27D] duration-200 ${pathname === href ? 'text-[#E3B27D]' : 'text-white'}`}>{label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='hidden items-center space-x-4 sm:flex'>
                        <ul className='flex items-center justify-around gap-x-8'>
                            <li>
                                <Link href="/contact">
                                    <Button className="rounded-full bg-[#E3B27D] text-white hover:bg-accent" size={'lg'}>Start Project ?</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}

export default NavBar;

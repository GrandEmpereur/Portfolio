'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNav from './MobileNav';
import MaxWidthWrapper from './MaxWidthWrapper';
import { usePathname } from 'next/navigation'

export const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
];

function NavBar() {
    const pathname = usePathname();
    return (
        <nav className='sticky py-5 inset-x-0 top-0 z-30 w-full border-b border-transparent backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between'>

                    <Link
                        href='/'
                        className='flex z-40 font-semibold'>
                        <Image src='/img/Logo.png' alt='My Logo' width={60} height={60} priority />
                    </Link>

                    <MobileNav />

                    <div className='hidden items-center space-x-4 sm:flex'>
                        <ul className='flex items-center justify-around  gap-x-8'>
                            {links.map(({ href, label }, index) => {
                                return (
                                    <li key={index}>
                                        <Link href={href}>
                                            <span className={`transition ease-in-out delay-150 hover:text-[#E3B27D] duration-200 ${pathname === href ? 'text-[#E3B27D]' : 'text-white'}`}>{label}</span>
                                        </Link>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default NavBar

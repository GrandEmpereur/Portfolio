import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import MaxWidthWrapper from './MaxWidthWrapper'

export const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/works', label: 'Lasted Work' },
    { href: '/contact', label: 'Contact' },
]

function NavBar() {
    return (
        <MaxWidthWrapper>
            <nav className='sticky pt-5 inset-x-0 top-0 z-30 w-full border-b border-transparent backdrop-blur-lg transition-all'>
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
                                            <span className='transition ease-in-out delay-150 text-white hover:text-yellow-500 duration-200'>{label}</span>
                                        </Link>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>
                    <div></div>
                </div>
            </nav>
        </MaxWidthWrapper>
    )
}

export default NavBar


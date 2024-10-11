'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Locale } from "@/i18nConfig";
import { Dictionary, Link as NavLink } from '@/types/Navigation.types';
import { Button } from '../ui/button';

type MobileNavClientProps = {
    lang: Locale;
    dictionary: Dictionary;
};

const MobileNavClient: React.FC<MobileNavClientProps> = ({ lang, dictionary }) => {
    const [isOpen, setOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            toggleOpen();
        }
    }, [pathname]);

    const toggleOpen = () => setOpen(prev => !prev);

    const MobilLinks = dictionary.TemplateNavigations.links;
    const contactText: string = dictionary.footer.contactUs;

    return (
        <div className='lg:hidden'>
            <Menu onClick={toggleOpen} className='relative z-50 h-5 w-5 text-primary' />

            {isOpen && (
                <>
                    <div className='fixed inset-0 z-0 w-full h-screen bg-secondary animate-slideDown'>
                        <ul className='flex flex-col gap-8 px-5 pt-32 pb-8 items-center'>
                            {MobilLinks.map(({ href, label }, index) => (
                                <li key={index} className='animate-fadeInUp opacity-0'>
                                    <Link href={lang === 'fr' ? `${href}` : `/${lang}${href}`} onClick={toggleOpen}>
                                        <span className='block text-primary text-2xl'>{label}</span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href={lang === 'fr' ? `/contact` : `/${lang}/contact`}>
                                    <Button className='rounded-full ' variant={'other'} size={'lg'}>{contactText}</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default MobileNavClient

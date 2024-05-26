'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Locale } from "@/i18nConfig";
import { Dictionary, Link as NavLink } from '@/types/Navigation.types';

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

    return (
        <div className='sm:hidden'>
            <Menu onClick={toggleOpen} className='relative z-50 h-5 w-5 text-primary' />

            {isOpen && (
                <div className='fixed inset-0 z-0 w-full h-screen bg-secondary animate-slideDown'>
                    <ul className='flex flex-col gap-8 px-5 pt-24 pb-8'>
                        {MobilLinks.map(({ href, label }, index) => (
                            <li key={index} className='animate-fadeInUp opacity-0'>
                                <Link href={`/${lang}${href}`} onClick={toggleOpen}>
                                    <span className='block text-primary text-2xl'>{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileNavClient;

'use client';

import { ArrowRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MobilLinks } from '@/lib/data/navigation';
import Image from 'next/image';
import { Locale } from '@/i18nConfig';

type MobileNavProps = {
  params: { lang: Locale };
};

const MobileNav: React.FC<MobileNavProps> = ({ params }) => {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      toggleOpen();
    }
  }, [pathname]);

  const toggleOpen = () => setOpen(prev => !prev);

  return (
    <div className='sm:hidden'>
      <Menu onClick={toggleOpen} className='relative z-50 h-5 w-5 text-primary' />

      {isOpen && (
        <div className='fixed inset-0 z-0 w-full h-screen bg-secondary animate-slideDown'>
          <ul className='flex flex-col gap-8 px-5 pt-24 pb-8'>
            {MobilLinks.map(({ href, label }, index) => (
              <li key={index} className='animate-fadeInUp opacity-0'>
                <Link href={`/${params.lang}${href}`} onClick={toggleOpen}>
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

export default MobileNav;

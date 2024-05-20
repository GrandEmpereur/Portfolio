import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Locale } from '@/i18nConfig';

type FooterProps = {
    params: { lang: Locale };
};

const Footer: React.FC<FooterProps> = ({ params }) => {
    return (
        <MaxWidthWrapper className='footer-wrapper my-12'>
            <footer id='footer' className='footer flex flex-col justify-between'>
                <div className='footer__top flex flex-col lg:flex-row items-start justify-center  w-full gap-y-8 '>
                    <div className='footer__column footer__column--left flex flex-col gap-y-5 w-full'>
                        <h4 className='footer__intro'>Ready to accelerate your online presence?</h4>
                        <p className='footer__call-to-action' style={{ maxWidth: 'fit-content' }}>
                            Explore how our comprehensive SEO, redesign, and website optimization services can elevate your project.
                            Contact us to discuss your needs.
                        </p>
                        <Link href={`/${params.lang}/contact`}>
                            <Button className='rounded-full ' variant={'other'} size={'lg'}>Request a Quote</Button>
                        </Link>
                    </div>

                    <div className='footer__column footer__column--right flex flex-col md:flex-row items-start justify-between w-full gap-y-8'>
                        <div className='footer__contacts flex flex-col gap-5'>
                            <h3 className='footer__heading'>Contact Us</h3>
                            <div className='footer__social-links flex flex-col gap-2'>
                                <li><a href="mailto:bartosikpatrickpro@gmail.com" className='footer__email'>Email: BartosikPatrickPro@gmail.com</a></li>
                                <li><a href="https://www.instagram.com/empereur.patrick/" className='footer__link' rel="noopener noreferrer" target="_blank">Instagram</a></li>
                                <li><a href="https://github.com/GrandEmpereur" className='footer__link' rel="noopener noreferrer" target="_blank">GitHub</a></li>
                                <li><a href="https://www.linkedin.com/in/patrick-bartosik/" className='footer__link' rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
                            </div>
                        </div>

                        <div className='footer__quick-links flex flex-col gap-5'>
                            <h3 className='footer__heading'>Quick Links</h3>
                            <div className='flex flex-col gap-2'>
                                <li><Link href={`/${params.lang}`} className='footer__link'>Home</Link></li>
                                <li><Link href={`/${params.lang}/about`} className='footer__link'>About</Link></li>
                                <li><Link href={`/${params.lang}/services`} className='footer__link'>Services</Link></li>
                                <li><Link href={`/${params.lang}/contact`} className='footer__link'>Contact</Link></li>
                                <li><Link href={`/sitemap.xml`} className='footer__link'>Sitemap</Link></li>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='footer__bottom flex flex-col items-center justify-center mt-5 lg:mt-0 lg:justify-between w-full '>
                    <div className='deco'></div>
                    <div className='footer__legal-links flex gap-x-5'>
                        <Link href={`/${params.lang}/terms`}>
                            <Button variant={'link'} className='footer__legal-button'>
                                Terms of Use
                            </Button>
                        </Link>
                        <Link href={`/${params.lang}/privacy`}>
                            <Button variant={'link'} className='footer__legal-button'>
                                Privacy Policy
                            </Button>
                        </Link>
                        <Link href={`/${params.lang}/gtu`}>
                            <Button variant={'link'} className='footer__legal-button'>
                                GTU
                            </Button>
                        </Link>
                    </div>
                </div>
            </footer>
        </MaxWidthWrapper>
    );
};

export default Footer;

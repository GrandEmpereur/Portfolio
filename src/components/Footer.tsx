import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';

type FooterProps = {
    params: { lang: Locale };
};

const Footer: React.FC<FooterProps> = async ({ params }) => {
    const dict = await getDictionary(params.lang);
    const isEnglish = params.lang === 'en';

    const getLocalizedHref = (path: string) => isEnglish ? `/${params.lang}${path}` : path;

    return (
        <MaxWidthWrapper className='footer-wrapper my-12'>
            <footer id='footer' className='footer flex flex-col justify-between'>
                <div className='footer__top flex flex-col lg:flex-row items-start justify-center  w-full gap-y-8 '>
                    <div className='footer__column footer__column--left flex flex-col gap-y-5 w-full'>
                        <h4 className='footer__intro'>{dict.TemplateFooter.footer.readyToAccelerate}</h4>
                        <p className='footer__call-to-action' style={{ maxWidth: 'fit-content' }}>
                            {dict.TemplateFooter.footer.exploreServices}
                        </p>
                        <Link href={`/${params.lang}/contact`}>
                            <Button className='rounded-full ' variant={'other'} size={'lg'}>{dict.TemplateFooter.footer.requestQuote}</Button>
                        </Link>
                    </div>

                    <div className='footer__column footer__column--right flex flex-col md:flex-row items-start justify-between w-full gap-y-8'>
                        <div className='footer__contacts flex flex-col gap-5'>
                            <h3 className='footer__heading'>{dict.TemplateFooter.footer.contactUs}</h3>
                            <div className='footer__social-links flex flex-col gap-2'>
                                <li><a href="mailto:contact@bartosik.fr" className='footer__email'>{dict.TemplateFooter.footer.contactItems.email}</a></li>
                                <li><a href="https://www.instagram.com/empereur.patrick/" className='footer__link' rel="noopener noreferrer" target="_blank">Instagram</a></li>
                                <li><a href="https://github.com/GrandEmpereur" className='footer__link' rel="noopener noreferrer" target="_blank">GitHub</a></li>
                                <li><a href="https://www.linkedin.com/in/patrick-bartosik/" className='footer__link' rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
                            </div>
                        </div>

                        <div className='footer__quick-links flex flex-col gap-5'>
                            <h3 className='footer__heading'>{dict.TemplateFooter.footer.quickLinks}</h3>
                            <div className='flex flex-col gap-2'>
                                <li><Link href={getLocalizedHref('/')} className='footer__link'>{dict.TemplateFooter.footer.home}</Link></li>
                                <li><Link href={getLocalizedHref('/about')} className='footer__link'>{dict.TemplateFooter.footer.about}</Link></li>
                                <li><Link href={getLocalizedHref('/services')} className='footer__link'>{dict.TemplateFooter.footer.services}</Link></li>
                                <li><Link href={getLocalizedHref('/contact')} className='footer__link'>{dict.TemplateFooter.footer.contact}</Link></li>
                                <li><Link href="/sitemap.xml" className='footer__link'>{dict.TemplateFooter.footer.sitemap}</Link></li>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='footer__bottom flex flex-col items-center justify-center mt-5 lg:mt-0 lg:justify-between w-full '>
                    <div className='deco'></div>
                    <div className='footer__legal-links flex gap-x-5 flex-wrap items-center justify-center'>
                        <Link href={getLocalizedHref('/terms')}>
                            <Button variant={'link'} className='footer__legal-button'>
                                {dict.TemplateFooter.footer.termsOfUse}
                            </Button>
                        </Link>
                        <Link href={getLocalizedHref('/privacy')}>
                            <Button variant={'link'} className='footer__legal-button'>
                                {dict.TemplateFooter.footer.privacyPolicy}
                            </Button>
                        </Link>
                        <Link href={getLocalizedHref('/gtu')}>
                            <Button variant={'link'} className='footer__legal-button'>
                                {dict.TemplateFooter.footer.gtu}
                            </Button>
                        </Link>
                    </div>
                </div>
            </footer>
        </MaxWidthWrapper>
    );
};

export default Footer;

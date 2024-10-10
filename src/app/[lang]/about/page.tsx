import React from 'react';
import { Metadata } from 'next';
import Line from '@/components/Line';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';

export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const dict = await getDictionary(lang);

    return {
        title: dict.TemplateAbout.metadata.title,
        description: dict.TemplateAbout.metadata.description,
        keywords: "Développeur Full Stack, React, Next.js, Tailwind CSS, Expérience professionnelle, Compétences techniques",
        openGraph: {
            title: dict.TemplateAbout.metadata.title,
            description: dict.TemplateAbout.metadata.description,
            url: `https://patrick.bartosik.fr/${lang}/about`,
            siteName: 'Patrick Bartosik - Développeur Full Stack',
            images: [
                {
                    url: 'https://patrick.bartosik.fr/img/about/aboutHero.png',
                    width: 1200,
                    height: 630,
                    alt: dict.TemplateAbout.aboutMe.heroImageAlt,
                },
            ],
            locale: lang,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.TemplateAbout.metadata.title,
            description: dict.TemplateAbout.metadata.description,
            images: ['https://patrick.bartosik.fr/img/about/aboutHero.png'],
        },
        alternates: {
            canonical: `https://patrick.bartosik.fr/${lang}/about`,
            languages: {
                'fr': 'https://patrick.bartosik.fr/fr/about',
                'en': 'https://patrick.bartosik.fr/en/about',
            },
        },
    };
}

async function Page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const dict = await getDictionary(lang);

    return (
        <>
            <div className='relative '>
                <Line />

                <MaxWidthWrapper>
                    <section id='About-hero' className='About-hero flex flex-col w-full gap-y-12'>
                        <div className="about__title">
                            <h1 className='about__title-sub font-semibold text-2xl '>{dict.TemplateAbout.aboutMe.titleSub}</h1>
                            <h4 className='about__title-main keep-color '>{dict.TemplateAbout.aboutMe.titleMain}</h4>
                        </div>

                        <div className='w-full'>
                            <Image
                                src={'/img/about/about_banner.jpg'}
                                alt={dict.TemplateAbout.aboutMe.heroImageAlt}
                                width={1440}
                                height={480}
                                layout='responsive'
                                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1440px'
                                loading='lazy'
                                className='w-full'
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        <div className='flex flex-col w-full gap-y-5'>
                            <div className='flex flex-col gap-y-2'>
                                <h2 className='about__title-main'>{dict.TemplateAbout.aboutMe.name}</h2>
                                <p>{dict.TemplateAbout.aboutMe.role}</p>
                            </div>
                            <div className='flex flex-col w-full gap-y-5'>
                                {dict.TemplateAbout.aboutMe.introduction.map((paragraph: string, index: number) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <div>
                                <a href={'/CV.pdf'} download="/CV.pdf">
                                    <Button className='rounded-full ' variant={'other'} size={'lg'}>{dict.TemplateAbout.aboutMe.downloadResume}</Button>
                                </a>
                            </div>
                        </div>
                    </section>
                </MaxWidthWrapper>

                <MaxWidthWrapper className='experience-wrapper mt-20'>
                    <section id='experience' className='experience relative flex flex-col w-full gap-y-12'>
                        <Image
                            src={'/shape/img2.png'}
                            alt={'a geometrical shape'}
                            width={180}
                            height={75}
                            className='experience__shape1 absolute w-max'
                            layout='intrinsic'
                            loading='lazy'
                        />
                        <Image
                            src={'/shape/img6.png'}
                            alt={'a geometrical shape'}
                            width={140}
                            height={65}
                            className='experience__shape2 absolute w-max'
                            layout='intrinsic'
                            loading='lazy'
                        />

                        <div className='flex gap-x-10 flex-col lg:flex-row '>
                            <div className='experience__education w-full flex flex-col gap-10 lg:w-1/2'>
                                <h3 className='experience__heading'>{dict.TemplateAbout.experience.education_title}</h3>
                                {dict.TemplateAbout.experience.education.map((item, index) => (
                                    <div key={index} className='experience__item flex w-full justify-between items-center'>
                                        <div className='hidden items-center gap-x-5 gap-y-5 | md:flex '>
                                            <div className='experience__sphere '></div>
                                            <div>
                                                <Badge className='experience__date p-2'>{item.period}</Badge>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 w-full | md:w-1/2'>
                                            <div className='block md:hidden'>
                                                <Badge className='experience__date p-2'>{item.period}</Badge>
                                            </div>
                                            <h4 className='experience__title'>{item.title}</h4>
                                            <p className='experience__location'>{item.location}</p>
                                            <p className='experience__description'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='experience__professional w-full flex flex-col gap-10 lg:w-1/2'>
                                <h3 className='experience__heading'>{dict.TemplateAbout.experience.professional_title}</h3>
                                {dict.TemplateAbout.experience.professional.map((item, index) => (
                                    <div key={index} className='experience__item flex w-full justify-between items-center'>
                                        <div className='hidden items-center gap-x-5 gap-y-5 | md:flex '>
                                            <div className='experience__sphere '></div>
                                            <div>
                                                <Badge className='experience__date p-2'>{item.period}</Badge>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2 w-full | md:w-1/2'>
                                            <div className='block md:hidden'>
                                                <Badge className='experience__date p-2'>{item.period}</Badge>
                                            </div>
                                            <h4 className='experience__title'>{item.title}</h4>
                                            <p className='experience__location'>{item.location}</p>
                                            <p className='experience__description'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </MaxWidthWrapper>

                <MaxWidthWrapper className='skills-wrapper mt-52'>
                    <section id='skills' className='skills skills__container flex flex-col w-full gap-y-12'>
                        <div className="skills__header">
                            <h3 className='skills__subtitle'>{dict.TemplateAbout.skills.title}</h3>
                            <h4 className='skills__title keep-color'>{dict.TemplateAbout.skills.coreTechnologiesDescription}</h4>
                        </div>

                        <div className='skills__sections w-full flex flex-col gap-y-14'>
                            <div className="skills__section w-full flex flex-col gap-y-8">
                                <div className='flex flex-col gap-y-2'>
                                    <h3 className='skills__heading variant'>{dict.TemplateAbout.skills.coreTechnologies}</h3>
                                    <h4 className='keep-color'>{dict.TemplateAbout.skills.coreTechnologiesDescription}</h4>
                                </div>
                                <div className='skills__icons flex flex-wrap w-full items-center justify-evenly gap-5'>
                                    {dict.TemplateAbout.skills.mainStack.map((item, index) => (
                                        <div key={index} className='skill__item flex flex-wrap flex-col items-center gap-4'>
                                            <Image
                                                src={item.icon}
                                                alt={`${item.name} icon`}
                                                width={40}
                                                height={40}
                                                layout="intrinsic"
                                                loading="lazy"
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <span className='skill__name'>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="skills__section w-full flex flex-col gap-y-8">
                                <div className='flex flex-col gap-y-2'>
                                    <h3 className='skills__heading'>{dict.TemplateAbout.skills.otherTechnologies}</h3>
                                    <h4 className='keep-color'>{dict.TemplateAbout.skills.otherTechnologiesDescription}</h4>
                                </div>
                                <div className='skills__icons flex flex-wrap w-full items-center justify-evenly gap-5'>
                                    {dict.TemplateAbout.skills.otherStack.map((item, index) => (
                                        <div key={index} className='skill__item flex flex-wrap flex-col items-center gap-y-4'>
                                            <Image
                                                src={item.icon}
                                                alt={`${item.name} icon`}
                                                width={40}
                                                height={40}
                                                layout="intrinsic"
                                                loading="lazy"
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <span className='skill__name'>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="skills__section w-full flex flex-col gap-y-8">
                                <h3 className='skills__heading'>{dict.TemplateAbout.skills.languages}</h3>
                                <h4 className='keep-color'>{dict.TemplateAbout.skills.languagesDescription}</h4>
                                <div className='skills__icons flex flex-col w-full gap-y-6 items-center justify-between | md:flex-row md:gap-y-0 '>
                                    {dict.TemplateAbout.skills.languagesItems.map((item, index) => (
                                        <div key={index} className='language__item flex flex-col items-center gap-y-2 '>
                                            <span className='language__name text-xl font-semibold'>{item.name}</span>
                                            <p className='language__description w-1/2 text-center'>{item.level}</p>
                                            <p className='language__description w-1/2 text-center'>{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="skills__section w-full flex flex-col gap-y-8">
                                <div className='flex flex-col gap-y-2'>
                                    <h3 className='skills__heading'>{dict.TemplateAbout.skills.softSkills}</h3>
                                    <h4 className='keep-color'>{dict.TemplateAbout.skills.softSkillsDescription}</h4>
                                </div>
                                <div className='skills__icons flex flex-wrap w-full items-center gap-5'>
                                    {dict.TemplateAbout.skills.softSkillsItems.map((item, index) => (
                                        <div key={index} className='skill__item'>
                                            <span className='skill__name'>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </MaxWidthWrapper>
            </div>
        </>
    );
}

export default Page;
'use client';

import Line from '@/components/Line';
import Image from 'next/image';
import { ArrowRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { states, stacks, LastWorksItems } from '@/lib/data/home';
import { services } from '@/lib/data/services';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Home() {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const splitTitle = (title: string) => {
        const words = title.split(' ');
        const firstWord = words.shift();
        const remainingWords = words.join(' ');

        return (
            <div className='services__title-container flex flex-col '>
                <h2 className='services__title-primary letterWithoutFill keep-size'>
                    {firstWord}
                </h2>
                <div className='services__title-secondary flex items-center flex-col lg:flex-row '>
                    <span className='py-5 lg:py-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="1" viewBox="0 0 30 1" fill="none">
                            <line x1="30" y1="0.5" x2="0" y2="0.5" stroke="white" />
                        </svg>
                    </span>
                    <h2 className='services__title-secondary-text pl-4 keep-size'>
                        {remainingWords}
                    </h2>
                </div>
            </div>
        );
    };

    return (
        <main id='template-home' className='home' >
            <section id='hero' className='hero relative flex flex-col w-full'>
                <MaxWidthWrapper>

                    <span className='hero__shape--top-left relative' style={{ left: "-20px" }}>
                        <Image src={'/shape/img7.png'} alt={'shape'} width={55} height={55} />
                    </span>
                    <span className='hero__shape--bottom-right absolute' style={{ left: "300px", bottom: "225px" }}>
                        <Image src={'/shape/img1.png'} alt={'shape'} width={62.31} height={60} />
                    </span>

                    <div className='hero__information w-full flex flex-col items-center relative lg:flex-row lg:justify-between '>
                        <div className='hero__description'>
                            <h1 style={{ fontSize: '100px', lineHeight: '135%', width: '470px' }}>
                                Expert Full Stack Developer
                            </h1>
                            <p className='hero__description-text py-5' style={{ width: '470px' }}>
                                Specializing in React and Next.js, I build advanced, scalable web applications tailored to meet business needs. Leverage my expertise in state-of-the-art technology to bring your projects to life.
                            </p>
                            <div className='hero__scroll'>
                                <div className='hero__scroll-container flex items-center gap-x-1' >
                                    <ChevronsLeft color={'white'} size={14} />
                                    <p style={{ fontSize: "14px", lineHeight: "140%", letterSpacing: "25%" }}>SCROLL</p>
                                </div>
                            </div>
                        </div>

                        <div className='hero__block flex flex-col md:flex-row'>
                            <div className='hero__content relative flex flex-col md:flex-row' style={{ backgroundColor: '#222222' }}>
                                <span className='hero__play-button absolute' style={{ left: "-70px", top: "170px" }}>
                                    <Image src={'/shape/img8.png'} alt={'shape'} width={138} height={138} />
                                </span>

                                <div className='hero__image-container'>
                                    <Image src={'/img/Hero-img.png'} alt={'My face'} width={500} height={630} />
                                </div>

                                <div className='hero__stats px-8 pt-20 flex flex-col gap-y-5'>
                                    {states.map((state, index) => (
                                        <div key={index} className='hero__stat'>
                                            <p className='hero__stat-number font-semibold text-white' style={{ fontSize: '40px' }}>{state.number}</p>
                                            <p className='hero__stat-description text-sm text-white'>{state.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='hero__stacks flex flex-col gap-y-5 mt-32'>
                        <h3 className='keep-size text-center lg:text-left'>My Technical Stack</h3>
                        <div className='hero__stacks-list flex flex-wrap justify-center lg:justify-start gap-10 pt-9 pb-14 '>
                            {stacks.map((stack, index) => (
                                <div key={index} className='hero__stack flex flex-col items-center justify-center gap-y-3'>
                                    <Image src={stack.src} alt={stack.alt} width={60} height={60} />
                                    <span>{stack.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            <div className='home-bg relative'>
                <Line />

                <section id='about' className='about flex w-full h-full flex-col gap-y-8'>
                    <MaxWidthWrapper>
                        <div className="about__title">
                            <h4 className='about__title-sub font-mono keep-color keep-size'>About me</h4>
                            <h2 className='about__title-main w-max keep-size'>I Create Digital World Class Business Web Store / Site</h2>
                        </div>

                        <div className='about__content flex flex-col lg:flex-row justify-between items-start gap-y-20 md:gap-x-32'>
                            <div className="about__image-container relative w-full md:w-max">
                                <Image src={'/img/home-about.jpg'} alt={'image at working desk'} width={1200} height={530} className='about__main-image inline-block rounded-lg' />
                                <Image src={'/shape/img2.png'} alt={'a geometrical shape'} width={180} height={75} className='about__shape1 absolute w-max' />
                                <Image src={'/shape/img6.png'} alt={'a geometrical shape'} width={140} height={65} className='about__shape2 absolute' />
                            </div>

                            <div className='about__description w-full md:w-full flex flex-col gap-y-8'>
                                <h2 className='about__description-title'>Discover the Art of Code with me</h2>
                                <p className='about__description-text'>Embark on a journey through cutting-edge web development with me, a seasoned Full Stack Developer. With over four years of experience in the dynamic JavaScript landscape, I specialize in building immersive, user-focused experiences. My toolkit, rich with modern frameworks like React.js and Next.js, powers businesses and individuals alike towards digital excellence.</p>
                                <Link href='/about'>
                                    <Button className='about__learn-more-button' size={'lg'} >Explore More</Button>
                                </Link>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                <MaxWidthWrapper className='services-bg mt-20 lg:mt-40'>
                    <section id='services' className='services flex flex-col items-start justify-between w-full h-full'>
                        <div className="services__header title">
                            <h4 className='services__header-subtitle font-mono keep-color '>Services</h4>
                            <h2 className='services__header-main-title '>Explore My Expertise</h2>
                        </div>
                        <div className='services__list flex flex-col lg:flex-row items-center gap-y-10 justify-between w-full pt-10 '>
                            {services.map((service, index) => (
                                <div key={index} className='services__item service relative flex flex-col w-full lg:w-max'>
                                    <Image src={service.icon} alt={service.iconAlt} width={service.iconWidth} height={service.iconHeight} className='services__item-icon image pb-5 lg:pb-0 lg:absolute ' />
                                    {splitTitle(service.title)}
                                    <p className='services__item-description pt-5 '>{service.generalDescription }</p>
                                    <div className='services__item-list pt-3 pb-10 '>
                                        {service.detailedDescription.map((item, index) => (
                                            <li key={index} className='services__item-list-entry'>{item.title}</li>
                                        ))}
                                    </div>
                                    <Link href={service.buttonLink} className='services__item-button'>
                                        <Button size={'lg'}>{service.buttonLabel}</Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </MaxWidthWrapper>

                <section id='lastWorks' className='portfolio lastWorks mt-40 flex flex-col items-start justify-between w-full h-full'>
                    <MaxWidthWrapper>
                        <div className='portfolio__header flex flex-col w-full justify-between gap-y-5 lg:flex-row lg:gap-y-0 '>
                            <div className="portfolio__title">
                                <h4 className='portfolio__subtitle font-mono keep-color'>PORTFOLIO</h4>
                                <h2 className='portfolio__main-title'>Recent Projects</h2>
                            </div>
                            <div className="portfolio__description flex flex-col gap-y-10">
                                <p className='portfolio__description-text font-mono'>Explore my diverse project gallery to see innovative solutions tailored to meet unique business needs.</p>
                                <Link href="/portfolio/all" className='portfolio__link-button text-center lg:text-left'>
                                    <Button size={'lg'}>Discover More</Button>
                                </Link>
                            </div>
                        </div>
                        <div className='portfolio__body w-full pt-6'>
                            {LastWorksItems().map((item, index) => (
                                <Link href={`/portfolio/${item.id}`} key={index}>
                                    <div
                                        key={item.id}
                                        className='portfolio__item flex justify-between w-full hover:cursor-pointer pt-8 relative'
                                        onMouseEnter={() => setHoverIndex(index)}
                                        onMouseLeave={() => setHoverIndex(-1)}
                                    >
                                        <div className='portfolio__item-text flex gap-x-5'>
                                            <p className='portfolio__item-number'>0{item.id}.</p>
                                            <h2 className='portfolio__item-title'>{item.title}</h2>
                                        </div>
                                        <div className={`portfolio__item-image absolute flex justify-center items-center transition-all duration-300 ease-in-out transform ${hoverIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                            <Image src={item.image} alt={`${item.title} - preview`} width={250} height={200} style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '100%',
                                            }} />
                                        </div>
                                        <div className={`portfolio__item-icon transition-all duration-300 ease-in-out transform ${hoverIndex === index ? '-rotate-45 text-[#E3B27D]' : 'text-white'}`}>
                                            <ArrowRight className='cursor-pointer' size={30} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </MaxWidthWrapper>
                </section>

                <section id='newsletter' className='newsletter relative flex w-full h-full flex-col gap-y-8 pt-28 mb-5 lg:mb-56'>
                    <MaxWidthWrapper>
                        <div className='newsletter__image-wrapper flex justify-end'>
                            <Image src={'/img/newsletter/img1.png'} alt={'Engaging Newsletter Visual'} width={1305} height={500} />
                            <span className='newsletter__sphere-deco'></span>
                        </div>
                        <div className='newsletter__content flex items-center justify-center'>
                            <h2 className='newsletter__title'>
                                Join Our Journey — <span className='newsletter__title-emphasis text-[#E3B27D]'>Create With Us!</span>
                            </h2>
                            <Link href={'/contact'}>
                                <div className='newsletter__contact btn btn-primary'>
                                    <span>Connect Now</span>
                                </div>
                            </Link>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </div>
        </main>
    );
}

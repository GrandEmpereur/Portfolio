'use client';

import React, { useState, useEffect, useRef } from 'react';
import Line from '@/components/Line';
import Image from 'next/image';
import { ArrowRight, ChevronsDown } from 'lucide-react';
import { projects } from '@/lib/data/portfolio';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Locale } from "@/i18nConfig";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

type HomeClientProps = {
    lang: Locale;
    dictionary: any;
};

const HomeClient: React.FC<HomeClientProps> = ({ lang, dictionary }) => {
    const [hoverIndex, setHoverIndex] = useState(-1);
    const lastFiveProjects = projects.slice(-5).reverse();
    const sectionsRef = useRef<HTMLDivElement[]>([]);
    const heroRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const scrollTextRef = useRef<HTMLDivElement | null>(null);
    const [rotation, setRotation] = useState(0);
    const stacksListRef = useRef<HTMLDivElement>(null);
    const titleRefs = useRef<HTMLSpanElement[][]>([]);

    const animateTitle = (index: number, isHovering: boolean) => {
        const letters = titleRefs.current[index];
        
        gsap.to(letters, {
            yPercent: isHovering ? -100 : 0,
            rotation: isHovering ? 0 : () => Math.random() * 2 - 1,
            duration: 0.3,
            ease: "power2.out",
            stagger: {
                amount: 0.1,
                from: "start"
            },
            onComplete: () => {
                if (isHovering) {
                    // Réinitialiser les lettres à leur état initial après l'animation
                    gsap.to(letters, {
                        yPercent: 0,
                        rotation: () => Math.random() * 2 - 1,
                        duration: 0.3,
                        ease: "power2.out",
                        stagger: {
                            amount: 0.1,
                            from: "start"
                        }
                    });
                }
            }
        });
    };

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
        }

        sectionsRef.current.forEach((section) => {
            if (section) {
                gsap.fromTo(section, { opacity: 0, y: 50 }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'bottom 60%',
                        toggleActions: 'play none none reverse',
                        markers: false,
                    },
                });
            }
        });

        if (titleRef.current) {
            const texts = [
                dictionary.TemplateHome.home.hero.hero_title,
                dictionary.TemplateHome.home.hero.hero_title2,
                dictionary.TemplateHome.home.hero.hero_title3,
                dictionary.TemplateHome.home.hero.hero_title,
            ];

            const titleTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
            texts.forEach((text, index) => {
                if (index !== 0) {
                    titleTimeline.to(titleRef.current, { text: text, duration: 2, ease: "power2.inOut" }, '+=2');
                }
            });
        }

        if (scrollTextRef.current) {
            gsap.to(scrollTextRef.current, {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 1,
            });
        }

        const rotationInterval = setInterval(() => {
            setRotation((prevRotation) => (prevRotation + 1) % 360);
        }, 30);

        if (stacksListRef.current) {
            const stacksList = stacksListRef.current;
            const stackItems = stacksList.children;
            const totalWidth = Array.from(stackItems).reduce((acc, item) => acc + item.clientWidth, 0);

            // Dupliquer les éléments pour créer un effet infini
            const clonedItems = Array.from(stackItems).map(item => item.cloneNode(true));
            clonedItems.forEach(item => stacksList.appendChild(item));

            gsap.to(stacksList, {
                x: -totalWidth,
                duration: 20,
                ease: "linear",
                repeat: -1,
                onRepeat: () => {
                    gsap.set(stacksList, { x: 0 });
                }
            });
        }

        // Initialiser la rotation aléatoire pour chaque lettre
        lastFiveProjects.forEach((_, projectIndex) => {
            const letters = titleRefs.current[projectIndex];
            gsap.set(letters, {
                rotation: () => Math.random() * 2 - 1,
                display: 'inline-block',
                position: 'relative'
            });
        });

        return () => clearInterval(rotationInterval);
    }, []);

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

    const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
        if (el) {
            sectionsRef.current[index] = el;
        }
    };

    return (
        <main id='template-home' className='home'>
            <section ref={heroRef} id='hero' className='hero relative flex flex-col w-full'>
                <MaxWidthWrapper>
                    <span className='hero__shape--top-left relative block w-max' style={{ left: "-20px" }}>
                        <Image
                            src={'/shape/img7.png'}
                            alt={'shape decoration'}
                            width={55}
                            height={55}
                            layout="intrinsic"
                            loading="lazy"
                        />
                    </span>

                    <span className='hero__shape--bottom-right absolute' style={{ left: "350px", bottom: "300px" }}>
                        <Image src={'/shape/img1.png'} alt={'shape'} width={62.31} height={60} />
                    </span>

                    <div className='hero__information w-full flex flex-col items-center relative lg:flex-row lg:justify-between '>
                        <div className='hero__description'>
                            <h1 ref={titleRef} style={{ fontSize: '80px', lineHeight: '135%', width: '500px' }}>
                                {dictionary.TemplateHome.home.hero.hero_title}
                            </h1>
                            <p className='hero__description-text py-5' style={{ width: '470px' }}>
                                {dictionary.TemplateHome.home.hero.hero_description}
                            </p>
                            <div className='hero__scroll' ref={scrollTextRef}>
                                <div className='hero__scroll-container flex items-center justify-center gap-x-1'>
                                    <ChevronsDown color={'white'} size={24} className={'rotate-90'} />
                                    <p style={{ fontSize: "14px", lineHeight: "140%", letterSpacing: "25%" }}>{dictionary.TemplateHome.home.hero.hero_scroll}</p>
                                </div>
                            </div>
                        </div>

                        <div className='hero__block flex flex-col md:flex-row'>
                            <div className='hero__content relative flex flex-col md:flex-row' style={{ backgroundColor: '#222222' }}>
                                <span className='hero__play-button absolute' style={{ left: "-70px", top: "170px" }}>
                                    <div className="relative w-[150px] h-[150px]">
                                        <Image src={'/svg/button/bg.svg'} alt="Bouton de fond" layout="fill" className="absolute" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div
                                                className="relative w-[150px] h-[150px] flex items-center justify-center"
                                                style={{ transform: `rotate(${rotation}deg)` }}
                                            >
                                                <Image
                                                    src={'/svg/button/text.svg'}
                                                    alt="Texte du bouton"
                                                    width={160}
                                                    height={160}
                                                    className="absolute left-[-5px]"
                                                />
                                            </div>
                                        </div>

                                        {/* Icône au centre */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Image src={'/svg/button/icon.svg'} alt="Icône du bouton" width={35} height={35} />
                                        </div>
                                    </div>

                                </span>
                                <div className='hero__image-container'>
                                    <Image src={'/img/Hero-img.png'} alt={'My face'} width={500} height={630} loading='eager' />
                                </div>
                                <div className='hero__stats px-8 pt-20 flex flex-col gap-y-5'>
                                    {dictionary.TemplateHome.home.states.map((state: (any), index: (number)) => (
                                        <div key={index} className='hero__stat'>
                                            <p className='hero__stat-number font-semibold text-white' style={{ fontSize: '40px' }}>{state.number}</p>
                                            <p className='hero__stat-description text-sm text-white'>{state.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hero__stacks flex flex-col gap-y-5 mt-32 overflow-hidden">
                        <h3 className="keep-size text-center lg:text-left">{dictionary.TemplateHome.home.tech_stack.title}</h3>

                        <div className="hero__stacks-list-container relative overflow-hidden">
                            {/* Conteneur des stacks avec la ref pour l'animation */}
                            <div ref={stacksListRef} className="flex gap-10 pt-9 pb-14 whitespace-nowrap">
                                {dictionary.TemplateHome.home.stacks.map((stack: any, index: number) => (
                                    <div key={index} className="flex flex-col items-center justify-center gap-y-3">
                                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                                            <Image src={stack.src} alt={stack.alt} width={60} height={60} loading="lazy" className="object-contain" />
                                        </div>
                                        <span className="text-sm">{stack.name}</span>
                                    </div>
                                ))}
                                {/* Dupliquer le contenu pour l'effet infini */}
                                {dictionary.TemplateHome.home.stacks.map((stack: any, index: number) => (
                                    <div key={`duplicate-${index}`} className="flex flex-col items-center justify-center gap-y-3">
                                        <div className="w-[60px] h-[60px] flex items-center justify-center">
                                            <Image src={stack.src} alt={stack.alt} width={60} height={60} loading="lazy" className="object-contain" />
                                        </div>
                                        <span className="text-sm">{stack.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </section>

            <section ref={setSectionRef(0)} className='home-bg relative'>
                <Line />
                <section id='about' className='about flex w-full h-full flex-col gap-y-8'>
                    <MaxWidthWrapper>
                        <div className="about__title pb-5">
                            <h4 className='about__title-sub font-mono keep-color keep-size'>{dictionary.TemplateHome.home.about.subtitle}</h4>
                            <h2 className='about__title-main w-max keep-size text-2xl md:text-4xl '>{dictionary.TemplateHome.home.about.title}</h2>
                        </div>
                        <div className='w-full h-full about__content flex flex-col lg:flex-row justify-between items-start gap-y-20 md:gap-x-32'>
                            <div className="about__image-container relative w-full">
                                <Image src={'/img/home-about.jpg'} alt={'image at working desk'} width={1200} height={530} className='about__main-image inline-block rounded-lg w-full lg:w-[1200px]' loading='eager' />
                                <Image src={'/shape/img2.png'} alt={'a geometrical shape'} width={180} height={75} className='about__shape1 absolute' />
                                <Image src={'/shape/img6.png'} alt={'a geometrical shape'} width={140} height={65} className='about__shape2 absolute' />
                            </div>

                            <div className='about__description w-full md:w-full flex flex-col gap-y-8'>
                                <h2 className='about__description-title'>{dictionary.TemplateHome.home.about.description_title}</h2>
                                <p className='about__description-text'>{dictionary.TemplateHome.home.about.description}</p>
                                <Link href={lang === 'fr' ? `/about` : `/${lang}/about`}>
                                    <Button className='rounded-full ' variant={'other'} size={'lg'} >{dictionary.TemplateHome.home.about.button}</Button>
                                </Link>
                            </div>
                        </div>
                    </MaxWidthWrapper>
                </section>

                <MaxWidthWrapper className='services-bg mt-20 lg:mt-40 lg:px-[90px]'>
                    <section ref={setSectionRef(1)} id='services' className='services flex flex-col items-start justify-between w-full h-full'>
                        <div className="services__header title">
                            <h4 className='services__header-subtitle font-mono keep-color keep-size '>{dictionary.TemplateHome.home.services.subtitle}</h4>
                            <h2 className='services__header-main-title keep-size text-2xl md:text-4xl '>{dictionary.TemplateHome.home.services.title}</h2>
                        </div>
                        <div className='services__list flex flex-col lg:flex-row items-center gap-y-10 justify-between w-full pt-10 '>
                            {dictionary.TemplateHome.home.services.servicesList.map((service: (any), index: (number)) => (
                                <div key={index} className='services__item service relative flex flex-col w-full lg:w-max'>
                                    <Image src={service.icon} alt={service.iconAlt} width={service.iconWidth} height={service.iconHeight} className='services__item-icon image pb-5 lg:pb-0 lg:absolute ' />
                                    {splitTitle(service.title)}
                                    <p className='services__item-description pt-5 '>{service.generalDescription}</p>
                                    <div className='services__item-list pt-3 pb-10 '>
                                        {service.detailedDescription.map((item: (any), index: (number)) => (
                                            <li key={index} className='services__item-list-entry'>{item.title}</li>
                                        ))}
                                    </div>
                                    <Link href={lang === 'fr' ? `${service.buttonLink}` : `${service.buttonLink}`} className='services__item-button'>
                                        <Button className='rounded-full ' variant={'other'} size={'lg'}>{service.buttonLabel}</Button>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                </MaxWidthWrapper>

                <section ref={setSectionRef(2)} id='lastWorks' className='portfolio lastWorks mt-20 lg:mt-40 flex flex-col items-start justify-between w-full h-full'>
                    <MaxWidthWrapper>
                        <div className='portfolio__header w-full flex flex-col justify-between gap-y-5 lg:flex-row lg:gap-y-0 '>
                            <div className="portfolio__title">
                                <h4 className='portfolio__subtitle font-mono keep-color keep-size'>{dictionary.TemplateHome.home.portfolio.subtitle}</h4>
                                <h2 className='portfolio__main-title keep-size text-2xl md:text-4xl '>{dictionary.TemplateHome.home.portfolio.title}</h2>
                            </div>
                            <div className="portfolio__description flex justify-between flex-col gap-y-10">
                                <p className='portfolio__description-text font-mono w-full md:w-[600px] '>{dictionary.TemplateHome.home.portfolio.description}</p>
                                <Link href={lang === 'fr' ? `/portfolio` : `/${lang}/portfolio`} className='portfolio__link-button text-center w-max lg:text-left'>
                                    <Button className='rounded-full ' variant={'other'} size={'lg'}>{dictionary.TemplateHome.home.portfolio.button}</Button>
                                </Link>
                            </div>
                        </div>
                        <div className='portfolio__body w-full pt-6'>
                            {lastFiveProjects.map((item, index) => (
                                <div key={index}>
                                    <Link href={lang === 'fr' ? `${item.links.url}` : `/${lang}${item.links.url}`}>
                                        <div
                                            className='portfolio__item flex justify-between items-center w-full hover:cursor-pointer pt-8 relative'
                                            onMouseEnter={() => {
                                                setHoverIndex(index);
                                                animateTitle(index, true);
                                            }}
                                            onMouseLeave={() => {
                                                setHoverIndex(-1);
                                                animateTitle(index, false);
                                            }}
                                        >
                                            <div className='portfolio__item-text flex items-center gap-x-5'>
                                                <p className='portfolio__item-number'>0{index + 1}.</p>
                                                <h2 className='portfolio__item-title overflow-hidden'>
                                                    {item.title[lang].split('').map((letter, letterIndex) => (
                                                        <span
                                                            key={letterIndex}
                                                            className="inline-block relative"
                                                            ref={el => {
                                                                if (!titleRefs.current[index]) {
                                                                    titleRefs.current[index] = [];
                                                                }
                                                                titleRefs.current[index][letterIndex] = el as HTMLSpanElement;
                                                            }}
                                                            style={{
                                                                display: 'inline-block',
                                                                position: 'relative'
                                                            }}
                                                        >
                                                            {letter}
                                                        </span>
                                                    ))}
                                                </h2>
                                            </div>
                                            <p className='portfolio__item-category text-white text-lg'>{item.info?.category}</p>
                                            <p className='portfolio__item-client text-white text-lg'>{item.info?.client}</p>

                                            <div className={`hidden lg:flex portfolio__item-image absolute  justify-center items-center transition-all duration-300 ease-in-out transform ${hoverIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                                <Image
                                                    src={item.media.placeholder}
                                                    alt={`${item.title[lang]} - preview`}
                                                    width={450}
                                                    height={300}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 450px"
                                                    style={{
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>
                                            <div className={`portfolio__item-icon transition-all duration-300 ease-in-out transform ${hoverIndex === index ? '-rotate-45 text-[#E3B27D]' : 'text-white'}`}>
                                                <ArrowRight className='cursor-pointer' size={30} />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </MaxWidthWrapper>
                </section>

                <section ref={setSectionRef(3)} id='newsletter' className='newsletter relative flex w-full h-full flex-col gap-y-8 pt-28 mb-5 lg:mb-56'>
                    <MaxWidthWrapper>
                        <div className='newsletter__image-wrapper flex justify-end'>
                            <Image src={'/img/newsletter/img1.png'} alt={dictionary.TemplateHome.home.newsletter.title} width={1305} height={500} />
                            <span className='newsletter__sphere-deco'></span>
                        </div>
                        <div className='newsletter__content flex items-center justify-center'>
                            <h2 className='newsletter__title'>
                                {dictionary.TemplateHome.home.newsletter.title}
                            </h2>
                            <Link href={lang === 'fr' ? `/contact` : `/${lang}/contact`}>
                                <div className='newsletter__contact btn btn-primary items-center justify-center flex'>
                                    <span className='text-center flex justify-center items-center'>{dictionary.TemplateHome.home.newsletter.button}</span>
                                </div>
                            </Link>
                        </div>
                    </MaxWidthWrapper>
                </section>
            </section>
        </main>
    );
};

export default HomeClient;
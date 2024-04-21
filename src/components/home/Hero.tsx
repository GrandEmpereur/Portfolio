import React from 'react'
import Image from 'next/image';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import MaxWidthWrapper from '../MaxWidthWrapper';

const states = [
    { number: "20+", description: 'Projects Completed' },
    { number: "5+", description: 'Major Projects Delivered' },
    { number: "3+", description: 'Years of In-depth Experience' },
    { number: "20+", description: 'Technologies Mastered' },
];

const stacks = [
    { src: '/stack/react.png', alt: 'React', name: 'React' },
    { src: '/stack/nextjs.png', alt: 'Next.js', name: 'Next.js' },
    { src: '/stack/typescript.png', alt: 'TypeScript', name: 'TypeScript' },
    { src: '/stack/sass.png', alt: 'Sass', name: 'Sass' },
    { src: '/stack/adonisjs.png', alt: 'AdonisJS', name: 'AdonisJS' },
    { src: '/stack/vercel.png', alt: 'Vercel', name: 'Vercel' },
    { src: '/stack/mongodb.png', alt: 'MongoDB', name: 'MongoDB' },
    { src: '/stack/supabase.png', alt: 'Supabase', name: 'Supabase' },
];


function Hero() {
    return (
        <MaxWidthWrapper className='mt-8'>
            <section id='hero' className='hero relative flex flex-col w-full'>
                <span className='hero__shape--top-left relative' style={{ left: "-20px" }}>
                    <Image src={'/shape/img7.png'} alt={'shape'} width={55} height={55} />
                </span>
                <span className='hero__shape--bottom-right absolute' style={{ left: "300px", bottom: "225px" }}>
                    <Image src={'/shape/img1.png'} alt={'shape'} width={62.31} height={60} />
                </span>

                <div className='hero__information w-full flex justify-between relative'>
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

                    <div className='hero__block relative flex' style={{ width: '670px', height: '600px', backgroundColor: '#222222' }}>
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

                <div className='hero__stacks flex flex-col gap-y-5 mt-32'>
                    <p>My Technical Stack</p>
                    <div className='hero__stacks-list flex gap-x-20 pt-9 pb-14'>
                        {stacks.map((stack, index) => (
                            <div key={index} className='hero__stack flex flex-col items-center justify-center gap-y-3'>
                                <Image src={stack.src} alt={stack.alt} width={60} height={60} />
                                <span>{stack.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default Hero


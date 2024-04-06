import React from 'react'
import Image from 'next/image';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import MaxWidthWrapper from './MaxWidthWrapper';

const states = [
    {
        number: "20+",
        description: 'Project Complete'
    },
    {
        number: "5+",
        description: 'Professional Projects Completed'
    },
    {
        number: "3+",
        description: 'Years Experience'
    },
    {
        number: "20+",
        description: 'Language / Framework Learn'
    },
]

function Hero() {
    return (
        <MaxWidthWrapper className='mt-8'>
            <div className='Hero relative flex flex-col w-full '>
                <span className='relative' style={{ left: "-20px" }}>
                    <Image src={'/shape/img7.png'} alt={'shape'} width={55} height={55} />
                </span>
                <span className='absolute' style={{ left: "300px", bottom: "225px" }}>
                    <Image src={'/shape/img1.png'} alt={'shape'} width={62.31} height={60} />
                </span>

                <div className='Information w-full flex justify-between relative'>
                    <div>
                        <h1 style={{ fontSize: '100px', lineHeight: '135%', width: '470px' }}>
                            Full Stack Web Developer
                        </h1>

                        <p className='py-5' style={{ width: '470px' }}>
                            Mastering React & Next.js, I develop sleek, scalable web applications. My expertise with modern databases and back-end frameworks propels your projects forward. Discover the future of web development, today.
                        </p>

                        <div className='Scroll'>
                            <div className=' flex items-center gap-x-1' >
                                <ChevronsLeft color={'white'} size={14} />
                                <p style={{ fontSize: "14px", lineHeight: "140%", letterSpacing: "25%" }}>SCROLL</p>
                            </div>
                        </div>
                    </div>

                    <div className='Block relative flex ' style={{ width: '670px', height: '600px', backgroundColor: '#222222' }}>
                        <span className='Play absolute' style={{ left: "-70px", top: "170px" }}>
                            <Image src={'/shape/img8.png'} alt={'shape'} width={138} height={138} />
                        </span>

                        <div>
                            <Image src={'/img/Hero-img.png'} alt={'My face'} width={500} height={630} />
                        </div>
                        <div className='px-8 pt-20 flex flex-col gap-y-5'>
                            {states.map((state, index) => (
                                <div key={index}>
                                    <p className='font-semibold' style={{ fontSize: '40px' }}>{state.number}</p>
                                    <p className='text-sm'>{state.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stacks */}
                <div className='flex flex-col gap-y-5 mt-32'>
                    <p>My Technical stack </p>
                    <div className='flex gap-x-20 pt-9 pb-14'>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/react.png'} alt={'stacks'} width={60} height={60} />
                            <span>React</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/nextjs.png'} alt={'stacks'} width={60} height={60} />
                            <span>Next Js</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/typescript.png'} alt={'stacks'} width={60} height={60} />
                            <span>Typescript</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/sass.png'} alt={'stacks'} width={60} height={60} />
                            <span>Sass</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/adonisjs.png'} alt={'stacks'} width={60} height={60} />
                            <span>Adonis Js</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/vercel.png'} alt={'stacks'} width={60} height={60} />
                            <span>Vercel</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/mongodb.png'} alt={'stacks'} width={60} height={60} />
                            <span>Mongo db</span>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-3'>
                            <Image src={'/stack/supabase.png'} alt={'stacks'} width={60} height={60} />
                            <span>Supabase</span>
                        </div>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}

export default Hero

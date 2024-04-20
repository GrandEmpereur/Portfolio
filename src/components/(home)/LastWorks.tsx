'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

const LastWorksItems = () => [
    { id: 1, title: 'E-commerce Website', image: '/img/lastWorks/project1.png' },
    { id: 2, title: 'Portfolio Website', image: '/img/lastWorks/project2.png' },
    { id: 3, title: 'Blog Website', image: '/img/lastWorks/project3.png' },
    { id: 4, title: 'Web Application', image: '/img/lastWorks/project4.png' },
    { id: 5, title: 'Landing Page', image: '/img/lastWorks/project5.png' },
];

function LastWorks() {
    const [hoverIndex, setHoverIndex] = useState(-1);

    return (
        <MaxWidthWrapper>
            <section id='lastWorks' className='portfolio lastWorks mt-40 flex flex-col items-start justify-between w-full h-full'>
                <div className='portfolio__header flex w-full justify-between'>
                    <div className="portfolio__title">
                        <h3 className='portfolio__subtitle font-mono'>PORTFOLIO</h3>
                        <h2 className='portfolio__main-title'>Lasted Update</h2>
                    </div>
                    <div className="portfolio__description flex flex-col gap-y-10">
                        <p className='portfolio__description-text font-mono'>To see all project done come check my project gallery</p>
                        <Link href="/portfolio/all" className='portfolio__link-button CustomButton'>
                            <span>View all Projects</span>
                        </Link>
                    </div>
                </div>
                <div className='portfolio__body w-full pt-6 '>
                    {LastWorksItems().map((item, index) => (
                        <div
                            key={item.id}
                            className='portfolio__item flex justify-between w-full hover:cursor-pointer pt-8 relative '
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(-1)}
                        >
                            <div className='portfolio__item-text flex gap-x-5'>
                                <p className='portfolio__item-number'>0{item.id}.</p>
                                <h2 className='portfolio__item-title'>{item.title}</h2>
                            </div>
                            <div className={`portfolio__item-image absolute flex justify-center items-center transition-all duration-300 ease-in-out transform ${hoverIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                <Image src={item.image} alt={item.title} width={250} height={200} objectFit='cover' />
                            </div>
                            <Link href={`/portfolio/${item.id}`}>
                                <div className={`portfolio__item-icon transition-all duration-300 ease-in-out transform ${hoverIndex === index ? '-rotate-45 text-[#E3B27D]' : 'text-white'}`}>
                                    <ArrowRight className='cursor-pointer' size={30} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    );
}

export default LastWorks;

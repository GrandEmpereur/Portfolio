import React from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const LastWorksItems = () => [
    { id: 1, title: 'E-commerce Website', image: '/img/lastWorks/ecommerce.jpg' },
    { id: 2, title: 'Portfolio Website', image: '/img/lastWorks/portfolio.jpg' },
    { id: 3, title: 'Blog Website', image: '/img/lastWorks/blog.jpg' },
    { id: 4, title: 'Web Application', image: '/img/lastWorks/webApp.jpg' },
    { id: 5, title: 'Landing Page', image: '/img/lastWorks/landingPage.jpg' },
];

function LastWorks() {
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
                        <Link href="/portfolio/all" className='portfolio__link-button'>
                            <span>View all Projects</span>
                        </Link>
                    </div>
                </div>
                <div className='portfolio__body pt-8 w-full'>
                    {LastWorksItems().map((item, index) => (
                        <div key={index} className='portfolio__item flex justify-between w-full'>
                            <div className='portfolio__item-text flex gap-x-5'>
                                <p className='portfolio__item-number'>0{item.id}</p>
                                <h2 className='portfolio__item-title'>{item.title}</h2>
                            </div>
                            <Link href={`/portfolio/${item.id}`}>
                                <ArrowRight className='portfolio__item-icon cursor-pointer' />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    );
}

export default LastWorks;

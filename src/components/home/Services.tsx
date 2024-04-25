import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

const services = [
    {
        icon: '/shape/img5.png',
        iconWidth: 83,
        iconHeight: 83,
        iconAlt: 'Custom Web Development Icon',
        title: 'Custom Web Development',
        description: 'Create tailored solutions that meet your specific business needs. From single-page applications to complex web platforms, leverage the full potential of modern web technologies to enhance your online presence.',
        service: [
            'E-commerce Platforms',
            'Content Management Systems',
            'Web Application Development',
            'Progressive Web Apps'
        ],
        buttonLabel: 'View More',
        buttonLink: '#'
    },
    {
        icon: '/shape/img3.png',
        iconWidth: 78,
        iconHeight: 80,
        iconAlt: 'Creative Web Design Icon',
        title: 'Creative Web Design',
        description: 'Design that attracts, retains, and converts. From concept to creation, ensure your website stands out with exceptional design aesthetics that deliver a seamless and engaging user experience.',
        service: [
            'UI/UX Design',
            'Responsive Web Design',
            'Graphic Design',
            'Branding'
        ],
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
    {
        icon: '/shape/img4.png',
        iconWidth: 74,
        iconHeight: 75,
        iconAlt: 'SEO & Digital Marketing Icon',
        title: 'SEO & Digital Marketing',
        description: 'Boost your visibility and drive more traffic with strategic SEO services and digital marketing campaigns. Optimize your site for the best search engine rankings and maximize ROI with targeted marketing strategies.',
        service: [
            'Search Engine Optimization',
            'Social Media Marketing',
            'Content Strategy',
            'Pay Per Click Advertising'
        ],
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
]


function Services() {
    const splitTitle = (title: string) => {
        const words = title.split(' ');
        const firstWord = words.shift(); // Retire le premier mot et le garde dans firstWord
        const remainingWords = words.join(' '); // Rejoint les mots restants en une seule chaîne

        return (
            <div className='services__title-container flex flex-col'>
                <h2 className='services__title-primary letterWithoutFill'>
                    {firstWord}
                </h2>
                <div className='services__title-secondary flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="1" viewBox="0 0 30 1" fill="none">
                        <line x1="30" y1="0.5" x2="0" y2="0.5" stroke="white" />
                    </svg>
                    <h2 className='services__title-secondary-text pl-4'>
                        {remainingWords}
                    </h2>
                </div>
            </div>
        );
    };

    return (
        <MaxWidthWrapper className='services-bg mt-40'>
            <section id='services' className='services flex flex-col items-start justify-between w-full h-full'>
                <div className="services__header title">
                    <h4 className='services__header-subtitle font-mono keep-color'>Services</h4>
                    <h2 className='services__header-main-title'>Explore My Expertise</h2>
                </div>
                <div className='services__list flex justify-between w-full pt-10'>
                    {services.map((service, index) => (
                        <div key={index} className='services__item service relative flex flex-col'>
                            <Image src={service.icon} alt={service.iconAlt} width={service.iconWidth} height={service.iconHeight} className='services__item-icon image absolute' />
                            {splitTitle(service.title)}
                            <p className='services__item-description pt-5'>{service.description}</p>
                            <div className='services__item-list pt-3 pb-10'>
                                {service.service.map((item, index) => (
                                    <li key={index} className='services__item-list-entry'>{item}</li>
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
    )
}

export default Services

import React from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Image from 'next/image';
import Link from 'next/link';

const services = [
    {
        icon: '/shape/img5.png',
        iconWidth: 83,
        iconHeight: 83,
        iconAlt: 'Shape Icon with squares and circles',
        title: 'Web Development',
        description: 'I can build your website from scratch using the latest technologies and frameworks.',
        service: [
            'HTML',
            'CSS',
            'JavaScript',
            'React',
            'Node.js',
            'Express',
            'MongoDB'
        ],
        buttonLabel: 'View More',
        buttonLink: '#'
    },
    {
        icon: '/shape/img3.png',
        iconWidth: 78,
        iconHeight: 80,
        iconAlt: 'Shape Icon composed of diamond geometric shapes',
        title: 'Web Design',
        description: 'I can design your website using the latest design trends and tools.',
        service: [
            'Figma',
            'Adobe XD',
            'Photoshop',
            'Illustrator'
        ],
        buttonLabel: 'View More',
        buttonLink: '#'
    },
    {
        icon: '/shape/img4.png',
        iconWidth: 74,
        iconHeight: 75,
        iconAlt: 'Shape Icon with half circles',
        title: 'SEO Optimization',
        description: 'I can help you rank your website on the first page of Google.',
        service: [
            'Keyword Research',
            'On-Page SEO',
            'Off-Page SEO',
            'Technical SEO'
        ],
        buttonLabel: 'View More',
        buttonLink: '#'
    },
]

function Services() {
    const splitTitle = (title: string) => {
        const words = title.split(' ');
        return (
            <div className='services__title-container flex flex-col'>
                <h2 className='services__title-primary letterWithoutFill'>
                    {words[0]}
                </h2>
                <div className='services__title-secondary flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="1" viewBox="0 0 30 1" fill="none">
                        <line x1="30" y1="0.5" x2="0" y2="0.5" stroke="white" />
                    </svg>
                    <h2 className='services__title-secondary-text pl-4'>
                        {words[1] || ''}
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <MaxWidthWrapper>
            <section id='services' className='services flex flex-col items-start justify-between w-full h-full mt-40'>
                <div className="services__header title">
                    <h3 className='services__header-subtitle font-mono'>Services</h3>
                    <h2 className='services__header-main-title'>My services</h2>
                </div>
                <div className='services__list flex pt-10'>
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
                            <Link href={service.buttonLink} className='services__item-button CustomButton'>
                                <span>{service.buttonLabel}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default Services

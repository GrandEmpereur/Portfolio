import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
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

    // split service.title into 2 words
    const splitTitle = (title: string) => {
        const words = title.split(' ');
        return (
            <div className='flex flex-col '>
                <h2 className='letterWithoutFill'>
                    {words[0]}
                </h2>
                <div className='flex items-center '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="1" viewBox="0 0 30 1" fill="none">
                        <line x1="30" y1="0.5" x2="-4.37114e-08" y2="0.499997" stroke="white" />
                    </svg>
                    <h2 className='pl-4'>
                        {words[1]}
                    </h2>
                </div>
            </div>
        )
    }


    return (
        <MaxWidthWrapper>
            <section id='services' className='services flex items-start justify-between w-full h-full mt-40'>
                {services.map((service, index) => (
                    <div key={index} className='service relative flex flex-col'>
                        <Image src={service.icon} alt={service.iconAlt} width={service.iconWidth} height={service.iconHeight} className='image absolute' />
                        {splitTitle(service.title)}
                        <p className='pt-5'>{service.description}</p>
                        <div className='pt-3 pb-10'>
                            {service.service.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </div>
                        <Link href={service.buttonLink} className='CustomButton'>
                            <span>{service.buttonLabel}</span>
                        </Link>
                    </div>
                ))}
            </section>
        </MaxWidthWrapper>
    )
}

export default Services

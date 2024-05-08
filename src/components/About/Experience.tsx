import React from 'react'
import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Badge } from '../ui/badge';

const EducationItems = [
    {
        title: 'Baccalauréat in Science and Industrial Technology Development (STI2D)',
        date: '2019 - 2020',
        location: 'Lycée Général et Technologique Jules Richard',
        description: 'Completed the French Baccalauréat with a focus on science and technology, preparing for higher education in technology-related fields.'
    },
    {
        title: 'Bachelor in Coding & Digital Innovation',
        date: '2020 - 2023',
        location: 'IIM - Digital School Paris',
        description: 'Earned a Bachelor’s degree specializing in coding and digital innovation, gaining practical skills and theoretical knowledge in digital technologies and software development.'
    },
    {
        title: 'Master in Web and Mobile Engineering',
        date: '2023 - 2025',
        location: 'IIM - Digital School Paris',
        description: 'Currently pursuing a Master’s degree in Web and Mobile Engineering, focusing on advanced concepts in mobile solutions, web technologies, and application development.'
    }
];

const ExperienceItems = [
    {
        title: 'Full Stack Developer',
        date: '2022 - now',
        location: 'Personal Project - Portfolio',
        description: 'Designed and developed a headless site for a restaurant chain, utilizing React for the front-end and Strapi for the back-end. Managed hosting, domain name creation, and SEO optimization.'
    },
    {
        title: 'Front-end Developer',
        date: '2021 - 2022',
        location: 'Marshall Motors - School Project [BAP]',
        description: 'Developed the front-end of a showcase website for an automotive garage using SCSS and Twig, integrated with a Symfony back-end. Designed a visual system and structured classes for better visual consistency. Implemented Google Business to optimize online visibility.'
    },
    {
        title: 'Full Stack Developer ( apprenticeship )',
        date: '2022 - 2023',
        location: 'W3lead',
        description: 'Designed and deployed e-commerce stores on Shopify using HTML, CSS, JS, and Liquid for the front-end. Developed the back-end using Node.js, TypeScript, REST APIs, GraphQL, and JWT authentication in Rust. Additional contributions include writing documentation, conducting code reviews, and R&D on new Shopify features.'
    },
    {
        title: 'Full Stack Developer',
        date: '2024 - 2025',
        location: 'Euroclear',
        description: 'Currently working as a full stack developer, responsible for developing and maintaining various software solutions that enhance the efficiency and functionality of financial services.'
    }
];


function Experience() {
    return (
        <MaxWidthWrapper className='experience-wrapper mt-20'>
            <section id='experience' className='experience relative flex flex-col w-full gap-y-12'>
                <Image src={'/shape/img2.png'} alt={'a geometrical shape'} width={180} height={75} className='experience__shape1 absolute w-max' />
                <Image src={'/shape/img6.png'} alt={'a geometrical shape'} width={140} height={65} className='experience__shape2 absolute w-max' />

                <div className='flex gap-x-10 flex-col lg:flex-row '>
                    <div className='experience__education w-full flex flex-col gap-10 lg:w-1/2'>
                        <h3 className='experience__heading'>Education</h3>
                        {EducationItems.map((item, index) => (
                            <div key={index} className='experience__item flex w-full justify-between items-center'>
                                <div className='hidden items-center gap-x-5 gap-y-5  | md:flex '>
                                    <div className='experience__sphere '></div>
                                    <div>
                                        <Badge className='experience__date p-2'>{item.date}</Badge>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-full | md:w-1/2'>
                                    <div className='block md:hidden'>
                                        <Badge className='experience__date p-2'>{item.date}</Badge>
                                    </div>
                                    <h4 className='experience__title'>{item.title}</h4>
                                    <p className='experience__location'>{item.location}</p>
                                    <p className='experience__description'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='experience__professional w-full flex flex-col gap-10 lg:w-1/2'>
                        <h3 className='experience__heading'>Experience</h3>
                        {ExperienceItems.map((item, index) => (
                            <div key={index} className='experience__item flex w-full justify-between items-center'>
                                <div className='hidden items-center gap-x-5 gap-y-5 | md:flex '>
                                    <div className='experience__sphere '></div>
                                    <div>
                                        <Badge className='experience__date p-2'>{item.date}</Badge>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-full | md:w-1/2'>
                                    <div className='block md:hidden'>
                                        <Badge className='experience__date p-2'>{item.date}</Badge>
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
    )
}

export default Experience

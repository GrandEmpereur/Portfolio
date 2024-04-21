import React from 'react'
import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Badge } from '../ui/badge';

const EducationItems = [
    {
        title: 'Bachelor of Science in Computer Science',
        date: '2017 - 2021',
        location: 'University of California, Los Angeles',
        description: 'Graduated with a Bachelor of Science in Computer Science, acquiring critical skills in algorithms, data structures, and software engineering principles.'
    },
    {
        title: 'High School Diploma',
        date: '2013 - 2017',
        location: 'Los Angeles High School',
        description: 'Valedictorian with a 4.0 GPA, honored with the Outstanding Student Award for academic and extracurricular excellence.'
    }
]

const ExperienceItems = [
    {
        title: 'Software Engineer',
        date: '2021 - Present',
        location: 'Google',
        description: 'Responsible for enhancing Google Search, focusing on optimizing user experience and improving search algorithms.'
    },
    {
        title: 'Web Developer',
        date: '2019 - 2021',
        location: 'Facebook',
        description: 'Contributed to the Facebook Ads team, developing tools that streamline the ad creation process for global advertisers.'
    }
]

function Experience() {
    return (
        <MaxWidthWrapper className='experience-wrapper mt-8'>
            <section id='experience' className='experience relative flex flex-col w-full gap-y-12'>
                <Image src={'/shape/img2.png'} alt={'a geometrical shape'} width={180} height={75} className='experience__shape1 absolute' />
                <Image src={'/shape/img6.png'} alt={'a geometrical shape'} width={140} height={65} className='experience__shape2 absolute' />

                <div className='flex gap-x-10'>
                    <div className='experience__education w-1/2 flex flex-col gap-10'>
                        <h2 className='experience__heading'>Education</h2>
                        {EducationItems.map((item, index) => (
                            <div key={index} className='experience__item flex w-full justify-between items-center'>
                                <div className='flex items-center gap-x-5'>
                                    <div className='experience__sphere'></div>
                                    <div>
                                        <Badge className='experience__date p-2'>{item.date}</Badge>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-1/2'>
                                    <h3 className='experience__title'>{item.title}</h3>
                                    <p className='experience__location'>{item.location}</p>
                                    <p className='experience__description'>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='experience__professional w-1/2 flex flex-col gap-10'>
                        <h2 className='experience__heading'>Experience</h2>
                        {ExperienceItems.map((item, index) => (
                            <div key={index} className='experience__item flex w-full justify-between items-center'>
                                <div className='flex items-center gap-x-5'>
                                    <div className='experience__sphere'></div>
                                    <div>
                                        <Badge className='experience__date p-2'>{item.date}</Badge></div>
                                </div>
                                <div className='flex flex-col gap-2 w-1/2'>
                                    <h3 className='experience__title'>{item.title}</h3>
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

import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'

const services = [
    {
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
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
    {
        title: 'Web Design',
        description: 'I can design your website using the latest design trends and tools.',
        service: [
            'Figma',
            'Adobe XD',
            'Photoshop',
            'Illustrator'
        ],
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
    {
        title: 'SEO',
        description: 'I can help you rank your website on the first page of Google.',
        service: [
            'Keyword Research',
            'On-Page SEO',
            'Off-Page SEO',
            'Technical SEO'
        ],
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
]


function Services() {
    return (
        <MaxWidthWrapper>
            <section id='services' className='services flex items-start justify-between w-full h-full mt-40'>
                {services.map((service, index) => (
                    <div key={index} className='service flex flex-col gap-y-5'>
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                        <ul>
                            {service.service.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                        <a href={service.buttonLink} className='button'>{service.buttonLabel}</a>
                    </div>
                ))}
            </section>
        </MaxWidthWrapper>
    )
}

export default Services

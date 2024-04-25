import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper';
import Image from 'next/image';

const MainStack = [
    { name: 'TypeScript', icon: '/img/about/skills/typescript.png' },
    { name: 'React', icon: '/img/about/skills/react.png' },
    { name: 'Next.js', icon: '/img/about/skills/nextjs.png' },
    { name: 'SASS', icon: '/img/about/skills/sass.png' },
    { name: 'Tailwind CSS', icon: '/img/about/skills/tailwindcss.png' },
    { name: 'Docker', icon: '/img/about/skills/docker.png' },
    { name: 'GitHub', icon: '/img/about/skills/github.png' },
    { name: 'Postman', icon: '/img/about/skills/postman.png' },
    { name: 'Koa API', icon: '/img/about/skills/koa.png' },
    { name: 'Supabase', icon: '/img/about/skills/supabase.png' },
    { name: 'MongoDB', icon: '/img/about/skills/mongodb.png' },
    { name: 'Vercel', icon: '/img/about/skills/vercel.png' },
];

const OtherStack = [
    { name: 'HTML', icon: '/img/about/skills/html.png' },
    { name: 'CSS', icon: '/img/about/skills/css.png' },
    { name: 'JavaScript', icon: '/img/about/skills/js.png' },
    { name: 'Nuxt.js', icon: '/img/about/skills/nuxtjs.png' },
    { name: 'Vue.js', icon: '/img/about/skills/vue.png' },
    { name: 'Angular', icon: '/img/about/skills/angular.png' },
    { name: 'Storybook', icon: '/img/about/skills/storybook.png' },
    { name: 'Neon', icon: '/img/about/skills/neon.png' },
    { name: 'Cloudflare', icon: '/img/about/skills/cloudflare.png' },
    { name: 'Stripe', icon: '/img/about/skills/stripe.png' },
    { name: 'GraphQL', icon: '/img/about/skills/graphql.png' },
    { name: 'AdonisJS', icon: '/img/about/skills/adonisjs.png' },
    { name: 'Shopify', icon: '/img/about/skills/shopify.png' },
    { name: 'Heroku', icon: '/img/about/skills/heroku.png' },
    { name: 'Figma', icon: '/img/about/skills/figma.png' },
];

const Languages = [
    {
        name: 'French',
        level: 'Native',
        description: 'Fluent in French as a native speaker, I possess complete command of the language, including idiomatic expressions and specialized vocabulary.',
    },
    {
        name: 'Polish',
        level: 'Native',
        description: 'As a native speaker of Polish, I have full proficiency in the language, enabling me to engage in all forms of communication effectively.',
    },
    {
        name: 'English',
        level: 'Professional',
        description: 'I am proficient in English with a professional level of fluency that allows me to handle complex technical discussions and documentation.',
    },
];

const SoftSkills = [
    { name: 'Problem Solving' },
    { name: 'Teamwork' },
    { name: 'Communication' },
    { name: 'Time Management' },
    { name: 'Adaptability' },
    { name: 'Creativity' },
    { name: 'Leadership' },
    { name: 'Critical Thinking' },
    { name: 'Attention to Detail' },
    { name: 'Conflict Resolution' },
    { name: 'Decision Making' },
    { name: 'Empathy' },
    { name: 'Flexibility' },
    { name: 'Organization' },
    { name: 'Perseverance' },
    { name: 'Positive Attitude' },
    { name: 'Stress Management' },
    { name: 'Work Ethic' },
];

function Skills() {
    return (
        <MaxWidthWrapper className='skills-wrapper mt-52'>
            <section id='skills' className='skills skills__container flex flex-col w-full gap-y-12'>
                <div className="skills__header">
                    <h3 className='skills__subtitle'>About Me</h3>
                    <h4 className='skills__title keep-color'>Everything You Need to Know About My Skills</h4>
                </div>

                <div className='skills__sections w-full flex flex-col gap-y-14'>
                    <article className="skills__section w-full flex flex-col gap-y-8">
                        <div className='flex flex-col gap-y-2'>
                            <h3 className='skills__heading variant'>My Core Programming Technologies</h3>
                            <h4 className='keep-color'>Discover the key technologies I specialize in for building modern and scalable applications.</h4>
                        </div>
                        <div className='skills__icons flex flex-wrap w-full items-center justify-between'>
                            {MainStack.map((item, index) => (
                                <div key={index} className='skill__item flex flex-wrap flex-col items-center gap-y-4'>
                                    <Image src={item.icon} alt={`${item.name} icon`} width={60} height={60} style={{ objectFit: 'cover' }} />
                                    <span className='skill__name'>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="skills__section w-full flex flex-col gap-y-8">
                        <div className='flex flex-col gap-y-2'>
                            <h3 className='skills__heading'>I Can Work with Other Programming Technologies</h3>
                            <h4 className='keep-color'>Discover other programming langue i have learn during side projet or during school cours</h4>
                        </div>
                        <div className='skills__icons flex flex-wrap w-full items-center justify-between'>
                            {OtherStack.map((item, index) => (
                                <div key={index} className='skill__item flex flex-wrap flex-col items-center gap-y-4'>
                                    <Image src={item.icon} alt={`${item.name} icon`} width={60} height={60} style={{ objectFit: 'cover' }} />
                                    <span className='skill__name'>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="skills__section w-full flex flex-col gap-y-8">
                        <h3 className='skills__heading'>Language Proficiencies</h3>
                        <h4 className='keep-color'>My linguistic capabilities span multiple languages, allowing for effective communication in diverse environments.</h4>
                        <div className='skills__icons flex w-full items-center justify-between '>
                            {Languages.map((item, index) => (
                                <div key={index} className='language__item flex flex-col items-center gap-y-2 '>
                                    <span className='language__name text-xl font-semibold'>{item.name}</span>
                                    <p className='language__description w-1/2 text-center'>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="skills__section w-full flex flex-col gap-y-8">
                        <div className='flex flex-col gap-y-2'>
                            <h3 className='skills__heading'>Soft Skills</h3>
                            <h4 className='keep-color'>Discover all SoftSkills noting i have seen during school class & self experience</h4>
                        </div>
                        <div className='skills__icons flex flex-wrap w-full items-center gap-5'>
                            {SoftSkills.map((item, index) => (
                                <div key={index} className='skill__item'>
                                    <span className='skill__name'>{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </article>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default Skills

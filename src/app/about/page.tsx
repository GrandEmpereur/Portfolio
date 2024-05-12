import React from 'react'
import Line from '@/components/Line';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EducationItems, ExperienceItems, MainStack, OtherStack, Languages, SoftSkills } from '@/lib/data/about';

function page() {
    return (
        <>
            <div className='relative '>
                <Line />

                <MaxWidthWrapper >
                    <section id='About-hero' className='About-hero flex flex-col w-full gap-y-12'>
                        <div className="about__title">
                            <h3 className='about__title-sub font-mono'>About me</h3>
                            <h4 className='about__title-main keep-color '>All You Want to Know About Me</h4>
                        </div>

                        <div className='w-full lg:h-[350px]'>
                            <Image src={'/img/about/aboutHero.png'} alt={''} width={1108} height={537} sizes="100vw" style={{ width: '100%', height:'100%',  objectFit: 'cover'  }} loading='eager' />
                        </div>

                        <div className='flex flex-col w-full gap-y-5'>
                            <div className='flex flex-col gap-y-2'>
                                <h2 className='about__title-main'>M. Patrick</h2>
                                <p>Full stack Web Developer </p>
                            </div>
                            <div className='flex flex-col w-full gap-y-5'>
                                <p>Hello, I am Patrick, a seasoned Full Stack Developer with a deep focus on the JavaScript ecosystem, specializing in building scalable and performant web applications using React and Next.js.</p>
                                <p>Over the years, I have honed my skills in JavaScript, mastering frameworks and libraries essential for modern web development. My expertise in React and Next.js allows me to deliver dynamic, SEO-friendly websites that provide excellent user experiences and meet the high standards of today's web applications.</p>
                                <p>My professional journey has been dedicated to developing robust solutions, optimizing web performance, and integrating advanced features that ensure minimal maintenance and high efficiency. Whether it's enhancing existing applications or crafting new ones from the ground up, my goal is always to leverage my technical skills to produce cutting-edge, accessible, and easy-to-maintain web platforms.</p>
                            </div>

                            <div>
                                <a href={'/CV.pdf'} download="/CV.pdf">
                                    <Button className='rounded-full ' variant={'other'} size={'lg'} >Download My Resume</Button>
                                </a>
                            </div>
                        </div>
                    </section>
                </MaxWidthWrapper>

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
                                <div className='skills__icons flex flex-wrap w-full items-center justify-evenly gap-5'>
                                    {MainStack.map((item, index) => (
                                        <div key={index} className='skill__item flex flex-wrap flex-col items-center gap-4'>
                                            <Image src={item.icon} alt={`${item.name} icon`} width={40} height={40} style={{ objectFit: 'cover' }} />
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
                                <div className='skills__icons flex flex-wrap w-full items-center justify-evenly gap-5'>
                                    {OtherStack.map((item, index) => (
                                        <div key={index} className='skill__item flex flex-wrap flex-col items-center gap-y-4'>
                                            <Image src={item.icon} alt={`${item.name} icon`} width={40} height={40} style={{ objectFit: 'cover' }} />
                                            <span className='skill__name'>{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </article>

                            <article className="skills__section w-full flex flex-col gap-y-8">
                                <h3 className='skills__heading'>Language Proficiencies</h3>
                                <h4 className='keep-color'>My linguistic capabilities span multiple languages, allowing for effective communication in diverse environments.</h4>
                                <div className='skills__icons flex flex-col w-full gap-y-6 items-center justify-between | md:flex-row md:gap-y-0 '>
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
            </div>
        </>
    )
}

export default page

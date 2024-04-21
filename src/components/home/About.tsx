import React from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function About() {
    return (
        <MaxWidthWrapper>
            <section id='about' className='about flex w-full h-full flex-col gap-y-8'>
                <div className="about__title">
                    <h3 className='about__title-sub font-mono'>About me</h3>
                    <h2 className='about__title-main'>I Create Digital World Class Business Web Store / Site</h2>
                </div>

                <div className='about__content flex justify-between items-start gap-x-32'>
                    <div className="about__image-container relative w-max">
                        <Image src={'/img/home-about.jpg'} alt={'image at working deck'} width={700} height={530} className='about__main-image inline-block rounded-lg' />
                        <Image src={'/shape/img2.png'} alt={'a geometrical shape'} width={180} height={75} className='about__shape1 absolute' />
                        <Image src={'/shape/img6.png'} alt={'a geometrical shape'} width={140} height={65} className='about__shape2 absolute' />
                        <div className="about__decoration absolute"></div>
                    </div>

                    <div className='about__description w-1/2 flex flex-col gap-y-8'>
                        <p className='about__description-title'>Welcome to My Portfolio</p>
                        <p className='about__description-text'>I'm a passionate Full Stack Developer with over 4 years of development experience, specializing in the vibrant world of the JavaScript ecosystem. My expertise lies in crafting dynamic, user-centric applications using the React ecosystem, including advanced frameworks like React.js and Next.js.</p>
                        <Link href='/about'>
                            <span className='about__learn-more-button CustomButton'>Learn More</span>
                        </Link>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default About

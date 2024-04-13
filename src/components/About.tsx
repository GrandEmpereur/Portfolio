import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function About() {
    return (
        <MaxWidthWrapper>
            <section id='about' className='about flex w-full h-full flex-col gap-y-8'>
                <div className="title">
                    <h3 className='font-mono'>About me</h3>
                    <h2>I Create Digital World Class Business Web Store / Site</h2>
                </div>

                <div className='flex justify-between items-start gap-x-32'>
                    <div className="img relative w-max">
                        <Image src={'/img/home-about.jpg'} alt={'image a working deck'} width={700} height={530} className='mainImg inline-block rounded-lg' />
                        <Image src={'/shape/img2.png'} alt={'a geometrical shape'} width={180} height={75} className='shape1 absolute' />
                        <Image src={'/shape/img6.png'} alt={'a geometrical shape'} width={140} height={65} className='shape2 absolute' />
                        <div className="deco absolute"></div>
                    </div>


                    <div className='description w-1/2 flex flex-col gap-y-8'>
                        <p className='title'>Welcome to My Portfolio</p>
                        <p className='description'>I'm a passionate Full Stack Developer with over 4 years of development experience, specializing in the vibrant world of the JavaScript ecosystem. My expertise lies in crafting dynamic, user-centric applications using the React ecosystem, including advanced frameworks like React.js and Next.js.</p>
                        <Link href='/about'>
                            <Button>Learn More</Button>
                        </Link>
                    </div>
                </div>




            </section>
        </MaxWidthWrapper>
    )
}

export default About

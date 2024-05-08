import React from 'react'
import Image from 'next/image';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Button } from '@/components/ui/button';

function Hero() {
    return (
        <MaxWidthWrapper className='mt-8'>
            <section id='About-hero' className='About-hero flex flex-col w-full gap-y-12'>
                <div className="about__title">
                    <h3 className='about__title-sub font-mono'>About me</h3>
                    <h4 className='about__title-main keep-color '>All You Want to Know About Me</h4>
                </div>

                <div className='w-full'>
                    <Image src={'/img/about/aboutHero.png'} alt={''} width={1108} height={537} style={{ width: '100%', objectFit: 'cover' }} />
                </div>

                <div className='flex flex-col w-full gap-y-5'>
                    <div>
                        <h2 className='about__title-main'>Bartosik Patrick</h2>
                        <p>Full stack Web Developer </p>
                    </div>
                    <div className='flex flex-col w-full gap-y-5'>
                        <p>Hi, my name is Adriano Smith and I began using WordPress when it first began. I’ve spent most of my waking hours for the last ten years designing, programming and operating WordPress sites.</p>
                        <p>One of my specialties is taking an idea from scratch and creating a full-fledged platform. I go beyond to produce sites with a unique, outstanding, contemporary look-and-feel. With extensive knowledge of web mechanics, I’m able to optimize complex integrations to require little-to-no maintenance while running on their own for years.</p>
                    </div>
                    <div>
                        <a href={'/CV.pdf'} download="/CV.pdf">
                            <Button size={'lg'} >Download My Resume</Button>
                        </a>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default Hero


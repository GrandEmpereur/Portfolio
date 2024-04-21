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
                        <h2 className='about__description-title'>Discover the Art of Code with me</h2>
                        <p className='about__description-text'>Embark on a journey through cutting-edge web development with me, a seasoned Full Stack Developer. With over four years of experience in the dynamic JavaScript landscape, I specialize in building immersive, user-focused experiences. My toolkit, rich with modern frameworks like React.js and Next.js, powers businesses and individuals alike towards digital excellence.</p>
                        <Link href='/about'>
                            <Button className='about__learn-more-button' size={'lg'} >Explore More</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}

export default About
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Newsletter() {
    return (
        <section id='newsletter' className='newsletter relative flex w-full h-full flex-col gap-y-8 pt-28 mb-56'>
            <div className='newsletter__image-wrapper flex justify-end'>
                <Image src={'/img/newsletter/img1.png'} alt={'Engaging Newsletter Visual'} width={1305} height={500} />
                <span className='newsletter__sphere-deco'></span>
            </div>
            <div className='newsletter__content flex items-center justify-center'>
                <h2 className='newsletter__title'>
                    Join Our Journey — <span className='newsletter__title-emphasis text-[#E3B27D]'>Create With Us!</span>
                </h2>
                <Link href={'/contact'}>
                    <div className='newsletter__contact btn btn-primary'>
                        <span>Connect Now</span>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default Newsletter

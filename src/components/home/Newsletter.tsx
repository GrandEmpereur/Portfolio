import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Newsletter() {
    return (
        <section id='newsletter' className='newsletter relative flex w-full h-full flex-col gap-y-8 pt-28 mb-56'>
            <div className='newsletter__image-wrapper flex justify-end'>
                <Image src={'/img/newsletter/img1.png'} alt={'Decorative sphere'} width={1305} height={500} />
                <span className='newsletter__sphere-deco'></span>
            </div>
            <div className='newsletter__content flex items-center justify-center'>
                <h2 className='newsletter__title'>
                    Let's Make Something Great <span className='newsletter__title-emphasis text-[#E3B27D]'>Together !</span>
                </h2>
                <Link href={'/contact'}>
                    <div className='newsletter__contact'>
                        <span>CONTACT WITH ME</span>
                    </div>
                </Link>
            </div>
        </section>
    )
}

export default Newsletter

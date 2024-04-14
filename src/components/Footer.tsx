import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Footer() {
  return (
    <MaxWidthWrapper className='my-12'>
      <footer id='footer' className='footer flex flex-col justify-between'>
        <div className='top flex items-start justify-between'>
          <div className='flex flex-col gap-y-5'>
            <p>Prêts à accélérer ?</p>
            <p>
              Que vous souhaitiez un audit SEO, une refonte, optimiser votre site web, contactez-nous pour en discuter.</p>
            <Link href="#">
              <Button>Demander un devis</Button>
            </Link>
          </div>

          <div className='flex items-start gap-x-40'>
            <div className='flex flex-col gap-5'>
              <h2>Contact</h2>
              <li>BartosikPatrickPro@gmail.com</li>
              <div>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Github</a></li>
                <li><a href="#">LinkedIn</a></li>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
              <h2>Quick Links</h2>
              <div><li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Sitemap</a></li></div>
            </div>
          </div>
        </div>

        <div className='bottom flex flex-col items-center justify-center'>
          <div className='deco'></div>
          <div className='flex gap-x-5'>
            <Link href={"#"}>
              <Button variant={'link'}>
                Terms of Use
              </Button>
            </Link>
            <Link href={"#"}>
              <Button variant={'link'}>
                Privacy Policy
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </MaxWidthWrapper>
  )
}

export default Footer

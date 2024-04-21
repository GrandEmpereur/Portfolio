import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Footer() {
  return (
    <MaxWidthWrapper className='footer-wrapper my-12'>
      <footer id='footer' className='footer flex flex-col justify-between'>
        <div className='footer__top flex items-start justify-between'>
          <div className='footer__column footer__column--left flex flex-col gap-y-5'>
            <p className='footer__intro'>Ready to accelerate your online presence?</p>
            <p className='footer__call-to-action'>
              Explore how our comprehensive SEO, redesign, and website optimization services can elevate your project. Contact us to discuss your needs.
            </p>
            <Link href="/contact">
              <Button className='footer__button'>Request a Quote</Button>
            </Link>
          </div>

          <div className='footer__column footer__column--right flex items-start gap-x-40'>
            <div className='footer__contacts flex flex-col gap-5'>
              <h2 className='footer__heading'>Contact Us</h2>
              <a href="mailto:bartosikpatrickpro@gmail.com" className='footer__email'>Email: BartosikPatrickPro@gmail.com</a>
              <div className='footer__social-links flex flex-col gap-2'>
                <li><a href="https://www.instagram.com/empereur.patrick/" className='footer__link' rel="noopener noreferrer" target="_blank">Instagram</a></li>
                <li><a href="https://github.com/GrandEmpereur" className='footer__link' rel="noopener noreferrer" target="_blank">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/patrick-bartosik/" className='footer__link' rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
              </div>
            </div>
            <div className='footer__quick-links flex flex-col gap-5'>
              <h2 className='footer__heading'>Quick Links</h2>
              <div className='flex flex-col gap-2'>
                <li><a href="/home" className='footer__link'>Home</a></li>
                <li><a href="/about" className='footer__link'>About</a></li>
                <li><a href="/services" className='footer__link'>Services</a></li>
                <li><a href="/contact" className='footer__link'>Contact</a></li>
                <li><a href="/sitemap.xml" className='footer__link'>Sitemap</a></li>
              </div>
            </div>
          </div>
        </div>

        <div className='footer__bottom flex flex-col items-center justify-center'>
        <div className='deco'></div>
          <div className='footer__legal-links flex gap-x-5'>
            <Link href="/terms">
              <Button variant={'link'} className='footer__legal-button'>
                Terms of Use
              </Button>
            </Link>
            <Link href="/privacy">
              <Button variant={'link'} className='footer__legal-button'>
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
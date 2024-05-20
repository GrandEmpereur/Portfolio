import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { formatLegalText } from '@/lib/formatLegalText'
import { Metadata } from 'next';
import { Locale } from '@/i18nConfig';

export const metadata: Metadata = {
    title: "Bartosik Patrick - Legal Notices ",
    description: "Discover the cutting-edge portfolio of Bartosik Patrick, a seasoned Full Stack Developer specializing in React, Next.js, and Tailwind CSS. Dive into a showcase of innovative web applications that blend aesthetics with functionality, crafted to push the boundaries of digital experiences.",
};

const rawLegalText = `
Legal Notices

In accordance with the provisions of Articles 6-III and 19 of the Law No. 2004-575 of June 21, 2004, for Confidence in the Digital Economy, known as L.C.E.N., users and visitors of Patrick Bartosik's website are hereby informed of these legal notices.

The Patrick Bartosik website is accessible at the following address: Patrick.Bartosik.fr (hereinafter "the Site"). Access and use of the Site are subject to these "Legal Notices" detailed below as well as applicable laws and/or regulations.

Connecting to, using, and accessing this Site implies full and unconditional acceptance by the user of all the provisions of these Legal Notices.

Article 1: Legal Information
Under Article 6 of Law No. 2004-575 of June 21, 2004, for confidence in the digital economy, this article specifies the identity of the various parties involved in its implementation and monitoring.

A. Site Publisher
The Patrick Bartosik site is published by:
Patrick Bartosik, having its registered office at the following address: 28bis rue Honoré Sohier, and registered under the number: 90093821800014 - Paris.
Share capital: 1000 euros
Phone: +33 (0)6 58 29 23 30
Email address: BartosikPatrickPro@gmail.com
hereinafter "the Publisher"

B. Publishing Director
The Publishing Director is:
Bartosik Patrick
hereinafter "the Publishing Director"

C. Site Host
The Patrick Bartosik site is hosted by:
Vercel Inc., located at the following address: 	San Francisco in the United States.
hereinafter "the Host"

D. Users
All Internet users who browse, read, view, and use the Patrick Bartosik site are considered users.
hereinafter "the Users"

Article 2 - Accessibility
The Site is in principle accessible to Users 24/24h and 7/7d, except for interruption, scheduled or not, for maintenance needs or in case of force majeure.
Should access to the Site become impossible, efforts will be made to restore access as soon as possible. The Site cannot be held responsible for any damage of any nature resulting from its unavailability.

Article 3 - Applicable Law and Jurisdiction
These Legal Notices are governed by French law. In case of dispute and in the absence of an amicable agreement, the dispute will be brought before the French courts in accordance with the rules of jurisdiction in force.

Article 4 - Contact
For any reporting of illegal content or activities, the User may contact the publisher at the following address: BartosikPatrickPro@gmail.com, or by registered mail with acknowledgment of receipt sent to the publisher at the coordinates specified in these legal notices.
`;

export default function page({
    params: { lang },
}: {
    params: { lang: Locale };
}) {
    const formattedText = formatLegalText(rawLegalText);
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                {formattedText}
            </div>
        </MaxWidthWrapper>
    )
}



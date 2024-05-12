import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

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

export default function page() {
    const formattedText = formatLegalText(rawLegalText);
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                {formattedText}
            </div>
        </MaxWidthWrapper>
    )
}

export function formatLegalText(rawText: string) {
    const sections = rawText.split('\n').filter(line => line.trim() !== '');

    return sections.map((section, index) => {
        if (index === 0) { // Titre principal
            return <h1 key={index} className="text-3xl font-bold my-4 pb-8">{section}</h1>;
        }
        if (/^Article \d+/.test(section)) { // Titres d'articles
            return <h2 key={index} className="text-2xl font-semibold my-4">{section}</h2>;
        }
        if (/^[A-D]\./.test(section)) { // Sous-titres principaux
            return <h3 key={index} className="text-xl font-semibold mt-4 mb-2 ml-4">{section}</h3>;
        }
        if (/^[a-d]\./.test(section)) { // Sous-sous-titres
            return <h4 key={index} className="ml-8 font-semibold mt-4 mb-2 italic ">{section}</h4>;
        }
        if (section.startsWith('-')) { // Éléments de liste informels
            return <p key={index} className="mb-4 ml-12 ">- {section.slice(1).trim()}</p>;
        }
        return <p key={index} className="mb-4 ml-4">{section}</p>; // Paragraphe normal avec indentation légère
    });
}



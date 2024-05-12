import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { formatLegalText } from '@/app/terms/page'


const rawLegalText = `
General Terms of Use (GTU)

Article 1: Introduction
Welcome to the Patrick Bartosik website. These General Terms of Use govern your access to and use of our website and its associated services. By accessing or using our website, you agree to be bound by these terms and all terms incorporated by reference. If you do not agree to all of these terms, do not use our website.

Article 2: Legal Notice
The website patrick.bartosik.fr (hereafter "the Site") is operated by Patrick Bartosik, whose registered office is located at 28bis Rue Honoré Sohier, 93600 Aulnays-Sous-Bois, France, registered under the number 90093821800014.

Article 3: Website Access and Usage
The Site provides users with access to a variety of resources, including but not limited to:

- Informational content
- User interfaces
- Software tools

Access to the Site is free of charge to any user with internet access. All costs necessary for the access to services (internet access, computer equipment, etc.) are borne by the user. Access to specific services on the Site may require the user to create an account and provide certain personal information.

The Site strives to provide accurate information and updates. However, inaccuracies or omissions may occur. The operator in charge of the Site cannot be held responsible for any omission, inaccuracy, or deficiency in the update, whether caused by the Site or by third-party partners who provide this information.

Article 4: User Responsibilities
Users are responsible for the security of their account access credentials. Any usage of the site from a user’s account is deemed to have been used by that user. The Site reserves the right to request users to adhere to these GTU under penalty of temporary or permanent suspension of the account.

Users agree not to disrupt the operation of the service offered by www.patrickbartosik.com in any way whatsoever. In particular, users agree to refrain from posting illegal, defamatory, or pornographic messages on or through the Site.

Article 5: Intellectual Property
Content on the Site, including but not limited to text, graphics, images, logos, icons, and audio clips, is the property of the site operator or is used with permission of the respective owners and is subject to copyright and other intellectual property rights under national laws and international treaties.

Users may not use, reproduce, distribute, modify, transmit, reuse, repost, or use the content of the Site for public or commercial purposes without the express written permission of the Site operator.

Article 6: Data Protection and Privacy
For information on how user information is collected, used, and disclosed by us in connection with your use of the Site, please consult our Privacy Policy.

Article 7: Applicable Law and Jurisdiction
These GTU are governed by and construed in accordance with the laws of France, without giving effect to any principles of conflicts of law. Any dispute arising from these terms or related to the use of the Site is subject to the exclusive jurisdiction of the courts of France.

Article 8: Changes to the General Terms of Use
The Site reserves the right to modify the contents of these GTU at any time without prior notice. Users are encouraged to check these terms periodically for changes. Your continued use of the site after the posting of changes constitutes your binding acceptance of such changes.

Conclusion
These GTU ensure the proper and fair functioning of the Site. By accessing the Site, you signify your agreement to these GTU. If you have any questions about these terms, please contact us at BartosikPatrickPro@gmail.com.
`;

function page() {
    const formattedText = formatLegalText(rawLegalText);
    return (
        <MaxWidthWrapper>
            <div className="py-10 px-6 sm:px-10 lg:px-16">
                {formattedText}
            </div>
        </MaxWidthWrapper>
    )
}

export default page

// Legal pages. Same keys in fr, en and pl (src/locales/parity.test.ts). Strings only.
// Identity and provider data come from src/lib/legal.data.ts; this file holds the prose around them.
// The French version prevails.
export const legalPages = {
  common: {
    updated: "Last updated",
    frenchPrevails: "The French version prevails.",
    seeAlso: "See also",
    moreInfo: "Provider's policy",
    links: {
      mentions: "Legal notice",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      terms: "Terms of use",
    },
    label: {
      name: "Name",
      address: "Address",
      email: "Email",
      phone: "Phone",
      director: "Publication director",
      siren: "SIREN",
      siret: "SIRET",
      company: "Company",
      contact: "Contact",
    },
  },
  providers: {
    ovhContact: "1007 (from abroad: +33 9 72 10 10 07)",
    label: {
      role: "Role",
      entity: "Entity",
      address: "Address",
      country: "Country",
      transfers: "Transfer outside the European Union",
      contact: "Contact",
    },
    vercel: {
      role: "Website host",
      country: "United States",
      transfers:
        "Vercel's DPA is built into its terms. It relies on the standard contractual clauses (2021) and on the EU-US Data Privacy Framework.",
    },
    ovh: {
      role: "Domain name registrar",
      country: "France",
      transfers: "No transfer outside the European Union.",
    },
    cloudflare: {
      role: "DNS and proxy in front of the site",
      country: "United States",
      transfers: "Data Privacy Framework; failing that, standard contractual clauses.",
    },
    resend: {
      role: "Sending of the contact form emails",
      country: "United States",
      transfers: "Standard contractual clauses (2021) and Data Privacy Framework.",
    },
    google: {
      role: "Google Analytics and Google Tag Manager, only after your consent",
      country: "Ireland (Google Ireland Limited), with a transfer to the United States (Google LLC)",
      transfers:
        "Transfers to Google LLC rely on its Data Privacy Framework certification; failing that, on standard contractual clauses.",
    },
    calcom: {
      role: "Appointment booking, if enabled",
      country: "United States",
      transfers: "Standard contractual clauses, and the Data Privacy Framework for as long as the provider is certified.",
    },
  },
  mentions: {
    meta: {
      title: "Legal notice | Patrick Bartosik",
      description:
        "Publisher, host and legal information for the website of Patrick Bartosik, freelance full stack developer.",
    },
    title: "Legal notice",
    intro:
      "Information about the publisher and the host of this website, in accordance with the French law of 21 June 2004 on trust in the digital economy.",
    publisher: {
      title: "Website publisher",
      text: "This website is published by:",
    },
    host: {
      title: "Host",
      text: "The website is hosted by Vercel Inc. Vercel does not publish a phone number: its published contact details are listed below.",
    },
    domain: {
      title: "Domain name",
      text: "The domain name is registered with OVH SAS.",
    },
    network: {
      title: "Network and DNS",
      text: "Cloudflare provides DNS resolution for the domain name and acts as a proxy in front of the site: visitors' requests go through its servers before reaching the host.",
    },
    ip: {
      title: "Intellectual property",
      text1:
        "Unless stated otherwise, the texts, images, graphics, logos, code and other elements of the website belong to Patrick Bartosik or are used with their owners' permission.",
      text2:
        "The brands and logos of the clients and partners mentioned belong to their owners. Any reproduction or reuse, in whole or in part, without prior written permission is prohibited.",
    },
    report: {
      title: "Reporting content",
      text: "To report content that you consider unlawful or that infringes your rights, write to me with the address of the page concerned and the reasons for your report:",
    },
    data: {
      title: "Personal data and cookies",
      privacy: "The processing of your personal data is described in the privacy policy.",
      cookies: "Cookies and other trackers are described in the cookie policy.",
    },
  },
  privacy: {
    meta: {
      title: "Privacy policy | Patrick Bartosik",
      description:
        "Which personal data this website processes, why, for how long, with which providers, and how to exercise your rights.",
    },
    title: "Privacy policy",
    intro:
      "This page explains which personal data is processed when you use this website or contact me, why, for how long, who receives it and how to exercise your rights.",
    label: {
      purpose: "Purpose",
      basis: "Legal basis",
      data: "Data",
      required: "Whether providing it is mandatory",
      scoring: "Priority indicator",
      recipients: "Recipients",
      retention: "Retention period",
    },
    controller: {
      title: "Data controller",
      text: "The controller of your data is Patrick Bartosik, sole trader (entrepreneur individuel). For any question about your data, write to the address below.",
    },
    contact: {
      title: "Contact requests",
      purpose:
        "To answer your request: understand your need, get back to you and, if you wish, prepare a proposal.",
      basis:
        "Legitimate interest in answering people who contact me (article 6(1)(f) GDPR). When you ask for a proposal: pre-contractual steps taken at your request (article 6(1)(b)).",
      data: "Guided flow: need, project stage, desired start, stated budget (and amount, if you give one), message, optional link, first name, last name, email address, company, phone, preferred contact method, language and, if you give it, how you heard about me. Direct message: name, email address and message. Your IP address is kept in the server's memory to limit the number of submissions (five per hour).",
      required:
        "For the guided flow, the need, stage, desired start, stated budget, message, first name and email address are required: without them the request cannot be sent. The other fields are optional. You can also write to me directly by email.",
      scoring:
        "A priority level (cold, warm or hot) is calculated automatically from your answers. It only appears in the email I receive and is only used to order my replies.",
      recipients:
        "Myself. Resend, which sends the notification email I receive and the confirmation email sent to you.",
      retention: "Three years from the last contact with you.",
    },
    audience: {
      title: "Audience measurement, after your consent",
      purpose:
        "To understand how the website is used (page views, journeys, contact form steps) in order to improve it.",
      basis:
        "Your consent (article 6(1)(a) GDPR), collected through the cookie banner. Without your consent, nothing is loaded. You can withdraw it at any time.",
      data: "Browsing data: pages viewed, technical information about your browser and device, identifiers set by the trackers. If you accepted, a few contact form events are also counted: step displayed, request sent, answer to the source question, click on the booking button. They contain neither your message nor your email address.",
      recipients: "Google Ireland Limited (Google Analytics and Google Tag Manager).",
    },
    performance: {
      title: "Performance measurement, without cookies",
      purpose: "To measure the speed and stability of the website in order to spot slowdowns and fix them.",
      basis: "Legitimate interest in keeping the website fast and working (article 6(1)(f) GDPR).",
      data: "Technical browsing and performance data (page viewed, loading time, device type). No cookie is set.",
      recipients: "Vercel (Vercel Analytics and Speed Insights).",
    },
    booking: {
      title: "Appointment booking, if enabled",
      purpose: "To let you book a time slot to talk with me.",
      basis: "Pre-contractual steps taken at your request (article 6(1)(b) GDPR).",
      data: "The information you enter on the booking page (for example your name, your email address and the slot you choose). This page belongs to Cal.com and follows its own privacy policy.",
      recipients: "Cal.com, Inc., and myself.",
    },
    logs: {
      title: "Technical logs of the host and the network",
      purpose: "To keep the website running, secure and available.",
      basis: "Legitimate interest in keeping the website secure and working properly (article 6(1)(f) GDPR).",
      data: "IP address, date and time of the request, requested address, technical information about the browser.",
      recipients: "Vercel (host) and Cloudflare (DNS and proxy).",
    },
    processors: {
      title: "Providers and transfers outside the European Union",
      text: "These providers process data on my behalf. Several are based in the United States: when data is transferred there, the transfer relies on the mechanism listed for each of them.",
    },
    rights: {
      title: "Your rights",
      text: "You can ask at any time for:",
      access: "access to the data concerning you;",
      rectification: "its rectification;",
      erasure: "its erasure;",
      restriction: "restriction of its processing;",
      objection: "to object to processing based on legitimate interest;",
      portability: "portability of the data you gave me, where the law provides for it;",
      withdrawal:
        "to withdraw your consent, without affecting what was done before. For cookies, the \"Manage cookies\" button in the footer is enough.",
      how: "To exercise your rights, email me. I reply within one month at most. If there is reasonable doubt about your identity, I may ask you for proof of it.",
    },
    complaint: {
      title: "Complaint",
      text: "If, after contacting me, you believe your rights are not being respected, you can lodge a complaint with the French data protection authority, the Commission nationale de l'informatique et des libertés (CNIL):",
    },
  },
  cookies: {
    meta: {
      title: "Cookie policy | Patrick Bartosik",
      description:
        "Which trackers this website uses, under which conditions, and how to accept, refuse or change your choice.",
    },
    title: "Cookie policy",
    intro:
      "This page explains which trackers this website may use, under which conditions and how to change your choice. A tracker, or cookie, is information stored in or read from your browser.",
    before: {
      title: "Before you choose",
      text: "As long as you have not answered the banner, no audience measurement tracker is set or read, and Google's tools are not loaded.",
    },
    necessary: {
      title: "What is strictly necessary",
      text1:
        "Your choice itself is stored in your browser's local storage (accept or refuse, with the date), so that you are not asked on every page. It stays on your device, is used for nothing else and is sent to no third party.",
      text2: "Vercel's performance measurement (Vercel Analytics and Speed Insights) works without cookies.",
    },
    after: {
      title: "After you accept",
      text1:
        "If you accept, the website loads Google Tag Manager and Google Analytics, provided by Google Ireland Limited. They measure audience: pages viewed, journeys, contact form steps.",
      text2:
        "They may set trackers in your browser and send information to Google, including to the United States. The safeguards for this transfer are described in the privacy policy.",
    },
    choice: {
      title: "Accept or decline",
      text1:
        "\"Accept\" and \"Decline\" are presented with the same ease. Refusing does not restrict access to any part of the website.",
      text2:
        "Your choice, whether acceptance or refusal, is kept for six months. After that, the banner appears again.",
    },
    change: {
      title: "Change your choice",
      text1:
        "You can change your mind at any time: the \"Manage cookies\" button at the bottom of every page reopens the banner.",
      text2:
        "Withdrawing your consent stops Google's tools from loading. Trackers already in your browser may stay there until they expire: you can delete them in your browser settings.",
    },
  },
  terms: {
    meta: {
      title: "Terms of use | Patrick Bartosik",
      description: "Terms of use of the showcase website of Patrick Bartosik, freelance full stack developer.",
    },
    title: "Terms of use",
    intro:
      "These terms govern the use of this website. It is a showcase website: it offers no user account and no online sales.",
    object: {
      title: "Purpose of the website",
      text: "This website presents the business of Patrick Bartosik, freelance full stack developer: his services, his projects and a way to contact him.",
    },
    access: {
      title: "Access to the website",
      text: "The website is free to access for anyone with an Internet connection. Access costs (connection, equipment) are yours. Access may be suspended or interrupted at any time, in particular for maintenance, with no guarantee of continuous availability.",
    },
    ip: {
      title: "Intellectual property",
      text: "The contents of the website (texts, images, code, graphics, logos) are protected. Unless stated otherwise, they belong to Patrick Bartosik or are used with their owners' permission. Any reproduction or reuse without prior written permission is prohibited.",
    },
    accuracy: {
      title: "Accuracy of information",
      text: "I do my best to publish accurate and up-to-date information, but the website may contain errors or omissions. The information presented (services, projects, timelines) is indicative and is not a firm offer: only a written agreement between us binds me.",
    },
    liability: {
      title: "Liability",
      text: "To the extent permitted by law, Patrick Bartosik is not liable for damage resulting from the use of the website or from being unable to access it. This does not limit the rights the law gives you.",
    },
    links: {
      title: "External links",
      text: "The website links to third-party sites (social networks, completed projects, booking page). I do not control their content and am not responsible for their practices: their own terms apply.",
    },
    law: {
      title: "Governing law",
      text: "These terms are governed by French law. In case of disagreement, write to me first: we will look for an amicable solution.",
    },
  },
} as const;

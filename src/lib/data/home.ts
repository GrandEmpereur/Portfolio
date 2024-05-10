/* ------------------------------ Hero Section ------------------------------ */


export const states = [
    { number: "20+", description: 'Projects Completed' },
    { number: "5+", description: 'Major Projects Delivered' },
    { number: "3+", description: 'Years of In-depth Experience' },
    { number: "20+", description: 'Technologies Mastered' },
];

export const stacks = [
    { src: '/stack/react.png', alt: 'React', name: 'React' },
    { src: '/stack/nextjs.png', alt: 'Next.js', name: 'Next.js' },
    { src: '/stack/typescript.png', alt: 'TypeScript', name: 'TypeScript' },
    { src: '/stack/sass.png', alt: 'Sass', name: 'Sass' },
    { src: '/stack/adonisjs.png', alt: 'AdonisJS', name: 'AdonisJS' },
    { src: '/stack/vercel.png', alt: 'Vercel', name: 'Vercel' },
    { src: '/stack/mongodb.png', alt: 'MongoDB', name: 'MongoDB' },
    { src: '/stack/supabase.png', alt: 'Supabase', name: 'Supabase' },
];

/* -------------------------------- Last Works Sections -------------------------------- */



export const LastWorksItems = () => [
    { id: 1, title: 'E-commerce Platform', image: '/img/lastWorks/project1.png' },
    { id: 2, title: 'Creative Portfolio Site', image: '/img/lastWorks/project2.png' },
    { id: 3, title: 'Dynamic Blogging Platform', image: '/img/lastWorks/project3.png' },
    { id: 4, title: 'Advanced Web Application', image: '/img/lastWorks/project4.png' },
    { id: 5, title: 'Engaging Landing Page', image: '/img/lastWorks/project5.png' },
];

/* ---------------------------- Services Sections --------------------------- */

export const services = [
    {
        icon: '/shape/img5.png',
        iconWidth: 83,
        iconHeight: 83,
        iconAlt: 'Custom Web Development Icon',
        title: 'Custom Web Development',
        description: 'Create tailored solutions that meet your specific business needs. From single-page applications to complex web platforms, leverage the full potential of modern web technologies to enhance your online presence.',
        service: [
            'E-commerce Platforms',
            'Content Management Systems',
            'Web Application Development',
            'Progressive Web Apps'
        ],
        buttonLabel: 'View More',
        buttonLink: '#'
    },
    {
        icon: '/shape/img3.png',
        iconWidth: 78,
        iconHeight: 80,
        iconAlt: 'Creative Web Design Icon',
        title: 'Creative Web Design',
        description: 'Design that attracts, retains, and converts. From concept to creation, ensure your website stands out with exceptional design aesthetics that deliver a seamless and engaging user experience.',
        service: [
            'UI/UX Design',
            'Responsive Web Design',
            'Graphic Design',
            'Branding'
        ],
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
    {
        icon: '/shape/img4.png',
        iconWidth: 74,
        iconHeight: 75,
        iconAlt: 'SEO & Digital Marketing Icon',
        title: 'SEO & Digital Marketing',
        description: 'Boost your visibility and drive more traffic with strategic SEO services and digital marketing campaigns. Optimize your site for the best search engine rankings and maximize ROI with targeted marketing strategies.',
        service: [
            'Search Engine Optimization',
            'Social Media Marketing',
            'Content Strategy',
            'Pay Per Click Advertising'
        ],
        buttonLabel: 'Learn More',
        buttonLink: '#'
    },
]
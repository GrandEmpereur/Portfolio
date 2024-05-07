import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Page({ params }: { params: { slug: string } }) {
    return (
        <MaxWidthWrapper className='mt-8'>
            <section id='Portfolio' className='portfolio flex flex-col w-full gap-y-12'>
                <div className="portfolio__title">
                    <h3 className='portfolio__title-sub font-mono'>{params.slug}</h3>
                    <h4 className='portfolio__title-main'>This section regroups all my projects done and my side projects.</h4>
                </div>
            </section>
        </MaxWidthWrapper>
    )
}
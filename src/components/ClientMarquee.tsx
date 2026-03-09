"use client";

interface ClientMarqueeProps {
    label: string;
    clients: string[];
}

export const ClientMarquee = ({ label, clients }: ClientMarqueeProps) => {
    const marqueeContent = clients.map((client, i) => (
        <span key={i} className="flex items-center shrink-0">
            <span className="text-sm text-white/40 uppercase tracking-[0.2em] whitespace-nowrap px-6 md:px-8">
                {client}
            </span>
            <span className="text-white/20 text-sm">&middot;</span>
        </span>
    ));

    return (
        <section
            className="relative w-full bg-white/[0.02] border-y border-white/5 py-6 md:py-8 overflow-hidden"
            aria-label={label}
        >
            {/* SEO/Accessibility: Hidden list for screen readers and crawlers */}
            <ul className="sr-only">
                {clients.map((client) => (
                    <li key={client}>{client}</li>
                ))}
            </ul>

            {/* Visual marquee */}
            <div className="group flex" aria-hidden="true">
                <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
                    {marqueeContent}
                </div>
                <div className="flex shrink-0 animate-marquee group-hover:[animation-play-state:paused]">
                    {clients.map((client, i) => (
                        <span key={`dup-${i}`} className="flex items-center shrink-0">
                            <span className="text-sm text-white/40 uppercase tracking-[0.2em] whitespace-nowrap px-6 md:px-8">
                                {client}
                            </span>
                            <span className="text-white/20 text-sm">&middot;</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

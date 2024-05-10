import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
                <Image
                    src="/img/404/404.png"
                    alt="404 Not Found"
                    width={0}
                    height={0}
                    sizes='100vw 100vh'
                    style={{ objectFit: 'cover', width: '100%', height: '100%'}}
                    className="w-full h-full"
                    priority
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
            </div>

            <div className="z-10 text-center p-4">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-6">The current page you are searching is not found</p>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button size={'lg'} className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
                            Go back to Home
                        </Button>
                    </Link>
                    <Link href="/portfolio">
                        <Button size={'lg'} className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
                            See My Projects
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;

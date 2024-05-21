import Head from 'next/head'
import React from 'react'

export default function HeadComponent() {
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="canonical" href="https://patrick.bartosik.fr" />
                
            </Head>
        </div>
    )
}

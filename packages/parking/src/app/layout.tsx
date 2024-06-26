
import { Providers } from '@/providers';
import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';


export const metadata: Metadata = {
    title: 'Decazen Parking',
    description: 'Parking service offered by Decazen',
}


const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    display: 'swap',
    weight: '400'
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={clsx(roboto.className)}>
                <NextTopLoader color='#FCD054' />
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

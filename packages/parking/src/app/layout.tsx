
import { fontSans } from '@/config/fonts';
import { Providers } from '@/providers';
import "@/styles/globals.css";
import clsx from "clsx";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Decazen Parking',
    description: 'Parking service offered by Decazen',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={clsx("font-sans antialiased", fontSans.className)}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

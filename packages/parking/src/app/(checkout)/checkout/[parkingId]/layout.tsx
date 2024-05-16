
import { MainLayout } from '@/components/layout/main-layout';
import "@/styles/globals.css";
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
  return <MainLayout hideLogin darkOnly={false}>{children}</MainLayout>
}

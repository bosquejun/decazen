"use client"

import { Content } from '@/components/login/content';
import { useSearchParams } from 'next/navigation';

export default function LoginRoute() {
    const params = useSearchParams();


    return <Content email={params.get("email") ?? undefined} callbackUrl={params.get("callbackUrl") ?? undefined} />;
}

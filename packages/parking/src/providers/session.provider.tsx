import { AUTH_BASE_PATH } from '@/auth';
import { SessionProvider } from 'next-auth/react';


export default function AuthSessionProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider basePath={AUTH_BASE_PATH} >
        {children}
    </SessionProvider>
}
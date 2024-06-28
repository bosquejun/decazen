import { UserData } from '@/types';
import 'next-auth';
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: UserData | null;
    access_token?: string;
  }

  interface JWT {
    claims: Record<string, any>;
    provider: string;
    user?: any;
  }

  interface User {
    store_id?: string;
    access_token?: string;
    [key as string]: any;
  }
}

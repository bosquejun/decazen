import { getProfileAction } from '@/app/actions/user/getProfileAction';
import { UserData } from '@/types';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export default function useUserContext() {
  const session = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isUserDataFetched, setIsUserDataFetched] = useState(false);

  const getUser = useCallback(async () => {
    if (session.status !== 'authenticated') return null;
    const response = await getProfileAction(session.data?.access_token);
    return response as UserData;
  }, [session?.data]);

  useEffect(() => {
    if (session.status === 'authenticated' && !isUserDataFetched) {
      getUser().then((data) => {
        setUserData(data);
        setIsUserDataFetched(true);
      });
    }
  }, [session, isUserDataFetched]);

  return {
    session,
    isAuthenticated:
      session.status === 'authenticated' &&
      Boolean(session?.data) &&
      isUserDataFetched,
    isLoading: session.status === 'loading' && !isUserDataFetched,
    hasStore: userData?.store_id,
    userData,
    requiresOnboarding: userData?.status === 'registered',
  };
}

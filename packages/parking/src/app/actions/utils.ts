import { auth } from '@/auth';

export const getAccessToken = async () => {
  const session = await auth();
  if (!session?.user) {
    throw new Error('unauthorized');
  }

  return session?.access_token;
};

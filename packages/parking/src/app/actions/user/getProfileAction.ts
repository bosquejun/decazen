import axiosClient from '@/api/axiosClient';
import { UserData } from '@/types';
import { getAccessToken } from '../utils';

export const getProfileAction = async (
  access_token?: string
): Promise<UserData> => {
  const token = access_token || (await getAccessToken());

  const response = await axiosClient.get('/admin/auth', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = response.data['user'];

  userData['name'] = [userData?.first_name, userData?.last_name]
    .filter(Boolean)
    .join(' ');

  return userData;
};

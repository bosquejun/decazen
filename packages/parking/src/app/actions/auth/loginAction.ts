import axiosClient from '@/api/axiosClient';

export const loginAction = async (email: string, password: string) => {
  const response = await axiosClient.post('/admin/auth/token', {
    email,
    password,
  });

  return response.data;
};

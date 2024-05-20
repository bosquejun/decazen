import axiosClient from './axiosClient';

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosClient.post('/admin/auth', {
    email,
    password,
  });

  return response.data;
};

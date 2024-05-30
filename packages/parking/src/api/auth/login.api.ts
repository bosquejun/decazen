import axiosClient from '../axiosClient';

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosClient.post('/admin/auth/token', {
    email,
    password,
  });

  return response.data;
};

export const getProfile = async (access_token: string) => {
  const response = await axiosClient.get('/admin/auth', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.data;
};

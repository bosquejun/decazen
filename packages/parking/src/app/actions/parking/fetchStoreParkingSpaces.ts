'use server';

import axiosClient from '@/api/axiosClient';
import { AxiosError } from 'axios';
import { cache } from 'react';
import { getAccessToken } from '../utils';

export const fetchStoreParkingSpaces = cache(async () => {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('UNAUTHORIZED');
    }

    const response = await axiosClient.get(`/parking/spaces`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    const { message, response } = error as AxiosError<{
      type: string;
      message: string;
    }>;
    throw new Error(response?.data?.['message'] || message);
  }
});

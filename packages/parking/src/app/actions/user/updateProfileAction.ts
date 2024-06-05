'use server';

import axiosClient from '@/api/axiosClient';
import { auth } from '@/auth';
import { UserProfileSchemaType } from '@/forms/schema/user.schema';
import { AxiosError } from 'axios';

export async function updateProfileAction(inputs: UserProfileSchemaType) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('unauthorized');
    }

    const { birthdate, phone, gender, ...partial } = inputs;

    const token = session?.access_token;

    const response = await axiosClient.post(
      `/admin/users/${session?.user?.id}`,
      {
        ...partial,
        metadata: {
          birthdate: birthdate.toISOString(),
          phone: `+63${phone}`,
          gender,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    const { message, response } = error as AxiosError<{
      type: string;
      message: string;
    }>;
    throw new Error(response?.data?.['message'] || message);
  }
}

export async function processUserOnboarding(onBoardingStep: number) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('unauthorized');
    }

    const token = session?.access_token;

    const response = await axiosClient.post(
      `/admin/users/${session?.user?.id}`,
      {
        metadata: {
          onBoardingStep,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    const { message, response } = error as AxiosError<{
      type: string;
      message: string;
    }>;
    throw new Error(response?.data?.['message'] || message);
  }
}

'use server';

import axiosClient from '@/api/axiosClient';
import { CreateUserSchemaType } from '@/forms/schema/auth.schema';
import { AxiosError } from 'axios';

export async function createAccountAction(
  inputs: Omit<CreateUserSchemaType, 'confirm_password'>
) {
  try {
    const response = await axiosClient.post('/vendor/users', inputs);

    return response.data;
  } catch (error) {
    const { message, response } = error as AxiosError<{
      type: string;
      message: string;
    }>;
    throw new Error(response?.data?.['message'] || message);
  }
}

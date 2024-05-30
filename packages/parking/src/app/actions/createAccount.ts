'use server';

import { createAccountRequest } from '@/api/auth/create-account.api';
import { CreateAccountInputs } from '@/types';
import { AxiosError } from 'axios';

export async function createAccount(inputs: CreateAccountInputs) {
  try {
    await createAccountRequest(inputs);
  } catch (error) {
    const { message, response } = error as AxiosError<{
      type: string;
      message: string;
    }>;
    throw new Error(response?.data?.['message'] || message);
  }
}

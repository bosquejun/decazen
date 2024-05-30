'use server';

import { loginRequest } from '@/api/login.api';
import { AxiosError } from 'axios';

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const response = await loginRequest(email, password);

    console.log({ response });
  } catch (error) {
    const { code, message, status, response } = error as AxiosError;
    if (error) {
      switch (response?.status) {
        case 401:
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

import { CreateAccountInputs } from '@/types';
import axiosClient from '../axiosClient';

export const createAccountRequest = async (inputs: CreateAccountInputs) => {
  const response = await axiosClient.post('/vendor/users', inputs);

  return response.data;
};

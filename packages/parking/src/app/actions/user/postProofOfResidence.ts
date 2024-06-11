'use server';

import { auth } from '@/auth';
import { ProofOfResidenceSchemaType } from '@/forms/schema/user.schema';
import { AxiosError } from 'axios';

export async function postProofOfResidence(inputs: ProofOfResidenceSchemaType) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('unauthorized');
    }

    const { proofOfResidence, ...partial } = inputs;

    console.log(proofOfResidence);

    const token = session?.access_token;

    return true;
  } catch (error) {
    const { message, response } = error as AxiosError<{
      type: string;
      message: string;
    }>;
    throw new Error(response?.data?.['message'] || message);
  }
}

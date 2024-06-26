'use server';

import axiosClient from '@/api/axiosClient';
import { auth } from '@/auth';
import { ProofOfResidenceSchemaType } from '@/forms/schema/user.schema';
import { AxiosError } from 'axios';
import { protectedUpload } from '../uploads/protectedUpload';
import { hasCompletedOnboardingStep } from '../utils';
import { getProfileAction } from './getProfileAction';

export async function postProofOfResidence(
  dataInput: Partial<Omit<ProofOfResidenceSchemaType, 'proofOfResidence'>>,
  formData?: FormData
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error('unauthorized');
    }

    const token = session?.access_token;

    if (!token) {
      throw new Error('UNAUTHORIZED');
    }

    const profile = await getProfileAction(token);

    let url;

    if (formData) {
      const [uploaded] = await protectedUpload(formData, token);

      url = uploaded.url;
    }

    const isStepCompleted = hasCompletedOnboardingStep(
      profile,
      'proofOfResidenceCompleted'
    );

    const response = await axiosClient.post(
      `/admin/users/${session?.user?.id}`,
      {
        metadata: {
          ...profile.metadata,
          ...dataInput,
          ...(url && {
            proofOfResidenceUrl: url,
          }),
          ...(!isStepCompleted && {
            onBoardingStep: 'proofOfResidenceCompleted',
          }),
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

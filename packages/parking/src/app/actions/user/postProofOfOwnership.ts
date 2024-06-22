'use server';

import axiosClient from '@/api/axiosClient';
import { auth } from '@/auth';
import { AxiosError } from 'axios';
import { protectedUpload } from '../uploads/protectedUpload';
import { hasCompletedOnboardingStep } from '../utils';
import { getProfileAction } from './getProfileAction';

export async function postProofOfOwnershipAction(formData: FormData) {
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

    const validIdName = `${session.user?.id}_validId.${(
      formData.get('validId') as File
    ).name
      .split('.')
      .pop()}`;
    const pooName = `${session.user?.id}_proofOfParkingOwnership.${(
      formData.get('proofOfParkingOwnership') as File
    ).name
      .split('.')
      .pop()}`;

    const form = new FormData();

    form.append('files', formData.get('validId') as File, validIdName);
    form.append(
      'files',
      formData.get('proofOfParkingOwnership') as File,
      pooName
    );

    const [uploadedValidId, uploadedProofOfOwnership] = await protectedUpload(
      form,
      token
    );

    const response = await axiosClient.post(
      `/admin/users/${session?.user?.id}`,
      {
        metadata: {
          ...profile.metadata,
          validIdUrl: uploadedValidId.url,
          proofOfParkingOwnershipUrl: uploadedProofOfOwnership.url,
          ...(!hasCompletedOnboardingStep(
            profile,
            'proofOfOwnershipCompleted'
          ) && {
            onBoardingStep: 'proofOfOwnershipCompleted',
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

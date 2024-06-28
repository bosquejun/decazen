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

    const newForm = new FormData();

    // loop to formdata;
    // Assuming formData is already populated
    for (const [key, value] of (formData as any).entries()) {
      if (value?.name) {
        // Extract the file extension
        const extension = value.name.split('.').pop();

        // Construct a new name based on the key and user ID
        const newName = `${session.user?.id}_${key}.${extension}`;
        // Here you can append the file with the new name to formData or handle it as needed
        // For example, to append it back to formData with a new key:
        newForm.append('files', value, newName);
      } else {
        // Handle other form data values
        console.log(`Handling form data entry: ${key} = ${value}`);
      }
    }

    const uploads = await protectedUpload(newForm, token);

    const metadata = uploads.reduce((acc: any, { key, url }) => {
      acc[`${key.split('.').shift()?.split('_').pop()}Url`] = url;
      return acc;
    }, {});

    const response = await axiosClient.post(
      `/admin/users/${session?.user?.id}`,
      {
        metadata: {
          ...profile.metadata,
          ...metadata,
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

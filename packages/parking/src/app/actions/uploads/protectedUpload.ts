import axiosClient from '@/api/axiosClient';

export async function protectedUpload(
  formData: FormData,
  token: string
): Promise<
  {
    url: string;
    key: string;
  }[]
> {
  const response = await axiosClient.post(
    '/admin/uploads/protected',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data['uploads'];
}

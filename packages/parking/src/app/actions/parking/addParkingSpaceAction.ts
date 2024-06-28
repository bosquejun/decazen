'use server';

import axiosClient from '@/api/axiosClient';
import {
  GeneralParkingSpaceSchema,
  ParkingRentalInformationSchema,
} from '@/forms/schema/add-parking-space.schema';
import { AxiosError } from 'axios';
import { getAccessToken } from '../utils';

type AddParkingSpaceRequest = GeneralParkingSpaceSchema &
  ParkingRentalInformationSchema;

export default async function addParkingSpaceAction(
  requestInfo: AddParkingSpaceRequest,
  media: FormData
) {
  try {
    const token = await getAccessToken();
    if (!token) {
      throw new Error('UNAUTHORIZED');
    }

    const response = await axiosClient.post(
      `/parking/spaces`,
      {
        parkingType: requestInfo.parkingType,
        buildingLocation: requestInfo.buildingLocation,
        parkingSlotNumber: Number(requestInfo.numMotorParkingSlot),
        areaType: requestInfo.areaType,
        rateType: requestInfo.isFlatRate ? 'flat' : 'hourly',
        dailyRate: Math.pow(10, 2) * requestInfo.dailyRate,
        // hourlyRate: requestInfo?.hourlyRate
        //   ? Math.pow(10, 2) * requestInfo?.hourlyRate
        //   : 0,
        // coverImage: string;
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

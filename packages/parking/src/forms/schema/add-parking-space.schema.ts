import * as yup from 'yup';
import { amountSchema, buildingNameSchema, fileSchema } from './common.schema';

export const PARKING_TYPE = ['car', 'motorcycle', 'all'] as const;

export type ParkingType = (typeof PARKING_TYPE)[number];

export const generalParkingSpaceSchema = yup.object().shape({
  parkingType: yup
    .string()
    .oneOf(PARKING_TYPE)
    .required('Parking type is required.'),
  buildingLocation: buildingNameSchema,
  parkingSlotNumber: yup
    .number()
    .typeError(
      'Please enter a parking slot number. The field cannot be left blank.'
    )
    .integer('Parking slot number must be an integer')
    .positive('Must be a positive number.')
    .min(1)
    .required('Parking slot number is required'),
  numMotorParkingSlot: yup
    .number()
    .typeError(
      'Please select number of motor parking slots. The field cannot be left blank.'
    )
    .oneOf([...new Array(6)].fill(0).map((_, index) => index + 1))
    .when('parkingType', {
      is: (val: string) => val === 'motorcycle',
      then(schema) {
        return schema.required('Number of motor parking slot is required.');
      },
      otherwise: (schema) => schema.notRequired(),
    }),
  areaType: yup
    .string()
    .oneOf(['covered', 'uncovered'])
    .required('Area type is required.'),
});

export const rentalInformationSchema = yup.object().shape({
  isFlatRate: yup.boolean().notRequired().default(true),
  hourlyRate: amountSchema('Hourly rate').when('isFlatRate', {
    is: false,
    then(schema) {
      return schema.required('Hourly rate is required.');
    },
  }),
  dailyRate: amountSchema('Daily rate').required('Daily rate is required.'),
});

export const parkingMediaSchema = yup.object().shape({
  coverImage: fileSchema('Cover image'),
});

export const addParkingSpaceSchema = yup.object().shape({
  generalInformation: generalParkingSpaceSchema,
  rentalInformation: rentalInformationSchema,
  media: parkingMediaSchema,
});

export type AddParkingSpaceSchema = yup.InferType<typeof addParkingSpaceSchema>;

export type GeneralParkingSpaceSchema = yup.InferType<
  typeof generalParkingSpaceSchema
>;

export type ParkingRentalInformationSchema = yup.InferType<
  typeof rentalInformationSchema
>;

export type ParkingMediaSchema = yup.InferType<typeof parkingMediaSchema>;

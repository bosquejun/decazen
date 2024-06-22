import { AVAILABLE_BUILDINGS } from '@/components/common/building-selection';
import * as yup from 'yup';
import { createUserSchema } from './auth.schema';

yup.addMethod(yup.mixed, 'fileRequired', function (message) {
  return this.test('file-required', message, (value: any) => {
    return value && value?.['size'] > 0;
  });
});

export const MINIMUM_AGE = 18;

const currentDate = new Date();
const thirteenYearsAgo = new Date(
  currentDate.getFullYear() - MINIMUM_AGE,
  currentDate.getMonth(),
  currentDate.getDate() + 1
);

export const userProfileSchema = createUserSchema
  .omit(['confirm_password', 'password', 'email'])
  .shape({
    phone: yup
      .string()
      .phone('PH', 'Mobile number must be a valid PH number')
      .max(10, 'Mobile number must be a valid PH number')
      .min(10, 'Mobile number must be a valid PH number')
      .required('Mobile number is required'),
    birthdate: yup
      .date()
      .max(thirteenYearsAgo, `You must be at least ${MINIMUM_AGE} years old`)
      .required('Birthdate is required'),
    gender: yup.string().oneOf(['Male', 'Female'], 'Invalid gender').optional(),
    isOnboarding: yup.boolean().optional(),
  });

export type UserProfileSchemaType = yup.InferType<typeof userProfileSchema>;

export const userOnboardingSchema = yup.object().shape({
  profile: userProfileSchema,
});

export type UserOnboardingSchemaType = yup.InferType<
  typeof userOnboardingSchema
>;

export const proofOfResidenceSchema = yup.object().shape({
  buildingName: yup
    .string()
    .oneOf(AVAILABLE_BUILDINGS.map((b) => b.name))
    .required('Building name is required'),
  unitNumber: yup
    .number()
    .typeError('Please enter a unitNumber. The field cannot be left blank.')
    .integer('Unit number must be an integer')
    .positive('Must be a positive number.')
    .min(100)
    .required('Unit number is required'),
  proofOfResidence: yup
    .mixed()
    .test('Size', 'Proof of residence must is required', (value: any) => {
      if (typeof value === 'string') return true;
      return value && value?.size > 0;
    }),
});

export type ProofOfResidenceSchemaType = yup.InferType<
  typeof proofOfResidenceSchema
>;

export const proofOfOwnershipSchema = yup.object().shape({
  validId: yup.mixed().required('Valid ID is required'),
  proofOfParkingOwnership: yup
    .mixed()
    .required('Proof of parking ownership is required'),
});

export type ProofOfOwnershipSchemaType = yup.InferType<
  typeof proofOfOwnershipSchema
>;

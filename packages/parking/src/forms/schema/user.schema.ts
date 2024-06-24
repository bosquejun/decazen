import * as yup from 'yup';
import { createUserSchema } from './auth.schema';
import { buildingNameSchema, fileSchema } from './common.schema';

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
  buildingName: buildingNameSchema,
  unitNumber: yup
    .number()
    .typeError('Please enter a unitNumber. The field cannot be left blank.')
    .integer('Unit number must be an integer')
    .positive('Must be a positive number.')
    .min(100)
    .required('Unit number is required'),
  proofOfResidence: fileSchema('Proof of residence'),
});

export type ProofOfResidenceSchemaType = yup.InferType<
  typeof proofOfResidenceSchema
>;

export const proofOfOwnershipSchema = yup.object().shape({
  validId: fileSchema('Valid ID'),
  proofOfParkingOwnership: fileSchema('Proof of parking ownership'),
});

export type ProofOfOwnershipSchemaType = yup.InferType<
  typeof proofOfOwnershipSchema
>;

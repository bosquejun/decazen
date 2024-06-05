import * as yup from 'yup';
import { createUserSchema } from './auth.schema';

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
  });

export type UserProfileSchemaType = yup.InferType<typeof userProfileSchema>;

export const userOnboardingSchema = yup.object().shape({
  profile: userProfileSchema,
});

export type UserOnboardingSchemaType = yup.InferType<
  typeof userOnboardingSchema
>;

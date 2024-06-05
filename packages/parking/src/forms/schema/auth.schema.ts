import * as yup from 'yup';
import YupPassword from 'yup-password';
import 'yup-phone-lite';

YupPassword(yup); // extend yup

export const createUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Value must be a valid email address')
    .required('Email address is required'),
  first_name: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(30, 'First name must not exceed 30 characters'),
  last_name: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(30, 'Last name must not exceed 30 characters'),
  password: yup
    .string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required(),
});

export type CreateUserSchemaType = yup.InferType<typeof createUserSchema>;

export const loginUserSchema = createUserSchema.pick(['email', 'password']);

export type LoginUserSchemaType = yup.InferType<typeof loginUserSchema>;

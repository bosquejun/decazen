import { AVAILABLE_BUILDINGS } from '@/components/common/building-selection';
import * as yup from 'yup';

export const buildingNameSchema = yup
  .string()
  .oneOf(
    AVAILABLE_BUILDINGS.map((b) => b.name),
    `Building name must be one of the following values: ${AVAILABLE_BUILDINGS.map(
      (b) => b.label
    ).join(',')}`
  )
  .required('Building name is required');

export const amountSchema = (fieldName: string) =>
  yup
    .number()
    .positive()
    .typeError(`${fieldName} must be a valid amount.`)
    .min(1, `${fieldName} must be more than 0.`);

export const fileSchema = (fieldName: string) =>
  yup.mixed().test('Size', `${fieldName} is required`, (value: any) => {
    if (typeof value === 'string') return true;
    return value && value?.size > 0;
  });

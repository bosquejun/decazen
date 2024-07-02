import { ParkingType } from './forms/schema/add-parking-space.schema';
import { ProofOfResidenceSchemaType } from './forms/schema/user.schema';

export type UserData = {
  name: string;
  email: string;
  id: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date | null;
  role: 'admin';
  first_name: string | null;
  last_name: string | null;
  api_token: string | null;
  metadata: UserMetadata | null;
  store_id: string | null;
  status: 'registered' | 'active';
};

export const ONBOARDING_STEPS = [
  'profileCompleted',
  'proofOfResidenceCompleted',
  'proofOfOwnershipCompleted',
  'forReview',
  'completed',
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export type UserMetadata = {
  gender: 'Male' | 'Female';
  phone: string | null;
  birthdate?: string;
  onBoardingStep?: OnboardingStep;
} & Partial<Omit<ProofOfResidenceSchemaType, 'proofOfResidence'>> & {
    proofOfResidenceUrl?: string;
    proofOfParkingOwnershipUrl?: string;
    validIdUrl?: string;
  };

export type UserOnboardingInputs = {
  generalInfo: Pick<UserData, 'first_name' | 'last_name' | 'email'> &
    Pick<UserMetadata, 'gender' | 'phone'>;
};

export type ProductPrice = {
  amount: number;
  id: string;
  title: string;
};

export type ProductVariant = {
  id: string;
  metadata: Record<string, any>;
  prices: ProductPrice[];
};

export type ProductType = {
  id: string;
  title: string;
  type: {
    value: 'car' | 'motorcycle';
  };
  variants: ProductVariant[];
};

export type ParkingSpace = {
  id: string;
  parking_type: ParkingType;
  rate_type: 'flat' | 'flexible';
  area_type: 'covered' | 'open-space';
  product_id: string;
  product?: ProductType;
  store_id: string;
  store?: any;
  status: 'draft' | 'publish';
  created_at: string | Date;
  updated_at: string | Date;
};

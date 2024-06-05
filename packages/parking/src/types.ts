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

export type UserMetadata = {
  gender: 'male' | 'female';
  phone: string | null;
};

export type UserOnboardingInputs = {
  generalInfo: Pick<UserData, 'first_name' | 'last_name' | 'email'> &
    Pick<UserMetadata, 'gender' | 'phone'>;
};

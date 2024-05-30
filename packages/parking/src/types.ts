export type CreateAccountInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
  metadata: Record<string, any> | null;
  store_id: string | null;
  status: 'registered' | 'active';
};

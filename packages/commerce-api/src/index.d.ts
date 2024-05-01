import { Role } from './models/role';

export declare module '@medusajs/medusa/dist/models/user' {
  declare interface User {
    role_id: string | null;
    teamRole: Role | null;
    store_id?: string;
    store?: Store;
  }

  declare interface Store {
    roles: Role[];
    members: User[];
  }
}

import {
  // alias the core entity to not cause a naming conflict
  User as MedusaUser,
} from '@medusajs/medusa';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Role } from './role';
import { Store } from './store';

@Entity()
export class User extends MedusaUser {
  @Index()
  @Column({ nullable: true })
  role_id: string | null;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  teamRole: Role | null;

  @Index('UserStoreId')
  @Column({ nullable: true })
  store_id?: string;

  @ManyToOne(() => Store, (store) => store.members)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store?: Store;
}

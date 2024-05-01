import {
  // alias the core entity to not cause a naming conflict
  Store as MedusaStore,
} from '@medusajs/medusa';
import { Column, Entity, Index, JoinColumn, OneToMany, Unique } from 'typeorm';
import { Role } from './role';
import { User } from './user';

@Entity()
export class Store extends MedusaStore {
  @OneToMany(() => Role, (role) => role.store)
  @JoinColumn({ name: 'id', referencedColumnName: 'store_id' })
  roles: Role[];

  // TODO add relations
  @OneToMany(() => User, (user) => user?.store)
  members: User[];

  @Index()
  @Column()
  @Unique('store_handle_key', ['handle'])
  handle: string;
}

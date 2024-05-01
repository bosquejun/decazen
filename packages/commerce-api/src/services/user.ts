import { UserService as MedusaUserService, User } from '@medusajs/medusa';
import {
  CreateUserInput as MedusaCreateUserInput,
  UpdateUserInput,
} from '@medusajs/medusa/dist/types/user';
import { Lifetime } from 'awilix';
import StoreService from './store';

type CreateUserInput = {
  store_id?: string;
} & MedusaCreateUserInput;

class UserService extends MedusaUserService {
  protected readonly storeService: StoreService;
  static LIFE_TIME = Lifetime.SCOPED;
  protected readonly loggedInUser_: User | null;

  constructor(container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments);
    this.storeService = container.storeService;

    try {
      this.loggedInUser_ = container.loggedInUser;
    } catch (e) {
      // avoid errors when backend first runs
    }
  }

  async update(
    userId: string,
    update: UpdateUserInput & {
      role_id?: string;
    }
  ): Promise<User> {
    return super.update(userId, update);
  }

  async create(user: CreateUserInput, password: string): Promise<User> {
    return await this.atomicPhase_(async (manager) => {
      if (!user.store_id) {
        const storeName = `${
          (user.first_name || user.email).split(' ')[0]
        }'s store`;
        const storeId = await this.storeService.createNewStoreForNewUser(
          storeName,
          manager
        );

        user.store_id = storeId;
      }

      return await super.create(user, password);
    });
  }
}

export default UserService;

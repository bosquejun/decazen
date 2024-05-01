import {
  Currency,
  FindConfig,
  StoreService as MedusaStoreService,
  SalesChannel,
  SalesChannelService,
  buildQuery,
} from '@medusajs/medusa';
import { MedusaError } from '@medusajs/utils';
import { Store } from 'src/models/store';
import StoreRepository from 'src/repositories/store';
import { EntityManager, IsNull, Not } from 'typeorm';
import { getSlug } from '../utils/common';

class StoreService extends MedusaStoreService {
  protected salesChannelService_: SalesChannelService;

  constructor(private readonly container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments);

    try {
      this.salesChannelService_ = container.salesChannelService;
    } catch (e) {
      // avoid errors when backend first runs
    }
  }

  async retrieveByHandle(
    handle: string,
    config: FindConfig<Store> = {}
  ): Promise<Store> {
    const storeRepo = this.manager_.withRepository(
      this.storeRepository_ as typeof StoreRepository
    );

    const query = buildQuery(
      {
        id: Not(IsNull()),
        handle,
      },
      config
    );

    const store = await storeRepo.findOne(query);

    return store;
  }

  async createNewStoreForNewUser(
    storeName: string,
    manager?: EntityManager
  ): Promise<string> {
    const storeRepo = this.manager_.withRepository(
      this.storeRepository_ as typeof StoreRepository
    );

    const handle = getSlug(storeName);

    const existingRepo = await this.retrieveByHandle(handle);

    if (existingRepo) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Store name already exists.'
      );
    }

    const defaultSalesChannel = (await this.salesChannelService_.retrieveByName(
      'Default Sales Channel'
    )) as SalesChannel;

    if (!defaultSalesChannel) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        'Default sales channel not properly setup. Please contact support.'
      );
    }

    let newStore = storeRepo.create();

    newStore.name = storeName;
    newStore.handle = handle;
    newStore.default_currency_code = 'php';
    newStore.currencies = [
      {
        code: 'php',
      } as Currency,
    ];
    newStore.default_sales_channel_id = defaultSalesChannel.id;

    newStore = await manager.save(newStore);

    return newStore.id;
  }
}

export default StoreService;

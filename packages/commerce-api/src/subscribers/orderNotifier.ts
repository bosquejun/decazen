import {
  OrderService,
  type SubscriberArgs,
  type SubscriberConfig,
} from '@medusajs/medusa';

export default async function handleOrderPlaced({
  data,
  eventName,
  container,
  pluginOptions,
}: SubscriberArgs<Record<string, string>>) {
  // TODO perform functionality
  console.log('Order placed', data);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: 'order-placed-handler',
  },
};

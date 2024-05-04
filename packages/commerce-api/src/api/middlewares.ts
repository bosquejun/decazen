import type { MiddlewaresConfig } from '@medusajs/medusa';
import { permissionsMiddleware } from './middlewares/permissions';
import { requestContextMiddleware } from './middlewares/requestContext';

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: '/*',
      middlewares: [requestContextMiddleware],
    },
    {
      matcher: '/admin/*',
      middlewares: [permissionsMiddleware],
    },
  ],
};

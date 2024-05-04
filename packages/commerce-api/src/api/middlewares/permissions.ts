import {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from '@medusajs/medusa';
import { RequestContext } from './requestContext';

export const excludedEndpoints = [
  {
    path: '/admin/auth',
    methods: ['POST'],
  },
];

export const permissionsMiddleware = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const isExcluded = excludedEndpoints.some((endpoint) => {
    return (
      endpoint.path === req.baseUrl && endpoint.methods.includes(req.method)
    );
  });

  if (isExcluded) {
    next();
    return;
  }

  const context = req['context'] as RequestContext;

  if (context.auth.isAuthorized()) {
    next();
    return;
  }

  // deny access
  res.sendStatus(401);
};

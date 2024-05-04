import {
  Customer,
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from '@medusajs/medusa';
import { User } from 'src/models/user';
import UserService from 'src/services/user';

export type RequestContext = {
  auth: {
    isAuthenticated: boolean;
    userData: User | Customer | null;
    isCustomer: boolean;
    isAuthorized: () => boolean;
  };
};

const hasUserPermission = (
  req: MedusaRequest,
  userData: RequestContext['auth']['userData']
) => {
  if (!userData?.['teamRole']) return false;
  const isAllowed = userData?.['teamRole'].permissions.some((permission) => {
    const metadataKey = Object.keys(permission.metadata).find((key) => {
      const regex = new RegExp(key);
      return regex.test(req.baseUrl);
    });
    if (!metadataKey) {
      return false;
    }
    // boolean value
    return permission.metadata[metadataKey];
  });

  return isAllowed;
};

export const requestContextMiddleware = async (
  req: MedusaRequest,
  res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const context: RequestContext = {
    auth: {
      isAuthenticated: false,
      userData: null,
      isCustomer: false,
      isAuthorized() {
        return false;
      },
    },
  };

  if (req.session?.user_id) {
    const isAuthenticated = true;
    const userService = req.scope.resolve('userService') as UserService;
    const loggedInUser = await userService.retrieve(req.session?.user_id, {
      select: ['id'],
      relations: ['teamRole', 'teamRole.permissions'],
    });
    context.auth.userData = loggedInUser as User;

    const isAuthorized = () => {
      if (!isAuthenticated || !loggedInUser) return false;
      return hasUserPermission(req, context.auth.userData);
    };
    context.auth.isAuthenticated = isAuthenticated;
    context.auth.isAuthorized = isAuthorized;
  }

  req['context'] = context;

  next();
};

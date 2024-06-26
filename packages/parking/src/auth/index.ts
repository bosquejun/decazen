import { loginAction } from '@/app/actions/auth/loginAction';
import { getProfileAction } from '@/app/actions/user/getProfileAction';
import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { isTokenExpired } from './helpers';

export const AUTH_BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'juan.delacruz@decazen.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials, request): Promise<User | null> {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing credentials');
        }
        try {
          const response = await loginAction(
            credentials.email as string,
            credentials.password as string
          );

          const { access_token } = response;

          const user = await getProfileAction(access_token);

          const userResponse = {
            ...user,
            email: user['email'],
            id: user['id'],
            access_token,
          };

          return userResponse;
        } catch (error) {
          throw new Error('Invalid credentials');
        }
      },
    }),
  ],
  basePath: AUTH_BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    // error: '/login',
  },
  callbacks: {
    async jwt({ token, account, user, trigger }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token['provider'] = account.provider;
      }

      if (
        token?.access_token &&
        (await isTokenExpired(token?.access_token as string))
      ) {
        throw new Error('EXPIRED_TOKEN');
      }

      token['claims'] = {
        storeOwner: user?.['store_id'] ? true : false,
      };

      if (user) {
        const { access_token, ...partialUser } = user;
        token['user'] = partialUser;

        token['access_token'] = user.access_token;
      }

      return token;
    },
    async session({ session, token, user }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          ...(token?.user ?? {}),
        },
        access_token: token?.access_token,
      };

      // Send properties to the client, like an access_token from a provider.
      return newSession;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

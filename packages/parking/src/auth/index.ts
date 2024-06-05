import { loginAction } from '@/app/actions/auth/loginAction';
import { getProfileAction } from '@/app/actions/user/getProfileAction';
import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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

          const { user } = await getProfileAction(access_token);

          const name = [user['first_name'], user['last_name']]
            .filter(Boolean)
            .join(' ');

          const userResponse = {
            email: user['email'],
            name,
            id: user['id'],
            ...user,
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
      if (trigger === 'update') {
        const token = `${user.access_token}`;
        user = await getProfileAction(token);
        user['access_token'] = token;
      }

      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token['provider'] = account.provider;
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

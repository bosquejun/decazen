'use server';
import { jwtDecode } from 'jwt-decode';
import { signIn as serverSignIn, signOut as serverSignOut } from '.';

export async function signIn() {
  await serverSignIn();
}

export async function signOut() {
  await serverSignOut();
}

export async function isTokenExpired(token?: string): Promise<boolean> {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const { exp } = decoded;

    if (!exp) return true;

    // Get the current time
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token has expired
    if (currentTime > exp) {
      // The token has expired
      return true;
    }

    // The token has not expired
    return false;
  } catch (error) {
    return true;
  }
}

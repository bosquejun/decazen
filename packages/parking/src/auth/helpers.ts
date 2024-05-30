'use server';
import { signIn as serverSignIn, signOut as serverSignOut } from '.';

export async function signIn() {
  await serverSignIn();
}

export async function signOut() {
  await serverSignOut();
}

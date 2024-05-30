import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const reqUrl = new URL(request.url);
  const session = await auth();
  console.log('Current path: ', reqUrl.pathname);
  if (!session && reqUrl.pathname !== '/') {
    return NextResponse.redirect(
      new URL(
        `${reqUrl.origin}/login?callbackUrl=${encodeURIComponent(
          reqUrl.pathname
        )}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: [
    `/((?!api|login|checkout|rent-out-space|images|favicon|_next/static|_next/image|.*\\.png$).*)`,
  ],
};

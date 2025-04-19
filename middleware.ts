import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PROTECTED_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/constants/routes';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // const cookieStore = await cookies();
  // const session = cookieStore.get('session_token')?.value;

  // if (isProtectedRoute && !session) {
  //   return NextResponse.redirect(new URL(ROUTES.LOGIN, request.nextUrl));
  // }

  // if (isPublicRoute && session) {
  //   return NextResponse.redirect(new URL(ROUTES.HOME, request.nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  console.log('�🚀🚀 MIDDLEWARE IS RUNNING!!!');
  console.log('Path:', request.nextUrl.pathname);
  console.log('🚀🚀�');
  
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Match ALL routes
};

// src/middleware/adminMiddleware.ts
import { NextResponse } from 'next/server';

import auth from '@/auth';

import type { NextRequest } from 'next/server';
export async function withAdminAuth(request: NextRequest) {
  try {
    console.log('----------------> ADMIN MIDDLE WARE');
    const user = await auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (!user.labels?.includes('admin')) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Admin Middleware Error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

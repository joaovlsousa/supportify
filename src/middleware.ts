import { getToken } from '@/actions/get-token'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = getToken()

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/home/:path*', '/supports/:path*', '/clients/:path*', '/api/:path*'],
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const requestedPage = req.nextUrl.pathname

  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_URL })

  // Without session
  if (requestedPage.startsWith('/signin') || requestedPage.startsWith('/register')) {
    if (!session) return NextResponse.next()

    const url = req.nextUrl.clone()
    url.pathname = req.nextUrl.searchParams.get('page') ?? '/'
    url.search = ''

    return NextResponse.redirect(url)
  }

  // With session
  if (requestedPage.startsWith('/checkout') || requestedPage.startsWith('/orden')) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_URL })

    if (session) return NextResponse.next()

    const url = req.nextUrl.clone()

    url.pathname = '/signin'
    url.search = `page=${requestedPage}`

    return NextResponse.redirect(url)
  }

  // With session and admin role
  if (requestedPage.startsWith('/admin') && session?.user?.role !== 'ADMIN') {
    const url = req.nextUrl.clone()
    url.pathname = '/'

    return NextResponse.redirect(url)
  }

  if (requestedPage.startsWith('/api/admin') && session?.user?.role !== 'ADMIN') {
    return new Response(JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Without session
    '/signin',
    '/register',

    // With session
    '/checkout',
    '/orden:path*',

    // With session and admin role
    '/admin/:path*',
    '/api/admin/:path*'
  ],
}
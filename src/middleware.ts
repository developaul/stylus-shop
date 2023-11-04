import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const requestedPage = req.nextUrl.pathname

  if (requestedPage.startsWith('/signin') || requestedPage.startsWith('/register')) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_URL })

    if (!session) return NextResponse.next()

    const url = req.nextUrl.clone()
    url.pathname = req.nextUrl.searchParams.get('page') ?? '/'
    url.search = ''

    return NextResponse.redirect(url)
  }

  if (requestedPage.startsWith('/checkout') || requestedPage.startsWith('/orden')) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_URL })

    if (session) return NextResponse.next()

    const url = req.nextUrl.clone()

    url.pathname = '/signin'
    url.search = `page=${requestedPage}`

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/register', '/checkout', '/admin/:path*'],
}
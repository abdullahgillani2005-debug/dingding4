import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isAccountPage = req.nextUrl.pathname.startsWith('/account')

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url))
      }
      return null
    }

    if (isAdminPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
      if (token?.role !== 'ADMIN' && token?.role !== 'MANAGER') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    if (isAccountPage) {
      if (!isAuth) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    return null
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
        const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
        const isAccountPage = req.nextUrl.pathname.startsWith('/account')

        if (isAuthPage) {
          return true
        }

        if (isAdminPage) {
          return !!token && (token.role === 'ADMIN' || token.role === 'MANAGER')
        }

        if (isAccountPage) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/account/:path*',
    '/auth/:path*',
  ],
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow dashboard routes to pass through
  if (pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  // Allow API routes to pass through
  if (pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Allow static files and Next.js internals to pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts")
  ) {
    return NextResponse.next()
  }

  // Redirect to dashboard for all other routes
  return NextResponse.redirect(new URL("/dashboard", request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts, /images (static files)
     * 4. /favicon.ico, /sitemap.xml (SEO files)
     */
    "/((?!api|_next|fonts|images|favicon.ico|sitemap.xml).*)",
  ],
}


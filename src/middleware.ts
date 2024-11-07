import { auth as middleware } from '@/auth'

export default middleware((req) => {
  const isExcludedPath =
    req.nextUrl.pathname.startsWith('/images') ||
    req.nextUrl.pathname === '/auth/register' ||
    req.nextUrl.pathname.startsWith('/verify') ||
    req.nextUrl.pathname.startsWith('/_next/static')

  if (!req.auth && req.nextUrl.pathname !== '/auth/login' && !isExcludedPath) {
    const newUrl = new URL('/auth/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: [
    /*
     * You can match a single path or multiple paths with an array syntax
     */
    // '/about/:path*',
    // '/dashboard/:path*',
    // '/((?!api|_next/static|_next/image|images).*)',
    // '/((?!_next/static|_next/image|favicon.ico|public/images|api/auth|auth/login|auth/register).*)',
    // '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    // "/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
    // '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|ads.txt|sitemap.xml|manifest.json|android-chrome-192x192.png|apple-touch-icon.png|browserconfig.xml|mstile-150x150.png|safari-pinned-tab.svg|site.webmanifest|favicon-.*.png).*)',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    {
      source:
        '/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source:
        '/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source:
        '/((?!_next/static|_next/image|public/|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
}

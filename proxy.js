import { NextResponse } from 'next/server'
import { DEFAULT_LOCALE, LOCALES } from './src/seo.js'

const COOKIE = 'fenley-lang'
const MAX_AGE = 60 * 60 * 24 * 365
const PREFIXED = LOCALES.filter((code) => code !== DEFAULT_LOCALE)

function localeFromPath(pathname) {
  const seg = pathname.split('/')[1]
  return PREFIXED.includes(seg) ? seg : null
}

function detectLocale(header) {
  if (!header) return null
  const candidates = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const qParam = params.map((param) => param.trim()).find((param) => param.startsWith('q='))
      return { tag: tag.trim().toLowerCase(), q: qParam ? Number.parseFloat(qParam.slice(2)) : 1 }
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q))
    .sort((a, b) => b.q - a.q)
  for (const entry of candidates) {
    const base = entry.tag.split('-')[0]
    if (LOCALES.includes(base)) return base
  }
  return null
}

function remember(response, locale) {
  response.cookies.set(COOKIE, locale, { path: '/', maxAge: MAX_AGE, sameSite: 'lax' })
  return response
}

// Only stamp the preference cookie on real document navigations.
// Background requests (RSC fetches, Next.js link prefetches) must never
// overwrite an explicit language choice.
function isDocument(request) {
  return !request.headers.get('rsc')
}

export function proxy(request) {
  const { pathname } = request.nextUrl

  const pathLocale = localeFromPath(pathname)
  if (pathLocale) {
    const response = NextResponse.next()
    return isDocument(request) ? remember(response, pathLocale) : response
  }

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/en' ? '/' : pathname.slice(3)
    return NextResponse.redirect(url)
  }

  const saved = request.cookies.get(COOKIE)?.value
  const target =
    (saved && LOCALES.includes(saved) && saved) || detectLocale(request.headers.get('accept-language'))

  if (!target || target === DEFAULT_LOCALE) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${target}` : `/${target}${pathname}`
  const response = NextResponse.redirect(url)
  if (!saved && isDocument(request)) remember(response, target)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

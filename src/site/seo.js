export const SITE_URL = 'https://fenleymenelas.com'
export const SITE_NAME = 'Fenley Menelas'

export const DEFAULT_LOCALE = 'en'
export const LOCALES = ['en', 'es', 'fr']
export const OG_LOCALES = { en: 'en_US', es: 'es_ES', fr: 'fr_FR' }

export const ROUTES = [
  { path: '/', key: 'home' },
  { path: '/services', key: 'services' },
  { path: '/build', key: 'build' },
  { path: '/skills', key: 'skills' },
  { path: '/about', key: 'about' },
  { path: '/contact', key: 'contact' },
]

export function isLocale(code) {
  return LOCALES.includes(code)
}

export function localize(path, locale) {
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) return path
  if (path === '/') return `/${locale}`
  return `/${locale}${path}`
}

export function stripLocale(pathname) {
  if (typeof pathname !== 'string') return '/'
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
  }
  return pathname
}

export function localeOf(pathname) {
  if (typeof pathname !== 'string') return DEFAULT_LOCALE
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return DEFAULT_LOCALE
}

export function absoluteUrl(path) {
  return new URL(path, SITE_URL).href
}

export function canonicalFor(path, locale) {
  return absoluteUrl(localize(path, locale))
}

export function hreflangAlternates(path) {
  const languages = { 'x-default': canonicalFor(path, DEFAULT_LOCALE) }
  for (const locale of LOCALES) languages[locale] = canonicalFor(path, locale)
  return languages
}

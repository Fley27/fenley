'use client'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from './useI18n.js'
import { localize, stripLocale } from './seo.js'

function matchPath(pathname, to, end) {
  if (end) return pathname === to
  if (to === '/') return pathname.startsWith('/')
  return pathname === to || pathname.startsWith(`${to}/`)
}

export function useLocalizedPath() {
  const { lang } = useI18n()
  return (to) => localize(to, lang)
}

export function Link({ to, children, ...rest }) {
  const { lang } = useI18n()
  return (
    <NextLink href={localize(to, lang)} {...rest}>
      {children}
    </NextLink>
  )
}

export function PlainLink({ href, children, ...rest }) {
  return (
    <NextLink href={href} {...rest}>
      {children}
    </NextLink>
  )
}

export function NavLink({ to, end = false, className = '', children, ...rest }) {
  const pathname = usePathname()
  const { lang } = useI18n()
  const basePath = stripLocale(pathname)
  const active = matchPath(basePath, to, end)
  const resolved = typeof className === 'function' ? className({ isActive: active }) : className
  const cls = [resolved, active ? 'active' : null].filter(Boolean).join(' ')
  return (
    <NextLink href={localize(to, lang)} className={cls || undefined} {...rest}>
      {children}
    </NextLink>
  )
}

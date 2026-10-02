import { LOCALES, ROUTES, absoluteUrl, hreflangAlternates, localize } from '../src/seo.js'

const CHANGE_FREQUENCY = {
  '/': 'weekly',
  '/services': 'monthly',
  '/build': 'monthly',
  '/skills': 'monthly',
  '/about': 'monthly',
  '/contact': 'weekly',
}

export default function sitemap() {
  const lastModified = new Date()
  const entries = []

  for (const route of ROUTES) {
    const languages = hreflangAlternates(route.path)
    for (const locale of LOCALES) {
      entries.push({
        url: absoluteUrl(localize(route.path, locale)),
        lastModified,
        changeFrequency: CHANGE_FREQUENCY[route.path] || 'monthly',
        priority: route.path === '/' ? 1 : 0.7,
        alternates: { languages },
      })
    }
  }

  return entries
}

import { content } from './content.js'
import {
  DEFAULT_LOCALE,
  OG_LOCALES,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  canonicalFor,
  hreflangAlternates,
} from './seo.js'

export const OG_IMAGE = absoluteUrl('/og.png')
export const PORTRAIT = absoluteUrl('/portrait.jpg')

const OG_IMAGES = {
  en: OG_IMAGE,
  es: absoluteUrl('/og.es.png'),
  fr: absoluteUrl('/og.fr.png'),
}

export function ogImageFor(lang) {
  return OG_IMAGES[lang] || OG_IMAGE
}

const TWITTER_CARD = 'summary_large_image'

function ogDefaults(lang) {
  return {
    type: 'website',
    siteName: SITE_NAME,
    images: [{ url: ogImageFor(lang), width: 1200, height: 630, alt: `${SITE_NAME} — websites that earn trust` }],
  }
}

const KEYWORDS = {
  home: [
    'web designer',
    'web developer',
    'multilingual website',
    'AI-assisted web design',
    'custom website Haiti',
    'website from $1000',
  ],
  services: [
    'web design pricing',
    'custom website cost',
    'multilingual website EN ES FR',
    'website maintenance membership',
    'SEO and analytics setup',
  ],
  build: ['web development process', 'fast website build', 'website principles', 'AI-assisted development'],
  skills: ['React Next.js developer', 'WordPress Shopify developer', 'AWS hosting', 'web skills'],
  about: ['software engineer Haiti', 'freelance web developer', 'web developer North America', 'about Fenley Menelas'],
  contact: ['hire web developer', 'start a website project', 'web development contact'],
  work: ['web design portfolio', 'website case studies', 'multilingual site examples'],
}

function metaFor(lang, key) {
  const entry = content[lang] && content[lang].meta && content[lang].meta[key]
  return entry || content.en.meta[key]
}

export function pageMetadata(lang, key, path) {
  const meta = metaFor(lang, key)
  const canonical = canonicalFor(path, lang)
  const image = ogImageFor(lang)
  const twitterImage = { url: image, alt: meta.title }

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.desc,
    keywords: KEYWORDS[key] || KEYWORDS.home,
    alternates: {
      canonical,
      languages: hreflangAlternates(path),
    },
    openGraph: {
      ...ogDefaults(lang),
      url: canonical,
      locale: OG_LOCALES[lang] || OG_LOCALES[DEFAULT_LOCALE],
      title: meta.title,
      description: meta.desc,
    },
    twitter: {
      card: TWITTER_CARD,
      title: meta.title,
      description: meta.desc,
      images: [twitterImage],
    },
    robots: { index: true, follow: true },
  }
}

export function rootMetadata(lang) {
  const meta = content[lang] ? content[lang].meta.home : content.en.meta.home
  const image = ogImageFor(lang)
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title },
    description: meta.desc,
    keywords: KEYWORDS.home,
    openGraph: {
      ...ogDefaults(lang),
      url: absoluteUrl('/'),
      locale: OG_LOCALES[lang] || OG_LOCALES[DEFAULT_LOCALE],
      title: meta.title,
      description: meta.desc,
    },
    twitter: {
      card: TWITTER_CARD,
      title: meta.title,
      description: meta.desc,
      images: [{ url: image, alt: meta.title }],
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.png', sizes: '48x48', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    robots: { index: true, follow: true },
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  }
}

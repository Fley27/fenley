import '../../src/styles/base.css'
import '../../src/styles/chrome.css'
import '../../src/styles/pages.css'
import { notFound } from 'next/navigation'
import RootDocument from '../../src/RootDocument.jsx'
import { rootMetadata } from '../../src/metadata.js'
import { LOCALES, DEFAULT_LOCALE } from '../../src/seo.js'

export const dynamicParams = false

export const viewport = {
  themeColor: '#05060a',
}

export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((lang) => ({ lang }))
}

export async function generateMetadata({ params }) {
  const { lang } = await params
  return rootMetadata(lang)
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params
  if (lang === DEFAULT_LOCALE) notFound()
  return <RootDocument lang={lang}>{children}</RootDocument>
}

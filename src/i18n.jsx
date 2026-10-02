'use client'
import { useMemo } from 'react'
import content, { LANGS } from './content.js'
import { LangContext } from './lang.js'
import { isLocale } from './seo.js'

function mergeDeep(base, extra) {
  if (!extra) return base
  const out = Array.isArray(base) ? base.slice() : { ...base }
  for (const key of Object.keys(extra)) {
    const value = extra[key]
    if (value && typeof value === 'object' && !Array.isArray(value) && base[key]) {
      out[key] = mergeDeep(base[key], value)
    } else {
      out[key] = value
    }
  }
  return out
}

export function LanguageProvider({ children, lang = 'en' }) {
  const safeLang = isLocale(lang) ? lang : 'en'
  const copy = useMemo(
    () => (safeLang === 'en' ? content.en : mergeDeep(content.en, content[safeLang])),
    [safeLang]
  )
  const value = useMemo(() => ({ lang: safeLang, copy, langs: LANGS }), [safeLang, copy])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

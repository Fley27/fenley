import { useContext } from 'react'
import { LangContext } from './lang.js'

export function useI18n() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider')
  return ctx
}

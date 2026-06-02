import { useCallback, useEffect, useMemo, useState } from 'react'
import { strings } from './strings.js'
import { I18nContext } from './context.js'

const STORAGE_KEY = 'portfolio.lang'

function normalizeLang(value) {
  const v = String(value || '').toLowerCase()
  if (v.startsWith('fr')) return 'fr'
  if (v.startsWith('en')) return 'en'
  return null
}

function getInitialLang() {
  try {
    const stored = normalizeLang(localStorage.getItem(STORAGE_KEY))
    if (stored) return stored
  } catch {
    // ignore
  }
  const browser = normalizeLang(typeof navigator !== 'undefined' ? navigator.language : '')
  return browser ?? 'fr'
}

export default function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  const setLang = useCallback((next) => {
    const normalized = normalizeLang(next) ?? 'fr'
    setLangState(normalized)
    try {
      localStorage.setItem(STORAGE_KEY, normalized)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  const t = useCallback(
    (key, fallback) => {
      const parts = String(key).split('.')
      const raw = strings?.[lang] ?? strings.fr
      let node = raw
      for (const p of parts) node = node?.[p]
      return node ?? fallback ?? key
    },
    [lang],
  )

  const tf = useCallback(
    (key, ...args) => {
      const v = t(key)
      return typeof v === 'function' ? v(...args) : v
    },
    [t],
  )

  const value = useMemo(() => ({ lang, setLang, t, tf }), [lang, setLang, t, tf])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}


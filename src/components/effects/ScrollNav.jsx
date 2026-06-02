import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useI18n } from '../../i18n/context.js'
import { useLenis } from './lenisContext.js'

const SECTION_IDS = ['hero', 'skills', 'timeline', 'projects']

function pickActiveSection(ids) {
  const marker = window.innerHeight * 0.33
  const doc = document.documentElement
  const atBottom =
    window.scrollY + window.innerHeight >= doc.scrollHeight - 48

  if (atBottom) return ids[ids.length - 1] ?? 'hero'

  let current = ids[0] ?? 'hero'
  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) current = id
  }
  return current
}

export default function ScrollNav() {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const lenis = useLenis()
  const [active, setActive] = useState('hero')

  const sections = useMemo(
    () => [
      { id: 'hero', label: t('nav.hero') },
      { id: 'skills', label: t('nav.skills') },
      { id: 'timeline', label: t('nav.timeline') },
      { id: 'projects', label: t('nav.projects') },
    ],
    [t],
  )

  const syncActive = useCallback(() => {
    const next = pickActiveSection(SECTION_IDS)
    setActive((prev) => (prev === next ? prev : next))
  }, [])

  useEffect(() => {
    syncActive()

    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        syncActive()
      })
    }

    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [lenis, syncActive])

  const scrollTo = (id) => {
    setActive(id)
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -24, duration: 1.35 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

  const Dot = reduceMotion ? 'span' : motion.span

  return (
    <nav
      aria-label={t('nav.label')}
      className="fixed right-4 top-1/2 z-110 hidden -translate-y-1/2 flex-col gap-3 md:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-label={label}
            aria-current={isActive ? 'location' : undefined}
            className="group relative flex items-center justify-end gap-3"
          >
            <span
              className={[
                'pointer-events-none rounded-lg border px-2 py-1 text-[10px] font-semibold tracking-wider backdrop-blur transition',
                isActive
                  ? 'border-cyan/30 bg-bg/90 text-text opacity-100'
                  : 'border-white/10 bg-bg/80 text-muted opacity-0 group-hover:opacity-100',
              ].join(' ')}
            >
              {label}
            </span>
            <Dot
              {...(reduceMotion
                ? {}
                : { layout: true, transition: { type: 'spring', stiffness: 500, damping: 32 } })}
              className={[
                'block rounded-full border transition',
                isActive
                  ? 'h-3 w-3 border-cyan/60 bg-cyan/30 shadow-glowCyan'
                  : 'h-2 w-2 border-white/20 bg-white/10 group-hover:border-cyan/40',
              ].join(' ')}
            />
          </button>
        )
      })}
    </nav>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../../i18n/context.js'
import { useLenis } from './lenisContext.js'

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  if (reduceMotion) return null

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -24, duration: 1.35 })
    else el.scrollIntoView({ behavior: 'smooth' })
  }

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
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex items-center justify-end gap-3"
          >
            <span
              className={[
                'pointer-events-none rounded-lg border border-white/10 bg-bg/80 px-2 py-1 text-[10px] font-semibold tracking-wider text-muted opacity-0 backdrop-blur transition',
                'group-hover:opacity-100',
                isActive ? 'opacity-100 text-text' : '',
              ].join(' ')}
            >
              {label}
            </span>
            <motion.span
              layout
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

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useI18n } from '../../i18n/context.js'

export default function ProjectModalGallery({ screenshots = [], projectTitle = '' }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const [index, setIndex] = useState(0)

  const images = useMemo(
    () => (Array.isArray(screenshots) ? screenshots.filter(Boolean) : []),
    [screenshots],
  )

  const total = images.length

  useEffect(() => {
    setIndex(0)
  }, [images, projectTitle])

  const go = useCallback(
    (delta) => {
      if (total <= 1) return
      setIndex((i) => (i + delta + total) % total)
    },
    [total],
  )

  useEffect(() => {
    if (total <= 1) return
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [go, total])

  if (!total) {
    return (
      <div className="relative flex min-h-[200px] items-center justify-center bg-white/5 md:min-h-[280px]">
        <p className="px-4 text-center text-sm text-muted">
          {t('projects.modal.noScreenshots')}
        </p>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_20%,rgba(0,229,255,0.12),transparent_50%)]" />
      </div>
    )
  }

  const currentSrc = images[index]

  return (
    <div className="relative flex min-h-[220px] flex-col md:min-h-[280px]">
      <div className="relative min-h-[200px] flex-1 overflow-hidden md:min-h-[240px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={currentSrc}
            src={currentSrc}
            alt={`${t('projects.modal.screenshotAlt')} ${projectTitle} (${index + 1}/${total})`}
            className="absolute inset-0 h-full w-full object-cover opacity-90"
            loading="lazy"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_20%,rgba(0,229,255,0.18),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_circle_at_80%_70%,rgba(124,58,237,0.16),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg/95 via-bg/25 to-transparent" />

        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t('projects.modal.prevImage')}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-bg/70 text-lg text-text/90 backdrop-blur transition hover:border-cyan/40 hover:bg-bg/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t('projects.modal.nextImage')}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-white/15 bg-bg/70 text-lg text-text/90 backdrop-blur transition hover:border-cyan/40 hover:bg-bg/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
            >
              ›
            </button>
            <span className="absolute right-3 top-3 z-10 rounded-lg border border-white/10 bg-bg/75 px-2 py-1 text-[11px] font-semibold tracking-wider text-text/90 backdrop-blur">
              {index + 1} / {total}
            </span>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div className="flex gap-2 overflow-x-auto border-t border-white/10 bg-bg/40 p-3 backdrop-blur-sm">
          {images.map((src, i) => {
            const selected = i === index
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${t('projects.modal.goToImage')} ${i + 1}`}
                aria-current={selected ? 'true' : undefined}
                className={[
                  'relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60',
                  selected
                    ? 'border-cyan/50 ring-1 ring-cyan/30'
                    : 'border-white/10 opacity-70 hover:border-white/25 hover:opacity-100',
                ].join(' ')}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo } from 'react'
import { useI18n } from '../../i18n/context.js'
import { useLenis } from '../effects/lenisContext.js'

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text/90 backdrop-blur">
      {children}
    </span>
  )
}

function CloseButton({ onClick }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-text/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
      aria-label={t('projects.modal.closeAria')}
    >
      <span className="text-xl leading-none">×</span>
    </button>
  )
}

export default function ProjectModal({ project, open, onClose }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const lenis = useLenis()

  const screenshot = useMemo(() => project?.screenshots?.[0], [project])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    // Lock scroll reliably (prevents "stuck no-scroll" after close)
    document.body.style.overflow = 'hidden'
    lenis?.stop?.()
    return () => {
      document.body.style.overflow = prevOverflow
      lenis?.start?.()
    }
  }, [open, lenis])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-110 flex items-center justify-center p-4 md:p-8"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label={t('projects.modal.closeAria')}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-bg/90 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl"
            initial={
              reduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan/12 blur-3xl" />
              <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-purple/12 blur-3xl" />
            </div>

            <div className="relative grid grid-cols-1 gap-0 md:grid-cols-2">
              <div className="relative aspect-16/11 md:aspect-auto">
                <div className="absolute inset-0 overflow-hidden">
                  {screenshot ? (
                    <img
                      src={screenshot}
                      alt={`${project?.title ?? 'Project'} screenshot`}
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/5" />
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_20%_20%,rgba(0,229,255,0.18),transparent_45%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_80%_70%,rgba(124,58,237,0.16),transparent_48%)]" />
                  <div className="absolute inset-0 bg-linear-to-t from-bg/95 via-bg/30 to-transparent" />
                </div>
              </div>

              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs tracking-[0.34em] text-muted">
                      {t('projects.modal.project')}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text">
                      {project?.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project?.subtitle}
                    </p>
                  </div>
                  <CloseButton onClick={onClose} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Pill>{project?.role}</Pill>
                  {project?.stack?.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>

                <div className="mt-7">
                  <p className="text-xs tracking-[0.34em] text-muted">
                    {t('projects.modal.highlights')}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-text/90">
                    {project?.highlights?.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan/70 shadow-glowCyan" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-xl border border-cyan/35 bg-cyan/10 px-5 py-3 text-sm font-semibold text-text shadow-glowCyan backdrop-blur transition hover:border-cyan/55 hover:bg-cyan/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
                  >
                    {t('projects.modal.viewCaseStudy')}
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-text/90 backdrop-blur transition hover:border-white/20 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
                  >
                    {t('projects.modal.close')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}


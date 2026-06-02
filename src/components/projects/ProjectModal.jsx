import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../../i18n/context.js'
import { useLenis } from '../effects/lenisContext.js'
import ProjectModalGallery from './ProjectModalGallery.jsx'

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

  const overlayMotion = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.22, ease: 'easeOut' },
      }

  const panelMotion = reduceMotion
    ? {
        initial: { opacity: 1, y: 0, scale: 1 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 18, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.99 },
        transition: { type: 'spring', stiffness: 360, damping: 30, mass: 0.9 },
      }

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
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

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-110 flex items-center justify-center p-4 md:p-8"
          initial={overlayMotion.initial}
          animate={overlayMotion.animate}
          exit={overlayMotion.exit}
          transition={overlayMotion.transition}
        >
          <motion.button
            type="button"
            aria-label={t('projects.modal.closeAria')}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            initial={overlayMotion.initial}
            animate={overlayMotion.animate}
            exit={overlayMotion.exit}
            transition={overlayMotion.transition}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-10 flex max-h-[min(90svh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-bg/90 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl"
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={panelMotion.transition}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan/12 blur-3xl" />
              <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-purple/12 blur-3xl" />
            </div>

            <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-0 overflow-y-auto md:grid-cols-2">
              <div className="relative md:min-h-0">
                <ProjectModalGallery
                  screenshots={project?.screenshots}
                  projectTitle={project?.title ?? ''}
                />
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
    </AnimatePresence>,
    document.body,
  )
}

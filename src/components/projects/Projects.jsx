import { motion, useReducedMotion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { useI18n } from '../../i18n/context.js'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'

export default function Projects({ projects = [] }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const [active, setActive] = useState(null)

  const handleOpen = useCallback((p) => setActive(p), [])
  const handleClose = useCallback(() => setActive(null), [])

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24 md:px-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[20%] h-[520px] w-[520px] rounded-full bg-purple/10 blur-3xl" />
        <div className="absolute right-[-12%] top-[5%] h-[560px] w-[560px] rounded-full bg-cyan/10 blur-3xl" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <p className="text-xs tracking-[0.38em] text-muted">{t('projects.kicker')}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
          {t('projects.title')}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {t('projects.desc')}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id ?? p.title} project={p} onOpen={handleOpen} />
        ))}
      </div>

      <ProjectModal project={active} open={!!active} onClose={handleClose} />
    </section>
  )
}


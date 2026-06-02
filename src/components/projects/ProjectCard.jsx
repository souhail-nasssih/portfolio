import { motion, useReducedMotion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { useI18n } from '../../i18n/context.js'

function StackPill({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-text/85 backdrop-blur">
      {children}
    </span>
  )
}

export default function ProjectCard({ project, onOpen }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={reduceMotion ? 0 : 10}
        tiltMaxAngleY={reduceMotion ? 0 : 10}
        glareEnable={!reduceMotion}
        glareMaxOpacity={0.18}
        glareColor="#00E5FF"
        glarePosition="all"
        scale={reduceMotion ? 1 : 1.01}
        className="h-full"
      >
        <button
          type="button"
          onClick={() => onOpen?.(project)}
          className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-md transition hover:border-cyan/35 hover:shadow-glowCyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl opacity-40 transition-opacity duration-300 group-hover:opacity-80" />
            <div className="absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-purple/10 blur-3xl opacity-35 transition-opacity duration-300 group-hover:opacity-75" />
            <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_15%_0%,rgba(255,255,255,0.10),transparent_45%)] opacity-60" />
          </div>

          <div className="relative p-6">
            <p className="text-xs tracking-[0.34em] text-muted">{t('projects.featured')}</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((s) => (
                <StackPill key={s}>{s}</StackPill>
              ))}
            </div>
          </div>

          <div className="relative mt-auto w-full px-6 pb-6">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <span className="text-sm font-semibold text-text/90">
                {t('projects.openDetail')}
              </span>
              <span className="text-lg text-cyan">→</span>
            </div>
          </div>
        </button>
      </Tilt>
    </motion.div>
  )
}


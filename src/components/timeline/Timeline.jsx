import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '../../i18n/context.js'

function NeonDate({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-xs font-semibold tracking-wide text-text shadow-glowCyan backdrop-blur">
      {children}
    </span>
  )
}

function TimelineItem({ kind, item, delay = 0 }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()

  const title = kind === 'experience' ? item.company : item.institution
  const subtitle =
    kind === 'experience'
      ? `${item.role}${item.duration ? ` · ${item.duration}` : ''}`
      : item.title

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className="relative pl-10"
    >
      <div className="absolute left-2 top-1 h-3 w-3 rounded-full bg-cyan/70 shadow-glowCyan" />
      <div className="absolute left-[12px] top-5 h-[calc(100%-1.25rem)] w-px bg-white/10" />

      <div className="rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:border-cyan/30 hover:shadow-glowCyan">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <NeonDate>{item.date}</NeonDate>
          <p className="text-xs tracking-[0.34em] text-muted">
            {kind === 'experience' ? t('timeline.itemExperience') : t('timeline.itemDiploma')}
          </p>
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-text">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>

        {item.location ? (
          <p className="mt-2 text-sm text-muted/90">{item.location}</p>
        ) : null}

        {kind === 'experience' ? (
          <>
            {item.description ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            ) : null}
            {Array.isArray(item.tasks) && item.tasks.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-text/90">
                {item.tasks.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-purple/70 shadow-glowPurple" />
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
      </div>
    </motion.div>
  )
}

export default function Timeline({ diplomas = [], experiences = [] }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()

  return (
    <section id="timeline" className="relative mx-auto max-w-6xl px-6 py-24 md:px-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[10%] h-[520px] w-[520px] rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute right-[-12%] top-[50%] h-[560px] w-[560px] rounded-full bg-purple/10 blur-3xl" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <p className="text-xs tracking-[0.38em] text-muted">{t('timeline.kicker')}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
          {t('timeline.title')}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {t('timeline.desc')}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.34em] text-muted">{t('timeline.experiences')}</p>
          <div className="mt-6 space-y-6">
            {experiences.map((e, idx) => (
              <TimelineItem
                key={`${e.company}-${e.date}`}
                kind="experience"
                item={e}
                delay={0.04 * idx}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs tracking-[0.34em] text-muted">{t('timeline.diplomas')}</p>
          <div className="mt-6 space-y-6">
            {diplomas.map((d, idx) => (
              <TimelineItem
                key={`${d.institution}-${d.date}`}
                kind="diploma"
                item={d}
                delay={0.04 * idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


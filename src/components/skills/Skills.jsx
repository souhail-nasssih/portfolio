import { motion, useReducedMotion } from 'framer-motion'
import { useI18n } from '../../i18n/context.js'

function SkillTag({ label }) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-text/90 backdrop-blur transition hover:border-cyan/25 hover:bg-white/8 hover:shadow-glowCyan"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/40 opacity-40" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan/60 shadow-glowCyan" />
      </span>
      {label}
    </motion.span>
  )
}

function GlowTag({ label, accent = 'cyan' }) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      transition={{ duration: 0.18 }}
      className={[
        'inline-flex items-center gap-2 rounded-full border bg-white/6 px-3 py-1.5 text-xs font-semibold text-text/90 backdrop-blur transition',
        accent === 'purple'
          ? 'border-purple/22 hover:border-purple/45 hover:bg-white/8 hover:shadow-glowPurple'
          : 'border-cyan/22 hover:border-cyan/45 hover:bg-white/8 hover:shadow-glowCyan',
      ].join(' ')}
    >
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          accent === 'purple' ? 'bg-purple/70 shadow-glowPurple' : 'bg-cyan/70 shadow-glowCyan',
        ].join(' ')}
      />
      {label}
    </motion.span>
  )
}

function CategoryIcon({ kind = 'web', accent = 'cyan' }) {
  const stroke = accent === 'purple' ? 'stroke-purple/80' : 'stroke-cyan/80'
  const stroke2 = accent === 'purple' ? 'stroke-purple/55' : 'stroke-cyan/55'

  if (kind === 'mobile') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 4.8c0-.44.36-.8.8-.8h6.4c.44 0 .8.36.8.8V19.2c0 .44-.36.8-.8.8H8.8c-.44 0-.8-.36-.8-.8V4.8Z"
          className={stroke}
          strokeWidth="1.6"
        />
        <path
          d="M10 7h4"
          className={stroke2}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 18.1h.01"
          className={stroke2}
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (kind === 'tools') {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden
      >
        <path
          d="M12 2.9l1.1 2.2a2 2 0 0 0 1.5 1.05l2.45.35-1.78 1.72a2 2 0 0 0-.57 1.77l.42 2.44-2.2-1.16a2 2 0 0 0-1.86 0l-2.2 1.16.42-2.44a2 2 0 0 0-.57-1.77L6.95 6.5l2.45-.35A2 2 0 0 0 10.9 5.1L12 2.9Z"
          className={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 20.2h9"
          className={stroke2}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // web (default)
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      aria-hidden
    >
      <path
        d="M4.5 6.8c0-.5.4-.9.9-.9h13.2c.5 0 .9.4.9.9v10.4c0 .5-.4.9-.9.9H5.4c-.5 0-.9-.4-.9-.9V6.8Z"
        className={stroke}
        strokeWidth="1.6"
      />
      <path
        d="M7 9.2h10"
        className={stroke2}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7 12h6.5"
        className={stroke2}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CategoryCard({ title, icon = 'web', accent = 'cyan', skills, delay = 0 }) {
  const reduceMotion = useReducedMotion()

  const glow = accent === 'purple' ? 'hover:shadow-glowPurple' : 'hover:shadow-glowCyan'
  const border =
    accent === 'purple' ? 'border-purple/35 hover:border-purple/60' : 'border-cyan/35 hover:border-cyan/60'

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={[
        'group relative h-full rounded-3xl border bg-white/4 p-6 backdrop-blur-md',
        'shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition duration-500',
        border,
        glow,
        reduceMotion ? '' : 'hover:-translate-y-1.5',
      ].join(' ')}
    >
      {/* subtle gradient wash */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-purple/10 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(255,255,255,0.10),transparent_45%)] opacity-60" />
        <div
          className={[
            'absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            accent === 'purple'
              ? 'bg-[linear-gradient(135deg,rgba(124,58,237,0.18),transparent_55%,rgba(0,229,255,0.08))]'
              : 'bg-[linear-gradient(135deg,rgba(0,229,255,0.16),transparent_55%,rgba(124,58,237,0.10))]',
          ].join(' ')}
        />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.34em] text-muted">CATEGORY</p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
              {title}
            </h3>
          </div>

          <div
            className={[
              'mt-1 grid h-10 w-10 place-items-center rounded-2xl border bg-white/5 backdrop-blur',
              accent === 'purple' ? 'border-purple/30 shadow-glowPurple' : 'border-cyan/30 shadow-glowCyan',
            ].join(' ')}
          >
            <CategoryIcon kind={icon} accent={accent} />
          </div>
        </div>

        <motion.div
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            show: {
              transition: { staggerChildren: 0.06, delayChildren: 0.1 + delay },
            },
          }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {skills.map((s) => (
            <motion.div
              key={s}
              variants={{
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            >
              <SkillTag label={s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills({ skills, softSkills, languages, interests }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()

  const webSkills = [
    ...(skills?.backend ?? []),
    ...(skills?.frontend ?? []),
  ]
  const mobileSkills = [...(skills?.mobile ?? []), ...(skills?.database ?? []).filter((x) => x.toLowerCase() === 'firebase')]
  const toolsSkills = [
    ...(skills?.tools ?? []),
    ...(skills?.database ?? []).filter((x) => x.toLowerCase() !== 'firebase'),
  ]

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 md:px-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-15%] top-[10%] h-[520px] w-[520px] rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute right-[-15%] top-[40%] h-[560px] w-[560px] rounded-full bg-purple/10 blur-3xl" />
      </div>

      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <p className="text-xs tracking-[0.38em] text-muted">{t('skills.kicker')}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text md:text-4xl">
          {t('skills.title')}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {t('skills.desc')}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <CategoryCard
          title={t('skills.web')}
          icon="web"
          accent="cyan"
          delay={0.05}
          skills={webSkills.length ? webSkills : ['Laravel', 'React.js', 'Inertia.js', 'Node.js']}
        />
        <CategoryCard
          title={t('skills.mobile')}
          icon="mobile"
          accent="purple"
          delay={0.1}
          skills={mobileSkills.length ? mobileSkills : ['Flutter', 'Firebase']}
        />
        <CategoryCard
          title={t('skills.tools')}
          icon="tools"
          accent="cyan"
          delay={0.15}
          skills={toolsSkills.length ? toolsSkills : ['MySQL', 'Git/GitHub', 'Postman', 'Figma', 'TailwindCSS']}
        />
      </div>

      {/* ——— SOFT SKILLS (refonte) ——— */}
      <motion.div
        initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="group relative mt-14 overflow-hidden rounded-[36px] border border-purple/20 bg-white/4 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)] md:p-8"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-purple/16 blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-cyan/12 blur-3xl opacity-55 transition-opacity duration-500 group-hover:opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_0%,rgba(255,255,255,0.10),transparent_45%)] opacity-55" />
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr] md:items-start">
          <div>
            <p className="text-xs tracking-[0.42em] text-muted">{t('skills.soft')}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-text md:text-3xl">
              <span className="supports-[background-clip:text]:bg-linear-to-r supports-[background-clip:text]:from-purple supports-[background-clip:text]:via-white supports-[background-clip:text]:to-cyan supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent">
                Human skills
              </span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Collaboration, ownership et communication — le “plus” qui transforme un projet en produit.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(softSkills ?? []).map((s) => (
              <motion.div
                key={s}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition hover:border-purple/35 hover:bg-white/8 hover:shadow-glowPurple"
              >
                <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-purple/25 bg-purple/10 text-sm font-semibold text-text shadow-glowPurple">
                  <span className="absolute inset-0 rounded-xl bg-[radial-gradient(280px_circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
                  <span className="relative">✦</span>
                </span>
                <span className="text-sm font-semibold text-text/90">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ——— LANGUAGES / INTERESTS ——— */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          <p className="text-xs tracking-[0.34em] text-muted">{t('skills.languages')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(languages ?? []).map((l) => (
              <GlowTag
                key={`${l.lang}-${l.level}`}
                label={`${l.lang} · ${l.level}`}
                accent="cyan"
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.02 }}
          className="rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          <p className="text-xs tracking-[0.34em] text-muted">{t('skills.interests')}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(interests ?? []).map((i) => (
              <GlowTag key={i} label={i} accent="purple" />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


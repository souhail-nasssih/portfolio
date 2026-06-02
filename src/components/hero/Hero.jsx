import { useEffect, useMemo, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useI18n } from '../../i18n/context.js'
import NeonButton from '../ui/NeonButton.jsx'
import HeroDevBackground from './HeroDevBackground.jsx'

const STACK_PREVIEW = ['Laravel', 'React', 'Flutter', 'Firebase']

const char = {
  hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

function splitChars(text) {
  return Array.from(text)
}

function shortenAbout(text, maxLen = 220) {
  if (!text) return ''
  if (text.length <= maxLen) return text
  const cut = text.slice(0, maxLen)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : maxLen).trim()}…`
}

function parseName(fullName) {
  const parts = fullName.trim().split(/\s+/)
  if (parts.length <= 1) return { first: fullName, last: '' }
  return { first: parts[0], last: parts.slice(1).join(' ') }
}

export default function Hero({ profile, profileImage }) {
  const reduceMotion = useReducedMotion()
  const { t, tf } = useI18n()
  const sectionRef = useRef(null)

  const fullName = profile?.name ?? 'SOUHAIL NASSIH'
  const { first, last } = parseName(fullName)
  const title = profile?.title ?? 'DÉVELOPPEUR FULL STACK WEB & MOBILE'
  const about = profile?.about
  const location = profile?.location
  const email = profile?.email

  const heroAbout = useMemo(() => shortenAbout(about), [about])
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const canExpandAbout = Boolean(about && heroAbout && about.length > heroAbout.length)
  const aboutText = aboutExpanded ? about : heroAbout
  const [namePlayId, setNamePlayId] = useState(1)

  const isHeroInView = useInView(sectionRef, { amount: 0.7 })
  const wasInViewRef = useRef(false)

  useEffect(() => {
    if (reduceMotion) return
    const was = wasInViewRef.current
    if (!was && isHeroInView) {
      setNamePlayId((v) => v + 1)
    }
    wasInViewRef.current = isHeroInView
  }, [isHeroInView, reduceMotion])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.1, 0.03])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
    >
      <HeroDevBackground />

      <motion.div
        className="pointer-events-none absolute inset-0 z-1"
        style={reduceMotion ? undefined : { opacity: gridOpacity }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[72px_72px]" />
        <div className="absolute left-[-10%] top-[-15%] h-[560px] w-[560px] rounded-full bg-cyan/10 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[640px] w-[640px] rounded-full bg-purple/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-stretch justify-center gap-12 px-6 py-28 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:gap-20">
        {/* ——— Contenu texte ——— */}
        <motion.div
          className="flex w-full min-w-0 flex-col justify-center lg:max-w-[52%] lg:pr-4"
          style={
            reduceMotion ? undefined : { y: textY, opacity: textOpacity }
          }
        >
          <motion.div
            initial={reduceMotion ? false : { y: 12, opacity: 0 }}
            animate={reduceMotion ? false : { y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-cyan/25 bg-cyan/8 px-4 py-2 shadow-glowCyan backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/50 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-text/90 sm:text-xs">
              {title}
            </span>
          </motion.div>

          <motion.h1
            key={namePlayId}
            className="mt-8 whitespace-nowrap font-ui text-[clamp(2.6rem,7.2vw,4.6rem)] font-extrabold uppercase leading-[0.92] tracking-tighter text-text"
            initial="hidden"
            animate="show"
            aria-label={fullName}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.03, delayChildren: 0.12 } },
              }}
            >
              {splitChars(`${first}${last ? ` ${last}` : ''}`).map((c, i) => {
                const isSpace = c === ' '
                const inLastName = last ? i > first.length : false
                const cls = isSpace
                  ? 'inline-block w-[0.35em]'
                  : inLastName
                    ? 'inline-block text-text supports-[background-clip:text]:bg-linear-to-r supports-[background-clip:text]:from-cyan supports-[background-clip:text]:via-white supports-[background-clip:text]:to-purple supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent'
                    : 'inline-block text-text'

                return (
                  <motion.span
                    key={`n-${c}-${i}`}
                    variants={char}
                    className={cls}
                  >
                    {c}
                  </motion.span>
                )
              })}
            </motion.span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            animate={reduceMotion ? false : { y: 0, opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 max-w-xl text-base font-medium leading-relaxed text-text/85 sm:text-lg"
          >
            {t('hero.value')}
          </motion.p>

          <motion.p
            initial={reduceMotion ? false : { y: 12, opacity: 0 }}
            animate={reduceMotion ? false : { y: 0, opacity: 1 }}
            transition={{
              delay: 0.62,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]"
          >
            {aboutText ||
              t('hero.aboutFallback')}
          </motion.p>

          {canExpandAbout ? (
            <motion.div
              initial={reduceMotion ? false : { y: 10, opacity: 0 }}
              animate={reduceMotion ? false : { y: 0, opacity: 1 }}
              transition={{ delay: 0.68, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setAboutExpanded((v) => !v)}
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-text/90 backdrop-blur transition hover:border-cyan/30 hover:bg-white/10 hover:shadow-glowCyan focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
              >
                <span>{aboutExpanded ? t('hero.collapse') : t('hero.readMore')}</span>
                <span className="text-cyan">{aboutExpanded ? '↑' : '→'}</span>
              </button>
            </motion.div>
          ) : null}

          <motion.div
            initial={reduceMotion ? false : { y: 10, opacity: 0 }}
            animate={reduceMotion ? false : { y: 0, opacity: 1 }}
            transition={{ delay: 0.72, duration: 0.55 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            {STACK_PREVIEW.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-text/80 backdrop-blur"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {(location || email) && (
            <motion.div
              initial={reduceMotion ? false : { y: 10, opacity: 0 }}
              animate={reduceMotion ? false : { y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.55 }}
              className="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-4"
            >
              {location ? (
                <span className="inline-flex items-center gap-2">
                  <span className="text-cyan/80">◎</span>
                  {location}
                </span>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 transition hover:text-cyan"
                >
                  <span className="text-purple/80">✉</span>
                  {email}
                </a>
              ) : null}
            </motion.div>
          )}

          <motion.div
            initial={reduceMotion ? false : { y: 14, opacity: 0 }}
            animate={reduceMotion ? false : { y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <NeonButton href="#projects">{t('hero.ctaProjects')}</NeonButton>
            <a
              href="#skills"
              className="rounded-xl border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-text/90 backdrop-blur transition hover:border-white/25 hover:bg-white/10"
            >
              {t('hero.ctaSkills')}
            </a>
          </motion.div>
        </motion.div>

        {/* ——— Portrait ——— */}
        <motion.div
          className="flex w-full shrink-0 justify-center lg:w-[min(440px,42%)] lg:justify-end"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={
            reduceMotion ? undefined : { y: imageY, scale: imageScale }
          }
        >
          <div className="group relative w-full max-w-[380px] sm:max-w-[400px] lg:max-w-none">
            <div className="pointer-events-none absolute -inset-8 -z-10 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute left-1/2 top-1/2 h-[min(100%,420px)] w-[min(100%,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/16 blur-3xl" />
              <div className="absolute left-1/2 top-[55%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple/14 blur-3xl" />
            </div>

            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-muted lg:text-left">
              {t('hero.portraitLabel')}
            </p>

            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[32px] border border-white/12 bg-bg/40 p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm transition duration-500 group-hover:border-cyan/30 group-hover:shadow-glowCyan">
              <div className="absolute inset-[-20px] -z-10 animate-floaty rounded-[38px] border border-dashed border-white/8" />

              <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-bg">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={tf('hero.portraitAlt', fullName)}
                    className="h-full w-full object-cover object-[50%_22%] transition duration-700 group-hover:scale-[1.03]"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-cyan/15 to-purple/15" />
                )}

                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg via-bg/20 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.12),transparent_55%)]" />

                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan/30 bg-bg/70 px-3 py-1.5 text-xs font-semibold text-text backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    {t('hero.availability')}
                  </div>
                  {location ? (
                    <p className="text-xs text-muted/90">{location}</p>
                  ) : null}
                </div>
              </div>

              <div className="pointer-events-none absolute -left-1 -top-1 h-14 w-14 rounded-tl-[32px] border-l-2 border-t-2 border-cyan/60" />
              <div className="pointer-events-none absolute -right-1 -top-1 h-14 w-14 rounded-tr-[32px] border-r-2 border-t-2 border-purple/60" />
              <div className="pointer-events-none absolute -bottom-1 -left-1 h-14 w-14 rounded-bl-[32px] border-b-2 border-l-2 border-purple/50" />
              <div className="pointer-events-none absolute -bottom-1 -right-1 h-14 w-14 rounded-br-[32px] border-b-2 border-r-2 border-cyan/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

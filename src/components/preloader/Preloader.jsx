import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../../i18n/context.js'

function clamp01(n) {
  return Math.min(1, Math.max(0, n))
}

export default function Preloader({ onDone }) {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const [progress, setProgress] = useState(() => (reduceMotion ? 100 : 0))
  const [phase, setPhase] = useState(() => (reduceMotion ? 'reveal' : 'loading')) // loading -> reveal

  // Durées (ajuste ici si besoin) — total ~1.4s avant le site
  const durationMs = reduceMotion ? 200 : 1100
  const holdAtEndMs = reduceMotion ? 0 : 200
  const progressText = useMemo(() => `${Math.round(progress)}%`, [progress])
  const stepText = useMemo(() => {
    const steps = t('preloader.steps')
    const list = Array.isArray(steps) && steps.length ? steps : []
    if (!list.length) return ''
    const i = Math.min(list.length - 1, Math.floor((progress / 100) * list.length))
    return list[i]
  }, [progress, t])
  useEffect(() => {
    if (reduceMotion) return

    let raf = 0
    let doneTimer = 0
    const start = performance.now()

    const tick = (now) => {
      const t = clamp01((now - start) / durationMs)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setProgress(eased * 100)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
        return
      }

      setProgress(100)
      doneTimer = window.setTimeout(() => setPhase('reveal'), holdAtEndMs)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      if (doneTimer) window.clearTimeout(doneTimer)
    }
  }, [durationMs, holdAtEndMs, reduceMotion])

  useEffect(() => {
    if (phase !== 'reveal') return
    const t = setTimeout(() => onDone?.(), reduceMotion ? 0 : 550)
    return () => clearTimeout(t)
  }, [phase, onDone, reduceMotion])

  return (
    <motion.div
      className="fixed inset-0 z-100 bg-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {/* Ambient tech background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_38%,rgba(0,229,255,0.12),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_80%_64%,rgba(124,58,237,0.12),transparent_60%)]" />

        {/* subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(11,15,25,0)_0%,rgba(11,15,25,0.82)_70%)]" />

        {!reduceMotion ? (
          <motion.div
            className="absolute left-[-20%] top-[38%] h-px w-[140%] bg-linear-to-r from-transparent via-cyan/50 to-transparent shadow-glowCyan opacity-60"
            animate={{ y: [-140, 140] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
          />
        ) : null}
      </div>

      <div className="relative flex h-full items-center justify-center">
        <div className="w-[min(980px,92vw)]">
          <div className="mx-auto grid grid-cols-1 items-center gap-6 md:grid-cols-[140px_1fr]">
            {/* emblem */}
            <div className="mx-auto flex items-center justify-center md:mx-0">
              <div className="relative grid h-24 w-24 place-items-center rounded-[28px] border border-cyan/25 bg-white/4 shadow-glowCyan backdrop-blur-md">
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(420px_circle_at_30%_20%,rgba(255,255,255,0.14),transparent_58%)]" />
                {!reduceMotion ? (
                  <motion.div
                    className="pointer-events-none absolute -inset-7 rounded-[34px] border border-dashed border-white/10 opacity-70"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                  />
                ) : null}
                <span className="font-ui text-xl font-extrabold tracking-[0.32em] text-text/90">
                  SN
                </span>
              </div>
            </div>

            {/* main panel */}
            <div className="rounded-[28px] border border-white/10 bg-bg/55 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-[220px]">
                  <p className="text-[11px] font-semibold tracking-[0.42em] text-muted">
                    {t('preloader.label', 'INITIALIZING')}
                  </p>
                  <p className="mt-2 text-base font-semibold tracking-tight text-text/90">
                    {t('preloader.hint', 'Preparing the experience')}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-[11px] font-semibold tracking-[0.35em] text-muted">
                    {progressText}
                  </div>
                  {!reduceMotion ? (
                    <motion.span
                      className="inline-block h-3.5 w-1 rounded-full bg-cyan/80"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 0.9, repeat: Infinity }}
                      aria-hidden
                    />
                  ) : null}
                </div>
              </div>

              {/* progress bar */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="relative h-3 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-cyan via-purple to-cyan shadow-glowCyan"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-45">
                    <div className="h-full w-[50%] animate-sheen bg-linear-to-r from-transparent via-white/35 to-transparent" />
                  </div>
                </div>
              </div>

              {/* status */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan/20 bg-cyan/8 px-3 py-1.5 text-xs font-semibold text-text/85 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan/50 opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-cyan" />
                  </span>
                  <span className="font-mono text-[12px] text-cyan/85">{stepText}</span>
                </div>

                <div className="text-[10px] font-semibold tracking-[0.32em] text-muted">
                  {reduceMotion ? 'ready' : 'sync'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curtain reveal */}
      <motion.div
        className="pointer-events-none absolute inset-0 origin-bottom bg-bg"
        initial={{ y: 0 }}
        animate={phase === 'reveal' ? { y: '-110%' } : { y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.div>
  )
}


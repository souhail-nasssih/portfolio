import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/context.js'

const FLOATING_SNIPPETS = [
  { text: 'const dev = "SOUHAIL";', top: '12%', left: '4%', delay: 0 },
  { text: '<React.App />', top: '22%', right: '6%', delay: 0.4 },
  { text: 'flutter run --release', top: '38%', left: '2%', delay: 0.8 },
  { text: 'Route::inertia(...)', top: '52%', right: '4%', delay: 1.2 },
  { text: 'firebase.auth()', top: '68%', left: '6%', delay: 0.6 },
  { text: 'npm run build', top: '78%', right: '8%', delay: 1 },
]

const SYMBOLS = ['{ }', '</>', '=>', '0x', '/*', '*/', 'git', 'API']

function FloatingSnippet({ text, style, delay, reduceMotion }) {
  if (reduceMotion) {
    return (
      <p
        style={style}
        className="absolute font-mono text-[11px] text-cyan/25 md:text-xs"
      >
        {text}
      </p>
    )
  }

  return (
    <motion.p
      style={style}
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: [0.15, 0.35, 0.15],
        y: [0, -10, 0],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
      className="absolute font-mono text-[11px] text-cyan/30 md:text-xs"
    >
      {text}
    </motion.p>
  )
}

function DevTerminal({ reduceMotion }) {
  const { t } = useI18n()
  const TERMINAL_LINES = t('devBg.terminalLines')
  const safeLines =
    Array.isArray(TERMINAL_LINES) && TERMINAL_LINES.length ? TERMINAL_LINES : []

  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [history, setHistory] = useState(() =>
    reduceMotion ? safeLines.slice(0, 4) : [],
  )

  const currentLine = safeLines[lineIndex] ?? ''
  const displayed = currentLine.slice(0, charIndex)

  useEffect(() => {
    if (reduceMotion) return
    if (!safeLines.length) return

    const isComplete = charIndex >= currentLine.length
    const pause = isComplete ? 900 : 38

    const t = setTimeout(() => {
      if (!isComplete) {
        setCharIndex((c) => c + 1)
        return
      }

      setHistory((h) => [...h.slice(-5), currentLine])
      setLineIndex((i) => (i + 1) % safeLines.length)
      setCharIndex(0)
    }, pause)

    return () => clearTimeout(t)
  }, [charIndex, currentLine, reduceMotion, safeLines.length])

  return (
    <div className="absolute bottom-[18%] left-6 hidden max-w-xs rounded-2xl border border-cyan/20 bg-bg/40 p-4 font-mono text-[11px] shadow-glowCyan backdrop-blur-md md:block lg:left-12">
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-cyan/70 shadow-glowCyan" />
        <span className="h-2 w-2 rounded-full bg-purple/50" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 text-[10px] tracking-widest text-muted">
          {t('devBg.terminalTitle')}
        </span>
      </div>
      <div className="space-y-1 text-cyan/50">
        {history.map((line, idx) => (
          <p key={`${idx}-${line}`} className="leading-relaxed">
            {line}
          </p>
        ))}
        <p className="text-cyan/80">
          {displayed}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-0.5 inline-block h-3.5 w-1 align-middle bg-cyan/80"
            aria-hidden
          />
        </p>
      </div>
    </div>
  )
}

export default function HeroDevBackground() {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const [roleIndex, setRoleIndex] = useState(0)
  const roles = t('devBg.roles')
  const safeRoles = Array.isArray(roles) && roles.length ? roles : ['FULL STACK DEVELOPER']

  useEffect(() => {
    if (reduceMotion) return
    const t = setInterval(
      () => setRoleIndex((i) => (i + 1) % safeRoles.length),
      3400,
    )
    return () => clearInterval(t)
  }, [reduceMotion, safeRoles.length])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Giant rotating role — présente le profil dev */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={safeRoles[roleIndex]}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.98, filter: 'blur(12px)' }
            }
            animate={
              reduceMotion
                ? { opacity: 0.05 }
                : { opacity: 0.07, y: 0, scale: 1, filter: 'blur(0px)' }
            }
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -24, scale: 1.02, filter: 'blur(12px)' }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[95vw] text-center text-[clamp(2rem,9vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-[0.12em] text-cyan"
          >
            {safeRoles[roleIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Scan line */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-cyan/50 to-transparent shadow-glowCyan"
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Floating code snippets */}
      {FLOATING_SNIPPETS.map((s) => (
        <FloatingSnippet
          key={s.text}
          text={s.text}
          delay={s.delay}
          reduceMotion={reduceMotion}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
          }}
        />
      ))}

      {/* Dev symbols */}
      {SYMBOLS.map((sym, i) => (
        <motion.span
          key={sym}
          className="absolute font-mono text-sm font-semibold text-purple/20 md:text-base"
          style={{
            top: `${15 + i * 11}%`,
            left: i % 2 === 0 ? `${3 + i * 2}%` : undefined,
            right: i % 2 === 1 ? `${4 + i}%` : undefined,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.12, 0.28, 0.12],
                  y: [0, i % 2 ? 8 : -8, 0],
                }
          }
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        >
          {sym}
        </motion.span>
      ))}

      <DevTerminal reduceMotion={reduceMotion} />

      {/* Vignette pour lisibilité du contenu */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,transparent_0%,rgb(11,15,25)_72%)]" />
      <div className="absolute inset-0 bg-linear-to-r from-bg/80 via-transparent to-bg/60" />
    </div>
  )
}

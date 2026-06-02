import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useI18n } from '../../i18n/context.js'
import { useLenis } from './lenisContext.js'

export default function ScrollToTop() {
  const reduceMotion = useReducedMotion()
  const { t } = useI18n()
  const { scrollY } = useScroll()
  const lenis = useLenis()
  const [show, setShow] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    setShow(v > 520)
  })

  if (reduceMotion) return null

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => {
            if (lenis) lenis.scrollTo(0, { duration: 1.4 })
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="fixed bottom-6 right-6 z-110 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/35 bg-cyan/10 text-lg text-text shadow-glowCyan backdrop-blur transition hover:border-cyan/55 hover:bg-cyan/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
          aria-label={t('scroll.toTop')}
        >
          ↑
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

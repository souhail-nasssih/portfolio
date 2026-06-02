import { motion, useReducedMotion } from 'framer-motion'

export default function NeonButton({ href, children, onClick }) {
  const reduceMotion = useReducedMotion()

  const Comp = href ? 'a' : 'button'
  const props = href ? { href } : { type: 'button', onClick }

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { y: 0 }}
      className="relative"
    >
      <Comp
        {...props}
        className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan/40 bg-cyan/12 px-6 py-3 text-sm font-semibold tracking-wide text-text shadow-glowCyan backdrop-blur-sm transition-colors hover:bg-cyan/18 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60"
      >
        <span className="relative z-10">{children}</span>
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
        </span>
      </Comp>
    </motion.div>
  )
}


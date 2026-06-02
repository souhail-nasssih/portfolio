import { motion, useReducedMotion } from 'framer-motion'

export default function SectionDivider() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <div className="mx-auto h-px max-w-6xl bg-white/5" />

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.2 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex max-w-6xl items-center gap-4 px-6 md:px-24"
    >
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="h-2 w-2 rounded-full bg-cyan/60 shadow-glowCyan" />
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-purple/40 to-transparent" />
    </motion.div>
  )
}

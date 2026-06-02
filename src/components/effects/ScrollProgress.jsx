import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

export default function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  })
  const glowX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const percent = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)
  const labelOpacity = useTransform(scrollYProgress, [0, 0.06, 1], [0, 1, 1])

  if (reduceMotion) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-120">
      <div className="relative h-[3px] w-full overflow-hidden bg-white/5">
        <motion.div
          style={{ scaleX, transformOrigin: '0% 50%' }}
          className="absolute inset-0 bg-linear-to-r from-cyan/30 via-cyan/80 to-purple/70 shadow-glowCyan"
        />
        <motion.div
          style={{ left: glowX }}
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/80 blur-md shadow-glowCyan"
        />
      </div>
      <motion.span
        style={{ opacity: labelOpacity }}
        className="absolute right-4 top-3 text-[10px] font-semibold tracking-[0.2em] text-cyan/70"
      >
        {percent}
      </motion.span>
    </div>
  )
}

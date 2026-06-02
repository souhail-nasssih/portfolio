import { motion, useReducedMotion } from 'framer-motion'

const presets = {
  up: {
    hidden: { opacity: 0, y: 56, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  },
  left: {
    hidden: { opacity: 0, x: -48, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  },
  right: {
    hidden: { opacity: 0, x: 48, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  },
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  amount = 0.22,
}) {
  const reduceMotion = useReducedMotion()
  const preset = presets[variant] ?? presets.up

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: preset.hidden,
        visible: {
          ...preset.visible,
          transition: {
            ...preset.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

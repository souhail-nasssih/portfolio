import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMemo } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const particleOptions = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,
  background: { color: { value: 'transparent' } },
  particles: {
    number: {
      value: 52,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: { value: ['#00E5FF', '#7C3AED'] },
    opacity: { value: { min: 0.08, max: 0.15 } },
    size: { value: { min: 1, max: 2.6 } },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      outModes: { default: 'out' },
    },
    links: {
      enable: true,
      distance: 145,
      color: '#00E5FF',
      opacity: 0.12,
      width: 1,
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: 'grab' },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 170, links: { opacity: 0.2 } },
    },
  },
}

function ParticlesLayer({ reduceMotion }) {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400, 1200], [1, 0.75, 0.45])
  const y = useTransform(scrollY, [0, 1200], [0, 80])

  const options = useMemo(() => particleOptions, [])

  if (reduceMotion) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10">
        <Particles
          id="tsparticles-bg"
          options={options}
          className="pointer-events-none h-full w-full"
        />
      </div>
    )
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ opacity, y }}
    >
      <Particles
        id="tsparticles-bg"
        options={options}
        className="pointer-events-none h-full w-full"
      />
    </motion.div>
  )
}

export default function ParticlesBackground() {
  const reduceMotion = useReducedMotion()

  return (
    <ParticlesProvider init={loadSlim}>
      <ParticlesLayer reduceMotion={reduceMotion} />
    </ParticlesProvider>
  )
}

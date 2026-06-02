import { useEffect, useMemo } from 'react'
import Lenis from 'lenis'
import { LenisContext } from './lenisContext.js'

export default function ScrollProvider({ children }) {
  const lenis = useMemo(() => {
    if (typeof window === 'undefined') return null
    const ua = window.navigator?.userAgent ?? ''
    const isWindows = /Windows/i.test(ua)
    return new Lenis({
      duration: 1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      // Sur Windows (precision touchpad), l'interception du wheel peut casser
      // le scroll 2 doigts selon navigateur/driver. On garde Lenis pour scrollTo,
      // mais on laisse le wheel en natif pour fiabilité.
      smoothWheel: !isWindows,
      // Better support for precision touchpads / 2-finger gestures
      syncTouch: true,
      normalizeWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      lerp: 0.09,
    })
  }, [])

  useEffect(() => {
    if (!lenis) return
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    let raf = 0
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash === '#') return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -24, duration: 1.35 })
    }

    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onAnchorClick)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      lenis.destroy()
    }
  }, [lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

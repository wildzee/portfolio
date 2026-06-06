'use client'

import { useEffect, useRef } from 'react'
import { useAnimationFrame } from 'framer-motion'
import Lenis from 'lenis'

// Expose Lenis instance so other components can access scroll state
export let lenis: Lenis | null = null

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = instance
    lenis = instance

    return () => {
      instance.destroy()
      lenisRef.current = null
      lenis = null
    }
  }, [])

  // Drive Lenis from Framer Motion's RAF — one shared loop instead of two
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return <>{children}</>
}

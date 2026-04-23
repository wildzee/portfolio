'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { ease } from '@/lib/motion'

const REVEAL_DELAY = 0.12   // seconds — hold before curtain lifts (120ms)
const LIFT_DURATION = 0.70  // seconds — curtain travels y:0% → y:-100%
const TOTAL_MS = 820        // (REVEAL_DELAY + LIFT_DURATION) × 1000

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showOverlay, setShowOverlay] = useState(false)
  const [overlayKey, setOverlayKey] = useState(0)
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    setOverlayKey(k => k + 1)
    setShowOverlay(true)
    const timer = setTimeout(() => setShowOverlay(false), TOTAL_MS)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/*
        Curtain: mounts at y:0% (full-screen cover in one frame — no slide-in).
        Holds REVEAL_DELAY while AnimatePresence swaps pages underneath.
        Lifts to y:-100% over LIFT_DURATION with ease.premium (fast → decelerate).
        2px var(--primary) stripe at the bottom = brush-stroke leading edge.
      */}
      {showOverlay && (
        <motion.div
          key={overlayKey}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 9990 }}
          initial={{ y: '0%' }}
          animate={{ y: '-100%' }}
          transition={{
            delay: REVEAL_DELAY,
            duration: LIFT_DURATION,
            ease: ease.premium,
          }}
        >
          <div className="absolute inset-0" style={{ background: 'var(--foreground)' }} />
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '2px', background: 'var(--primary)' }}
          />
        </motion.div>
      )}

      {/*
        Page wrapper:
        exit — stays opacity:1 for 50ms (curtain covers first), then exits DOM instantly.
        enter — fades in from opacity:0 starting at ~401ms, fully visible by ~801ms
                (curtain lifts off at 820ms — new page ready just in time).
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { delay: 0.05, duration: 0 } }}
          transition={{
            delay: 0.35,
            duration: 0.4,
            ease: ease.premium,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

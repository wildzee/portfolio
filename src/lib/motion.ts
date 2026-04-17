// src/lib/motion.ts
export const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const easeSharp: [number, number, number, number] = [0.77, 0, 0.175, 1]
export const easeOut: [number, number, number, number] = [0.0, 0.0, 0.2, 1]

export const springSnappy = { stiffness: 400, damping: 30, mass: 0.8 }
export const springGentle = { stiffness: 150, damping: 15, mass: 0.1 }
export const springBouncy = { type: 'spring' as const, stiffness: 300, damping: 20 }

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  xslow: 1.4,
} as const

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.base, ease: easePremium } },
}

export const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

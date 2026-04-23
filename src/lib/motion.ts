export const ease = {
  out:     [0.0, 0.0, 0.2, 1]  as [number, number, number, number],
  inOut:   [0.4, 0.0, 0.2, 1]  as [number, number, number, number],
  premium: [0.16, 1, 0.3, 1]   as [number, number, number, number],
  sharp:   [0.27, 0, 0.51, 1]  as [number, number, number, number],
}

export const spring = {
  default: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 1 },
  gentle:  { type: 'spring' as const, stiffness: 150, damping: 20, mass: 0.8 },
}

export const duration = { fast: 0.2, base: 0.5, slow: 0.8, xslow: 1.2 }

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.premium } },
}

export const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
}

export const clipReveal = {
  hidden:  { clipPath: 'inset(0 0 100% 0)' },
  visible: { clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.8, ease: ease.premium } },
}

// Legacy aliases
export const easePremium = ease.premium
export const easeSharp = ease.sharp
export const easeOut = ease.out
export const fadeInUp = fadeUp

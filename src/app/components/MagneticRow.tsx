'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function MagneticRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 16)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 8)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      {children}
    </motion.div>
  )
}

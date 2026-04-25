'use client'

import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { easePremium } from '@/lib/motion'

interface Props {
  src: string
  visible: boolean
}

export default function ImageFollowCursor({ src, visible }: Props) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.6 })
  const y = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.6 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  return (
    <motion.div
      className="pointer-events-none fixed z-50 top-0 left-0"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.85 }}
      transition={{ duration: 0.2, ease: easePremium }}
    >
      <div
        className="relative"
        style={{ transform: 'translate(20px, -60%)' }}
      >
        {src && (
          <Image
            src={src}
            alt=""
            width={192}
            height={128}
            className="object-cover rounded-xl shadow-2xl"
            style={{ display: 'block' }}
          />
        )}
      </div>
    </motion.div>
  )
}

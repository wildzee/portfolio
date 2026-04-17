'use client'

import { motion } from 'framer-motion'
import { easePremium } from '@/lib/motion'

interface Props {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function SplitLines({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: easePremium } },
          }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}

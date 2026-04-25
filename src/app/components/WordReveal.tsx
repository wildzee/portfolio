'use client'

import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/lib/motion'

interface WordRevealProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
}

const WordReveal = memo(function WordReveal({ children, className = '', delay = 0, staggerDelay = 0.06 }: WordRevealProps) {
  const words = useMemo(() => children.split(' '), [children])

  return (
    <span className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <span key={i} className="word-wrapper" style={{ marginRight: i < words.length - 1 ? '0.28em' : 0 }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.7, ease: ease.premium, delay: delay + i * staggerDelay }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
})

export default WordReveal

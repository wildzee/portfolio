'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRevealProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-10%' })

    // Antigravity's core motion token
    const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                    duration: 0.8,
                    ease: easePremium,
                    delay: delay
                }}
            >
                {children}
            </motion.div>
        </div>
    )
}

'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface KineticSkillProps {
    children: string
}

export default function KineticSkill({ children }: KineticSkillProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Custom exponential ease
    const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]

    const x = useMotionValue(0)
    const springX = useSpring(x, { stiffness: 100, damping: 20 })
    const skewX = useTransform(springX, [-100, 100], [10, -10])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        // Calculate distance from center of the text
        const centerX = rect.left + rect.width / 2
        x.set((e.clientX - centerX) * 0.1) // Subtle horizontal shift
    }

    const handleMouseLeave = () => {
        x.set(0)
    }

    return (
        <div
            ref={ref}
            className="relative flex items-center group cursor-default py-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background fill reveal on hover */}
            <motion.div
                className="absolute left-[-2rem] right-[-2rem] top-0 bottom-0 bg-secondary/5 rounded-xl -z-10 origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: easePremium } }}
            />

            <motion.h3
                style={{ x: springX, skewX }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.15] text-foreground/70 group-hover:text-primary transition-colors duration-500 will-change-transform"
            >
                {children}
            </motion.h3>
        </div>
    )
}

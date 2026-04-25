'use client'

import React, { useRef, memo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollHighlightTextProps {
    children: string
}

const ScrollHighlightText = memo(function ScrollHighlightText({ children }: ScrollHighlightTextProps) {
    const ref = useRef<HTMLHeadingElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 85%', 'start 40%'],
    })

    const opacity = useTransform(scrollYProgress, [0, 1], [0.08, 1])
    const x = useTransform(scrollYProgress, [0, 1], [-48, 0])
    const y = useTransform(scrollYProgress, [0, 1], [16, 0])

    return (
        <motion.h3
            ref={ref}
            style={{ opacity, x, y }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.15] text-foreground transition-colors"
        >
            {children}
        </motion.h3>
    )
})

export default ScrollHighlightText

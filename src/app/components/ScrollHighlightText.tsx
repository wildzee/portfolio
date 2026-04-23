'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollHighlightTextProps {
    children: string
}

export default function ScrollHighlightText({ children }: ScrollHighlightTextProps) {
    const ref = useRef<HTMLHeadingElement>(null)

    // Track the scroll progress of this specific element in the viewport
    const { scrollYProgress } = useScroll({
        target: ref,
        // Start animation when the top of the element hits 80% down the viewport
        // End animation when the top of the element hits 40% down the viewport
        offset: ['start 85%', 'start 40%'],
    })

    // Map the scroll progress to opacity and a slight color tint
    // It starts dim (secondary color) and brightens up to full foreground/primary
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
}

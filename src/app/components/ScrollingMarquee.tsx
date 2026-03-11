'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ScrollingMarqueeProps {
    items: string[]
    direction?: 'left' | 'right'
    baseVelocity?: number
}

export default function ScrollingMarquee({ items, direction = 'left', baseVelocity = -2 }: ScrollingMarqueeProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll within the window
    const { scrollYProgress } = useScroll()

    // Create a spring mapped to scroll velocity for a "pull" effect when scrolling fast
    const scrollVelocity = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 90,
    })

    // We want the marquee to move horizontally based on scroll progress.
    // We map the main scroll progress to a horizontal translation.
    // If direction is left, we go from 0% to -100%. If right, -100% to 0%.
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
    )

    // Double the array to ensure seamless looping visually
    const duplicatedItems = [...items, ...items, ...items, ...items]

    return (
        <div ref={containerRef} className="overflow-hidden whitespace-nowrap py-8 w-full flex items-center relative -mx-4 sm:-mx-6 px-4 sm:px-6">
            {/* Fade edges to blend into background */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-8 sm:gap-16 w-max"
                style={{ x }}
            >
                {duplicatedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-8 sm:gap-16">
                        <h3 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-medium text-foreground/80 hover:text-primary transition-colors cursor-default whitespace-nowrap">
                            {item}
                        </h3>
                        {/* Divider Dot */}
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary/40 shrink-0" />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

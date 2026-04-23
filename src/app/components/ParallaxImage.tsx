'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

interface ParallaxImageProps {
    src: string
    alt: string
    className?: string
    containerClassName?: string
}

export default function ParallaxImage({ src, alt, className = '', containerClassName = '' }: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null)

    // Parallax logic
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    // Move image up slightly as user scrolls down
    const y = useTransform(scrollYProgress, [0, 1], [30, -30])

    // Reveal logic
    const isInView = useInView(ref, { once: true, margin: '-20%' })
    const easePremium: [number, number, number, number] = [0.16, 1, 0.3, 1]

    return (
        <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
            <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
                transition={{ duration: 1.2, ease: easePremium }}
                className="w-full h-full"
            >
                <motion.img
                    style={{ y, filter: 'grayscale(60%) contrast(1.1) brightness(0.95)' }}
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover ${className}`}
                />
            </motion.div>
        </div>
    )
}

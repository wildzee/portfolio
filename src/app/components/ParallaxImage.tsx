'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

interface ParallaxImageProps {
    src: string
    alt: string
    className?: string
    containerClassName?: string
}

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1]

export default function ParallaxImage({ src, alt, className = '', containerClassName = '' }: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], [30, -30])

    const isInView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <div ref={ref} className={`overflow-hidden ${containerClassName}`}>
            {/* clip-path wipe: reveals upward */}
            <motion.div
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={isInView ? { clipPath: 'inset(0 0 0% 0)' } : { clipPath: 'inset(0 0 100% 0)' }}
                transition={{ duration: 1.1, ease }}
                className="w-full h-full"
            >
                {/* scale zoom-out as it reveals */}
                <motion.div
                    initial={{ scale: 1.12 }}
                    animate={isInView ? { scale: 1 } : { scale: 1.12 }}
                    transition={{ duration: 1.4, ease }}
                    className="w-full h-full"
                >
                    <motion.img
                        style={{ y, filter: 'grayscale(60%) contrast(1.1) brightness(0.95)' }}
                        src={src}
                        alt={alt}
                        className={`w-full h-auto block ${className}`}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}
